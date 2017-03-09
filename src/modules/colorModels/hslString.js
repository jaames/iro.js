import hsl from "./hsl.js";

module.exports = {
  from: function (hsv) {
    var color = hsl.from(hsv);
    return ["hsl", color.a ? "a" : "", "(", color.h, ", ", color.s, "%, ", color.l, "%", color.a ? ", " + color.a : "", ")"].join("");
  },
  to: function (hslString) {
    var parsed = hslString.match(/(hsla?)\((\d+)(?:\D+?)(\d+)(?:\D+?)(\d+)(?:\D+?)?([0-9\.]+?)?\)/i);
    return hsl.to({
      h: parseInt(parsedStr[2]),
      s: parseInt(parsedStr[3]),
      l: parseInt(parsedStr[4])
    });
  }
};
