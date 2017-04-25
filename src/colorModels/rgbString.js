import rgb from "./rgb.js";

module.exports = {
  name: "rgbString",

  fromHsv: function (hsv) {
    var color = rgb.fromHsv(hsv);
    return "rgb" + (color.a ? "a" : "") + "(" + color.r + ", " + color.g + ", " + color.b + (color.a ? ", " + color.a : "") + ")";
  },
  
  toHsv: function (rgbString) {
    var parsed = rgbString.match(/(rgba?)\((\d+)(?:\D+?)(\d+)(?:\D+?)(\d+)(?:\D+?)?([0-9\.]+?)?\)/i);
    return rgb.toHsv({
      r: parseInt(parsed[2]),
      g: parseInt(parsed[3]),
      b: parseInt(parsed[4])
    });
  }
};
