/**
 * Created by M on 10/29/2016.
 */
/// <reference path="../../setup.ts" />

interface IVolumeButtonListener extends IListener {
    onVolumeButtonClick(): void;
}

namespace Game {

    export class VolumeButton extends createjs.Container implements IObservable, ISoundListener, IManifestListener {

        public listeners: IVolumeButtonListener[] = [];
        public linkedObservers: IObservable[] = [];

        private _bitmap;
        private static _bitmapVolume;
        private static _bitmapVolumeMute;

        private _muted: boolean = false;
        public get muted(): boolean {
            return this._muted;
        }

        private _initialize(): void {
            this._bitmap = new createjs.Bitmap(GameEngine.manifest.getResult(PreloadMedia.UI_VOLUME));
            if (!VolumeButton._bitmapVolume || !VolumeButton._bitmapVolumeMute) {
                VolumeButton._bitmapVolume = new createjs.Bitmap(GameEngine.manifest.getResult(PreloadMedia.UI_VOLUME));
                VolumeButton._bitmapVolumeMute = new createjs.Bitmap(GameEngine.manifest.getResult(PreloadMedia.UI_VOLUME_MUTE));
            }
            this.addChild(this._bitmap);
            this.x = Config.GAME_WIDTH - 55;
            this.y = 5;
            Sound.register(this);
            GameEngine.stage.renderUIOverlay.addChild(this);
        }

        public constructor() {
            super();
            this.cursor = "pointer";
            this.on("click", this._click, this);
            GameEngine.manifest.register(this);
        }

        public register(listener: IVolumeButtonListener): void {
            let index = this.listeners.indexOf(listener);
            if (index === -1) {
                this.listeners.push(listener);
            }
        }

        public unregister(listener: IVolumeButtonListener): void {
            let index = this.listeners.indexOf(listener);
            if (index !== -1) {
                this.listeners.splice(index, 1);
            }
        }

        public onBackgroundSoundMute(muted: boolean): void {
            this._muted = muted;
            if (muted) {
                this._bitmap.image = VolumeButton._bitmapVolumeMute.image;
            } else {
                this._bitmap.image = VolumeButton._bitmapVolume.image;
            }
        }

        public onManifestLoadComplete(event: createjs.Event, flags: IManifestFlags): void {
            if (flags.loadedScripts && flags.loadedExternals) {
                GameEngine.time.setAlarm({
                    targetTime: GameEngine.time.milliseconds + 2000,
                    callingObject: this,
                    alarmFunction: this._initialize
                });
            }
        }

        public onManifestProgressChanged(event: createjs.ProgressEvent, flags: IManifestFlags): void {
        }

        public onManifestStartLoad(flags: IManifestFlags): void {
        }

        private _click(): void {
            for (let listener of this.listeners) {
                if (listener.onVolumeButtonClick) {
                    listener.onVolumeButtonClick();
                }
            }
        }

    }

}