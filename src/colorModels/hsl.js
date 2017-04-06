var round = Math.round;

module.exports = {
  name: "hsl",

  fromHsv: function (hsv) {
    var s = hsv.s / 100,
        v = hsv.v / 100;
    var p = (2 - s) * v;
    s = s == 0 ? 0 : s * v / (p < 1 ? p : 2 - p);
    return {
      h: hsv.h,
      s: round(s * 100),
      l: round(p * 50)
    };
  },

  toHsv: function (hsl) {
    var s = hsl.s / 50,
        l = hsl.l / 100;
    s *= (l <= 1) ? l : 2 - l;
    return {
      h: hsl.h,
      s: round(((2 * s) / (l + s)) * 100),
      v: round((l + s) * 100)
    };
  }
};
