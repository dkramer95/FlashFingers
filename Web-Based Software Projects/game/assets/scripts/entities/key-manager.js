/**
 * Created by M on 10/29/2016.
 */
/// <reference path="../setup.ts" />
var Game;
(function (Game) {
    var KeyManager = (function () {
        function KeyManager() {
        }
        Object.defineProperty(KeyManager, "KEY", {
            get: function () {
                return this._KEY;
            },
            enumerable: true,
            configurable: true
        });
        KeyManager.initialize = function () {
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
        };
        KeyManager.onKeyDown = function (event) {
            if (!event) {
                event = window.event;
            }
            for (var _i = 0, _a = KeyManager.listeners; _i < _a.length; _i++) {
                var listener = _a[_i];
                listener.onKeyManagerKeyPressed(event.keyCode);
            }
        };
        KeyManager.onKeyUp = function (event) {
            if (!event) {
                event = window.event;
            }
            for (var _i = 0, _a = KeyManager.listeners; _i < _a.length; _i++) {
                var listener = _a[_i];
                listener.onKeyManagerKeyRelease(event.keyCode);
            }
        };
        KeyManager.register = function (listener) {
            var index = KeyManager.listeners.indexOf(listener);
            if (index === -1) {
                KeyManager.listeners.push(listener);
            }
        };
        KeyManager.unregister = function (listener) {
            var index = KeyManager.listeners.indexOf(listener);
            if (index !== -1) {
                KeyManager.listeners.splice(index, 1);
            }
        };
        KeyManager.listeners = [];
        KeyManager._KEY = {};
        return KeyManager;
    }());
    Game.KeyManager = KeyManager;
    var Key = (function () {
        function Key(keyCode, caption) {
            this.listeners = [];
            this.linkedObservers = [];
            this._isPressed = false;
            this._keyCode = keyCode;
            this._caption = caption;
            Game.GameEngine.stage.register(this);
            KeyManager.register(this);
        }
        Object.defineProperty(Key.prototype, "isPressed", {
            get: function () {
                return this._isPressed;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Key.prototype, "caption", {
            get: function () {
                return this._caption;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Key.prototype, "keyCode", {
            get: function () {
                return this._keyCode;
            },
            enumerable: true,
            configurable: true
        });
        Key.prototype.register = function (listener) {
            var index = this.listeners.indexOf(listener);
            if (index === -1) {
                this.listeners.push(listener);
            }
        };
        Key.prototype.unregister = function (listener) {
            var index = this.listeners.indexOf(listener);
            if (index !== -1) {
                this.listeners.splice(index, 1);
            }
        };
        Key.prototype.onTick = function (event) {
        };
        Key.prototype.onStageMouseMove = function (event) {
        };
        Key.prototype.onKeyManagerKeyPressed = function (keyCode) {
            if (keyCode === this._keyCode) {
                if (!this._isPressed) {
                    this._isPressed = true;
                    for (var _i = 0, _a = this.listeners; _i < _a.length; _i++) {
                        var listener = _a[_i];
                        if (listener.onKeyPress) {
                            listener.onKeyPress(this);
                        }
                    }
                }
            }
        };
        Key.prototype.onKeyManagerKeyRelease = function (keyCode) {
            if (keyCode === this._keyCode) {
                if (this._isPressed) {
                    this._isPressed = false;
                    for (var _i = 0, _a = this.listeners; _i < _a.length; _i++) {
                        var listener = _a[_i];
                        if (listener.onKeyRelease) {
                            listener.onKeyRelease(this);
                        }
                    }
                }
            }
        };
        return Key;
    }());
    Game.Key = Key;
})(Game || (Game = {}));
document.addEventListener('keydown', Game.KeyManager.onKeyDown);
document.addEventListener('keyup', Game.KeyManager.onKeyUp);
