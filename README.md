> :warning: This readme is for the beta release of iro.js v4. Some parts are currently incomplete or lacking detail. Please read [this issue thread](https://github.com/jaames/iro.js/issues/30) for more info!

<h1 align="center"><a href="//iro.js.org"><img height="340" src="https://raw.githubusercontent.com/jaames/iro.js/v4/assets/screenshot.png"/><br/>iro.js</a></h1>

<p align="center">
  <b>A highly customizable svg-based color picker with zero external dependencies | <a href="//iro.js.org">iro.js.org</a></b>
</p>

<p align="center">
  <a href="https://github.com/jaames/iro.js/blob/master/LICENSE.txt">
    <img src="https://badgen.net/github/license/jaames/iro.js?color=BB5FD1" alt="license" />
  </a>
  <a href="https://npmjs.org/package/@jaames/iro">
    <img src="https://badgen.net/npm/v/@jaames/iro?color=6C8FF2" alt="version" />
  </a>
  <a href="https://npmjs.org/package/@jaames/iro">
    <img src="https://badgen.net/npm/dt/@jaames/iro?color=6AD4E0" alt="downloads" />
  </a>
  <a href="https://bundlephobia.com/result?p=@jaames/iro@beta">
    <img src="https://badgen.net/bundlephobia/minzip/@jaames/iro@beta?color=6FDF89" alt="minzip size" />
  </a>
  <a href="">
    <img src="https://badgen.net/badge/dependencies/none/F8AE55" alt="dependencies" />
  </a>
  <a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=XS9R3QTLZYAXQ&source=url">
    <img src="https://badgen.net/badge/donate/paypal/ED5151" alt="donate" />
  </a>
</p>

## Features

 * **Simple**: Easy-to-use API, with support for hex, rgb, hsl and hsv color formats
 * **Extendable**: Tweak iro.js exactly to your requirements with [Plugins](#Plugins) and custom UI elements
 * **Consistent behavior**: Works across all modern browsers and is responsive on touchscreen devices
 * **Small footprint**: Around [~7kb](https://bundlephobia.com/result?p=@jaames/iro@beta) minified and gzipped, with absolutely no external dependencies, extra stylesheets/images, or jQuery in sight
 * **Licenced under MPL 2.0**: 100% free for personal and commercial use

<img height="32" height="888" src="https://raw.githubusercontent.com/jaames/iro.js/v4/assets/break.png"/>

## Installation

### Install with NPM

```bash
$ npm install @jaames/iro@beta --save
```

If you are using a module bundler like Webpack or Rollup, import iro.js into your project: 

```javascript
// Using ES6 module syntax
import iro from '@jaames/iro';

// Using CommonJS modules
const iro = require('@jaames/iro');
```

### Download and host yourself

**[Development version](https://raw.githubusercontent.com/jaames/iro.js/v4/dist/iro.js)**<br/>
Uncompressed at around 50kB, with source comments included

**[Production version](https://raw.githubusercontent.com/jaames/iro.js/v4/dist/iro.min.js)**<br/>
Minified to 19kB

Then add it to the `<head>` of your page with a `<script>` tag:

```html
<html>
  <head>
    <!-- ... -->
    <script src="./path/to/iro.min.js"></script>
  </head>
  <!-- ... -->
</html>
```

When manually inluding the library like this, it will be globally available as `window.iro`.

### Using the unpkg CDN

```html
<script src="https://unpkg.com/@jaames/iro@beta/dist/iro.min.js"></script>
```

<img height="32" height="888" src="https://raw.githubusercontent.com/jaames/iro.js/v4/assets/break.png"/>

## Demo

Coming soon!

<img height="32" height="888" src="https://raw.githubusercontent.com/jaames/iro.js/v4/assets/break.png"/>

## Usage

### Getting Started

Create a HTML element with a unique identifier (such as an `id` attribute) to act as a container for the color picker:

```html
<div id="color-picker-container"></div>
```

Then use JavaScript to create a new `iro.ColorPicker` and provide a CSS selector that matches the container element:

```js
var colorPicker = new iro.ColorPicker('#color-picker-container');
```

You can use a DOM object instead of a CSS selector -- this might be more suitable if you're integrating iro.js into an application built with Vue, React, Angular, etc.

### Color Picker Options

The the color picker can be configured by passing a set of options to the second `iro.ColorPicker` parameter:

```js
var colorPicker = new iro.ColorPicker("#color-picker-container", {
  // Set the size of the color picker
  width: 320,
  // Set the initial color to red
  color: "#f00"
});
```

#### Available Options

| Name             | Purpose | Default Value |
|:-----------------|:--------|:--------------|
| `color`          | The initial color value. This can be any [supported color format](#supported-color-formats), or even an instance of iro.Color. | `"#fff"` |
| `width`          | Total width of the control UI. | `320` |
| `padding`        | Padding around the control handles. | `6` |
| `handleRadius`   | Radius of the control handles. | `8` |
| `handleUrl`      | SVG reference for custom handles. TODO: document this in more detail | `null` |
| `handleOrigin`   | Custom handle origin point. | `{ x: 0, y: 0 }` |
| `wheelLightness` | If set to 'false', the color wheel will not fade to black as the color's lightness decreases. | `true` |
| `sliderHeight`   | Slider control height. By default this will be calculated automatically | `undefined` |
| `sliderMargin`   | Distance between the wheel and the slider controls. | `12` |
| `borderWidth`    | Width of the border around the controls. Defaults to 0 (no border). | `0` |
| `borderColor`    | Color of the border. Any valid CSS color is supported. | `"#fff"` |
| `display`        | CSS display value for the color picker root element. | `"block"` |

#### Color Picker Events

The color picker's `on` method can be used to register callbacks for certain color picker events, such as when the selected color changes or when the user begins interacting with the picker. These callbacks can also be removed with the `off` method.

**`color:change`**

Fired whenever the color changes -- either when the user interacts with the controls, or when it is set via code. This event's callback function gets passed two values:

* `color`: the colorPicker's [color object](#color-api)
* `changes`: an object showing which HSV channels have changed since the last time the event was fired

For example: 

```js
colorPicker.on('color:change', function(color, changes) {
  // Log the color's hex RGB value to the dev console
  console.log(color.hexString);
  // If the "H" channel has changed, log the color's HSV value too
  if (changes.h) {
    console.log(color.hsv);
  }
})
```

**`input:start`**

Fired whenever the users starts interacting with the color picker controls. The colorPicker's color object is passed to this event's callback function.

**`input:end`**

Fired whenever the user stops interacting with the color picker controls. The colorPicker's color object is passed to this event's callback function.

**`mount`**

Fired when the colorPicker's UI has been mounted to the DOM and is ready for user interaction. A reference to the colorPicker object is passed to this event's callback function.

### Color API

Each color picker instance has a `color` object which stores the currently selected color. 

#### Color Properties

The color object has a few properties which can be used to both get and set the selected color in different formats. When the color is set this way, the UI will update and the `color:change` event will fire.

| Name        | Example Format     |
|:------------|:-------------------|
| `hexString` | `#ff0000` |
| `rgb`       | `{ r: 255, g: 0, b: 0 }` |
| `rgbString` | `"rgb(255, 0, 0)"` |
| `hsl`       | `{ h: 360, s: 100, l: 50 }` |
| `hslString` | `"hsl(360, 100%, 50%)"` |
| `hsv`       | `{ h: 360, s: 100, v: 100 }` |

For example, to get the current color as a hex string:

```js
var hex = colorPicker.color.hexString;
console.log(hex); // hex = "#ff0000"
```

Or to set the selected color from a hsl object:

```js
colorPicker.color.hsl = { h: 180, s: 100, l: 50 };
// colorPicker UI updates
```

#### Supported Color Formats

* **hex string**: `"#ff0000"`
* **shorthand hex string**: `"#f00"`
* **rgb(a) string**: `"rgb(255, 0, 0)"`
* **percentage rgb(a) string**: `"rgb(100%, 0%, 0%)"`
* **rgb object**: `{r: 255, g: 0, b: 0}`
* **hsl(a) string**: `hsl(360, 50%, 100%)`
* **hsl object**: `{h: 360, s: 50, l: 100}`
* **hsv object**: `{h: 360, s: 100, v: 50}`

<img height="32" height="888" src="https://raw.githubusercontent.com/jaames/iro.js/v4/assets/break.png"/>

## Plugins

Coming soon!

<img height="32" height="888" src="https://raw.githubusercontent.com/jaames/iro.js/v4/assets/break.png"/>

## Documentation

> :warning: Full v4 documentation is currently being written

* [Introduction](https://iro.js.org/introduction.html)
* [Getting Started](https://iro.js.org/guide.html#getting-started)
* [Color Picker Options](https://iro.js.org/guide.html#color-picker-options)
* [Using the Selected Color](https://iro.js.org/guide.html#using-the-selected-color)
* [Events](https://iro.js.org/guide.html#events)
* [ColorPicker API](https://iro.js.org/colorPicker_api.html)
* [Color API](https://iro.js.org/color_api.html)

<img height="32" height="888" src="https://raw.githubusercontent.com/jaames/iro.js/v4/assets/break.png"/>

[Website](//iro.js.org) | [Documentation](//iro.js.org/introduction.html) | [Codepen Demo](//codepen.io/rakujira/pen/WZOeNq?editors=0010) | [Contribution Guide](CONTRIBUTE.md) | [Changelog](CHANGELOG.md) | [License](LICENSE.txt)

&copy; [James Daniel](//github.com/jaames)