<p align="center">
  <a href="https://rakujira.jp/projects/iro/"">
    <img width="666" src="https://raw.githubusercontent.com/jaames/iro.js/master/assets/animated_logo.gif"/>
  </a>
</p>

### Main Features

* Pretty color wheel UI with touch support
* Color model conversion between RGB, HSV, HSL and hexadecimal RGB
* Dynamically update CSS styles as the selected color changes
* Zero dependencies (not even jQuery or extra stylesheets/images)
* HiDPI / retina screen support
* Supports all major browsers from IE10 up
* Lightweight, at just under 11KB minified (or ~4KB minified + gzipped)
* Can be used standalone or bundled with AMD / CommonJS / etc
* Buzzword buzzword buzzword, you get the idea

### Install

#### Download

 * [iro.min.js](https://raw.githubusercontent.com/jaames/iro.js/master/dist/iro.min.js)

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
  // Radius of the markers that show the current color:
  markerRadius: 8,
  // Padding space around the markers:
  padding: 4,
  // Space between the hue/saturation ring and the value slider:
  sliderMargin: 24,
  // Initial color value -- any hex, rgb or hsl color string works:
  color: "#fff",
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

### Building

#### Install dependencies:

`npm install`

#### Build:

`npm run build`

#### Run dev server:

`npm run dev`
