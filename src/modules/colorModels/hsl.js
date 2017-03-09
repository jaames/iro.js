module.exports = {
  from: function (hsv) {
    var s = hsv.s / 100,
        v = hsv.v / 100;
    var p = (2 - s) * v;
    s = s == 0 ? 0 : s * v / (p < 1 ? p : 2 - p);
    return {h: hsv.h, s: ~~(s * 100), l: ~~(p * 50)};
  },
  to: function (hsl) {
    var s = hsl.s/100, l = hsl.l/100;
    s *= l < 0.5 ? l : 1-l;
    return {
      h: hsl.h,
      s: ~~((2 * s / (l+s))*100),
      v: ~~((l+s)*100)
    };
  }
};
