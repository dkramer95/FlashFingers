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
    var LayerRenderScreenSpace = (function (_super) {
        __extends(LayerRenderScreenSpace, _super);
        function LayerRenderScreenSpace() {
            _super.call(this);
            this.linkedObservers = [];
            this._shapeBackgroundTransition = new createjs.Shape(new createjs.Graphics().beginFill("#ffffff").drawRect(0, 0, Game.Config.GAME_WIDTH, Game.Config.GAME_HEIGHT));
            this._targetMilliseconds = 0;
            this._startMilliseconds = 0;
            this._transitioning = false;
            this.addChild(this._shapeBackgroundTransition);
            this._shapeBackgroundTransition.alpha = 0;
            Game.GameEngine.manifest.register(this);
        }
        Object.defineProperty(LayerRenderScreenSpace.prototype, "elapsedMilliseconds", {
            get: function () { return (Game.GameEngine.time.milliseconds - this._startMilliseconds); },
            enumerable: true,
            configurable: true
        });
        LayerRenderScreenSpace.prototype.transition = function (color, milliseconds, alarmFunction, callingObject) {
            if (!this._transitioning) {
                this._shapeBackgroundTransition.graphics.clear().beginFill(color).drawRect(0, 0, Game.Config.GAME_WIDTH, Game.Config.GAME_HEIGHT);
                this._targetMilliseconds = milliseconds;
                this._startMilliseconds = Game.GameEngine.time.milliseconds;
                callingObject = (callingObject) ? callingObject : null;
                Game.GameEngine.time.setAlarm({
                    ID: "ScreenSpaceTransition",
                    callingObject: callingObject,
                    targetTime: Game.GameEngine.time.milliseconds + milliseconds / 2,
                    alarmFunction: alarmFunction
                });
                Game.GameEngine.time.setAlarm({
                    ID: "efesf",
                    targetTime: Game.GameEngine.time.milliseconds + milliseconds / 2,
                    alarmFunction: function () {
                    }
                });
                var self_1 = this;
                Game.GameEngine.time.setAlarm({
                    ID: "ScreenSpaceTransitionStopper",
                    callingObject: self_1,
                    targetTime: Game.GameEngine.time.milliseconds + milliseconds,
                    alarmFunction: self_1._stopTransitioning
                });
                this._transitioning = true;
            }
        };
        LayerRenderScreenSpace.prototype.transitionBlack = function (milliseconds, alarmFunction, callingObject) {
            this.transition("#000000", milliseconds, alarmFunction, callingObject);
        };
        LayerRenderScreenSpace.prototype.transitionWhite = function (milliseconds, alarmFunction, callingObject) {
            this.transition("#ffffff", milliseconds, alarmFunction, callingObject);
        };
        LayerRenderScreenSpace.prototype._stopTransitioning = function () {
            this._transitioning = false;
            this._shapeBackgroundTransition.alpha = 0;
        };
        LayerRenderScreenSpace.prototype.onTick = function (event) {
            if (this._transitioning) {
                if (this._targetMilliseconds / 2 >= this.elapsedMilliseconds) {
                    this._shapeBackgroundTransition.alpha = ((this.elapsedMilliseconds) / (this._targetMilliseconds / 2));
                }
                else {
                    this._shapeBackgroundTransition.alpha = (1 - (this.elapsedMilliseconds / (this._targetMilliseconds)));
                }
            }
        };
        LayerRenderScreenSpace.prototype.onStageMouseMove = function (event) {
        };
        LayerRenderScreenSpace.prototype.onManifestLoadComplete = function (event, flags) {
            if (flags.loadedScripts && flags.loadedExternals) {
                Game.GameEngine.stage.register(this);
            }
        };
        LayerRenderScreenSpace.prototype.onManifestProgressChanged = function (event, flags) {
        };
        LayerRenderScreenSpace.prototype.onManifestStartLoad = function (flags) {
        };
        return LayerRenderScreenSpace;
    }(createjs.Container));
    Game.LayerRenderScreenSpace = LayerRenderScreenSpace;
})(Game || (Game = {}));
