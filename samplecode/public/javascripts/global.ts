/**
 * Created by Maravis on 5/11/2016.
 */

var SUPER_ID = 1;

interface IDisplaySlideRelation {
    update():void;
}

interface IPowerLevelDisplay {
    element: HTMLElement;
    levels:[(string | number)]
    update():void;
    addSlider(slider_id:string):void;
}

class Global {

    public constructor() {

    }

    static CreatePage = class CreatePage {

        displaySlideRelations: IDisplaySlideRelation[];
        _init_interval: any;
        _update_interval: any;
        _powerlevel_display: IPowerLevelDisplay;

        public constructor() {
            let self = this;
            this.displaySlideRelations = [];
            this._init_interval = setInterval(function(){
                if (document.readyState == "complete") {
                    clearInterval(self._init_interval);
                    self.init();
                }
            }, 10);
        }

        init() {
            let self = this;

            this._powerlevel_display = new Global.PowerLevelDisplay('displaytitle', 'displaypower');

            this.createDisplaySlideRelation("fortiddisplay", "fortslider");
            this.createDisplaySlideRelation("reactiddisplay", "reactslider");
            this.createDisplaySlideRelation("williddisplay", "willslider");
            this.createDisplaySlideRelation("compiddisplay", "compslider");
            this.createDisplaySlideRelation("powerdisplay", "powerslider");
            this.createDisplaySlideRelation("aptitudedisplay", "aptitudeslider");
            this.createDisplaySlideRelation("advantagedisplay", "advantageslider");
            this.createDisplaySlideRelation("disadvantagedisplay", "disadvantageslider");

            new Global.BoundValueToValue("charname", "formname");
            new Global.BoundValueToValue("reactslider", "formreact");
            new Global.BoundValueToValue("willslider", "formwill");
            new Global.BoundValueToValue("compslider", "formcomp");
            new Global.BoundValueToValue("fortslider", "formfort");

            this._update_interval = setInterval(function(){
                self.update();
            }, 10);
            
        }

        update() {
            for (let relation of this.displaySlideRelations) {
                relation.update();
            }
        }

        createDisplaySlideRelation(display_id:string, slider_id:string) {
            this.displaySlideRelations.push(new Global.DisplaySlideRelation(display_id, slider_id));
            this._powerlevel_display.addSlider(slider_id);
        }
        
    };

    static LoadPage = class LoadPage {
        
        static _page: LoadPage;
        _character_table: any;
        _init_interval: any;
        _update_interval: any;
        _name:HTMLHeadingElement;
        _fortitude:HTMLHeadingElement;
        _reaction:HTMLHeadingElement;
        _willpower:HTMLHeadingElement;
        _composure:HTMLHeadingElement;
		_print:HTMLHeadingElement;

        public constructor(character_table:any, name:string, fortitude:string, reaction:string, willpower:string, composure:string) {
            let self = this;
            this._character_table = character_table;
            this._name = <HTMLHeadingElement>document.getElementById(name);
            this._reaction = <HTMLHeadingElement>document.getElementById(reaction);
            this._fortitude = <HTMLHeadingElement>document.getElementById(fortitude);
            this._willpower = <HTMLHeadingElement>document.getElementById(willpower);
            this._composure = <HTMLHeadingElement>document.getElementById(composure);

            this._init_interval = setInterval(function(){
                if (document.readyState == "complete") {
                    clearInterval(self._init_interval);
                    self.init();
                }
            }, 10);
            Global.LoadPage._page = this;
        }

        init() {
            let self = this;
            
            this._update_interval = setInterval(function(){
                self.update();
            }, 10);
            
        }
        
        update() {
            
        }
        
        static displaySuper(id:number) {
            var self = Global.LoadPage._page;
            self._name.textContent = self._character_table[id].Name;
            self._fortitude.textContent = self._character_table[id].Fortitude + "D";
            self._reaction.textContent = self._character_table[id].Reaction + "D";
            self._willpower.textContent = self._character_table[id].Will + "D";
            self._composure.textContent = self._character_table[id].Composure + "D";
            SUPER_ID = id;
        }
        
    };

    static DisplaySlideRelation = class DisplaySlideRelation implements IDisplaySlideRelation {

        display: HTMLHeadingElement;
        slider: HTMLInputElement;

        update():void {
            this.display.innerHTML = this.slider.value;
        }

        public constructor(display_id:string, slider_id:string) {
            this.display = <HTMLHeadingElement>document.getElementById(display_id);
            this.slider = <HTMLInputElement>document.getElementById(slider_id);
        }

    };

    static PowerLevelDisplay = class PowerLevelDisplay implements IPowerLevelDisplay {

        element:HTMLElement;
        elementPower:HTMLElement;
        levels:any;
        _totalD: number;
        _sliders: HTMLInputElement[];
        _updateInterval:any;

        public constructor(display_id, displaypower_id) {
            let self = this;
            this.levels = [["Pulp Hero", 15], ["Superhero", 25], ["Global Guardian", 35], ["Cosmic Legend", 45]];
            this._sliders = [];
            this.element = document.getElementById(display_id);
            this.elementPower = document.getElementById(displaypower_id);
            this._totalD = 0;
            this._updateInterval = setInterval(function(){self.update()}, 10)
        }

        update():void {
            let powerValue = 0;
            for (let slider of this._sliders) {
                powerValue += Number(slider.value);
            }
            this.elementPower.textContent = String(powerValue) + 'D';
            for (let arr of this.levels) {
                if (powerValue >= arr[1]) {
                    this.element.textContent = arr[0];
                    console.log(powerValue);
                } else {
                    break;
                }
            }
        }

        addSlider(slider_id:string):void {
            this._sliders.push(<HTMLInputElement>document.getElementById(slider_id));
        }

    };
    
    static BoundValueToValue = class BoundValueToValue {
        
        _input:HTMLInputElement;
        _output:HTMLInputElement;
        _updateInterval:number;
        
        public constructor(input_id:string, output_id:string) {
            let self = this;
            this._input = <HTMLInputElement>document.getElementById(input_id);
            this._output = <HTMLInputElement>document.getElementById(output_id);
            this._updateInterval = setInterval(function(){self.update()}, 10);
        }
        
        update() {
            this._output.value = this._input.value;
        }
        
    }

}

let g = new Global();