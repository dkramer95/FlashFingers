/**
 * Created by M on 10/26/2016.
 */
/// <reference path="../setup.ts" />

namespace Game {
    export class PreloadMedia {
        public static SCREEN_GAME: string = "screen-game";
        public static SCREEN_HELP: string = "screen-help";
        public static SCREEN_TITLE: string = "screen-title";
        public static SCREEN_WINLOSE: string = "screen-win-lose";
        public static UI_RADIO_OFF: string = "ui-radio-off";
        public static UI_RADIO_ON: string = "ui-radio-on";
        public static UI_VOLUME: string = "ui-volume";
        public static UI_VOLUME_MUTE: string = "ui-volume-mute";
        public static MUSIC: string = "audio-music";
    }
}

Game.GameEngine.manifest.addMedia(Game.PreloadMedia.SCREEN_GAME, "images/screens/screen-game.png");
Game.GameEngine.manifest.addMedia(Game.PreloadMedia.SCREEN_HELP, "images/screens/screen-help.png");
Game.GameEngine.manifest.addMedia(Game.PreloadMedia.SCREEN_TITLE, "images/screens/screen-title.png");
Game.GameEngine.manifest.addMedia(Game.PreloadMedia.SCREEN_WINLOSE, "images/screens/screen-win-lose.png");
Game.GameEngine.manifest.addMedia(Game.PreloadMedia.UI_RADIO_OFF, "images/ui/radio-off.png");
Game.GameEngine.manifest.addMedia(Game.PreloadMedia.UI_RADIO_ON, "images/ui/radio-on.png");
Game.GameEngine.manifest.addMedia(Game.PreloadMedia.UI_VOLUME, "images/ui/volume.png");
Game.GameEngine.manifest.addMedia(Game.PreloadMedia.UI_VOLUME_MUTE, "images/ui/volume-mute.png");
Game.GameEngine.manifest.addMedia(Game.PreloadMedia.MUSIC, "audio/music/music.mp3");