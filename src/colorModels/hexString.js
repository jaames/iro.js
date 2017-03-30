import rgb from "./rgb.js";

module.exports = {
  from: function (hsv) {
    var color = rgb.from(hsv),
        r = color.r,
        g = color.g,
        b = color.b;

    var useShorthand = (r % 17 == 0) && (g % 17 == 0) && (b % 17 == 0),
        divider      = useShorthand ? 17 : 1,
        bitLength    = useShorthand ? 4 : 8,
        strLength    = useShorthand ? 4 : 7,
        int          = (r / divider) << (bitLength * 2) | (g / divider) << bitLength | (b / divider),
        str          = int.toString(16);
    // add right amount of left-padding
    return "#" + (new Array(strLength - str.length).join("0")) + str;
  },
  to: function (hex) {
    // strip "#"
    hex = hex.replace(/#/g, '');
    // convert to an integer
    var int         = ~~("0x" + hex),
        isShorthand = hex.length == 3,
        bitMask     = isShorthand ? 0xF : 0xFF,
        bitLength   = isShorthand ? 4 : 8,
        multiplier  = isShorthand ? 17 : 1;

    return rgb.to({
      r: ((int >> (bitLength * 2)) & bitMask) * multiplier,
      g: ((int >> bitLength) & bitMask) * multiplier,
      b: (int & bitMask) * multiplier,
    });
  }
};
