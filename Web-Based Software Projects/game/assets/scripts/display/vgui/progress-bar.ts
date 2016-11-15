/**
 * Created by M on 10/26/2016.
 */
/// <reference path="../../setup.ts" />

namespace Game {

    export class ProgressBar extends createjs.Container implements IManifestListener, IStageListener {

        public linkedObservers: IObservable[] = [];

        private _backColor: string = "#000000";
        public get backColor(): string { return this._backColor; }
        public set backColor(color: string) { this._backColor = color; }

        private _fillColor: string = "#000000";
        public get fillColor(): string { return this._fillColor; }
        public set fillColor(color: string) { this._fillColor = color; }

        private _width: number = 100;
        public get width(): number { return this._width; }
        public set width(width: number) { this._width = width; }

        private _height: number = 30;
        public get height(): number { return this._height; }
        public set height(height: number) { this._height = height; }

        private _backShape: createjs.Shape = new createjs.Shape(new createjs.Graphics().beginStroke(this._backColor).drawRect(0, 0, this.width, this.height));
        private _fillShape: createjs.Shape = new createjs.Shape(new createjs.Graphics().beginFill(this._fillColor).drawRect(2, 2, 5, this.height - 4));
        private _progress: number = 0;
        private _debugPLine: DebugLine;

        public constructor() {
            super();
            GameEngine.manifest.register(this);
            GameEngine.stage.register(this);
            this.addChild(this._backShape);
            this.addChild(this._fillShape);
            GameEngine.stage.renderVGUI.addChild(this);
            if (Config.DEBUG_ENABLED) {
                this._debugPLine = new DebugLine(() => {
                    return "Progress: " + (this._progress * 100).toFixed(2) + "%";
                });
                GameEngine.stage.debugOverlay.addLine(this._debugPLine);
            }
        }

        public onManifestLoadComplete(event: createjs.Event, flags: IManifestFlags): void {
            if (flags.loadedScripts && flags.loadedExternals) {
                GameEngine.stage.unregister(this);
                GameEngine.manifest.unregister(this);
                GameEngine.stage.renderVGUI.removeChild(this);
                if (Config.DEBUG_ENABLED) {
                    GameEngine.stage.debugOverlay.removeLine(this._debugPLine);
                }
            }
        }

        public onManifestProgressChanged(event: createjs.ProgressEvent, flags: IManifestFlags): void {
            if (flags.loadedScripts && !flags.loadedExternals) {
                GameEngine.log("Progress: " + (this._progress * 100).toFixed(2) + "%");
                this._progress = event.progress;
            }
        }

        onManifestStartLoad(flags: IManifestFlags): void {
        }

        onTick(event: createjs.TickerEvent): void {
            this._backShape.graphics.clear().beginStroke(this._backColor).drawRect(0, 0, this.width, this.height);
            let fillWidth = ((this.width * this._progress) - 4 > 0) ? (this.width * this._progress) - 4 : 2;
            this._fillShape.graphics.clear().beginFill(this._fillColor).drawRect(2, 2, fillWidth, this.height - 4);
        }

        onStageMouseMove(event: createjs.MouseEvent): void {

        }

    }

}