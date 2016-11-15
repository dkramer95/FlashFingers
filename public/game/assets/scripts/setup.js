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
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Game;
(function (Game) {
    var Config = (function () {
        function Config() {
        }
        Config.VERSION = "0.1";
        Config.DEBUG_ENABLED = true;
        Config.CANVAS_ID = "game";
        Config.PATH_ASSETS = "game/assets/";
        Config.GAME_WIDTH = 800;
        Config.GAME_HEIGHT = 600;
        Config.FPS = 60;
        return Config;
    }());
    Game.Config = Config;
    var Manifest = (function (_super) {
        __extends(Manifest, _super);
        function Manifest() {
            _super.call(this, true, Config.PATH_ASSETS);
            this.listeners = [];
            this._scriptManifest = [];
            this._externalsManifest = [];
            this._flags = { loadedScripts: false, loadedExternals: false };
            this.installPlugin(createjs.Sound);
        }
        Manifest.prototype.addScript = function (identifier, source) {
            this._scriptManifest.push({ id: identifier, src: source + ".js?a=" + Config.VERSION });
        };
        Manifest.prototype.addMedia = function (identifier, source) {
            this._externalsManifest.push({ id: identifier, src: source });
        };
        Manifest.prototype._complete = function (event) {
            if (!this._flags.loadedScripts && !this._flags.loadedExternals) {
                this._flags.loadedScripts = true;
            }
            else if (this._flags.loadedScripts && !this._flags.loadedExternals) {
                this._flags.loadedExternals = true;
            }
            for (var _i = 0, _a = this.listeners; _i < _a.length; _i++) {
                var listener = _a[_i];
                if (listener.onManifestLoadComplete) {
                    listener.onManifestLoadComplete(event, this._flags);
                }
            }
        };
        Manifest.prototype._progressChanged = function (event) {
            for (var _i = 0, _a = this.listeners; _i < _a.length; _i++) {
                var listener = _a[_i];
                if (listener.onManifestProgressChanged) {
                    listener.onManifestProgressChanged(event, this._flags);
                }
            }
        };
        Manifest.prototype.load = function () {
            GameEngine.log("Fetching required preload(s)...");
            var self = this;
            this.loadFile("scripts/preload/scripts.js?a=" + Config.VERSION);
            this.loadFile("scripts/preload/media.js?a=" + Config.VERSION);
            GameEngine.log("Preload list(s) obtained.");
            setTimeout(function () {
                GameEngine.log("Downloading required files...");
                self.on("complete", self._complete, self);
                self.on("progress", self._progressChanged, self);
                for (var _i = 0, _a = self.listeners; _i < _a.length; _i++) {
                    var listener = _a[_i];
                    listener.onManifestStartLoad(self._flags);
                }
                self.loadManifest(self._scriptManifest);
                setTimeout(function () {
                    GameEngine.log("Scripts downloaded.");
                    GameEngine.stage = new Game.Stage();
                    GameEngine.stage.load();
                    setTimeout(function () {
                        GameEngine.log("Loading assets...");
                        self.loadManifest(self._externalsManifest);
                    }, 500);
                }, 500);
            }, 500);
        };
        Manifest.prototype.register = function (listener) {
            var index = this.listeners.indexOf(listener);
            if (index === -1) {
                this.listeners.push(listener);
                listener.linkedObservers.push(this);
            }
        };
        Manifest.prototype.unregister = function (listener) {
            var index = this.listeners.indexOf(listener);
            if (index !== -1) {
                this.listeners.splice(index, 1);
            }
        };
        return Manifest;
    }(createjs.LoadQueue));
    Game.Manifest = Manifest;
    var EngineState;
    (function (EngineState) {
        EngineState[EngineState["LOADING"] = 0] = "LOADING";
        EngineState[EngineState["RUNNING"] = 1] = "RUNNING";
        EngineState[EngineState["PAUSED"] = 2] = "PAUSED";
    })(EngineState || (EngineState = {}));
    var GameEngine = (function () {
        function GameEngine() {
        }
        Object.defineProperty(GameEngine, "manifest", {
            get: function () { return this._manifest; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameEngine, "stage", {
            get: function () { return this._stage; },
            set: function (stage) { this._stage = stage; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameEngine, "state", {
            get: function () { return this._state; },
            set: function (state) { this._state = state; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameEngine, "time", {
            get: function () { return this._time; },
            enumerable: true,
            configurable: true
        });
        GameEngine.main = function () {
            GameEngine.log("Initializing...");
            var self = this;
            this._manifest.register({
                linkedObservers: [],
                onManifestLoadComplete: function (event, flags) {
                    self.onManifestLoadComplete(event, flags);
                },
                onManifestProgressChanged: function (event, flags) {
                    self.onManifestProgressChanged(event, flags);
                },
                onManifestStartLoad: function (flags) {
                    self.onManifestStartLoad(flags);
                },
            });
            this._manifest.load();
        };
        GameEngine.onManifestLoadComplete = function (event, flags) {
            if (flags.loadedScripts && flags.loadedExternals) {
                Game.Sound.initialize();
                Game.KeyManager.initialize();
                GameEngine.log("Loading complete.");
                var self_1 = this;
                this._state = EngineState.RUNNING;
                this._time = new Game.Time();
                Game.Screen.initialize();
                this._stage.renderVGUI.addChild(Game.Screen.screenGame);
            }
        };
        GameEngine.onManifestProgressChanged = function (event, flags) {
        };
        GameEngine.onManifestStartLoad = function (flags) {
            this._state = EngineState.LOADING;
        };
        GameEngine.log = function (message) {
            if (Config.DEBUG_ENABLED) {
                console.log("[PERSEUS ENGINE]: " + message);
            }
        };
        GameEngine._manifest = new Manifest();
        GameEngine._state = EngineState.LOADING;
        return GameEngine;
    }());
    Game.GameEngine = GameEngine;
})(Game || (Game = {}));
Game.GameEngine.main();
