/**
 * Created by Maravis on 5/11/2016.
 */
var SUPER_ID = 1;
var Global = (function () {
    function Global() {
    }
    Global.CreatePage = (function () {
        function CreatePage() {
            var self = this;
            this.displaySlideRelations = [];
            this._init_interval = setInterval(function () {
                if (document.readyState == "complete") {
                    clearInterval(self._init_interval);
                    self.init();
                }
            }, 10);
        }
        CreatePage.prototype.init = function () {
            var self = this;
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
            this._update_interval = setInterval(function () {
                self.update();
            }, 10);
        };
        CreatePage.prototype.update = function () {
            for (var _i = 0, _a = this.displaySlideRelations; _i < _a.length; _i++) {
                var relation = _a[_i];
                relation.update();
            }
        };
        CreatePage.prototype.createDisplaySlideRelation = function (display_id, slider_id) {
            this.displaySlideRelations.push(new Global.DisplaySlideRelation(display_id, slider_id));
            this._powerlevel_display.addSlider(slider_id);
        };
        return CreatePage;
    }());
    Global.LoadPage = (function () {
        function LoadPage(character_table, name, fortitude, reaction, willpower, composure) {
            var self = this;
            this._character_table = character_table;
            this._name = document.getElementById(name);
            this._reaction = document.getElementById(reaction);
            this._fortitude = document.getElementById(fortitude);
            this._willpower = document.getElementById(willpower);
            this._composure = document.getElementById(composure);
            this._init_interval = setInterval(function () {
                if (document.readyState == "complete") {
                    clearInterval(self._init_interval);
                    self.init();
                }
            }, 10);
            Global.LoadPage._page = this;
        }
        LoadPage.prototype.init = function () {
            var self = this;
            this._update_interval = setInterval(function () {
                self.update();
            }, 10);
        };
        LoadPage.prototype.update = function () {
        };
        LoadPage.displaySuper = function (id) {
            var self = Global.LoadPage._page;
            self._name.textContent = self._character_table[id].Name;
            self._fortitude.textContent = self._character_table[id].Fortitude + "D";
            self._reaction.textContent = self._character_table[id].Reaction + "D";
            self._willpower.textContent = self._character_table[id].Will + "D";
            self._composure.textContent = self._character_table[id].Composure + "D";
            SUPER_ID = id;
        };
        return LoadPage;
    }());
    Global.DisplaySlideRelation = (function () {
        function DisplaySlideRelation(display_id, slider_id) {
            this.display = document.getElementById(display_id);
            this.slider = document.getElementById(slider_id);
        }
        DisplaySlideRelation.prototype.update = function () {
            this.display.innerHTML = this.slider.value;
        };
        return DisplaySlideRelation;
    }());
    Global.PowerLevelDisplay = (function () {
        function PowerLevelDisplay(display_id, displaypower_id) {
            var self = this;
            this.levels = [["Pulp Hero", 15], ["Superhero", 25], ["Global Guardian", 35], ["Cosmic Legend", 45]];
            this._sliders = [];
            this.element = document.getElementById(display_id);
            this.elementPower = document.getElementById(displaypower_id);
            this._totalD = 0;
            this._updateInterval = setInterval(function () { self.update(); }, 10);
        }
        PowerLevelDisplay.prototype.update = function () {
            var powerValue = 0;
            for (var _i = 0, _a = this._sliders; _i < _a.length; _i++) {
                var slider = _a[_i];
                powerValue += Number(slider.value);
            }
            this.elementPower.textContent = String(powerValue) + 'D';
            for (var _b = 0, _c = this.levels; _b < _c.length; _b++) {
                var arr = _c[_b];
                if (powerValue >= arr[1]) {
                    this.element.textContent = arr[0];
                    console.log(powerValue);
                }
                else {
                    break;
                }
            }
        };
        PowerLevelDisplay.prototype.addSlider = function (slider_id) {
            this._sliders.push(document.getElementById(slider_id));
        };
        return PowerLevelDisplay;
    }());
    Global.BoundValueToValue = (function () {
        function BoundValueToValue(input_id, output_id) {
            var self = this;
            this._input = document.getElementById(input_id);
            this._output = document.getElementById(output_id);
            this._updateInterval = setInterval(function () { self.update(); }, 10);
        }
        BoundValueToValue.prototype.update = function () {
            this._output.value = this._input.value;
        };
        return BoundValueToValue;
    }());
    return Global;
}());
var g = new Global();
//# sourceMappingURL=global.js.map