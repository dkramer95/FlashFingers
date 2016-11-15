/**
 * Created by M on 10/28/2016.
 */
/// <reference path="../setup.ts" />
var Game;
(function (Game) {
    var Time = (function () {
        function Time() {
            this.linkedObservers = [];
            this._milliseconds = 0;
            this._alarms = [];
            Game.GameEngine.stage.register(this);
        }
        Object.defineProperty(Time.prototype, "milliseconds", {
            get: function () { return this._milliseconds; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Time.prototype, "seconds", {
            get: function () { return Number((this._milliseconds / 1000).toFixed(1)); },
            enumerable: true,
            configurable: true
        });
        Time.prototype.setAlarm = function (alarm) {
            var index = this._alarms.indexOf(alarm);
            if (index === -1) {
                var isUnique = true;
                for (var _i = 0, _a = this._alarms; _i < _a.length; _i++) {
                    var alarm2 = _a[_i];
                    if (alarm.ID && alarm2.ID && alarm.ID === alarm2.ID) {
                        isUnique = false;
                        break;
                    }
                }
                if (isUnique) {
                    this._alarms.push(alarm);
                }
                else {
                    this.removeAlarm(alarm);
                    this.setAlarm(alarm);
                }
            }
            else {
                this.removeAlarm(alarm);
                this.setAlarm(alarm);
            }
        };
        Time.prototype.removeAlarm = function (alarm) {
            if (alarm) {
                if (typeof alarm === "string") {
                    for (var index in this._alarms) {
                        if (alarm === this._alarms[index].ID) {
                            this._alarms.splice(this._alarms.indexOf(this._alarms[index]), 1);
                            break;
                        }
                    }
                }
                else {
                    for (var _i = 0, _a = this._alarms; _i < _a.length; _i++) {
                        var alarm2 = _a[_i];
                        if (alarm === alarm2) {
                            this._alarms.splice(this._alarms.indexOf(alarm2), 1);
                        }
                    }
                }
            }
        };
        Time.prototype.onTick = function (event) {
            this._milliseconds = event.time;
            for (var _i = 0, _a = this._alarms; _i < _a.length; _i++) {
                var alarm = _a[_i];
                if (this._milliseconds >= alarm.targetTime) {
                    if (alarm.callingObject) {
                        alarm.alarmFunction.call(alarm.callingObject);
                    }
                    else {
                        alarm.alarmFunction();
                    }
                    this._alarms.splice(this._alarms.indexOf(alarm), 1);
                    break;
                }
            }
        };
        Time.prototype.onStageMouseMove = function (event) {
        };
        return Time;
    }());
    Game.Time = Time;
})(Game || (Game = {}));
