/**
 * Created by M on 10/29/2016.
 */
/// <reference path="../../setup.ts" />

namespace Game {

    export class DebugOverlay extends createjs.Container implements IStageListener, IKeyManagerListener {

        public linkedObservers: IObservable[] = [];
        private _lines: DebugLine[] = [];
        private _maxWidth: number = 0;
        private _maxHeight: number = 0;
        private _shapeBackground: createjs.Shape = new createjs.Shape(new createjs.Graphics().beginFill("#000000").drawRoundRect(0, 0, this._maxWidth, this._maxHeight, 0));
        private _lastKeyCodePressed = 0;

        public constructor() {
            super();
            GameEngine.stage.register(this);
            KeyManager.register(this);
            this.addChild(this._shapeBackground);
            this._shapeBackground.alpha = 0.7;
            this._onTimeLoaded();
        }

        public addLine(line: DebugLine) {
            this._lines.push(line);
            this.addChild(line);
        }

        public removeLine(line: DebugLine) {
            this._lines.splice(this._lines.indexOf(line), 1);
            this.removeChild(line);
        }

        private _addKeyDebugLine() {
            let self = this;
            this.addLine(new DebugLine(() => {
                for (let key in KeyManager.KEY) {
                    let KEY: Key = <Key>KeyManager.KEY[key];
                    if (KEY.keyCode === self._lastKeyCodePressed) {
                        return "Last Key Pressed: \"" + KEY.caption + "\", " + self._lastKeyCodePressed;
                    }
                }
                return "Last Key Pressed: " + self._lastKeyCodePressed;
            }));
        }

        private _onTimeLoaded(): void {
            let self = this;
            let interval = setInterval(function(){
                if (typeof GameEngine.time !== "undefined" && GameEngine.time !== null) {
                    self._addKeyDebugLine();
                    clearInterval(interval);
                }
            }, 100);
        }

        public onTick(event: createjs.TickerEvent): void {
            this._maxWidth = 0;
            this._maxHeight = 0;
            for (let line of this._lines) {
                this._maxWidth = (line.getMeasuredWidth() + 10 > this._maxWidth) ? line.getMeasuredWidth() + 10 : this._maxWidth;
            }
            this._maxHeight = (20 * this._lines.length + 5);
            this._shapeBackground = new createjs.Shape(this._shapeBackground.graphics.clear().beginFill("#000000").drawRoundRect(0, 0, this._maxWidth, this._maxHeight, 0));
            let index = 0;
            for (let line of this._lines) {
                line.x = 5;
                line.y = 20 * index + 5;
                index++;
            }
        }

        public onStageMouseMove(event: createjs.MouseEvent): void {
        }

        public onKeyManagerKeyPressed(keyCode: number) {
            this._lastKeyCodePressed = keyCode;
        }

        public onKeyManagerKeyRelease(keyCode: number) {
            this._lastKeyCodePressed = keyCode;
        }

    }

    export class DebugLine extends createjs.Text implements IStageListener {

        public linkedObservers: IObservable[] = [];

        public constructor(textFunction: () => string) {
            super("", "12px Arial", "#ffffff");
            this.getText = textFunction;
            GameEngine.stage.register(this);
        }

        public getText(): string {
            return this.text;
        }

        public onTick(event: createjs.TickerEvent): void {
            this.text = this.getText();
        }

        public onStageMouseMove(event: createjs.MouseEvent): void {
        }

    }

}