import rgb from "./rgb.js";

module.exports = {
  from: function (hsv) {
    var color = rgb.from(hsv);
    var int, len;
    // check if value can be compressed to shorthand format
    // in shorthand, all channels should be able to be divided by 17 cleanly
    if ((color.r % 17 === 0) && (color.g % 17 === 0) && (color.b % 17 === 0)) {
      int = (color.r / 17) << 8 | (color.g / 17) << 4 | (color.b / 17);
      len = 4;
    } else {
      int = color.r << 16 | color.g << 8 | color.b;
      len = 7;
    }
    return "#" + (function(h){
      // add right amount of left-padding
      return new Array(len-h.length).join("0")+h
    })(int.toString(16));
  },
  to: function (hex) {
    // strip "#"
    hex = hex.replace(/#/g, '');
    // convert to an integer
    var int = ~~("0x" + hex);
    // if hex is in shorthand format, we need to multiply each channel value by 17
    var parsed = hex.length === 3 ? {
      r: (int >> 8) * 17,
      g: (int >> 4 & 0xF) * 17,
      b: (int & 0xF) * 17
    } : {
      r: int >> 16,
      g: int >> 8 & 0xFF,
      b: int & 0xFF
    };
    return rgb.to(parsed);
  }
};
