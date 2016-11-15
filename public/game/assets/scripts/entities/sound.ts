/**
 * Created by M on 10/29/2016.
 */
/// <reference path="../setup.ts" />

interface ISoundListener extends IListener {
    onBackgroundSoundMute(muted: boolean): void
}

namespace Game {

    export class Sound extends createjs.Sound {

        public static listeners: ISoundListener[] = [];

        private static _currentBackgroundMusic: createjs.AbstractSoundInstance;
        public static get currentBackgroundMusic(): createjs.AbstractSoundInstance { return Sound._currentBackgroundMusic; }
        public static get currentBackgroundMusicID(): string {
            for (let key in Sound._backgroundMusicList) {
                if (Sound._currentBackgroundMusic === Sound._backgroundMusicList[key]) {
                    return key;
                }
            }
        }
        private static _backgroundMusicList: createjs.AbstractSoundInstance[] = [];
        private static _soundList: createjs.AbstractSoundInstance[] = [];
        private static _volumeHelperObject: IVolumeButtonListener = <IVolumeButtonListener>{
            linkedObservers: [],
            onVolumeButtonClick: function(flags){
                Sound.muteBackgroundMusic(!GameEngine.stage.volumeButton.muted);
            }
        };

        public static initialize(): void {
            this.addBackgroundMusic(PreloadMedia.MUSIC);
            GameEngine.stage.volumeButton.register(this._volumeHelperObject);
        }

        private constructor() {
            super();
        }

        public static addBackgroundMusic(preloadIdentifier: string): void {
            this._backgroundMusicList[preloadIdentifier] = (this.createInstance(preloadIdentifier));
            GameEngine.log("Background music \"" + preloadIdentifier + "\" initialized.")
        }

        public static playBackgroundMusic(preloadIdentifier: string, volume?: number, loopNumber?: number): void {
            Sound.stopAllBackgroundMusic();
            if (volume) {
                this._backgroundMusicList[preloadIdentifier].volume = volume;
            }
            if (loopNumber) {
                this._backgroundMusicList[preloadIdentifier].setLoop(loopNumber);
            }
            this._currentBackgroundMusic = this._backgroundMusicList[preloadIdentifier];
            this._backgroundMusicList[preloadIdentifier].play();
            GameEngine.log("Playing background music: " + preloadIdentifier)
        }

        public static stopAllBackgroundMusic(): void {
            for (let key in this._backgroundMusicList) {
                this._backgroundMusicList[key].stop();
            }
            GameEngine.log("Stopped background music.");
        }

        public static muteBackgroundMusic(muted: boolean) {
            for (let key in this._backgroundMusicList) {
                this._backgroundMusicList[key].muted = muted;
            }
            for (let listener of this.listeners) {
                listener.onBackgroundSoundMute(muted);
            }
            if (Config.DEBUG_ENABLED && muted) {
                GameEngine.log("Background music muted.");
            } else {
                GameEngine.log("Background music un-muted.");
            }
        }

        public static playSound(preloadIdentifier: string, volume?: number) {
            let sound = this.createInstance(preloadIdentifier);
            if (volume) {
                sound.volume = volume;
            }
            sound.play();
            GameEngine.log("Playing sound: " + preloadIdentifier);
        }

        public static register(listener: ISoundListener): void {
            let index = this.listeners.indexOf(listener);
            if (index === -1) {
                this.listeners.push(listener);
            }
        }

        public static unregister(listener: ISoundListener): void {
            let index = this.listeners.indexOf(listener);
            if (index !== -1) {
                this.listeners.splice(index, 1);
            }
        }

    }

}