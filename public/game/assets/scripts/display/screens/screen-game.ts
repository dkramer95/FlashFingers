/**
 * Created by M on 10/28/2016.
 */

/// <reference path="../../setup.ts" />

namespace Game {

    export class ScreenGame extends Screen {

        public constructor() {
            super(PreloadMedia.SCREEN_GAME);
            this._setup();
        }

        private _setup(): void {

        }

        public onTick(event: createjs.TickerEvent): void {

        }
    }

}