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

Available options and their purpose are listed below:

###### `color`

Used to set the default color from a string. Supported formats are HEX `#ffffff`, RGB `rgb(255, 255, 255)` and HSL `hsl(0, 50%, 100%)`.

###### `width`
###### `height`

Maximum dimensions for the control UI -- iro.js will make sure everything fits into this area.

###### `markerRadius`

Radius of the control markers.

###### `padding`

Padding between the markers and the edge of the controls.

###### `sliderMargin`

Distance between the hue/saturation wheel and the slider controls.

###### `sliderHeight`

Slider control height (by default this will be calculated automatically). 

###### `borderWidth`

Width of the border around the controls. Defaults to 0 (no border).

###### `borderColor`

Color of the border, any valid CSS color is supported.

###### `anticlockwise`

If set to `true`, the color wheel will be drawn in the other direction, with blues and purples towards the lower half of the wheel.

###### `css`

The CSS template used for the [Dynamic CSS](#Dynamic-CSS) feature.

### Events

###### `input:start`

Fired whenever the users starts interacting with the color picker controls.

###### `input:end`

Fired whenever the user stops interacting with the color picker controls.

###### `color:change`

Fired whenever the color changes.

_Note: the `color:change` event will fire **very** quickly as the user drags the controls around. To slow it down you may want to try [debouncing](https://davidwalsh.name/javascript-debounce-function) your callback function._

###### `*`

Special wildcard event listener -- this will be fired for _any_ of the events above.

### Dynamic CSS

With the Dynamic CSS feature you can automatically write CSS styles and update them as the selected color changes. All you need to do is provide a CSS "template" when creating the color picker:

```js
var demoColorPicker = new iro.ColorPicker("#color-picker-container", {
  // ...
  css: {
    "body": {
      "background-color": "$rgb"
    },
    "input, button": {
      "border-color": "$rgb",
      "color": "$rgb"
    }
  }
});
```

If the currently selected color is `rgb(255, 0, 0)` then the CSS applied to the page would look something like this:

```css
body {
  background-color: rgb(255, 0, 0);
}

input, button {
  border-color: rgb(255, 0, 0);
  color: rgb(255, 0, 0);
}
```