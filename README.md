<p align="center">
  <a href="https://rakujira.jp/projects/iro/"">
    <img width="888" src="https://raw.githubusercontent.com/jaames/iro.js/master/assets/animated_logo.gif"/>
  </a>
</p>

### Main Features

* Pretty color wheel UI with touch and HiDPI/retina screen support
* Color model conversion between RGB, HSV, HSL and hexadecimal RGB
* Dynamically update CSS styles when the selected color changes
* No dependencies! Not even jQuery or extra stylesheets/images
* Supports all major browsers from IE9 up
* Lightweight, at just about 12KB minified (or ~5KB minified + gzipped)

### Install

 * download [iro.min.js](https://raw.githubusercontent.com/jaames/iro.js/master/dist/iro.min.js)

### Quick Start

To set up a color picker, first we need to make a HTML element to act as a container for it:

```html
<div id="example">
  <!-- The color picker will be inserted here -->
</div>
```

Then we can initialize it with JavaScript, by passing a [CSS selector](https://css-tricks.com/how-css-selectors-work/) for the container element to the `iro.ColorPicker` constructor:

```javascript
var exampleColorPicker = new iro.ColorPicker("#example");
```

Color pickers can also be customized by passing an option object to the `iro.ColorPicker` constructor. All options are, uh, optional:

```javascript
var exampleColorPicker = new iro.ColorPicker("#example", {
  // Canvas dimensions:
  width: 320,
  height: 320,
  // Initial color value -- any hex, rgb or hsl color string works:
  color: "#fff",
  // Radius of the markers that show the current color:
  markerRadius: 8,
  // Padding space around the markers:
  padding: 4,
  // Space between the hue/saturation ring and the value slider:
  sliderMargin: 24,
  // Add a border around the controls:
  borderWidth: 2,
  // Set the border color (defaults to white):
  borderColor: "#000",
  // CSS rules to update as the selected color changes
  css: {
    "body": {
      "background-color": "rgb"
    },
    "input, button": {
      "border-color": "rgb",
      "color": "rgb"
    }
  }
});
```

That's it! For more information about what Iro can do, check out the [`/docs`](https://github.com/jaames/iro.js/tree/master/docs). (:

### Contributing

[Read more on contributing]()

### FAQ

### Changelog

See the [changlelog]()

### License

[MIT]() © [James Daniel](https://rakujira.jp)
