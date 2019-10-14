
var colorPicker = new iro.ColorPicker("#demoWheel", {
  width: 290,
  height: 360,
  handleRadius: 8,
  handleUrl: null,
  // handleUrl: "#test",
  handleOrigin: {y: 0, x: 0},
  color: "#f00",
  borderWidth: 2,
  padding: 8,
  wheelLightness: true,
  wheelAngle: 270,
  wheelDirection: 'anticlockwise',
  layoutDirection: 'vertical',
  layout: [
    {
      component: iro.ui.Wheel,
      options: {
      }
    },
    {
      component: iro.ui.Slider,
      options: {
      }
    },
    {
      component: iro.ui.Slider,
      options: {
        sliderType: 'hue'
      }
    },
    {
      component: iro.ui.Slider,
      options: {
        sliderType: 'saturation'
      }
    }
  ]
});

colorPicker.on('mount', function() {
  console.log('mount')
});

colorPicker.on('color:change', function() {
  console.log('color:change');
})

colorPicker.on('input:change', function(color) {
  console.log('input:change');
})

colorPicker.on(['color:init', 'color:change'], function() {
  console.log('color:change or color:init');
})