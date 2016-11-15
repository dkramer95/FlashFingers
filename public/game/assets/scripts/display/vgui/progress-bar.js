/**
 * Created by M on 10/26/2016.
 */
/// <reference path="../../setup.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Game;
(function (Game) {
    var ProgressBar = (function (_super) {
        __extends(ProgressBar, _super);
        function ProgressBar() {
            var _this = this;
            _super.call(this);
            this.linkedObservers = [];
            this._backColor = "#000000";
            this._fillColor = "#000000";
            this._width = 100;
            this._height = 30;
            this._backShape = new createjs.Shape(new createjs.Graphics().beginStroke(this._backColor).drawRect(0, 0, this.width, this.height));
            this._fillShape = new createjs.Shape(new createjs.Graphics().beginFill(this._fillColor).drawRect(2, 2, 5, this.height - 4));
            this._progress = 0;
            Game.GameEngine.manifest.register(this);
            Game.GameEngine.stage.register(this);
            this.addChild(this._backShape);
            this.addChild(this._fillShape);
            Game.GameEngine.stage.renderVGUI.addChild(this);
            if (Game.Config.DEBUG_ENABLED) {
                this._debugPLine = new Game.DebugLine(function () {
                    return "Progress: " + (_this._progress * 100).toFixed(2) + "%";
                });
                Game.GameEngine.stage.debugOverlay.addLine(this._debugPLine);
            }
        }
        Object.defineProperty(ProgressBar.prototype, "backColor", {
            get: function () { return this._backColor; },
            set: function (color) { this._backColor = color; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ProgressBar.prototype, "fillColor", {
            get: function () { return this._fillColor; },
            set: function (color) { this._fillColor = color; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ProgressBar.prototype, "width", {
            get: function () { return this._width; },
            set: function (width) { this._width = width; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ProgressBar.prototype, "height", {
            get: function () { return this._height; },
            set: function (height) { this._height = height; },
            enumerable: true,
            configurable: true
        });
        ProgressBar.prototype.onManifestLoadComplete = function (event, flags) {
            if (flags.loadedScripts && flags.loadedExternals) {
                Game.GameEngine.stage.unregister(this);
                Game.GameEngine.manifest.unregister(this);
                Game.GameEngine.stage.renderVGUI.removeChild(this);
                if (Game.Config.DEBUG_ENABLED) {
                    Game.GameEngine.stage.debugOverlay.removeLine(this._debugPLine);
                }
            }
        };
        ProgressBar.prototype.onManifestProgressChanged = function (event, flags) {
            if (flags.loadedScripts && !flags.loadedExternals) {
                Game.GameEngine.log("Progress: " + (this._progress * 100).toFixed(2) + "%");
                this._progress = event.progress;
            }
        };
        ProgressBar.prototype.onManifestStartLoad = function (flags) {
        };
        ProgressBar.prototype.onTick = function (event) {
            this._backShape.graphics.clear().beginStroke(this._backColor).drawRect(0, 0, this.width, this.height);
            var fillWidth = ((this.width * this._progress) - 4 > 0) ? (this.width * this._progress) - 4 : 2;
            this._fillShape.graphics.clear().beginFill(this._fillColor).drawRect(2, 2, fillWidth, this.height - 4);
        };
        ProgressBar.prototype.onStageMouseMove = function (event) {
        };
        return ProgressBar;
    }(createjs.Container));
    Game.ProgressBar = ProgressBar;
})(Game || (Game = {}));
