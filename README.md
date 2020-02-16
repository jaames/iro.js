<h1 align="center"><a href="//iro.js.org" target="blank"><img height="340" src="https://raw.githubusercontent.com/jaames/iro.js/master/assets/screenshot.png"/><br/>iro.js</a></h1>

<p align="center">
  <b>An HSV color picker widget for JavaScript, with a modern SVG-based user interface | <a href="//iro.js.org" target="blank">iro.js.org</a></b>
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
  <a href="https://bundlephobia.com/result?p=@jaames/iro">
    <img src="https://badgen.net/bundlephobia/minzip/@jaames/iro?color=6FDF89" alt="minzip size" />
  </a>
  <a href="">
    <img src="https://badgen.net/badge/jQuery/none/F8AE55" alt="no jQuery" />
  </a>
</p>

<p align="center">
  <a href="#features">Features</a> | <a href="#demo">Demo</a> | <a href="#installation">Installation</a> | <a href="#usage">Usage</a> | <a href="#plugins">Plugins</a> | <a href="#documentation">Documentation</a>
</p>

<br/>

## Features

 * **Simple**: Low friction API, with robust support for hex, rgb, hsl and hsv color formats.
 * **Extendable**: Tweak the library to your requirements with [Plugins](#plugins) and custom UI elements
 * **Consistent behaviour**: Works across all modern browsers and devices, including touchscreens.
 * **Small footprint**: [7kb](https://bundlephobia.com/result?p=@jaames/iro) minified and gzipped, with absolutely no jQuery or extra css/images in sight.
 * **Great design**: The controls are designed to be intuitive and responsive, plus they're built with SVG so they look super crisp at any resolution.
 * **Transparency support**: Optional transparency slider with the [transparency plugin](https://github.com/jaames/iro-transparency-plugin).
 * **Licenced under MPL 2.0**: 100% free for personal and commercial use.

<img height="16" height="888" src="https://raw.githubusercontent.com/jaames/iro.js/master/assets/break.png"/>

## Demo

An [interactive demo](https://codepen.io/rakujira/pen/WZOeNq?editors=0010) is available on Codepen.

<img height="16" height="888" src="https://raw.githubusercontent.com/jaames/iro.js/master/assets/break.png"/>

## Installation

### Install with NPM

```bash
$ npm install @jaames/iro --save
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
Uncompressed at around 52kB, with source comments included

**[Production version](https://raw.githubusercontent.com/jaames/iro.js/v4/dist/iro.min.js)**<br/>
Minified to 20kB

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

When manually including the library like this, it will be globally available as `window.iro`.

### Using the jsDelivr CDN

```html
<script src="https://cdn.jsdelivr.net/npm/@jaames/iro@4/dist/iro.min.js"></script>
```

<img height="16" height="888" src="https://raw.githubusercontent.com/jaames/iro.js/master/assets/break.png"/>

## Usage

### Getting Started

Create a HTML element with a unique identifier (such as an `id` attribute) to act as a container for the color picker:

```html
<div id="color-picker-container"></div>
```

Then use JavaScript to create a new `iro.ColorPicker` with a CSS selector that matches your chosen container element:

```js
var colorPicker = new iro.ColorPicker('#color-picker-container');
```

You can also use a DOM object instead of a CSS selector here -- this might be more suitable if you're integrating iro.js into an application built with Vue, React, Angular, etc.

### Color Picker Options

The color picker can be configured by passing a set of options to the second `iro.ColorPicker` parameter:

```js
var colorPicker = new iro.ColorPicker("#color-picker-container", {
  // Set the size of the color picker
  width: 320,
  // Set the initial color to pure red
  color: "#f00"
});
```

#### Available Options

| Option           | Purpose | Default |
|:-----------------|:--------|:--------|
| `width`          | Total width of the control UI. | `300` |
| `color`          | The initial color value. This can be any [supported color format](https://iro.js.org/color_api.html#supported-color-formats). | `"#ffffff"` |
| `borderWidth`    | Width of the border around the controls. Set to `0` for no border. | `0` |
| `borderColor`    | Color of the border. Any valid CSS color is supported. | `"#ffffff"` |
| `padding`        | Padding around the control handles. | `6` |
| `handleRadius`   | Radius of the control handles. | `8` |
| `handleSvg`      | Custom handle SVG, used for [Custom Handles](https://github.com/jaames/iro.js/blob/v4/docs/guide.md#custom-handles) | `null` |
| `handleOrigin`   | Custom handle origin point, used for [Custom Handles](https://github.com/jaames/iro.js/blob/v4/docs/guide.md#custom-handles). | `{x:0,y:0}` |
| `wheelLightness` | If set to `false`, the color wheel will not fade to black when the lightness decreases. | `true` |
| `wheelAngle`     | Starting angle of the color wheel's hue gradient, measured in degrees. | `0` |
| `wheelDirection` | Direction of the color wheel's hue gradient, either `"clockwise"` or `"anticlockwise"` | `"anticlockwise"` |
| `sliderHeight`   | Slider control height. By default this will be calculated automatically | `undefined` |
| `sliderMargin`   | Distance between the wheel and the slider controls. | `12` |
| `display`        | CSS display value for the color picker root element. | `"block"` |
| `id`             | HTML ID for the color picker root element. | `null` |
| `layout`         | Used for [Custom Layouts](https://github.com/jaames/iro.js/blob/v4/docs/guide.md#custom-layouts) | `null` |

More details about color picker options, properties, and methods can be found on the [Color Picker API documentation](https://github.com/jaames/iro.js/blob/v4/docs/colorPicker_api.md).

### Selected Color API

Each color picker instance has a `color` object which stores the currently selected color. This color object is tied to the color picker, so any changes to its values will be reflected by the picker and vice versa.

#### Color Properties

The color object has a few "magic" properties which can be used to both get and set the selected color in different formats. Whenever one of these properties is set, the color picker controls will update and the [`color:change`](#color-picker-events) event will fire.

For example, to get the current color as a hex string:

```js
var hex = colorPicker.color.hexString;
console.log(hex); // hex = "#ff0000"
```

Or to set the selected color from a hsl object:

```js
colorPicker.color.hsl = { h: 180, s: 100, l: 50 };
// Color picker updates to match hsl(180, 100, 50)
```

The color object has properties which cover all of the most common web color formats (hex, rgb, and hsl) in the same manner, in addition to hsv:

| Property    | Example Format     |
|:------------|:-------------------|
| `hexString` | `"#ff0000"` |
| `rgb`       | `{ r: 255, g: 0, b: 0 }` |
| `rgbString` | `"rgb(255, 0, 0)"` |
| `hsl`       | `{ h: 360, s: 100, l: 50 }` |
| `hslString` | `"hsl(360, 100%, 50%)"` |
| `hsv`       | `{ h: 360, s: 100, v: 100 }` |

For more details about the color object, check out the [Color API documentation](https://github.com/jaames/iro.js/blob/v4/docs/color_api.md).


### Color Picker Events

Events let you listen for specific color picker events such as changes to the selected color, the start of user input, or when the color picker has mounted.

The color picker's [`on`](https://github.com/jaames/iro.js/blob/v4/docs/colorPicker_api.md#on) method can be used to add callback functions which get called whenever the given event is fired. These callbacks can also be removed at any time by passing the same function to the color picker's [`off`](https://github.com/jaames/iro.js/blob/v4/docs/colorPicker_api.md#off) method. In this example we add and remove a callback for the `color:change` event:

```js
// color:change event callback
// color:change callbacks receive the current color and a changes object
function onColorChange(color, changes) {
  // print the color's new hex value to the developer console
  console.log(color.hexString);
}

// listen to a color picker's color:change event
colorPicker.on('color:change', onColorChange);

// later, if we want to stop listening to color:change...
// remove the color:change callback
colorPicker.off('color:change', onColorChange);
```

#### Available Events

##### `color:change`

Fired whenever the selected color changes -- either when the user interacts with the color picker, or when the color is set via code. It is safe to modify the `color` object within callbacks for this event, and callbacks get passed two values:

* `color`: the [currently selected color](#selected-color-api)
* `changes`: an object showing which HSV channels have changed since the last time the event was fired

##### `color:init`

Same as `color:change`, but only fired once with the initial color value provided to the color picker.

##### `input:change`

Similar to `color:change`, except this is only fired whenever the color is changed with *direct user input*. Callbacks for this event recieve exactly the same parameters as `color:change`, and it is also safe to modify the `color` object within callbacks for this event.

##### `input:start`

Fired whenever the users starts interacting with the color picker controls. The [currently selected color](#selected-color-api) is passed to this event's callback function.

##### `input:move`

Fired when the user moves their pointer/mouse after beginning interaction. The [currently selected color](#selected-color-api) is passed to this event's callback function.

##### `input:end`

Fired whenever the user stops interacting with the color picker controls. The [currently selected color](#selected-color-api) is passed to this event's callback function.

##### `mount`

Fired when the colorPicker's UI has been mounted to the DOM and is ready for user interaction. The colorPicker object is passed to this event's callback function.

<img height="16" height="888" src="https://raw.githubusercontent.com/jaames/iro.js/master/assets/break.png"/>

## Plugins

* [**iro-dynamic-css**](https://github.com/jaames/iro-dynamic-css): Allows you to dynamically update CSS rules whenever the selected color changes.
* [**iro-transparency-plugin**](https://github.com/jaames/iro-transparency-plugin): Adds optional transparency slider to the color picker and support for color-with-alpha color formats.

<img height="16" height="888" src="https://raw.githubusercontent.com/jaames/iro.js/master/assets/break.png"/>

## Documentation

* [Usage](https://github.com/jaames/iro.js/blob/v4/docs/guide.md)
  * [Installation](https://github.com/jaames/iro.js/blob/v4/docs/guide.md#installation)
  * [Getting Started](https://github.com/jaames/iro.js/blob/v4/docs/guide.md#getting-started)
  * [Color Picker Options](https://github.com/jaames/iro.js/blob/v4/docs/guide.md#color-picker-options)
  * [Selected Color API](https://github.com/jaames/iro.js/blob/v4/docs/guide.md#selected-color-api)
  * [Color Picker Events](https://github.com/jaames/iro.js/blob/v4/docs/guide.md#color-picker-events)
  * [Custom Layouts](https://github.com/jaames/iro.js/blob/v4/docs/guide.md#custom-layouts)
  * [Custom Handles](https://github.com/jaames/iro.js/blob/v4/docs/guide.md#custom-handles)
* [Plugins](https://github.com/jaames/iro.js/blob/v4/docs/plugins.md)
  * [Available Plugins](https://github.com/jaames/iro.js/blob/v4/docs/plugins.md#available-plugins)
  * [Using Plugins](https://github.com/jaames/iro.js/blob/v4/docs/plugins.md#using-plugins)
* [ColorPicker API](https://github.com/jaames/iro.js/blob/v4/docs/colorPicker_api.md)
  * [Constructor](https://github.com/jaames/iro.js/blob/v4/docs/colorPicker_api.md#constructor)
  * [Options](https://github.com/jaames/iro.js/blob/v4/docs/colorPicker_api.md#options)
  * [Properties](https://github.com/jaames/iro.js/blob/v4/docs/colorPicker_api.md#properties)
  * [Methods](https://github.com/jaames/iro.js/blob/v4/docs/colorPicker_api.md#methods)
  * [Static Methods](https://github.com/jaames/iro.js/blob/v4/docs/colorPicker_api.md#static-methods)
  * [Events](https://github.com/jaames/iro.js/blob/v4/docs/colorPicker_api.md#events)
  * [Plugin Hooks](https://github.com/jaames/iro.js/blob/v4/docs/colorPicker_api.md#plugin-hooks)
* [Color API](https://github.com/jaames/iro.js/blob/v4/docs/color_api.md)
  * [Constructor](https://github.com/jaames/iro.js/blob/v4/docs/color_api.md#constructor)
  * [Supported Color Formats](https://github.com/jaames/iro.js/blob/v4/docs/color_api.md#supported-color-formats)
  * [Properties](https://github.com/jaames/iro.js/blob/v4/docs/color_api.md#properties)
  * [Methods](https://github.com/jaames/iro.js/blob/v4/docs/color_api.md#methods)
  * [Static Methods](https://github.com/jaames/iro.js/blob/v4/docs/color_api.md#static-methods)
* [Migration Guide](https://github.com/jaames/iro.js/blob/v4/docs/migrating.md)
  * [Migrating from v3](https://github.com/jaames/iro.js/blob/v4/docs/migrating.md#migrating-from-v3)

<img height="16" height="888" src="https://raw.githubusercontent.com/jaames/iro.js/master/assets/break.png"/>

[Website](//iro.js.org) | [Codepen Demo](//codepen.io/rakujira/pen/WZOeNq?editors=0010) | [Contribution Guide](CONTRIBUTE.md) | [Donate](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=XS9R3QTLZYAXQ&source=url) | [Changelog](CHANGELOG.md) | [License](LICENSE.txt)

&copy; [James Daniel](//github.com/jaames)
