---
title: Guide
github_url: https://github.com/jaames/iro.js/blob/master/www/src/guide.md
---

### Color Picker Options

As mentioned in the [Getting Started]() section, when creating a new color picker you can customise it by providing a list of options:

```js
var demoColorPicker = new iro.ColorPicker("#color-picker-container", {
  width: 320,
  height: 320,
  // ...
});
```

Available options and their use are listed below:

###### color

Set the default color from any [supported color format](color_api.html#Supported-Color-Formats), or even an instance of [iro.Color](color_api.html).

###### width
###### height

Maximum dimensions for the control UI -- iro.js will make sure everything fits into this area.

###### markerRadius

Radius of the control markers.

###### padding

Padding between the markers and the edge of the controls.

###### sliderMargin

Distance between the hue/saturation wheel and the slider controls.

###### sliderHeight

Slider control height (by default this will be calculated automatically). 

###### borderWidth

Width of the border around the controls. Defaults to 0 (no border).

###### borderColor

Color of the border, any valid CSS color is supported.

###### anticlockwise

If set to `true`, the color wheel will be drawn in the other direction, with blues and purples towards the lower half of the wheel.

###### css

The CSS template used for the [Dynamic CSS](#Dynamic-CSS) feature.

### Using the Selected Color

Each color picker instance has a [`color`](color_api.html) object which - as you might expect - stores current color.

##### Get or Set the Color

The color object has a few properties that can be used to both get and set the selected color in different formats (a list of all of them can be found on [the color API page](color_api.html#Properties)). When the color is set this way, the UI will update and the [`color:change`](#color:change) event will fire.

```js
// Get the color's RGB value
var rgb = demoColorPicker.color.rgb;
//  rgb = { r: 255, g: 255, b: 0 }

// Set the color to
```

### Events

Each color picker has an event system that can be used to listen to certain events, like when the user starts interacting with the color picker. Event listers are added with the [`on`](colorPicker_api.html#on) method, and can be removed with the [`off`](colorPicker_api.html#off) method.

Here's an example showing what adding and then removing a listener to the `input:start` event might look like:

```js
// Listen to the input:start event
demoColorPicker.on("input:start", function onInputStart() {
  // do something...
});

// Remove a previously added event listener
demoColorPicker.off("input:start", onInputStart);
```

#### Event Types

###### input:start

Fired whenever the users starts interacting with the color picker controls.

###### input:end

Fired whenever the user stops interacting with the color picker controls.

###### color:change

Fired whenever the color changes -- either when the user interacts with the controls, or when it is set via code. 
This event is special, in that its callback function gets passed two values:
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

_Note: the `color:change` event will fire **very** quickly as the user drags the controls around. To slow it down you may want to try [debouncing](https://davidwalsh.name/javascript-debounce-function) your callback function._

### Dynamic CSS

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

`$color` is treated as a variable representing the currently selected color. For example, let's say the currently selected color is `rgb(255, 0, 0)` (pure red), using the template above, the CSS applied to the page would then look something like this:

```css
body {
  background-color: rgb(255, 0, 0);
}

input, button {
  border-color: rgb(255, 0, 0);
  color: rgb(255, 0, 0);
}
```