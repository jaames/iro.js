import rgb from "./rgb.js";

module.exports = {
  name: "hexString",

  fromHsv: function (hsv) {
    var color = rgb.fromHsv(hsv),
        r = color.r,
        g = color.g,
        b = color.b;
    // If each RGB channel's value is a multiple of 17, we can use HEX shorthand notation
    var useShorthand = (r % 17 == 0) && (g % 17 == 0) && (b % 17 == 0),
        // If we're using shorthand notation, divide each channel by 17
        divider      = useShorthand ? 17 : 1,
        // bitLength of each channel (for example, F is 4 bits long while FF is 8 bits long)
        bitLength    = useShorthand ? 4 : 8,
        // Target length of the string (ie "#FFF" or "#FFFFFF")
        strLength    = useShorthand ? 4 : 7,
        // Combine the channels together into a single integer
        int          = (r / divider) << (bitLength * 2) | (g / divider) << bitLength | (b / divider),
        // Convert that integer to a hex string
        str          = int.toString(16);
    // Add right amount of left-padding
    return "#" + (new Array(strLength - str.length).join("0")) + str;
  },

  toHsv: function (hex) {
    // Strip any "#" characters
    hex = hex.replace(/#/g, '');
    // Prefix the hex string with "0x" which indicates a number in hex notation, then convert to an integer
    var int         = parseInt("0x" + hex),
        // If the length of the input is only 3, then it is a shorthand hex color
        isShorthand = hex.length == 3,
        // bitMask for isolating each channel
        bitMask     = isShorthand ? 0xF : 0xFF,
        // bitLength of each channel (for example, F is 4 bits long while FF is 8 bits long)
        bitLength   = isShorthand ? 4 : 8,
        // If we're using shorthand notation, multiply each channel by 17
        multiplier  = isShorthand ? 17 : 1;

    return rgb.toHsv({
      r: ((int >> (bitLength * 2)) & bitMask) * multiplier,
      g: ((int >> bitLength) & bitMask) * multiplier,
      b: (int & bitMask) * multiplier,
    });
  }
};
