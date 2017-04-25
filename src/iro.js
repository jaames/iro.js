import colorPicker from "./modules/colorPicker.js";
import color from "./modules/color.js";
import stylesheet from "./modules/stylesheet.js";

module.exports = {
  Color: color,
  ColorPicker: colorPicker,
  Stylesheet: stylesheet,
  // for backwards compat
  ColorWheel: colorPicker,
};
