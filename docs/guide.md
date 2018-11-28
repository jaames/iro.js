---
title: Guide
---

## Getting Started

In your HTML, create an element to act as a container for the color picker. This container element needs to have a unique identifier such as an `id` attribute:

```html
<div id="color-picker-container"></div>
```

Now in JavaScript, create a new `iro.ColorPicker` and attach it to the container by providing a matching CSS selector:

```js
var demoColorPicker = new iro.ColorPicker("#color-picker-container");
```

::: tip
You can also use a DOM object instead of a CSS selector if needed -- this might be more suitable if you're integrating iro.js into an application created with a frontend framework such as Vue or React.
:::

The second parameter allows you to provide custom options to the color picker:

```js
var demoColorPicker = new iro.ColorPicker("#color-picker-container", {
  // Set the size of the color picker UI
  width: 320,
  height: 320,
  // Set the initial color to red
  color: "#f00"
});
```

## Color Picker Options

When creating a new color picker you can customise it by providing a list of options:

```js
var demoColorPicker = new iro.ColorPicker("#color-picker-container", {
  width: 320,
  height: 320,
  color: {r: 255, g: 0, b: 0},
  markerRadius: 8,
  padding: 4,
  sliderMargin: 24,
  sliderHeight: 36,
  borderWidth: 2,
  borderColor: "#fff",
  anticlockwise: true,
});
```

### Available Options

| Name            | Description | Default |
|:----------------|:------------|:--------|
| `color`         | Set the default color from any [supported color format](/color_api.html#Supported-Color-Formats), or even an instance of [iro.Color](/color_api.html). | `"#fff"` |
| `width`         | Total width of the control UI | `320` |
| `height`        | Total height of the control UI | `320` |
| `padding`       | Padding between the markers and the edge of the controls. | `6` |
| `markerRadius`  | Radius of the control markers. | `8` |
| `sliderMargin`  | Distance between the hue/saturation wheel and the slider controls. | `24` |
| `sliderHeight`  | Slider control height (by default this will be calculated automatically). | `undefined` |
| `borderWidth`   | Width of the border around the controls. Defaults to 0 (no border). | `0` |
| `borderColor`   | Color of the border, any valid CSS color is supported. | `"#fff"` |
| `display`       | SVG element's CSS display property value. | `"block"` |
| `anticlockwise` | If set to `true`, the color wheel will be drawn in the other direction, with blues and purples towards the lower half of the wheel. | `false` |
| `wheelLightness`| If set to `false`, the color wheel will not fade to black as the color's lightness decreases. This is not recommended, for reasons noted in [this issue thread](https://github.com/jaames/iro.js/issues/9#issuecomment-336628451) | `undefined` |
| `css`           | The CSS template used for the [Dynamic CSS](#Dynamic-CSS) feature. | `{}` |

## Using the Selected Color

Each color picker instance has a [`color`](/color_api.html) object which stores the current color.

### Getting and Setting the Color

The color object has a few properties that can be used to both get and set the selected color in different formats such as RGB and HSL. When the color is set this way, the UI will update and the [`color:change`](#color:change) event will fire.

For example, here's how we can get and set the color's `rgb` property:

```js
// Get the color's RGB value
var rgb = demoColorPicker.color.rgb;
// rgb = { r: 255, g: 255, b: 0 }

// Set the color to another value
demoColorPicker.color.rgb = { r: 255, g: 0, b: 0 };
```

### Property List

| Name  | Example Format |
|:------|:---------------|
| `hsv` | `{ h: 360, s: 100, v: 100 }` |
| `rgb` | `{ r: 255, g: 0, b: 0 }` |
| `hsl` | `{ h: 360, s: 100, l: 50 }` |
| `rgbString` | `"rgb(255, 0, 0)"` |
| `hexString` | `"#FF0000"` |
| `hslString` | `"hsl(360, 100%, 50%)"` |

## Events

Each color picker has an event system that can be used to listen to certain events, like when the user starts interacting with the color picker. Event listers are added with the [`on`](/colorPicker_api.html#on) method, and can be removed with the [`off`](/colorPicker_api.html#off) method.

Here's an example showing what adding and then removing a listener to the `input:start` event might look like:

```js
// Listen to the input:start event
demoColorPicker.on("input:start", function onInputStart() {
  // do something...
});

// Remove a previously added event listener
demoColorPicker.off("input:start", onInputStart);
```

## Event Types

### mount

Fired when the colorPicker's UI has been mounted to the DOM and is ready for user interaction. 
A reference to the colorPicker object is passed to this event's callback function.

### input:start

Fired whenever the users starts interacting with the color picker controls. 
The colorPicker's `color` object is passed to this event's callback function.

### input:end

Fired whenever the user stops interacting with the color picker controls.
The colorPicker's `color` object is passed to this event's callback function.

### color:change

Fired whenever the color changes -- either when the user interacts with the controls, or when it is set via code. 
This event's callback function gets passed two values:
 * `color`: the colorPicker's `color` object
 * `changes`: an object showing which HSV channels have changed since the last time the event was fired

For example:

```js
demoColorPicker.on("color:change", function(color, changes) {
  // Log the color's hex RGB value to the dev console
  console.log(color.hexString);
  // If the "H" channel has changed, log the color's HSV value too
  if (changes.h) {
    console.log(color.hsv);
  }
});
```

It's also possible to *set* the color to a new value within a callback function, should you want to make adjustments. The color picker controls will automatically update, and you're also protected from infinite color:set callback loops.

For example, if you wanted to force the color's hue channel to always be `360`:

```js
demoColorPicker.on("color:change", function(color, changes) {
  // Get the color's HSV value
  var hsv = color.hsv;
  // Set the H channel to 360
  hsv.h = 360;
  // Set the color with the new HSV value
  color.hsv = hsv;
});
```

::: tip
The `color:change` event will fire _very_ quickly as the user drags the controls around. To slow it down you may want to try [debouncing](https://davidwalsh.name/javascript-debounce-function) your callback function.
:::

## Dynamic CSS

With the Dynamic CSS feature you can automatically write CSS styles and update them as the selected color changes. All you need to do is provide a CSS "template" when creating the color picker:

```js
var demoColorPicker = new iro.ColorPicker("#color-picker-container", {
  // ...
  css: {
    "body": {
      "background-color": "$color"
    },
    "input, button": {
      "border-color": "$color",
      "color": "$color"
    }
  }
});
```

`$color` is treated as a variable representing the currently selected color. To demonstrate, let's say the currently selected color is `rgb(255, 0, 0)` (pure red). Using the template above, the CSS applied to the page would look something like this:

```css
body {
  background-color: rgb(255, 0, 0);
}

input, button {
  border-color: rgb(255, 0, 0);
  color: rgb(255, 0, 0);
}
```