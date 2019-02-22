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

### `borderWidth`

Width of the border around the controls, measured in pixels. 

**Default value**: `0` (no border)

### `borderColor`

Color of the border. Any valid CSS color is supported.

**Default value**: `"#ffffff"`

### `padding`

Padding around the control handles.

**Default value**: `6`

### `handleRadius`

Radius of the control handles, measued in pixels.

**Default value**: `8`

### `handleSvg`

SVG reference for [Custom Handles](/guide.html#custom-handles). This should be an ID selector that matches your handle SVG.

**Default value**: `null` (default handle is used)

### `handleOrigin`

Origin point for [Custom Handles](/guide.html#custom-handles).

**Default value**: `{ x: 0, y: 0 }`

### `wheelLightness`

If set to `false`, the color wheel will not fade to black when the lightness decreases.

**Default value**: `true`

### `sliderHeight`

Slider height, measued in pixels.

**Default value**: By default this will be calculated automatically from `padding` and `handleRadius`.

### `sliderMargin`

Gap between the wheel and the slider controls, measured in pixels. 

**Default value**: `12`

### `display`

CSS display value for the color picker root element.

**Default value**: `"block"`

### `layout`

Component array used for [Custom Layouts](/guide.html#custom-layouts).

**Default value**: `"block"`

## Properties

### `color`

An [`iro.Color`](/colorPicker_api.html) object representing the currently selected color. Updating this color object will also update the seclected color in the picker.

**See also:** [Using the Selected Color](/guide.html#color-picker-options)

### `el`

The HTML element being used as the color picker container.

### `base`

The HTML element being used as the color picker's base element.

### `props`

The initial configetation options passed to the color picker.

## Methods

### `reset`

Reset the color picker back to the original color value passed to the color picker config.

### `resize`

Set the color picker to a new size. Note: height is currently ignored.

**Arguments:**

* `{Number}` width
* `{Number}` height

### `on`

Add a listener to a color picker event.

**Arguments:**

* `{String}` [Event Type](#events)
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

* `{String}` [Event Type](#events)
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

### `forceUpdate`

Force the color picker to rerender. This can be used to resolve a [known issue](https://github.com/jaames/iro.js/issues/18) where Safari will render the color picker as black when using certain client-side routing libraries, including Angular's default router.


### `emit`

Used internally to dispatch an event. All function parameters after the event type will be passed to the event callback.

**Arguments:**

* `{String}` [Event Type](#events)

### `emitHook`

Used internally to dispatch a plugin hook. All function parameters after the event type will be passed to the hook callback. The callback's `this` value will also be set to reference the color picker instance that fired this hook.

**Arguments:**

* `{String}` [Event Type](#events)
* `{Function}` callback

## Static Methods

### `addHook`

Used by plugins to register a global [Plugin Hook](#plugin-hooks).

**Arguments:**

* `{String} hookType`
* `{Function} callback`

## Events

The color picker's [on](#on) method can be used to register callbacks for color picker events, such as when the selected color changes or when the user begins interacting with the picker. These callbacks can also be removed with the [off](#off) method.

### `color:change`

Fired whenever the color changes -- either when the user interacts with the controls, or when it is set via code. This event's callback function gets passed the currently selected color and an object which reflects which h,s,v channels changed.

### `input:start`

Fired whenever the users starts interacting with the color picker controls. The colorPicker's color object is passed to this event's callback function.

### `input:end`

Fired whenever the user stops interacting with the color picker controls. The colorPicker's color object is passed to this event's callback function.

### `mount`

Fired when the colorPicker's UI has been mounted to the DOM and is ready for user interaction. A reference to the colorPicker object is passed to this event's callback function.

## Plugin Hooks

Plugin hooks are used by [Plugins](/plugins.html) to add extra behaviour to the color picker -- you shouldn't need these unless you are writing a color picker plugin.

They behave just like events, except they are added globally to every color picker instance with the static [`addHook`](#addhook) method. When a hook callback is called, its `this` context is also bound to the color picker instance that triggered that hook. 

### `init:before`

Fired as soon as the new color picker is constructed. At this point, the `props` property is available, so this is the ideal point to parse any color picker config parameters that your plugin uses.

### `init:state`

Fired once the color picker state has been initiated. You may merge your own values into `this.state` here. The `color` property is also available and events can be registered at this point.

### `init:after`

Fired once the color picker has done initialising layout. The `layout` param is now available.

### `mount`

Fired when the color picker has been mounted into the DOM. When this is fired, the `el` and `base` properties are available.

### `event:on`

Fired when an event is registered. Callbacks for this hook will be passed the event type and callback function.

### `event:off`

Fired when an event is unregistered. Callbacks for this hook will be passed the event type and callback function.

### `color:beforeUpdate`

Fired after the selected color has changed, but before the color picker UI has updated.

### `color:afterUpdate`

Fired after the color picker UI has reacted to the selected color update. The selected color cannot be modified at this stage, otherwise it will cause infinite update loops.

### `color:change`

Fired at the same time as the `color:change` event. The color can be modified here if necessary.

### `input:start`

Fired at the same time as the `input:start` event.

### `input:move`

Fired at the same time as the `input:move` event.

### `input:end`

Fired at the same time as the `input:end` event.

