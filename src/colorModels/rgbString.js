import rgb from "./rgb.js";

module.exports = {
  from: function (hsv) {
    var color = rgb.from(hsv);
    return ["rgb", color.a ? "a" : "", "(", color.r, ", ", color.g, ", ", color.b, color.a ? ", " + color.a : "", ")"].join("");
  },
  to: function (rgbString) {
    var parsed = rgbString.match(/(rgba?)\((\d+)(?:\D+?)(\d+)(?:\D+?)(\d+)(?:\D+?)?([0-9\.]+?)?\)/i);
    return rgb.to({
      r: parseInt(parsed[2]),
      g: parseInt(parsed[3]),
      b: parseInt(parsed[4])
    });
  }
};
