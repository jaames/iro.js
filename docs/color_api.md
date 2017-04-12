## Color API

The color API is used by `colorPicker` objects to store the selected color and to handle conversions between different color models.

The API is made accessible via the `iro.Color` constructor so that developers can make use of it should they wish, however if you're looking for more functionality, then I highly recommend using something like [cssobj](https://github.com/cssobj/cssobj). Iro is a color picker widget, not a fancy CSS-in-JS library. :P

### Methods

#### `set`

**Arguments:**

* `{Object} hsv`
	* `{Number} h`
	* `{Number} s`
	* `{Number} v`

**Usage:** Set the color's HSV value.

#### `get`

**Usage:** Get the color's HSV value.

#### `watch`

**Arguments:**

* `{Function} callback`

**Usage:**

Set a function to be called whenever the selected color changes. When called, the function will be passed the color's new HSV value, the old HSV value, and an object representing which HSV channels changed.

**Example:**

```js
// add a watch callback to exampleColor
exampleColor.watch(function(newHsv, oldHsv, changed) {
	// if the hue channel changed, log the new hue value to the console:
    if(changed.h) {
		console.log(newHsv.h)
    }

    // if the saturation channel changed, log the old saturation value to the console:
    if(changed.s) {
		console.log(oldHsv.s)
    }
})
```

#### `unwatch`

**Usage:**

Removes any callback added with `watch`.

#### `fromString`

**Arguments:**

* `{String} color string`

**Usage:**

Sets the color from a HEX, RGB or HSL color string.

### Properties

All of these color properties are writable as well as readable, which means they can be used to both *set* and *get* the color from various models.

#### `hsv`

**Details:** The color as a [HSV](https://www.wikiwand.com/en/HSL_and_HSV) object

**Example format:** `{h: 360, s: 100, v: 50}`

#### `hsl`

**Details:** The color as a [HSL](https://www.wikiwand.com/en/HSL_and_HSV) object

**Example format:** `{h: 360, s: 50, l: 100}`

#### `rgb`

**Details:** The color as an [RGB](https://www.wikiwand.com/en/RGB_color_model) object

**Example format:** `{r: 255, g: 0, b: 0}`

#### `hslString`

**Details:** The color as a HSL string

**Example format:** `hsl(360, 100%, 50%)`

#### `rgbString`

**Details:** The color as an RGB string

**Example format:** `rgb(255, 0, 0)`

#### `hexString`

**Details:** The color as a HEX string (supports shorthand notation)

**Example format:** `#f00`
