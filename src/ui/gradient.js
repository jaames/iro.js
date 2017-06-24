function addColorStops(gradient, colorStops) {
  for (stop in colorStops) {
      gradient.addColorStop(stop, colorStops[stop]);
  }
  return gradient;
};

module.exports = {
  linear: function (ctx, x1, y1, x2, y2, colorStops) {
    return addColorStops(ctx.createLinearGradient(x1, y1, x2, y1), colorStops);
  },
  radial: function (ctx, x, y, min, max, colorStops) {
    return addColorStops(ctx.createRadialGradient(x, y, min, x, y, max), colorStops);
  }
};
