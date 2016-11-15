/**
 * Created by M on 10/28/2016.
 */

/// <reference path="../../setup.ts" />

namespace Game {

    export class ScreenTitle extends Screen implements IButtonListener {

        private _playButton: Button = new Button(Config.GAME_WIDTH - 325, Config.GAME_HEIGHT - 100, null, null, "Play");
        private _helpButton: Button = new Button(Config.GAME_WIDTH - 200, Config.GAME_HEIGHT - 100, null, null, "Help");

        public constructor() {
            super(PreloadMedia.SCREEN_TITLE);
            this._setup();
        }

        private _setup(): void {
            this.addChild(this._playButton);
            this.addChild(this._helpButton);
            this._playButton.register(this);
            this._helpButton.register(this);
            GameEngine.time.setAlarm({
                targetTime: GameEngine.time.milliseconds + 2000,
                alarmFunction: function(){Sound.playBackgroundMusic(PreloadMedia.MUSIC, 0.005, 9999)}
            });
        }

        public onButtonClick(flags: IButtonFlags): void {
            switch (flags.buttonInstance) {
                case this._playButton:
                    GameEngine.stage.renderScreenSpace.transitionWhite(2000, function(){
                        GameEngine.stage.renderVGUI.removeAllChildren();
                        GameEngine.stage.renderVGUI.addChild(Screen.screenGame);
                    });
                    break;
                case this._helpButton:
                    GameEngine.stage.renderScreenSpace.transitionWhite(1000, function(){
                        GameEngine.stage.renderVGUI.removeAllChildren();
                        GameEngine.stage.renderVGUI.addChild(Screen.screenHelp);
                    });
                    break;
            }
        }

        public onButtonMouseOver(flags: IButtonFlags): void {
        }

        public onButtonMouseOut(flags: IButtonFlags): void {
        }

        public onButtonMouseDown(flags: IButtonFlags): void {
        }

    }

}