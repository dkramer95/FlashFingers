/**
 * Created by M on 10/26/2016.
 */
/// <reference path="../../setup.ts" />

namespace Game {

    export class LayerRenderScreenSpace extends createjs.Container implements IStageListener, IManifestListener {

        public linkedObservers: IObservable[] = [];
        private _shapeBackgroundTransition: createjs.Shape = new createjs.Shape(new createjs.Graphics().beginFill("#ffffff").drawRect(0, 0, Config.GAME_WIDTH, Config.GAME_HEIGHT));
        private _targetMilliseconds: number = 0;
        private _startMilliseconds: number = 0;
        public get elapsedMilliseconds(): number { return (GameEngine.time.milliseconds - this._startMilliseconds); }
        private _transitioning: boolean = false;

        public constructor() {
            super();
            this.addChild(this._shapeBackgroundTransition);
            this._shapeBackgroundTransition.alpha = 0;
            GameEngine.manifest.register(this);
        }

        public transition(color: string, milliseconds: number, alarmFunction: Function, callingObject?: Object): void {
            if (!this._transitioning) {
                this._shapeBackgroundTransition.graphics.clear().beginFill(color).drawRect(0, 0, Config.GAME_WIDTH, Config.GAME_HEIGHT);
                this._targetMilliseconds = milliseconds;
                this._startMilliseconds = GameEngine.time.milliseconds;
                callingObject = (callingObject) ? callingObject : null;
                GameEngine.time.setAlarm({
                    ID: "ScreenSpaceTransition",
                    callingObject: callingObject,
                    targetTime: GameEngine.time.milliseconds + milliseconds / 2,
                    alarmFunction: alarmFunction
                });
                GameEngine.time.setAlarm({
                    ID: "efesf",
                    targetTime: GameEngine.time.milliseconds + milliseconds / 2,
                    alarmFunction: function () {
                    }
                });
                let self = this;
                GameEngine.time.setAlarm({
                    ID: "ScreenSpaceTransitionStopper",
                    callingObject: self,
                    targetTime: GameEngine.time.milliseconds + milliseconds,
                    alarmFunction: self._stopTransitioning
                });
                this._transitioning = true;
            }
        }

        public transitionBlack(milliseconds: number, alarmFunction: Function, callingObject?: Object): void {
            this.transition("#000000", milliseconds, alarmFunction, callingObject);
        }

        public transitionWhite(milliseconds: number, alarmFunction: Function, callingObject?: Object): void {
            this.transition("#ffffff", milliseconds, alarmFunction, callingObject);
        }

        private _stopTransitioning(): void {
            this._transitioning = false;
            this._shapeBackgroundTransition.alpha = 0;
        }

        public onTick(event: createjs.TickerEvent): void {
            if (this._transitioning) {
                if (this._targetMilliseconds/2 >= this.elapsedMilliseconds) {
                    this._shapeBackgroundTransition.alpha = ((this.elapsedMilliseconds)/(this._targetMilliseconds/2));
                } else {
                    this._shapeBackgroundTransition.alpha = ( 1 - (this.elapsedMilliseconds/(this._targetMilliseconds)));
                }
            }
        }

        public onStageMouseMove(event: createjs.MouseEvent): void {
        }

        public onManifestLoadComplete(event: createjs.Event, flags: IManifestFlags): void {
            if (flags.loadedScripts && flags.loadedExternals) {
                GameEngine.stage.register(this);
            }
        }

        public onManifestProgressChanged(event: createjs.ProgressEvent, flags: IManifestFlags): void {
        }

        public onManifestStartLoad(flags: IManifestFlags): void {
        }

    }

}