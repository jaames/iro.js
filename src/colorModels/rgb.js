module.exports = {
  from: function (hsv) {
    var r, g, b, i, f, p, q, t;
    var h = hsv.h/360, s = hsv.s/100, v = hsv.v/100;
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
      case 0: r = v, g = t, b = p; break;
      case 1: r = q, g = v, b = p; break;
      case 2: r = p, g = v, b = t; break;
      case 3: r = p, g = q, b = v; break;
      case 4: r = t, g = p, b = v; break;
      case 5: r = v, g = p, b = q; break;
    }
    return {r: ~~(r * 255), g: ~~(g * 255), b: ~~(b * 255)};
  },
  to: function (rgb) {
    var r = rgb.r, g = rgb.g, b = rgb.b;
    var max = Math.max(r, g, b),
        min = Math.min(r, g, b),
        d = max - min,
        h,
        s = max === 0 ? 0 : d / max,
        v = max / 255;
    switch (max) {
      case min: h = 0; break;
      case r: h = (g - b) + d * (g < b ? 6: 0); h /= 6 * d; break;
      case g: h = (b - r) + d * 2; h /= 6 * d; break;
      case b: h = (r - g) + d * 4; h /= 6 * d; break;
    }
    return {h: ~~(h * 360), s: ~~(s * 100), v: ~~(v * 100)};
  }
};
