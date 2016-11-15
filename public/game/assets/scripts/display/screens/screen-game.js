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
    var ScreenGame = (function (_super) {
        __extends(ScreenGame, _super);
        function ScreenGame() {
            _super.call(this, Game.PreloadMedia.SCREEN_GAME);
            this._setup();
        }
        ScreenGame.prototype._setup = function () {
        };
        ScreenGame.prototype.onTick = function (event) {
        };
        return ScreenGame;
    }(Game.Screen));
    Game.ScreenGame = ScreenGame;
})(Game || (Game = {}));
