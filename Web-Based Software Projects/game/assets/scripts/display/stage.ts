/**
 * Created by M on 10/26/2016.
 */
/// <reference path="../setup.ts" />

interface IStageListener extends IListener {
    onTick(event: createjs.TickerEvent): void;
    onStageMouseMove(event: createjs.MouseEvent): void;
}

namespace Game {

    export class Stage extends createjs.Stage implements IObservable {

        public listeners: IStageListener[] = [];
        private _shapeBackground: createjs.Shape = new createjs.Shape(new createjs.Graphics().beginFill("#ffffff").drawRect(0, 0, Config.GAME_WIDTH, Config.GAME_HEIGHT));

        private _mouseX: number = 0;
        get mouseXPos(): number {
            return this._mouseX;
        }
        private _mouseY: number = 0;
        get mouseYPos(): number {
            return this._mouseY;
        }

        private _renderScene: LayerRenderScene = new LayerRenderScene();
        public get renderScene(): LayerRenderScene { return this._renderScene; }

        private _renderEffects: LayerRenderDrawEffects = new LayerRenderDrawEffects();
        public get renderEffects(): LayerRenderDrawEffects { return this._renderEffects; }

        private _renderViewModel: LayerRenderViewModel = new LayerRenderViewModel();
        public get renderViewModel(): LayerRenderViewModel { return this._renderViewModel; }

        private _renderHUD: LayerRenderHUD = new LayerRenderHUD();
        public get renderHUD(): LayerRenderHUD { return this._renderHUD; }

        private _renderVGUI: LayerRenderVGUI = new LayerRenderVGUI();
        public get renderVGUI(): LayerRenderVGUI { return this._renderVGUI; }

        private _renderScreenSpace: LayerRenderScreenSpace = new LayerRenderScreenSpace();
        public get renderScreenSpace(): LayerRenderScreenSpace { return this._renderScreenSpace; }

        private _renderUIOverlay: LayerRenderUIOverlay = new LayerRenderUIOverlay();
        public get renderUIOverlay(): LayerRenderUIOverlay { return this._renderUIOverlay; }

        private _volumeButton: VolumeButton = new VolumeButton();
        public get volumeButton(): VolumeButton { return this._volumeButton; }

        private _debugOverlay: DebugOverlay;
        get debugOverlay(): DebugOverlay {
            return this._debugOverlay;
        }

        public constructor() {
            super(Config.CANVAS_ID);
            GameEngine.log("Initializing stage...");
            let canvas: HTMLCanvasElement = <HTMLCanvasElement>this.canvas;
            canvas.width = Config.GAME_WIDTH;
            canvas.height = Config.GAME_HEIGHT;
        }

        public load() {
            this.enableMouseOver();
            this.addChild(this._shapeBackground);
            this.addChild(this._renderScene);
            this.addChild(this._renderEffects);
            this.addChild(this._renderViewModel);
            this.addChild(this._renderHUD);
            this.addChild(this._renderVGUI);
            this.addChild(this._renderScreenSpace);
            this.addChild(this._renderUIOverlay);
            createjs.Ticker.on("tick", this.onTick, this);
            createjs.Ticker.framerate = Config.FPS;
            this.on("stagemousemove", this.onStageMouseMove, this);
            if (Config.DEBUG_ENABLED) {
                this._debugOverlay = new DebugOverlay();
                this.renderUIOverlay.addChild(this._debugOverlay);
                this._debugOverlay.addLine(new DebugLine(() => {
                    return "Debug: ON";
                }));
                this._debugOverlay.addLine(new DebugLine(() => {
                    if (GameEngine.time) {
                        return "Time: " + GameEngine.time.seconds;
                    } else {
                        return "Time:";
                    }
                }));
                this._debugOverlay.addLine(new DebugLine(() => {
                    return "Mouse Position: " + GameEngine.stage.mouseXPos + ", " + GameEngine.stage.mouseYPos;
                }));
            }
            let progressBar = new ProgressBar();
            progressBar.width = Config.GAME_WIDTH * .7;
            progressBar.height = 30;
            progressBar.x = (Config.GAME_WIDTH/2 - progressBar.width/2);
            progressBar.y = (Config.GAME_HEIGHT/2 - progressBar.height/2);
            progressBar.fillColor = "#000000";
            GameEngine.log("Stage initialized.");
        }

        public register(listener: IStageListener): void {
            let index = this.listeners.indexOf(listener);
            if (index === -1) {
                this.listeners.push(listener);
                listener.linkedObservers.push(this);
            }
        }

        public unregister(listener: IStageListener): void {
            let index = this.listeners.indexOf(listener);
            if (index !== -1) {
                this.listeners.splice(index, 1);
            }
        }

        public onTick(event: createjs.TickerEvent) {
            this.clear();
            this.update();
            for (let listener of this.listeners) {
                if (listener.onTick) {
                    listener.onTick(event);
                }
            }
        }

        public onStageMouseMove(event: createjs.MouseEvent): void {
            this._mouseX = event.stageX;
            this._mouseY = event.stageY;
            for (let listener of this.listeners) {
                if (listener.onStageMouseMove) {
                    listener.onStageMouseMove(event);
                }
            }
        }
    }

}