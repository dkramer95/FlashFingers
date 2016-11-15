/**
 * Created by M on 10/28/2016.
 */
/// <reference path="../setup.ts" />

namespace Game {

    export class Screen extends createjs.Container implements IStageListener {

        private static _screenTitle: ScreenTitle;
        public static get screenTitle(): ScreenTitle { return Screen._screenTitle; }

        private static _screenHelp: ScreenHelp;
        public static get screenHelp(): ScreenHelp { return Screen._screenHelp; }

        private static _screenGame: ScreenGame;
        public static get screenGame(): ScreenGame { return Screen._screenGame; }

        private static _screenEnd: ScreenWinLose;
        public static get screenEnd(): ScreenWinLose { return Screen._screenEnd; }

        public linkedObservers: IObservable[] = [];
        private _bitmapBackground;
        public get bitmapBackground(): createjs.Bitmap { return this._bitmapBackground; }
        public set bitmapBackground(bitmap: createjs.Bitmap) {
            if (bitmap) {
                let index = this.getChildIndex(this._bitmapBackground);
                this.removeChild(this._bitmapBackground);
                this._bitmapBackground = new createjs.Bitmap(bitmap);
                if (index !== -1) {
                    this.addChildAt(this._bitmapBackground, index);
                } else {
                    this.addChild(this._bitmapBackground);
                }
            }
        }

        public constructor(backgroundBitmap?: string | createjs.Bitmap | HTMLImageElement, customSetup?: Function) {
            super();
            if (backgroundBitmap) {
                this._bitmapBackground = new createjs.Bitmap(GameEngine.manifest.getResult(backgroundBitmap));
                this.addChild(this._bitmapBackground);
                GameEngine.log("Screen \"" + backgroundBitmap + "\" added.");
            }
            GameEngine.stage.register(this);
            if (customSetup) {
                customSetup.call(this);
            }
        }

        public onTick(event: createjs.TickerEvent): void {
        }

        public onStageMouseMove(event: createjs.MouseEvent): void {
        }

        public static initialize(): void {
            Screen._screenTitle = new ScreenTitle();
            Screen._screenHelp = new ScreenHelp();
            Screen._screenGame = new ScreenGame();
            Screen._screenEnd = new ScreenWinLose();
        }

    }

}