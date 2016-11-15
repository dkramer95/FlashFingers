/**
 * Created by M on 10/29/2016.
 */
/// <reference path="../setup.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Game;
(function (Game) {
    var Sound = (function (_super) {
        __extends(Sound, _super);
        function Sound() {
            _super.call(this);
        }
        Object.defineProperty(Sound, "currentBackgroundMusic", {
            get: function () { return Sound._currentBackgroundMusic; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Sound, "currentBackgroundMusicID", {
            get: function () {
                for (var key in Sound._backgroundMusicList) {
                    if (Sound._currentBackgroundMusic === Sound._backgroundMusicList[key]) {
                        return key;
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Sound.initialize = function () {
            this.addBackgroundMusic(Game.PreloadMedia.MUSIC);
            Game.GameEngine.stage.volumeButton.register(this._volumeHelperObject);
        };
        Sound.addBackgroundMusic = function (preloadIdentifier) {
            this._backgroundMusicList[preloadIdentifier] = (this.createInstance(preloadIdentifier));
            Game.GameEngine.log("Background music \"" + preloadIdentifier + "\" initialized.");
        };
        Sound.playBackgroundMusic = function (preloadIdentifier, volume, loopNumber) {
            Sound.stopAllBackgroundMusic();
            if (volume) {
                this._backgroundMusicList[preloadIdentifier].volume = volume;
            }
            if (loopNumber) {
                this._backgroundMusicList[preloadIdentifier].setLoop(loopNumber);
            }
            this._currentBackgroundMusic = this._backgroundMusicList[preloadIdentifier];
            this._backgroundMusicList[preloadIdentifier].play();
            Game.GameEngine.log("Playing background music: " + preloadIdentifier);
        };
        Sound.stopAllBackgroundMusic = function () {
            for (var key in this._backgroundMusicList) {
                this._backgroundMusicList[key].stop();
            }
            Game.GameEngine.log("Stopped background music.");
        };
        Sound.muteBackgroundMusic = function (muted) {
            for (var key in this._backgroundMusicList) {
                this._backgroundMusicList[key].muted = muted;
            }
            for (var _i = 0, _a = this.listeners; _i < _a.length; _i++) {
                var listener = _a[_i];
                listener.onBackgroundSoundMute(muted);
            }
            if (Game.Config.DEBUG_ENABLED && muted) {
                Game.GameEngine.log("Background music muted.");
            }
            else {
                Game.GameEngine.log("Background music un-muted.");
            }
        };
        Sound.playSound = function (preloadIdentifier, volume) {
            var sound = this.createInstance(preloadIdentifier);
            if (volume) {
                sound.volume = volume;
            }
            sound.play();
            Game.GameEngine.log("Playing sound: " + preloadIdentifier);
        };
        Sound.register = function (listener) {
            var index = this.listeners.indexOf(listener);
            if (index === -1) {
                this.listeners.push(listener);
            }
        };
        Sound.unregister = function (listener) {
            var index = this.listeners.indexOf(listener);
            if (index !== -1) {
                this.listeners.splice(index, 1);
            }
        };
        Sound.listeners = [];
        Sound._backgroundMusicList = [];
        Sound._soundList = [];
        Sound._volumeHelperObject = {
            linkedObservers: [],
            onVolumeButtonClick: function (flags) {
                Sound.muteBackgroundMusic(!Game.GameEngine.stage.volumeButton.muted);
            }
        };
        return Sound;
    }(createjs.Sound));
    Game.Sound = Sound;
})(Game || (Game = {}));
