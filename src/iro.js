import { render, h } from "preact";

import ColorPicker from "./colorPicker";
import Color from "./color";
import Stylesheet from "./stylesheet";

import Component from "ui/component";
import Handle from "ui/handle";
import Slider from "ui/slider";
import Wheel from "ui/wheel";

export default {
  Color,
  ColorPicker,
  Stylesheet,
  ui: {
    Component,
    Handle,
    Slider,
    Wheel
  },
  version: VERSION,
};
