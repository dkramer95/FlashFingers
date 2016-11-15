/**
 * Created by M on 10/29/2016.
 */

/// <reference path="../setup.ts" />

interface IKeyListener extends IListener {
    onKeyPress(key: Game.Key);
    onKeyRelease(key: Game.Key);
}

interface IKeyList {
    LEFT: Game.Key;
    UP: Game.Key;
    RIGHT: Game.Key;
    DOWN: Game.Key;
    W: Game.Key;
    A: Game.Key;
    S: Game.Key;
    D: Game.Key;
    SPACE: Game.Key;
    CONTROL: Game.Key;
    SHIFT: Game.Key;
}

interface IKeyManagerListener extends IListener {
    onKeyManagerKeyPressed(keyCode: number);
    onKeyManagerKeyRelease(keyCode: number);
}

namespace Game {

    export class KeyManager {

        public static listeners: IKeyManagerListener[] = [];

        private static _KEY: IKeyList = <IKeyList>{};
        public static get KEY(): IKeyList {
            return this._KEY;
        }

        private constructor() {}

        public static initialize() {
            this._KEY = {
                LEFT: new Key(37, "Left Arrow"),
                UP: new Key(38, "Up Arrow"),
                RIGHT: new Key(39, "Right Arrow"),
                DOWN: new Key(40, "Down Arrow"),
                W: new Key(87, "W"),
                A: new Key(65, "A"),
                S: new Key(83, "S"),
                D: new Key(68, "D"),
                SPACE: new Key(32, "Space Bar"),
                CONTROL: new Key(17, "Control"),
                SHIFT: new Key(16, "Shift")
            };
        }

        public static onKeyDown(event: KeyboardEvent): void {
            if (!event) {
                event = <KeyboardEvent>window.event;
            }
            for (let listener of KeyManager.listeners) {
                listener.onKeyManagerKeyPressed(event.keyCode);
            }
        }

        public static onKeyUp(event: KeyboardEvent): void {
            if (!event) {
                event = <KeyboardEvent>window.event;
            }
            for (let listener of KeyManager.listeners) {
                listener.onKeyManagerKeyRelease(event.keyCode);
            }
        }

        public static register(listener: IKeyManagerListener): void {
            let index = KeyManager.listeners.indexOf(listener);
            if (index === -1) {
                KeyManager.listeners.push(listener);
            }
        }

        public static unregister(listener: IKeyManagerListener): void {
            let index = KeyManager.listeners.indexOf(listener);
            if (index !== -1) {
                KeyManager.listeners.splice(index, 1);
            }
        }

    }

    export class Key implements IObservable, IStageListener, IKeyManagerListener {

        public listeners: IKeyListener[] = [];
        public linkedObservers: IObservable[] = [];

        private _isPressed: boolean = false;
        get isPressed(): boolean {
            return this._isPressed;
        }

        private _caption: string;
        get caption(): string {
            return this._caption;
        }

        private _keyCode: number;
        get keyCode(): number {
            return this._keyCode;
        }

        public constructor(keyCode: number, caption: string) {
            this._keyCode = keyCode;
            this._caption = caption;
            GameEngine.stage.register(this);
            KeyManager.register(this);
        }

        public register(listener: IKeyListener): void {
            let index = this.listeners.indexOf(listener);
            if (index === -1) {
                this.listeners.push(listener);
            }
        }

        public unregister(listener: IKeyListener): void {
            let index = this.listeners.indexOf(listener);
            if (index !== -1) {
                this.listeners.splice(index, 1);
            }
        }

        public onTick(event: createjs.TickerEvent): void {
        }

        public onStageMouseMove(event: createjs.MouseEvent): void {
        }

        public onKeyManagerKeyPressed(keyCode: number) {
            if (keyCode === this._keyCode) {
                if (!this._isPressed) {
                    this._isPressed = true;
                    for (let listener of this.listeners) {
                        if (listener.onKeyPress) {
                            listener.onKeyPress(this);
                        }
                    }
                }
            }
        }

        public onKeyManagerKeyRelease(keyCode: number) {
            if (keyCode === this._keyCode) {
                if (this._isPressed) {
                    this._isPressed = false;
                    for (let listener of this.listeners) {
                        if (listener.onKeyRelease) {
                            listener.onKeyRelease(this);
                        }
                    }
                }
            }
        }

    }

}

document.addEventListener('keydown', Game.KeyManager.onKeyDown);
document.addEventListener('keyup', Game.KeyManager.onKeyUp);