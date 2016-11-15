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
    var LayerRenderHUD = (function (_super) {
        __extends(LayerRenderHUD, _super);
        function LayerRenderHUD() {
            _super.call(this);
        }
        return LayerRenderHUD;
    }(createjs.Container));
    Game.LayerRenderHUD = LayerRenderHUD;
})(Game || (Game = {}));
