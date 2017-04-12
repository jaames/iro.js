## Color Picker API

### Constructor

**Arguments:**

* `{String | DOM Element} element`

* `{Object} [options]`

  * `{Number} width`
  * `{Number} height`
  * `{Number} padding`
  * `{Number} sliderMargin`
  * `{Number} sliderHeight`
  * `{Number} markerRadius`
  * `{String} color`
  * `{Object} css`

### Methods

#### `watch`

**Arguments:**

* `{Function} callback`

**Usage:**

Set a function to be called whenever the selected color changes. When called, the function will be passed the color picker's `color` object.

**Example:**

```js
// make a handler function that will log the color's hex value to the console
function colorChangeHandler(color) {
  console.log(color.hexString)
}

// add the function to a color picker instance
example.watch(colorChangeHandler)
```

#### `unwatch`

**Usage:**

Removes any callback added with `watch`.

### Properties

#### `color`

**Details:**

An [`iro.Color`](../color_api.md) object representing the currently selected color. It is tied to the color picker, as such updating this color object will also update the color picker.

**See also:** [Using the selected color]()

#### `stylesheet`

**Details:**

An [`iro.Stylesheet`](../stylesheet_api.md) object representing the dynamic CSS stylesheet for the color picker.

**See also:** [Dynamic CSS]()

#### `el`

**Details:**

The DOM object for the HTML element being used as a wrapper for the color picker.

#### `ui`

**Details:**

An array of "components" used to make up the color picker's UI.

#### `layers`

**Details:**

An object referencing the color picker's UI layers. Each layer is keyed by name, and has the properties `ctx` and `canvas`. `ctx` is the layer's [rendering context](https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D), and `canvas` references the the layer's HTML canvas element.

#### `css`

**Details:**

A static object representing the CSS styles to dynamically update whenever the selected color changes.
