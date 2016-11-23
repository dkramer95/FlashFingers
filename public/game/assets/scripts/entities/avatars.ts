/**
 * Created by M on 11/16/2016.
 */
/// <reference path="../setup.ts" />


namespace Game {

    export class Avatar extends createjs.Container {

        private _avatarImage: createjs.Bitmap;
        private _avatarRaceLine: createjs.Shape;

        public constructor() {
            super();
        }

    }

}