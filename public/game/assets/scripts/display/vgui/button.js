/**
 * Created by M on 10/28/2016.
 */
/// <reference path="../../setup.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Game;
(function (Game) {
    var Button = (function (_super) {
        __extends(Button, _super);
        function Button(x, y, width, height, caption) {
            _super.call(this);
            this.linkedObservers = [];
            this.listeners = [];
            this._flags = { buttonInstance: this };
            this._text = new createjs.Text();
            this._width = 100;
            this._height = 50;
            this._color = "#cecece";
            this._radius = 5;
            this._hovered = false;
            this._lastTickSeconds = 0;
            this._shapeBackground = new createjs.Shape(new createjs.Graphics().beginFill(this._color).drawRoundRect(0, 0, this._width, this._height, this._radius));
            this._shapeHighlight = new createjs.Shape(new createjs.Graphics().beginFill("#ffffff").drawRoundRect(0, 0, this._width, this._height, this._radius));
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
            Game.GameEngine.stage.register(this);
        }
        Object.defineProperty(Button.prototype, "text", {
            get: function () {
                return this._text;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Button.prototype, "width", {
            get: function () {
                return this._width;
            },
            set: function (width) {
                this._width = width;
                this._calibrate();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Button.prototype, "height", {
            get: function () {
                return this._height;
            },
            set: function (height) {
                this._height = height;
                this._calibrate();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Button.prototype, "color", {
            get: function () {
                return this._color;
            },
            set: function (color) {
                this._color = color;
                this._calibrate();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Button.prototype, "radius", {
            get: function () {
                return this._radius;
            },
            set: function (radius) {
                this._radius = radius;
                this._calibrate();
            },
            enumerable: true,
            configurable: true
        });
        Button.prototype._calibrate = function () {
            this._shapeBackground = new createjs.Shape(this._shapeBackground.graphics.clear().beginFill(this._color).drawRoundRect(0, 0, this._width, this._height, this._radius));
            this._shapeHighlight = new createjs.Shape(this._shapeHighlight.graphics.clear().beginFill("#ffffff").drawRoundRect(0, 0, this._width, this._height, this._radius));
            this._shapeHighlight.alpha = 0;
            this._text.x = (this._width / 2);
            this._text.y = (this._height / 2);
            this.removeAllChildren();
            this.addChild(this._shapeBackground);
            this.addChild(this._shapeHighlight);
            this.addChild(this._text);
        };
        Button.prototype.register = function (listener) {
            var index = this.listeners.indexOf(listener);
            if (index === -1) {
                this.listeners.push(listener);
            }
        };
        Button.prototype.unregister = function (listener) {
            var index = this.listeners.indexOf(listener);
            if (index !== -1) {
                this.listeners.splice(index, 1);
            }
        };
        Button.prototype.onTick = function (event) {
            if (this._hovered) {
                this._shapeHighlight.alpha = (this._shapeHighlight.alpha < 0.8) ? (this._shapeHighlight.alpha + ((Game.GameEngine.time.milliseconds) / 1000 - this._lastTickSeconds) * 5) : this._shapeHighlight.alpha;
            }
            else {
                this._shapeHighlight.alpha = (this._shapeHighlight.alpha > 0) ? (this._shapeHighlight.alpha - ((Game.GameEngine.time.milliseconds) / 1000 - this._lastTickSeconds) * 5) : this._shapeHighlight.alpha;
            }
            this._lastTickSeconds = (Game.GameEngine.time.milliseconds) / 1000;
        };
        Button.prototype.onStageMouseMove = function (event) {
        };
        Button.prototype._click = function () {
            for (var _i = 0, _a = this.listeners; _i < _a.length; _i++) {
                var listener = _a[_i];
                if (listener.onButtonClick) {
                    listener.onButtonClick(this._flags);
                }
            }
        };
        Button.prototype._mouseOver = function () {
            this._hovered = true;
            for (var _i = 0, _a = this.listeners; _i < _a.length; _i++) {
                var listener = _a[_i];
                if (listener.onButtonMouseOver) {
                    listener.onButtonMouseOver(this._flags);
                }
            }
        };
        Button.prototype._mouseOut = function () {
            this._hovered = false;
            for (var _i = 0, _a = this.listeners; _i < _a.length; _i++) {
                var listener = _a[_i];
                if (listener.onButtonMouseOut) {
                    listener.onButtonMouseOut(this._flags);
                }
            }
        };
        Button.prototype._mouseDown = function () {
            for (var _i = 0, _a = this.listeners; _i < _a.length; _i++) {
                var listener = _a[_i];
                if (listener.onButtonMouseDown) {
                    listener.onButtonMouseDown(this._flags);
                }
            }
        };
        return Button;
    }(createjs.Container));
    Game.Button = Button;
})(Game || (Game = {}));
