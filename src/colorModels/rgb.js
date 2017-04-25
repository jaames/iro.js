var round = Math.round;

module.exports = {
  name: "rgb",

  fromHsv: function (hsv) {
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
    return {r: round(r * 255), g: round(g * 255), b: round(b * 255)};
  },
  
  toHsv: function (rgb) {
    // Modified from https://github.com/bgrins/TinyColor/blob/master/tinycolor.js#L446
    var r = rgb.r / 255,
        g = rgb.g / 255,
        b = rgb.b / 255;
    var max = Math.max(r, g, b),
        min = Math.min(r, g, b),
        delta = max - min;
    var hue;
    switch (max) {
      case min:
        hue = 0;
        break;
      case r:
        hue = (g - b) / delta + (g < b ? 6 : 0);
        break;
      case g:
        hue = (b - r) / delta + 2
        break;
      case b:
        hue = (r - g) / delta + 4;
        break;
    }
    hue /= 6;
    return {
      h: round(hue * 360),
      s: round(max === 0 ? 0 : (delta / max) * 100),
      v: round(max * 100)
    };
  }
};
