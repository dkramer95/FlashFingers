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
    var ScreenWinLose = (function (_super) {
        __extends(ScreenWinLose, _super);
        function ScreenWinLose() {
            _super.call(this, Game.PreloadMedia.SCREEN_WINLOSE);
            this._backButton = new Game.Button(Game.Config.GAME_WIDTH - 200, Game.Config.GAME_HEIGHT - 100, null, null, "Back");
            this._setup();
        }
        ScreenWinLose.prototype._setup = function () {
            this.addChild(this._backButton);
            this._backButton.register(this);
        };
        ScreenWinLose.prototype.onButtonClick = function (flags) {
            switch (flags.buttonInstance) {
                case this._backButton:
                    Game.GameEngine.stage.renderScreenSpace.transitionWhite(1000, function () {
                        Game.GameEngine.stage.renderVGUI.removeAllChildren();
                        Game.GameEngine.stage.renderVGUI.addChild(Game.Screen.screenTitle);
                    });
                    break;
            }
        };
        ScreenWinLose.prototype.onButtonMouseOver = function (flags) {
        };
        ScreenWinLose.prototype.onButtonMouseOut = function (flags) {
        };
        ScreenWinLose.prototype.onButtonMouseDown = function (flags) {
        };
        return ScreenWinLose;
    }(Game.Screen));
    Game.ScreenWinLose = ScreenWinLose;
})(Game || (Game = {}));
