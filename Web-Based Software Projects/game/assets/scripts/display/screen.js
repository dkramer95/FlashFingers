/**
 * Created by M on 10/28/2016.
 */
/// <reference path="../setup.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Game;
(function (Game) {
    var Screen = (function (_super) {
        __extends(Screen, _super);
        function Screen(backgroundBitmap, customSetup) {
            _super.call(this);
            this.linkedObservers = [];
            if (backgroundBitmap) {
                this._bitmapBackground = new createjs.Bitmap(Game.GameEngine.manifest.getResult(backgroundBitmap));
                this.addChild(this._bitmapBackground);
                Game.GameEngine.log("Screen \"" + backgroundBitmap + "\" added.");
            }
            Game.GameEngine.stage.register(this);
            if (customSetup) {
                customSetup.call(this);
            }
        }
        Object.defineProperty(Screen, "screenTitle", {
            get: function () { return Screen._screenTitle; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Screen, "screenHelp", {
            get: function () { return Screen._screenHelp; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Screen, "screenGame", {
            get: function () { return Screen._screenGame; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Screen, "screenEnd", {
            get: function () { return Screen._screenEnd; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Screen.prototype, "bitmapBackground", {
            get: function () { return this._bitmapBackground; },
            set: function (bitmap) {
                if (bitmap) {
                    var index = this.getChildIndex(this._bitmapBackground);
                    this.removeChild(this._bitmapBackground);
                    this._bitmapBackground = new createjs.Bitmap(bitmap);
                    if (index !== -1) {
                        this.addChildAt(this._bitmapBackground, index);
                    }
                    else {
                        this.addChild(this._bitmapBackground);
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Screen.prototype.onTick = function (event) {
        };
        Screen.prototype.onStageMouseMove = function (event) {
        };
        Screen.initialize = function () {
            Screen._screenTitle = new Game.ScreenTitle();
            Screen._screenHelp = new Game.ScreenHelp();
            Screen._screenGame = new Game.ScreenGame();
            Screen._screenEnd = new Game.ScreenWinLose();
        };
        return Screen;
    }(createjs.Container));
    Game.Screen = Screen;
})(Game || (Game = {}));
