import colorPicker from "./modules/colorPicker.js";
import color from "./modules/color.js";
import stylesheet from "./modules/stylesheet.js";

module.exports = {
  color,
  colorPicker,
  stylesheet,
  // for backwards compat
  colorWheel: colorPicker,
};
