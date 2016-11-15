/**
 * Created by M on 10/29/2016.
 */
/// <reference path="../../setup.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Game;
(function (Game) {
    var DebugOverlay = (function (_super) {
        __extends(DebugOverlay, _super);
        function DebugOverlay() {
            _super.call(this);
            this.linkedObservers = [];
            this._lines = [];
            this._maxWidth = 0;
            this._maxHeight = 0;
            this._shapeBackground = new createjs.Shape(new createjs.Graphics().beginFill("#000000").drawRoundRect(0, 0, this._maxWidth, this._maxHeight, 0));
            this._lastKeyCodePressed = 0;
            Game.GameEngine.stage.register(this);
            Game.KeyManager.register(this);
            this.addChild(this._shapeBackground);
            this._shapeBackground.alpha = 0.7;
            this._onTimeLoaded();
        }
        DebugOverlay.prototype.addLine = function (line) {
            this._lines.push(line);
            this.addChild(line);
        };
        DebugOverlay.prototype.removeLine = function (line) {
            this._lines.splice(this._lines.indexOf(line), 1);
            this.removeChild(line);
        };
        DebugOverlay.prototype._addKeyDebugLine = function () {
            var self = this;
            this.addLine(new DebugLine(function () {
                for (var key in Game.KeyManager.KEY) {
                    var KEY = Game.KeyManager.KEY[key];
                    if (KEY.keyCode === self._lastKeyCodePressed) {
                        return "Last Key Pressed: \"" + KEY.caption + "\", " + self._lastKeyCodePressed;
                    }
                }
                return "Last Key Pressed: " + self._lastKeyCodePressed;
            }));
        };
        DebugOverlay.prototype._onTimeLoaded = function () {
            var self = this;
            var interval = setInterval(function () {
                if (typeof Game.GameEngine.time !== "undefined" && Game.GameEngine.time !== null) {
                    self._addKeyDebugLine();
                    clearInterval(interval);
                }
            }, 100);
        };
        DebugOverlay.prototype.onTick = function (event) {
            this._maxWidth = 0;
            this._maxHeight = 0;
            for (var _i = 0, _a = this._lines; _i < _a.length; _i++) {
                var line = _a[_i];
                this._maxWidth = (line.getMeasuredWidth() + 10 > this._maxWidth) ? line.getMeasuredWidth() + 10 : this._maxWidth;
            }
            this._maxHeight = (20 * this._lines.length + 5);
            this._shapeBackground = new createjs.Shape(this._shapeBackground.graphics.clear().beginFill("#000000").drawRoundRect(0, 0, this._maxWidth, this._maxHeight, 0));
            var index = 0;
            for (var _b = 0, _c = this._lines; _b < _c.length; _b++) {
                var line = _c[_b];
                line.x = 5;
                line.y = 20 * index + 5;
                index++;
            }
        };
        DebugOverlay.prototype.onStageMouseMove = function (event) {
        };
        DebugOverlay.prototype.onKeyManagerKeyPressed = function (keyCode) {
            this._lastKeyCodePressed = keyCode;
        };
        DebugOverlay.prototype.onKeyManagerKeyRelease = function (keyCode) {
            this._lastKeyCodePressed = keyCode;
        };
        return DebugOverlay;
    }(createjs.Container));
    Game.DebugOverlay = DebugOverlay;
    var DebugLine = (function (_super) {
        __extends(DebugLine, _super);
        function DebugLine(textFunction) {
            _super.call(this, "", "12px Arial", "#ffffff");
            this.linkedObservers = [];
            this.getText = textFunction;
            Game.GameEngine.stage.register(this);
        }
        DebugLine.prototype.getText = function () {
            return this.text;
        };
        DebugLine.prototype.onTick = function (event) {
            this.text = this.getText();
        };
        DebugLine.prototype.onStageMouseMove = function (event) {
        };
        return DebugLine;
    }(createjs.Text));
    Game.DebugLine = DebugLine;
})(Game || (Game = {}));
