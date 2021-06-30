colorPicker.on('color:change', function(color) {
    // don't let the color saturation fall below 50!
    if (color.saturation < 50) {
      color.saturation = 50;
    }
});