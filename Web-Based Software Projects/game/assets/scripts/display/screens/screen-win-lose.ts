/**
 * Created by M on 10/28/2016.
 */

/// <reference path="../../setup.ts" />

namespace Game {

    export class ScreenWinLose extends Screen implements IButtonListener {

        private _backButton: Button = new Button(Config.GAME_WIDTH - 200, Config.GAME_HEIGHT - 100, null, null, "Back");

        public constructor() {
            super(PreloadMedia.SCREEN_WINLOSE);
            this._setup();
        }

        private _setup(): void {
            this.addChild(this._backButton);
            this._backButton.register(this);
        }

        public onButtonClick(flags: IButtonFlags): void {
            switch (flags.buttonInstance) {
                case this._backButton:
                    GameEngine.stage.renderScreenSpace.transitionWhite(1000, function(){
                        GameEngine.stage.renderVGUI.removeAllChildren();
                        GameEngine.stage.renderVGUI.addChild(Screen.screenTitle);
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