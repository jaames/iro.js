---
title: ColorPicker API
---

The color picker API is the main feature of iro.js, and is accessible on `iro.ColorPicker`.

## Constructor

**Arguments:**

* `{String | DOM Element}` CSS selector or DOM node for the color picker container
* `{Object}` [color picker options](#options)

## Options

### `width`

The total width of the color picker UI, measured in pixels. 

**Default value**: `300`

### `color`

The default selected color. This option can be any [supported color format](/color_api.html#supported-color-formats).

**Default value**: `"#ffffff"`

### `display`

CSS display value for the color picker root element.

**Default value**: `"block"`

### `id`

HTML ID for the color picker root element.

**Default value**: `null`

### `layout`

Component definition array used for [custom layouts](/advanced.html#custom-ui-layouts).

**Default value**: `null`

### `layoutDirection`

Component stacking direction; either `"vertical"` or `"horizontal"`.

**Default value**: `"vertical"`

### `borderWidth`

Width of the border around the controls, measured in pixels. 

**Default value**: `0` (no border)

### `borderColor`

Color of the border. Any valid CSS color is supported.

**Default value**: `"#ffffff"`

### `padding`

Padding between control handles and the edges of a component.

**Default value**: `6`

### `margin`

Gap between individual components.

**Default value**: `12`

### `handleRadius`

Radius of the control handles, measued in pixels.

**Default value**: `8`

### `handleSvg`

SVG reference for [Custom Handles](/advanced.html#custom-handles). This should be an ID selector that matches your handle SVG.

**Default value**: `null` (default handle is used)

### `handleProps`

Properties for [Custom Handles](/advanced.html#custom-handles).

**Default value**: `{ x: 0, y: 0 }`

### `wheelLightness`

If set to `false`, the color wheel will not fade to black when the lightness decreases.

**Default value**: `true`

### `wheelAngle`

Starting angle of the color wheel's hue gradient, measured in degrees.

**Default value**: `0`

### `wheelDirection`

Direction of the color wheel's hue gradient, either `"clockwise"` or `"anticlockwise"`.

**Default value**: `"anticlockwise"`

### `sliderSize`

Slider size, measued in pixels.

**Default value**: By default this will be calculated automatically from `padding` and `handleRadius`.

## Properties

### `color`

An [`iro.Color`](/colorPicker_api.html) object representing the currently selected color. Updating this color object will also update the seclected color in the picker.

**See also:** [Using the Selected Color](/guide.html#color-picker-options)

### `colors`

An array of [`iro.Color`](/colorPicker_api.html) objects representing the currently selected colors, used for [multicolor](/advanced.html#multicolor). Updating any of these color objects will also update the seclected color in the picker.

### `el`

The HTML element being used as the color picker container.

### `base`

The HTML element being used as the color picker's base element.

### `props`

The initial configeration options passed to the color picker.

### `id`

The ID value passed to the color picker config.

## Event Methods

**Arguments:**

* `{Number}` width
* `{Number}` height

### `on`

Add a listener to a color picker event.

**Arguments:**

* `{String | Array}` [Event Type(s)](#events)
* `{Function}` callback

**Example:**

```js
// make a handler function
function colorChangeCallback(color) {
  console.log(color.hexString);
}

// start listening to the color change event
// colorChangeCallback will be called whenever the color changes
example.on("color:change", colorChangeCallback);
```

### `off`

Remove event listeners that were registered with `on`.

**Arguments:**

* `{String | Array}` [Event Type(s)](#events)
* `{Function}` callback

**Example:**

```js
// make a handler function
function colorChangeCallback(color) {
  console.log(color.hexString);
}

// start listening to the color change event
// colorChangeCallback will be called whenever the color changes
example.on("color:change", colorChangeCallback);

// stop listening to the color change event
// colorChangeCallback won't be called ehen the color changes
example.off("color:change", colorChangeCallback);
```

## Multicolor Methods

### `addColor`

Add another selectable color to the color picker.

**Arguments:**

* `{IroColorValue}` color value - The color to add, this can be an `iro.Color` or any [supported color format](/color_api.html#supported-color-formats).
* `{Number}` color index (optional) - Defaults to the end of the color array

### `removeColor`

Remove a color from the color picker.

**Arguments:**

* `{Number}` color index

### `setActiveColor`

Set the currently 'active' color (the color that is selected and highlighted).

**Arguments:**

* `{Number}` color index

### `setColors`

Replaces all the colors currently on the color picker with a new set of colors.

**Arguments:**

* `{Color []}` new color values

## Utility Methods

### `resize`

Set the color picker to a new size.

**Arguments:**

* `{Number}` width

### `reset`

Reset the color picker back to the original color value passed to the color picker config.

### `forceUpdate`

Force the color picker to rerender.

### `emit`

Used internally to dispatch an event. All function arguments after the event type will be passed to the event callback.

**Arguments:**

* `{String}` [Event Type](#events)

### `deferredEmit`

Used internally to dispatch an deferred event. Deferred events are stored until an event listener for them is added with `on`.

**Arguments:**

* `{String}` [Event Type](#events)

## Events

The color picker's [on](#on) method can be used to register callbacks for color picker events, such as when the selected color changes or when the user begins interacting with the picker. These callbacks can also be removed with the [off](#off) method.

### `color:change`

Fired whenever the color changes -- either when the user interacts with the controls, or when it is set via code. This event's callbacks will receive the color object that changed, as well as an object which reflects which h,s,v channels changed. It is safe to modify the `color` object within callbacks for this event.

### `input:change`

Similar to `color:change`, except this is only fired whenever the color is changed with *direct user input*. Callbacks for this event recieve exactly the same parameters as `color:change`. It is also safe to modify the `color` object within callbacks for this event.

### `input:start`

Fired whenever the users starts interacting with the color picker controls. This event's callbacks will receive the current color object.

### `input:move`

Fired when the user moves their pointer/mouse after beginning interaction. This event's callbacks will receive the current color object.

### `input:end`

Fired whenever the user stops interacting with the color picker controls. This event's callbacks will receive the current color object.

### `color:init`

Fired whenever a new color is created. This event's callbacks will receive the new creat color object.

### `color:remove`

Fired when a color is removed from the color picker. This event's callbacks will receive the removed color object

### `color:setActive`

Fired whenever the 'active' color is switched. This event's callbacks will receive the active color object.

### `mount`

Fired when the colorPicker's UI has been mounted to the DOM and is ready for user interaction. The colorPicker object is passed to this event's callback function.