// listen to a color picker's color:init and color:change events
colorPicker.on(['color:init', 'color:change'], function(color) {
    // log the current color as a HEX string
    console.log(color.hexString);
});