/**
 * Created by M on 10/28/2016.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../../setup.ts" />
var Game;
(function (Game) {
    var ScreenTitle = (function (_super) {
        __extends(ScreenTitle, _super);
        function ScreenTitle() {
            _super.call(this, Game.PreloadMedia.SCREEN_TITLE);
            this._playButton = new Game.Button(Game.Config.GAME_WIDTH - 325, Game.Config.GAME_HEIGHT - 100, null, null, "Play");
            this._helpButton = new Game.Button(Game.Config.GAME_WIDTH - 200, Game.Config.GAME_HEIGHT - 100, null, null, "Help");
            this._setup();
        }
        ScreenTitle.prototype._setup = function () {
            this.addChild(this._playButton);
            this.addChild(this._helpButton);
            this._playButton.register(this);
            this._helpButton.register(this);
            Game.GameEngine.time.setAlarm({
                targetTime: Game.GameEngine.time.milliseconds + 2000,
                alarmFunction: function () { Game.Sound.playBackgroundMusic(Game.PreloadMedia.MUSIC, 0.005, 9999); }
            });
        };
        ScreenTitle.prototype.onButtonClick = function (flags) {
            switch (flags.buttonInstance) {
                case this._playButton:
                    Game.GameEngine.stage.renderScreenSpace.transitionWhite(2000, function () {
                        Game.GameEngine.stage.renderVGUI.removeAllChildren();
                        Game.GameEngine.stage.renderVGUI.addChild(Game.Screen.screenGame);
                    });
                    break;
                case this._helpButton:
                    Game.GameEngine.stage.renderScreenSpace.transitionWhite(1000, function () {
                        Game.GameEngine.stage.renderVGUI.removeAllChildren();
                        Game.GameEngine.stage.renderVGUI.addChild(Game.Screen.screenHelp);
                    });
                    break;
            }
        };
        ScreenTitle.prototype.onButtonMouseOver = function (flags) {
        };
        ScreenTitle.prototype.onButtonMouseOut = function (flags) {
        };
        ScreenTitle.prototype.onButtonMouseDown = function (flags) {
        };
        return ScreenTitle;
    }(Game.Screen));
    Game.ScreenTitle = ScreenTitle;
})(Game || (Game = {}));
