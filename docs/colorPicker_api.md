---
title: Color Picker API
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

## Methods

### on

**Arguments:**

* `{String} eventType`
* `{Function} callback`

**Details:**

Add listeners to color picker events.

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
example.on("color:change", colorChangeHandler)
```

### off

**Arguments:**

* `{String} eventType`
* `{Function} callback`

**Details:**

Remove event listeners added with `on`

**Example:**

```js
// make a handler function that will log the color's hex value to the console
function colorChangeHandler(color) {
  console.log(color.hexString)
}

// start listening to the color change event, now colorChangeHandler will be called whenever the color changes
example.on("color:change", colorChangeHandler);

// stop listening to the color change event, colorChangeHandler won't be called ehen the color changes
example.off("color:change", colorChangeHandler);
```

## Properties

### color

**Details:**

An [`iro.Color`](/colorPicker_api.html) object representing the currently selected color. It is tied to the color picker, as such updating this color object will also update the color picker.

**See also:** [Using the Selected Color](/guide.html#Using-the-Selected-Color)

### stylesheet

**Details:**

An [`iro.Stylesheet`](/stylesheet_api.html) object representing the dynamic CSS stylesheet for the color picker.

**See also:** [Dynamic CSS](/guide.html#Dynamic-CSS)

### el

**Details:**

The DOM object for the HTML element being used as a wrapper for the color picker.

### ui

**Details:**

An array of "components" used to make up the color picker's UI.

### css

**Details:**

CSS template for the dynamic CSS feature.
