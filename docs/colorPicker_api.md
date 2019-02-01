---
title: ColorPicker API
---

## Constructor

**Arguments:**

* `{String | DOM Element} element`

* `{Object} [options]`

  * `{Number} width`
  * `{Number} height`
  * `{String} color`
  * `{Number} padding`
  * `{Number} sliderMargin`
  * `{Number} sliderHeight`
  * `{Boolean} wheelLightness`
  * `{Number} markerRadius`
  * `{Number} borderWidth`
  * `{String} borderColor`
  * `{String} display`
  * `{Boolean} anticlockwise`
  * `{Object} css`

**See also:** The [Color Picker Options](/guide.html#Color-Picker-Options) guide.

## Properties

### color

An [`iro.Color`](/colorPicker_api.html) object representing the currently selected color. Updating this color object will also update the seclected color in the picker.

**See also:** [Using the Selected Color](/guide.html#Using-the-Selected-Color)

### el

The HTML element being used as the color picker container.

### base

The HTML element being used as the color picker base element.

### props

The initial configetation options passed to the color picker.

## Methods

### resize

Update the color picker width

### reset

Reset the color picker back to the original color value passed to the color picker config.

### forceUpdate

Force the color picker to rerender

### on

Add listeners to color picker events.

**Arguments:**

* `{String} eventType`
* `{Function} callback`

**`eventType` values:**

| `eventType`    | usage |
|----------------|-------|
| `color:change` | when the color has changed, the callback gets passed the `color` object and an object providing which color channels (out of H, S, V) have changed. |
| `input:start` | when the user starts interacting with the color picker, the callback gets passed the `color` object |
| `input:end` | when the user has finished interacting with the color picker, the callback gets passed the `color` object |
| `mount` | fired once the color picker UI has been mounted into the DOM |
| `*` | listen to all events |

**See also:** The [Events](/guide.html#Events) guide.

**Example:**

```js
// make a handler function that will log the color's hex value to the console
function colorChangeHandler(color) {
  console.log(color.hexString)
}

// start listening to the color change event, now colorChangeHandler will be called whenever the color changes
example.on('color:change', colorChangeHandler)
```

### off

Remove event listeners added with `on`.

**Arguments:**

* `{String} eventType`
* `{Function} callback`

**Example:**

```js
// make a handler function that will log the color's hex value to the console
function colorChangeHandler(color) {
  console.log(color.hexString)
}

// start listening to the color change event, now colorChangeHandler will be called whenever the color changes
example.on('color:change', colorChangeHandler);

// stop listening to the color change event, colorChangeHandler won't be called ehen the color changes
example.off('color:change', colorChangeHandler);
```

### emit

Used internally to dispatch an event. 

### emitHook

Used internally to dispatch a plugin hook.

## Static Methods

### addHook

Used by plugins to hook into the color picker lifecycle. Plugin hooks are just like events, except they are added globally to every color picker instance. When a hook callback is called, its `this` context is also bound to the color picker instance. Check the [Plugin Hooks](#plugin-hooks) section for a full list of available hooks.

**Arguments:**

* `{String} hookType`
* `{Function} callback`

## Plugin Hooks

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

Fired after the color picker UI has reacted to the selected color changing. The selected color cannot be modified at this stage, otherwise it will cause infinite update loops.

### `color:change`

Fired at the same time as the `color:change` event. The color can be modified here if necessary.

### `input:start`

Fired at the same time as the `input:start` event.

### `input:move`

Fired at the same time as the `input:move` event.

### `input:end`

Fired at the same time as the `input:end` event.

