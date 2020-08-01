---
layout: Home
home: true
---

::: slot introduction
A modern, SVG-based color picker widget for vanilla JavaScript.
:::

::: slot feature-colors
Work with colors in hex, RGB, HSV and HSL formats (plus kelvin temperatures!) in one simple, frictionless API.
:::

::: slot feature-colors-example 
```js
// Get the color as an RGB string 
var rgb = colorPicker.color.rgbString; 
// rgb = "{{ rgbString }}" 

// Get the color as a HSV object 
var hsv = colorPicker.color.hsv; 
// hsv = {{ rgbString }}

// Set the color from a hex string 
colorPicker.color.hexString = "#fff";

// Set the color from a temperature 
colorPicker.color.kelvin = 6000;
```
:::

::: slot feature-multicolor
Add multiple colors to the same color picker for selecting color harmonies and themes.
:::

::: slot feature-components
Create the perfect color picker from a selection of pre-built UI components.
:::

::: slot tutorial-iro-js
### Installation

##### Install from NPM

```bash
$ npm install @jaames/iro --save
```

Then if you are using a module bundler like Webpack or Rollup, import iro.js into your project: 

```js
// Using ES6 module syntax
import iro from '@jaames/iro';

// Using CommonJS modules
const iro = require('@jaames/iro');
```

##### Or use the jsDelivr CDN

Drop this script into the `<head>` of your page's HTML:

```html
<script src="https://cdn.jsdelivr.net/npm/@jaames/iro@5"></script>
```

When you manually include the library like this, iro.js will be made globally available on `window.iro`.

##### Or download and host yourself

**[Development version](https://raw.githubusercontent.com/jaames/iro.js/master/dist/iro.js)**<br/>
Uncompressed, with source comments included. Intended for debugging.

**[Production version](https://raw.githubusercontent.com/jaames/iro.js/master/dist/iro.min.js)**<br/>
Minified and optimized version.

### Color Picker Setup

First, we need a HTML element with a unique identifier (such as an `id` attribute) to act as a container for the color picker:

```html
<div id="picker"></div>
```

Then use JavaScript to create a new `iro.ColorPicker` with a CSS selector that matches your chosen container element:

```js
var colorPicker = new iro.ColorPicker('#picker');
```

You can also use a DOM object instead of a CSS selector here -- this might be more suitable if you're integrating iro.js into an application built with a framework such as Vue, React, etc.

### Color Picker Options

The color picker can be customized by passing a set of options to the second `iro.ColorPicker` parameter:

```js
var colorPicker = new iro.ColorPicker("#picker", {
  // Set the size of the color picker
  width: 320,
  // Set the initial color to pure red
  color: "#f00"
});
```

A full list of color picker options can be found in the [options documentation](guide.html#color-picker-options).

### Working with Colors

Each color picker has a color object which stores the currently selected color. 


```js
var hex = colorPicker.color.hexString;
console.log(hex); // hex = "#ff0000"
```

Whenever you set any of these color properties, the color picker will automatically update to match it!

```js
colorPicker.color.hsl = { h: 180, s: 100, l: 50 };
// Color picker updates to match hsl(180, 100, 50)
```

A full list of color properties can be found in the [color documentation](/guide.html#working-with-colors).

### Events


Events let you to run your own code after certain things have happened, like when the selected color has changed or when the user has interacted with the color picker.

The color picker's [`on`](colorPicker_api.html#on) method can be used to attach functions that will be called whenever a particular event is fired. For example, we can add a listener that fires whenever the color is changed:

```js
// listen to a color picker's color:change event
// color:change callbacks receive the current color
colorPicker.on('color:change', function(color) {
  // log the current color as a HEX string
  console.log(color.hexString);
});
```

For a full overview of the available events can be found in the [events documentation](/guide.html#color-picker-events).
:::