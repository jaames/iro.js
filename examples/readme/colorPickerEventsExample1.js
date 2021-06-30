// listen to a color picker's color:change event
// color:change callbacks receive the current color
colorPicker.on('color:change', function(color) {
    // log the current color as a HEX string
    console.log(color.hexString);
});