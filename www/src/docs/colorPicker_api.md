## Color Picker API

### Constructor

**Arguments:**

* `{String | DOM Element} element`

* `{Object} [options]`

  * `{Number} width`
  * `{Number} height`
  * `{String} color`
  * `{Number} padding`
  * `{Number} sliderMargin`
  * `{Number} sliderHeight`
  * `{Number} markerRadius`
  * `{Number} borderWidth`
  * `{String} borderColor`
  * `{Object} css`

### Methods

#### `on`

**Arguments:**

* `{String} eventType`
* `{Function} callback`

**Usage:**

Add listeners to color picker events.

**`eventType` values:**

| `eventType`    | usage |
|----------------|-------|
| `color:change` | when the color has changed, the callback gets passed the new `color` object |
| `input:start` | when the user starts interacting with the color picker |
| `input:end` | when the user has finished interacting with the color picker |
| `*` | listen to all events |

**Example:**

```js
// make a handler function that will log the color's hex value to the console
function colorChangeHandler(color) {
  console.log(color.hexString)
}

// start listening to the color change event, now colorChangeHandler will be called whenever the color changes
example.on("color:change", colorChangeHandler)
```

#### `off`

**Arguments:**

* `{String} eventType`
* `{Function} callback`

**Usage:**

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

#### `css`

**Details:**

CSS template for the dynamic CSS feature.
