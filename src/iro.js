import { render, h } from "preact";

import ColorPicker from "modules/colorPicker";
import Color from "modules/color";
import Stylesheet from "modules/stylesheet";

import Component from "ui/component";
import Handle from "ui/handle";
import Slider from "ui/slider";
import Wheel from "ui/wheel";

export default {
  Color,
  ColorPicker: function(el, props) {
    var instance;
    render(<ColorPicker ref={ref => instance = ref} {...props}/>, document.querySelector(el));
    return instance;
  },
  Stylesheet,
  ui: {
    Component,
    Handle,
    Slider,
    Wheel
  },
  version: VERSION,
};
