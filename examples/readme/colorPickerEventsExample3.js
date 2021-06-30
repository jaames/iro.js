// create a callback function
function onColorChange(color) {
    console.log(color.hexString);
}
  
// add color:change listener
colorPicker.on('color:change', onColorChange);
  
// later, if we want to stop listening to color:change...
colorPicker.off('color:change', onColorChange);