/**
 * Created by M on 10/28/2016.
 */
/// <reference path="../../setup.ts" />

interface IButtonFlags {
    buttonInstance: Game.Button;
}

interface IButtonListener extends IListener {
    onButtonClick(flags: IButtonFlags): void;
    onButtonMouseOver(flags: IButtonFlags): void;
    onButtonMouseOut(flags: IButtonFlags): void;
    onButtonMouseDown(flags: IButtonFlags): void;
}

namespace Game {

    export class Button extends createjs.Container implements IObservable, IStageListener {


        public linkedObservers: IObservable[] = [];
        public listeners: IButtonListener[] = [];

        private _flags: IButtonFlags = {buttonInstance: this};

        private _text: createjs.Text = new createjs.Text();
        public get text(): createjs.Text {
            return this._text;
        }

        private _width: number = 100;
        public get width(): number {
            return this._width;
        }

        public set width(width: number) {
            this._width = width;
            this._calibrate();
        }

        private _height: number = 50;
        public get height(): number {
            return this._height;
        }

        public set height(height: number) {
            this._height = height;
            this._calibrate();
        }

        private _color: string = "#cecece";
        public get color(): string {
            return this._color;
        }

        public set color(color: string) {
            this._color = color;
            this._calibrate();
        }

        private _radius: number = 5;
        public get radius(): number {
            return this._radius;
        }

        public set radius(radius: number) {
            this._radius = radius;
			this._calibrate();
        }

        private _hovered: boolean = false;
        private _lastTickSeconds: number = 0;

        protected _shapeBackground: createjs.Shape = new createjs.Shape(new createjs.Graphics().beginFill(this._color).drawRoundRect(0, 0, this._width, this._height, this._radius));
        protected _shapeHighlight: createjs.Shape = new createjs.Shape(new createjs.Graphics().beginFill("#ffffff").drawRoundRect(0, 0, this._width, this._height, this._radius));

        public constructor(x: number, y: number, width?: number, height?: number, caption?: string) {
            super();
            width = (width) ? width : 100;
            height = (height) ? height : 50;
            caption = (caption) ? caption : "";
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.text.text = caption;
            this.text.textAlign = "center";
            this.text.textBaseline = "middle";
            this.text.font = "bold 22px Verdana";
            this.cursor = "pointer";
            this.on("click", this._click, this);
            this.on("mouseover", this._mouseOver, this);
            this.on("mouseout", this._mouseOut, this);
            this.on("mousedown", this._mouseDown, this);
            this._shapeHighlight.alpha = 0;
            this._calibrate();
            GameEngine.stage.register(this);
        }

        protected _calibrate(): void {
            this._shapeBackground = new createjs.Shape(this._shapeBackground.graphics.clear().beginFill(this._color).drawRoundRect(0, 0, this._width, this._height, this._radius));
            this._shapeHighlight = new createjs.Shape(this._shapeHighlight.graphics.clear().beginFill("#ffffff").drawRoundRect(0, 0, this._width, this._height, this._radius));
            this._shapeHighlight.alpha = 0;
            this._text.x = (this._width / 2);
            this._text.y = (this._height / 2);
            this.removeAllChildren();
            this.addChild(this._shapeBackground);
            this.addChild(this._shapeHighlight);
            this.addChild(this._text);
        }

        public register(listener: IButtonListener): void {
            let index = this.listeners.indexOf(listener);
            if (index === -1) {
                this.listeners.push(listener);
            }
        }

        public unregister(listener: IButtonListener): void {
            let index = this.listeners.indexOf(listener);
            if (index !== -1) {
                this.listeners.splice(index, 1);
            }
        }

        public onTick(event: createjs.TickerEvent): void {
            if (this._hovered) {
                this._shapeHighlight.alpha = (this._shapeHighlight.alpha < 0.8) ? (this._shapeHighlight.alpha + ((GameEngine.time.milliseconds)/1000 - this._lastTickSeconds) * 5) : this._shapeHighlight.alpha;
            } else {
                this._shapeHighlight.alpha = (this._shapeHighlight.alpha > 0) ? (this._shapeHighlight.alpha - ((GameEngine.time.milliseconds)/1000 - this._lastTickSeconds) * 5) : this._shapeHighlight.alpha;
            }
            this._lastTickSeconds = (GameEngine.time.milliseconds)/1000;
        }

        public onStageMouseMove(event: createjs.MouseEvent): void {
        }

        private _click(): void {
            for (let listener of this.listeners) {
                if (listener.onButtonClick) {
                    listener.onButtonClick(this._flags);
                }
            }
        }

        private _mouseOver(): void {
            this._hovered = true;
            for (let listener of this.listeners) {
                if (listener.onButtonMouseOver) {
                    listener.onButtonMouseOver(this._flags);
                }
            }
        }

        private _mouseOut(): void {
            this._hovered = false;
            for (let listener of this.listeners) {
                if (listener.onButtonMouseOut) {
                    listener.onButtonMouseOut(this._flags);
                }
            }
        }

        private _mouseDown(): void {
            for (let listener of this.listeners) {
                if (listener.onButtonMouseDown) {
                    listener.onButtonMouseDown(this._flags);
                }
            }
        }

    }

}