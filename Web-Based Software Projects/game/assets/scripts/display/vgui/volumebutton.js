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
    var VolumeButton = (function (_super) {
        __extends(VolumeButton, _super);
        function VolumeButton() {
            _super.call(this);
            this.listeners = [];
            this.linkedObservers = [];
            this._muted = false;
            this.cursor = "pointer";
            this.on("click", this._click, this);
            Game.GameEngine.manifest.register(this);
        }
        Object.defineProperty(VolumeButton.prototype, "muted", {
            get: function () {
                return this._muted;
            },
            enumerable: true,
            configurable: true
        });
        VolumeButton.prototype._initialize = function () {
            this._bitmap = new createjs.Bitmap(Game.GameEngine.manifest.getResult(Game.PreloadMedia.UI_VOLUME));
            if (!VolumeButton._bitmapVolume || !VolumeButton._bitmapVolumeMute) {
                VolumeButton._bitmapVolume = new createjs.Bitmap(Game.GameEngine.manifest.getResult(Game.PreloadMedia.UI_VOLUME));
                VolumeButton._bitmapVolumeMute = new createjs.Bitmap(Game.GameEngine.manifest.getResult(Game.PreloadMedia.UI_VOLUME_MUTE));
            }
            this.addChild(this._bitmap);
            this.x = Game.Config.GAME_WIDTH - 55;
            this.y = 5;
            Game.Sound.register(this);
            Game.GameEngine.stage.renderUIOverlay.addChild(this);
        };
        VolumeButton.prototype.register = function (listener) {
            var index = this.listeners.indexOf(listener);
            if (index === -1) {
                this.listeners.push(listener);
            }
        };
        VolumeButton.prototype.unregister = function (listener) {
            var index = this.listeners.indexOf(listener);
            if (index !== -1) {
                this.listeners.splice(index, 1);
            }
        };
        VolumeButton.prototype.onBackgroundSoundMute = function (muted) {
            this._muted = muted;
            if (muted) {
                this._bitmap.image = VolumeButton._bitmapVolumeMute.image;
            }
            else {
                this._bitmap.image = VolumeButton._bitmapVolume.image;
            }
        };
        VolumeButton.prototype.onManifestLoadComplete = function (event, flags) {
            if (flags.loadedScripts && flags.loadedExternals) {
                Game.GameEngine.time.setAlarm({
                    targetTime: Game.GameEngine.time.milliseconds + 2000,
                    callingObject: this,
                    alarmFunction: this._initialize
                });
            }
        };
        VolumeButton.prototype.onManifestProgressChanged = function (event, flags) {
        };
        VolumeButton.prototype.onManifestStartLoad = function (flags) {
        };
        VolumeButton.prototype._click = function () {
            for (var _i = 0, _a = this.listeners; _i < _a.length; _i++) {
                var listener = _a[_i];
                if (listener.onVolumeButtonClick) {
                    listener.onVolumeButtonClick();
                }
            }
        };
        return VolumeButton;
    }(createjs.Container));
    Game.VolumeButton = VolumeButton;
})(Game || (Game = {}));
