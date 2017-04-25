import hsl from "./hsl.js";

module.exports = {
  name: "hslString",

  fromHsv: function (hsv) {
    var color = hsl.fromHsv(hsv);
    return "hsl" + (color.a ? "a" : "") + "(" + color.h + ", " + color.s + "%, " + color.l + "%" + (color.a ? ", " + color.a : "") + ")";
  },

  toHsv: function (hslString) {
    var parsed = hslString.match(/(hsla?)\((\d+)(?:\D+?)(\d+)(?:\D+?)(\d+)(?:\D+?)?([0-9\.]+?)?\)/i);
    return hsl.toHsv({
      h: parseInt(parsed[2]),
      s: parseInt(parsed[3]),
      l: parseInt(parsed[4])
    });
  }
};
