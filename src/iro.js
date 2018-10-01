import { render, h } from "preact";

import ColorPicker from "modules/colorPicker";
import Color from "modules/color";
import Stylesheet from "modules/stylesheet";

import Marker from "./ui/marker";
import Slider from "./ui/slider";
import Wheel from "./ui/wheel";

export default {
  Color,
  ColorPicker: function(el, props) {
    return render(<ColorPicker />, document.querySelector(el))._component;
  },
  Stylesheet,
  ui: {
    Marker,
    Slider,
    Wheel
  },
  version: process.env.VERSION,
};
