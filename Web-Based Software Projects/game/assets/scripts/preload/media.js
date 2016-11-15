/**
 * Created by M on 10/26/2016.
 */
/// <reference path="../setup.ts" />
var Game;
(function (Game) {
    var PreloadMedia = (function () {
        function PreloadMedia() {
        }
        PreloadMedia.SCREEN_GAME = "screen-game";
        PreloadMedia.SCREEN_HELP = "screen-help";
        PreloadMedia.SCREEN_TITLE = "screen-title";
        PreloadMedia.SCREEN_WINLOSE = "screen-win-lose";
        PreloadMedia.UI_RADIO_OFF = "ui-radio-off";
        PreloadMedia.UI_RADIO_ON = "ui-radio-on";
        PreloadMedia.UI_VOLUME = "ui-volume";
        PreloadMedia.UI_VOLUME_MUTE = "ui-volume-mute";
        PreloadMedia.MUSIC = "audio-music";
        return PreloadMedia;
    }());
    Game.PreloadMedia = PreloadMedia;
})(Game || (Game = {}));
Game.GameEngine.manifest.addMedia(Game.PreloadMedia.SCREEN_GAME, "images/screens/screen-game.png");
Game.GameEngine.manifest.addMedia(Game.PreloadMedia.SCREEN_HELP, "images/screens/screen-help.png");
Game.GameEngine.manifest.addMedia(Game.PreloadMedia.SCREEN_TITLE, "images/screens/screen-title.png");
Game.GameEngine.manifest.addMedia(Game.PreloadMedia.SCREEN_WINLOSE, "images/screens/screen-win-lose.png");
Game.GameEngine.manifest.addMedia(Game.PreloadMedia.UI_RADIO_OFF, "images/ui/radio-off.png");
Game.GameEngine.manifest.addMedia(Game.PreloadMedia.UI_RADIO_ON, "images/ui/radio-on.png");
Game.GameEngine.manifest.addMedia(Game.PreloadMedia.UI_VOLUME, "images/ui/volume.png");
Game.GameEngine.manifest.addMedia(Game.PreloadMedia.UI_VOLUME_MUTE, "images/ui/volume-mute.png");
Game.GameEngine.manifest.addMedia(Game.PreloadMedia.MUSIC, "audio/music/music.mp3");
