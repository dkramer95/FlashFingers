/**
 * Created by M on 10/26/2016.
 */
/// <reference path="../../libraries/createjs/createjs.d.ts" />
/// <reference path="./display/stage.ts" />
/// <reference path="./display/screen.ts" />
/// <reference path="./display/screens/screen-title.ts" />
/// <reference path="./display/screens/screen-help.ts" />
/// <reference path="./display/screens/screen-game.ts" />
/// <reference path="./display/screens/screen-win-lose.ts" />
/// <reference path="./preload/media.ts" />
/// <reference path="./preload/scripts.ts" />
/// <reference path="./entities/time.ts" />
/// <reference path="./entities/sound.ts" />
/// <reference path="./entities/key-manager.ts" />
/// <reference path="./display/vgui/debug.ts" />
/// <reference path="./display/vgui/button.ts" />
/// <reference path="./display/vgui/volumebutton.ts" />
/// <reference path="./display/vgui/progress-bar.ts" />
/// <reference path="./display/render-layers/render-draw-effects.ts" />
/// <reference path="./display/render-layers/render-hud.ts" />
/// <reference path="./display/render-layers/render-scene.ts" />
/// <reference path="./display/render-layers/render-screen-space.ts" />
/// <reference path="./display/render-layers/render-vgui.ts" />
/// <reference path="./display/render-layers/render-ui-overlay.ts" />
/// <reference path="./display/render-layers/render-view-model.ts" />

interface IObservable {
    listeners: IListener[];
    register(listener: IListener): void;
    unregister(listener: IListener): void;
}

interface IListener {
    linkedObservers: IObservable[];
}

interface IManifestFlags {
    loadedScripts: boolean;
    loadedExternals: boolean;
}

interface IManifestListener extends IListener {
    onManifestLoadComplete(event: createjs.Event, flags: IManifestFlags): void;
    onManifestProgressChanged(event: createjs.ProgressEvent, flags: IManifestFlags): void;
    onManifestStartLoad(flags: IManifestFlags): void;
}

interface IManifestObject {
    id: string;
    src: string;
}

namespace Game {

    export class Config {
        public static readonly VERSION: string = "0.1";
        public static readonly DEBUG_ENABLED: boolean = true;
        public static readonly CANVAS_ID: string = "game";
        public static readonly PATH_ASSETS: string = "game/assets/";
        public static readonly GAME_WIDTH: number = 800;
        public static readonly GAME_HEIGHT: number = 600;
        public static readonly FPS: number = 60;
    }

    export class Manifest extends createjs.LoadQueue implements IObservable {

        public listeners: IManifestListener[] = [];
        private _scriptManifest: IManifestObject[] = [];
        private _externalsManifest: IManifestObject[] = [];
        private _flags: IManifestFlags = {loadedScripts: false, loadedExternals: false};

        public constructor() {
            super(true, Config.PATH_ASSETS);
            this.installPlugin(<any>createjs.Sound);
        }

        public addScript(identifier: string, source: string): void {
            this._scriptManifest.push({id: identifier, src: source + ".js?a=" + Config.VERSION});
        }

        public addMedia(identifier: string, source: string): void {
            this._externalsManifest.push({id: identifier, src: source});
        }

        private _complete(event: createjs.Event): void {
            if (!this._flags.loadedScripts && !this._flags.loadedExternals) {
                this._flags.loadedScripts = true;
            } else if (this._flags.loadedScripts && !this._flags.loadedExternals) {
                this._flags.loadedExternals = true;
            }
            for (let listener of this.listeners) {
                if (listener.onManifestLoadComplete) {
                    listener.onManifestLoadComplete(event, this._flags);
                }
            }
        }

        private _progressChanged(event: createjs.ProgressEvent): void {
            for (let listener of this.listeners) {
                if (listener.onManifestProgressChanged) {
                    listener.onManifestProgressChanged(event, this._flags);
                }
            }
        }

        public load(): void {
            GameEngine.log("Fetching required preload(s)...");
            let self = this;
            this.loadFile("scripts/preload/scripts.js?a=" + Config.VERSION);
            this.loadFile("scripts/preload/media.js?a=" + Config.VERSION);
            GameEngine.log("Preload list(s) obtained.");
            setTimeout(function(){
                GameEngine.log("Downloading required files...");
                self.on("complete", self._complete, self);
                self.on("progress", self._progressChanged, self);
                for (let listener of self.listeners) {
                    listener.onManifestStartLoad(self._flags);
                }
                self.loadManifest(self._scriptManifest);
                setTimeout(function(){
                    GameEngine.log("Scripts downloaded.");
                    GameEngine.stage = new Stage();
                    GameEngine.stage.load();
                    setTimeout(function(){
                        GameEngine.log("Loading assets...");
                        self.loadManifest(self._externalsManifest);
                    }, 500);
                }, 500);
            }, 500);
        }

        public register(listener: IManifestListener): void {
            let index = this.listeners.indexOf(listener);
            if (index === -1) {
                this.listeners.push(listener);
                listener.linkedObservers.push(this);
            }
        }

        public unregister(listener: IManifestListener): void {
            let index = this.listeners.indexOf(listener);
            if (index !== -1) {
                this.listeners.splice(index, 1);
            }
        }


    }

    enum EngineState {
        LOADING, RUNNING, PAUSED
    }

    export class GameEngine {

        private static _manifest: Manifest = new Manifest();
        public static get manifest(): Manifest { return this._manifest; }

        private static _stage: Stage;
        public static get stage(): Stage { return this._stage }
        public static set stage(stage: Stage) { this._stage = stage; }

        private static _state: EngineState = EngineState.LOADING;
        public static get state(): EngineState { return this._state; }
        public static set state(state: EngineState) { this._state = state; }

        private static _time: Time;
        public static get time(): Time { return this._time; }

        public static main() {
            GameEngine.log("Initializing...");
            let self = this;
            this._manifest.register({
                linkedObservers: [],
                onManifestLoadComplete: function(event: createjs.Event, flags: IManifestFlags){
                    self.onManifestLoadComplete(event, flags);
                },
                onManifestProgressChanged: function(event: createjs.ProgressEvent, flags: IManifestFlags){
                    self.onManifestProgressChanged(event, flags);
                },
                onManifestStartLoad: function(flags: IManifestFlags){
                    self.onManifestStartLoad(flags);
                },
            });
            this._manifest.load();
        }

        public static onManifestLoadComplete(event: createjs.Event, flags: IManifestFlags): void {
            if (flags.loadedScripts && flags.loadedExternals) {
                Game.Sound.initialize();
                KeyManager.initialize();
                GameEngine.log("Loading complete.");
                let self = this;
                this._state = EngineState.RUNNING;
                this._time = new Time();
                Screen.initialize();
                this._stage.renderVGUI.addChild(Screen.screenGame);
            }
        }

        public static onManifestProgressChanged(event: createjs.ProgressEvent, flags: IManifestFlags): void {
        }

        public static onManifestStartLoad(flags: IManifestFlags): void {
            this._state = EngineState.LOADING;
        }

        public static log(message: string): void {
            if (Config.DEBUG_ENABLED) {
                console.log("[PERSEUS ENGINE]: " + message);
            }
        }

    }

}

Game.GameEngine.main();