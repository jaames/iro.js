---
title: Guide
---

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

**[Development version](https://raw.githubusercontent.com/jaames/iro.js/master/dist/iro.js)**<br/>
Uncompressed at around 52kB, with source comments included

**[Production version](https://raw.githubusercontent.com/jaames/iro.js/master/dist/iro.min.js)**<br/>
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
<script src="https://cdn.jsdelivr.net/npm/@jaames/iro/dist/iro.min.js"></script>
```

## Getting Started

Create a HTML element with a unique identifier (such as an `id` attribute) to act as a container for the color picker:

```html
<div id="color-picker-container"></div>
```

Then use JavaScript to create a new `iro.ColorPicker` with a CSS selector that matches your chosen container element:

```js
var colorPicker = new iro.ColorPicker('#color-picker-container');
```

You can also use a DOM object instead of a CSS selector here -- this might be more suitable if you're integrating iro.js into an application built with Vue, React, Angular, etc.

## Color Picker Options

The color picker can be configured by passing a set of options to the second `iro.ColorPicker` parameter:

```js
var colorPicker = new iro.ColorPicker("#color-picker-container", {
  // Set the size of the color picker
  width: 320,
  // Set the initial color to pure red
  color: "#f00"
});
```

### Available Options

| Option           | Purpose | Default |
|:-----------------|:--------|:--------|
| `width`          | Total width of the control UI. | `300` |
| `color`          | The initial color value. This can be any [supported color format](/color_api.html#supported-color-formats). | `"#ffffff"` |
| `borderWidth`    | Width of the border around the controls. Set to `0` for no border. | `0` |
| `borderColor`    | Color of the border. Any valid CSS color is supported. | `"#ffffff"` |
| `padding`        | Padding around the control handles. | `6` |
| `handleRadius`   | Radius of the control handles. | `8` |
| `handleSvg`      | Custom handle SVG, used for [Custom Handles](#custom-handles) | `null` |
| `handleOrigin`   | Custom handle origin point, used for [Custom Handles](#custom-handles). | `{x:0,y:0}` |
| `wheelLightness` | If set to `false`, the color wheel will not fade to black when the lightness decreases. | `true` |
| `sliderHeight`   | Slider control height. By default this will be calculated automatically | `undefined` |
| `sliderMargin`   | Distance between the wheel and the slider controls. | `12` |
| `display`        | CSS display value for the color picker root element. | `"block"` |
| `layout`         | Used for [Custom Layouts](#custom-layouts) | `null` |

More details about color picker options, properties, and methods can be found on the [Color Picker API documentation](/colorPicker_api.html).

## Selected Color API

Each color picker instance has a `color` object which stores the currently selected color. This color object is tied to the color picker, so any changes to its values will be reflected by the picker and vice versa.

### Color Properties

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

For more details about the color object, check out the [Color API documentation](/color_api.html).

## Color Picker Events

Events let you listen for specific color picker events such as changes to the selected color, the start of user input, or when the color picker has mounted.

The color picker's [`on`](colorPicker_api.html#on) method can be used to add callback functions which get called whenever the given event is fired. These callbacks can also be removed at any time by passing the same function to the color picker's [`off`](colorPicker_api.html#off) method. In this example we add and remove a callback for the `color:change` event:

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

### Available Events

#### `color:change`

Fired whenever the selected color changes -- either when the user interacts with the color picker, or when the color is set via code. This event's callback function gets passed two values:

* `color`: the [currently selected color](#selected-color-api)
* `changes`: an object showing which HSV channels have changed since the last time the event was fired

#### `input:start`

Fired whenever the users starts interacting with the color picker controls. The [currently selected color](#selected-color-api) is passed to this event's callback function.

#### `input:end`

Fired whenever the user stops interacting with the color picker controls. The [currently selected color](#selected-color-api) is passed to this event's callback function.

#### `mount`

Fired when the colorPicker's UI has been mounted to the DOM and is ready for user interaction. The colorPicker object is passed to this event's callback function.

## Custom Handles

By default, the color picker uses circular control handles which can be adjusted with the `handleRadius` option. However, it's possible to override this and use your own SVGs to create customized color picker handles.

Handle SVGs need to be placed somewhere within the page HTML, and the SVG content also needs to be wrapped inside a `<g>` tag with a unique `id`, which itself is wrapped in a `<defs>` tag, like so:

```svg
<svg>
  <defs>
    <g id="handle">
      <!-- this is where the handle svg content starts -->
      <rect x="0" y="0" width="8" height="8"></rect>
      <!-- this is where the handle svg content ends -->
    </g>
  </defs>
</svg>
```

Then when the color picker is created, make sure the `handleSvg` option is an **id selector** which matches the handle SVG:

```js
var colorPicker = new iro.ColorPicker('#color-picker', {
  handleSvg: '#handle'
});
```

By default, the custom handle SVG will be drawn as if the center point is at `x 0, y 0`. If you need to adjust the position of the handle, the `handleOrigin` option can be used to change the center point:

```js
var colorPicker = new iro.ColorPicker('#color-picker', {
  handleSvg: '#handle',
  handleOrigin: { x: -4, y: -4 }
});
```

It's recommended to check out the interactive [Custom Handle Demo](https://codepen.io/rakujira/pen/vbeENp?editors=1010) on Codepen to get a better understanding of how this feature works. If you want to use a different handle for each color picker component, you may want to also check out the [Custom Layouts](#custom-layouts) guide.

## Custom Layouts

The custom layout feature can be used to pass configuration options to individual color picker components, or to remove a component entirely. In the future it will also provide more control over the color picker layout and allow custom elments to be used, however this hasn't been fleshed out yet.

Layouts are configured with the color picker's `layout` option. This should be an array where each item is an object with `component` and `options` properties:

```js
var colorPicker = new iro.ColorPicker('#color-picker', {
  layout: [
    {
      component: iro.ui.Wheel,
      options: {}
    },
    {
      component: iro.ui.Slider,
      options: {}
    }
  ]
});
```

`component` can be either `iro.ui.Wheel` for a hue/saturation wheel, or `iro.ui.Slider` for a value slider.

`options` provides configuration options for the component. All of the [options](#color-picker-options) available to the color picker are also supported here, and any unspecified options will be inherited from the color picker itself. 

In this example, the wheel and slider will both have the same border width of `2`, but different border colors:

```js
var colorPicker = new iro.ColorPicker('#color-picker', {
  borderWidth: 2,
  layout: [
    {
      component: iro.ui.Wheel,
      options: {
        borderColor: '#ffffff'
      }
    },
    {
      component: iro.ui.Slider,
      options: {
        borderColor: '#000000'
      }
    }
  ]
});
```

Each color picker component is self-contained, so you can add, remove and rearrange them as you wish. For example, it's fairly common to only use the hue/saturation wheel part of the color picker:

```js
var colorPicker = new iro.ColorPicker('#color-picker', {
  layout: [
    {
      component: iro.ui.Wheel,
      options: {}
    }
  ]
});
```

### Extra Slider Types

`iro.ui.Slider` also has an additional `sliderType` property that can be used to create a hue or saturation slider instead:

```js
var colorPicker = new iro.ColorPicker('#color-picker', {
  layout: [
    ...
    {
      // regular value slider
      component: iro.ui.Slider,
      options: {
      }
    },
    {
      // hue slider
      component: iro.ui.Slider,
      options: {
        sliderType: 'hue'
      }
    },
    {
      // saturation slider
      component: iro.ui.Slider,
      options: {
        sliderType: 'saturation'
      }
    },
  ]
});
```