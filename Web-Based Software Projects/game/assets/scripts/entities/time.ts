/**
 * Created by M on 10/28/2016.
 */
/// <reference path="../setup.ts" />

interface ITimeAlarm {
    ID?: string;
    targetTime: number;
    alarmFunction: Function;
    callingObject?: Object;
}

namespace Game {

    export class Time implements IStageListener {

        public linkedObservers: IObservable[] = [];
        private _milliseconds: number = 0;
        public get milliseconds(): number { return this._milliseconds; }
        public get seconds(): number { return Number((this._milliseconds/1000).toFixed(1)); }
        private _alarms: ITimeAlarm[] = [];

        public constructor() {
            GameEngine.stage.register(this);
        }

        public setAlarm(alarm: ITimeAlarm): void {
            let index = this._alarms.indexOf(alarm);
            if (index === -1) {
                let isUnique = true;
                for (let alarm2 of this._alarms) {
                    if (alarm.ID && alarm2.ID && alarm.ID === alarm2.ID) {
                        isUnique = false;
                        break;
                    }
                }
                if (isUnique) {
                    this._alarms.push(alarm);
                } else {
                    this.removeAlarm(alarm);
                    this.setAlarm(alarm);
                }
            } else {
                this.removeAlarm(alarm);
                this.setAlarm(alarm);
            }
        }

        public removeAlarm(alarm: ITimeAlarm | string): void {
            if (alarm) {
                if (typeof alarm === "string") {
                    for (let index in this._alarms) {
                        if (alarm === this._alarms[index].ID) {
                            this._alarms.splice(this._alarms.indexOf(this._alarms[index]), 1);
                            break;
                        }
                    }
                } else {
                    for (let alarm2 of this._alarms) {
                        if (alarm === alarm2) {
                            this._alarms.splice(this._alarms.indexOf(alarm2), 1);
                        }
                    }
                }
            }
        }

        public onTick(event: createjs.TickerEvent): void {
            this._milliseconds = event.time;
            for (let alarm of this._alarms) {
                if (this._milliseconds >= alarm.targetTime) {
                    if (alarm.callingObject) {
                        alarm.alarmFunction.call(alarm.callingObject);
                    } else {
                        alarm.alarmFunction();
                    }
                    this._alarms.splice(this._alarms.indexOf(alarm), 1);
                    break;
                }
            }
        }

        public onStageMouseMove(event: createjs.MouseEvent): void {
        }


    }

}