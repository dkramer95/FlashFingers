/**
 * Created by M on 10/26/2016.
 */
/// <reference path="../setup.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Game;
(function (Game) {
    var Stage = (function (_super) {
        __extends(Stage, _super);
        function Stage() {
            _super.call(this, Game.Config.CANVAS_ID);
            this.listeners = [];
            this._shapeBackground = new createjs.Shape(new createjs.Graphics().beginFill("#ffffff").drawRect(0, 0, Game.Config.GAME_WIDTH, Game.Config.GAME_HEIGHT));
            this._mouseX = 0;
            this._mouseY = 0;
            this._renderScene = new Game.LayerRenderScene();
            this._renderEffects = new Game.LayerRenderDrawEffects();
            this._renderViewModel = new Game.LayerRenderViewModel();
            this._renderHUD = new Game.LayerRenderHUD();
            this._renderVGUI = new Game.LayerRenderVGUI();
            this._renderScreenSpace = new Game.LayerRenderScreenSpace();
            this._renderUIOverlay = new Game.LayerRenderUIOverlay();
            this._volumeButton = new Game.VolumeButton();
            Game.GameEngine.log("Initializing stage...");
            var canvas = this.canvas;
            canvas.width = Game.Config.GAME_WIDTH;
            canvas.height = Game.Config.GAME_HEIGHT;
        }
        Object.defineProperty(Stage.prototype, "mouseXPos", {
            get: function () {
                return this._mouseX;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Stage.prototype, "mouseYPos", {
            get: function () {
                return this._mouseY;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Stage.prototype, "renderScene", {
            get: function () { return this._renderScene; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Stage.prototype, "renderEffects", {
            get: function () { return this._renderEffects; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Stage.prototype, "renderViewModel", {
            get: function () { return this._renderViewModel; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Stage.prototype, "renderHUD", {
            get: function () { return this._renderHUD; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Stage.prototype, "renderVGUI", {
            get: function () { return this._renderVGUI; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Stage.prototype, "renderScreenSpace", {
            get: function () { return this._renderScreenSpace; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Stage.prototype, "renderUIOverlay", {
            get: function () { return this._renderUIOverlay; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Stage.prototype, "volumeButton", {
            get: function () { return this._volumeButton; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Stage.prototype, "debugOverlay", {
            get: function () {
                return this._debugOverlay;
            },
            enumerable: true,
            configurable: true
        });
        Stage.prototype.load = function () {
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
            createjs.Ticker.framerate = Game.Config.FPS;
            this.on("stagemousemove", this.onStageMouseMove, this);
            if (Game.Config.DEBUG_ENABLED) {
                this._debugOverlay = new Game.DebugOverlay();
                this.renderUIOverlay.addChild(this._debugOverlay);
                this._debugOverlay.addLine(new Game.DebugLine(function () {
                    return "Debug: ON";
                }));
                this._debugOverlay.addLine(new Game.DebugLine(function () {
                    if (Game.GameEngine.time) {
                        return "Time: " + Game.GameEngine.time.seconds;
                    }
                    else {
                        return "Time:";
                    }
                }));
                this._debugOverlay.addLine(new Game.DebugLine(function () {
                    return "Mouse Position: " + Game.GameEngine.stage.mouseXPos + ", " + Game.GameEngine.stage.mouseYPos;
                }));
            }
            var progressBar = new Game.ProgressBar();
            progressBar.width = Game.Config.GAME_WIDTH * .7;
            progressBar.height = 30;
            progressBar.x = (Game.Config.GAME_WIDTH / 2 - progressBar.width / 2);
            progressBar.y = (Game.Config.GAME_HEIGHT / 2 - progressBar.height / 2);
            progressBar.fillColor = "#000000";
            Game.GameEngine.log("Stage initialized.");
        };
        Stage.prototype.register = function (listener) {
            var index = this.listeners.indexOf(listener);
            if (index === -1) {
                this.listeners.push(listener);
                listener.linkedObservers.push(this);
            }
        };
        Stage.prototype.unregister = function (listener) {
            var index = this.listeners.indexOf(listener);
            if (index !== -1) {
                this.listeners.splice(index, 1);
            }
        };
        Stage.prototype.onTick = function (event) {
            this.clear();
            this.update();
            for (var _i = 0, _a = this.listeners; _i < _a.length; _i++) {
                var listener = _a[_i];
                if (listener.onTick) {
                    listener.onTick(event);
                }
            }
        };
        Stage.prototype.onStageMouseMove = function (event) {
            this._mouseX = event.stageX;
            this._mouseY = event.stageY;
            for (var _i = 0, _a = this.listeners; _i < _a.length; _i++) {
                var listener = _a[_i];
                if (listener.onStageMouseMove) {
                    listener.onStageMouseMove(event);
                }
            }
        };
        return Stage;
    }(createjs.Stage));
    Game.Stage = Stage;
})(Game || (Game = {}));
