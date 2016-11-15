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
    var ScreenHelp = (function (_super) {
        __extends(ScreenHelp, _super);
        function ScreenHelp() {
            _super.call(this, Game.PreloadMedia.SCREEN_HELP);
            this._backButton = new Game.Button(Game.Config.GAME_WIDTH - 200, Game.Config.GAME_HEIGHT - 100, null, null, "Back");
            this._setup();
        }
        ScreenHelp.prototype._setup = function () {
            this.addChild(this._backButton);
            this._backButton.register(this);
        };
        ScreenHelp.prototype.onButtonClick = function (flags) {
            switch (flags.buttonInstance) {
                case this._backButton:
                    Game.GameEngine.stage.renderScreenSpace.transitionWhite(1000, function () {
                        Game.GameEngine.stage.renderVGUI.removeAllChildren();
                        Game.GameEngine.stage.renderVGUI.addChild(Game.Screen.screenTitle);
                    });
                    break;
            }
        };
        ScreenHelp.prototype.onButtonMouseOver = function (flags) {
        };
        ScreenHelp.prototype.onButtonMouseOut = function (flags) {
        };
        ScreenHelp.prototype.onButtonMouseDown = function (flags) {
        };
        return ScreenHelp;
    }(Game.Screen));
    Game.ScreenHelp = ScreenHelp;
})(Game || (Game = {}));
