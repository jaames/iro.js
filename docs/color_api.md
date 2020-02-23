---
title: Color API
---

The Color API is used by color pickers to store the selected color and to handle conversions between different color models. It's also made accessible via `iro.Color` so that it can be used as a general color utility library.

## Constructor

**Arguments:**

* `{String | Object | Color}` Initial color. This can be any [supported color format](#supported-color-formats), or another Color instance.

## Supported Color Formats

* **Hex string**: `"#ff0000"`
* **Hex alpha string**: `"#ff0000ff"`
* **Shorthand hex string**: `"#f00"`
* **Shorthand hex alpha string**: `"#f00f"`
* **RGB string**: `"rgb(255, 0, 0)"`
* **RGBA string**: `"rgba(255, 0, 0, 1)"`
* **Percentage RGB string**: `"rgb(100%, 0%, 0%)"`
* **Percentage RGBA string**: `"rgba(100%, 0%, 0%, 100%)"`
* **RGB object**: `{r: 255, g: 0, b: 0}`
* **RGBA object**: `{r: 255, g: 0, b: 0, a: 1}` 
* **HSL string**: `"hsl(360, 50%, 100%)"`
* **HSLA string**: `"hsla(360, 50%, 100%, 1)"`
* **HSL object**: `{h: 360, s: 50, l: 100}`
* **HSLA object**: `{h: 360, s: 50, l: 100, a: 1}`
* **HSV object**: `{h: 360, s: 100, v: 50}`
* **HSVA object**: `{h: 360, s: 100, v: 50, a: 1}`

## Properties

Color objects have several "magic" properties that reflect the value of the color in different formats. The magic is that they are readable as well as writable, so they can both **get** and **set** the color from that given format.

### `red`

The color's red channel as a number between `0` and `255`.

### `green`

The color's green channel as a number between `0` and `255`.

### `blue`

The color's blue channel as a number between `0` and `255`.

### `alpha`

The color's value channel as a number between `0` and `1`.

### `hue`

The color's hue channel as a number between `0` and `360`.

### `saturation`

The color's saturation channel as a number between `0` and `100`.

### `value`

The color's value channel as a number between `0` and `100`.

### `kelvin`

The color's approximate kelvin temperature.

### `rgb`

The color as an [RGB](https://www.wikiwand.com/en/RGB_color_model) object.

**Example format**: `{r: 255, g: 0, b: 0}`

### `rgba`

The color as an [RGBA](https://www.wikiwand.com/en/RGB_color_model) object, where `a` represents the color's transparency.

**Example format**: `{r: 255, g: 0, b: 0, a: 1}`

### `hsv`

The color as a [HSV](https://www.wikiwand.com/en/HSL_and_HSV) object.

**Example format**: `{h: 360, s: 100, v: 50}`

### `hsva`

The color as a [HSVA](https://www.wikiwand.com/en/HSL_and_HSV) object, where `a` represents the color's transparency.

**Example format**: `{h: 360, s: 100, v: 50, a: 1}`

### `hsl`

The color as a [HSL](https://www.wikiwand.com/en/HSL_and_HSV) object.

**Example format**: `{h: 360, s: 50, l: 100}`

### `hsla`

The color as a [HSLA](https://www.wikiwand.com/en/HSL_and_HSV) object, where `a` represents the color's transparency.

**Example format**: `{h: 360, s: 50, l: 100, a: 1}`

### `hexString`

The color as a hex string. Shorthand hex input is also accepted.

**Example format**: `"#ff0000"` or `"#f00"`

### `hex8String`

The color as a hex alpha string. Shorthand hex input is also accepted.

**Example format**: `"#ff0000ff"` or `"#f00f"`

### `rgbString`

The color as an RGB string. Percentage-based RGB strings are also accepted as inputs.

**Example format**: `"rgb(255, 0, 0)"` or `"rgb(100%, 0%, 0%)"`

### `rgbaString`

The color as an RGBA string. Percentage-based RGBA strings are also accepted as inputs.

**Example format**: `"rgba(255, 0, 0, 1)"` or `"rgba(100%, 0%, 0%, 100%)"`

### `hslString`

The color as a percentage HSL string.

**Example format**: `"hsl(360, 100%, 50%)"`

### `hslaString`

The color as a percentage HSLA string

**Example format**: `"hsl(360, 100%, 50%, 1)"`

### `index`

The color's index.

## Methods

### `set`

Set the color from any [supported color format](#supported-color-formats).

**Arguments**:

* `{Color}`

### `setChannel`

Set a specific color channel to a new value. `format` can be either `hsv` or `rgb`, and `channel` should be a single letter representing which channel from the format you wish to set.

**Arguments**:

* `{String}` format
* `{String}` channel
* `{Number}` value

**Example**:

```js
// set the rgb red channel to 255:
color.setChannel('rgb', 'r', 255);

// set the hsv hue channel to 180:
color.setChannel('hsv', 'h', 255);
```

### `clone`

Copy the color and return a new Color object with the same value.

**Returns**: `{Color}`

### `reset`

Resets the color back to the value initially passed to the `iro.Color` constructor.

## Static Methods

### `hsvToRgb`

Convert a HSV object to an RGB object.

**Arguments**:

* `{Object}` HSV values, e.g `{h: 360, s: 100, v: 50}`

**Returns**: `{Object}` RGB values, e.g `{r: 255, g: 0, b: 0}`

### `rgbToHsv`

Convert an RGB object to a HSV object.

**Arguments**:

* `{Object}` RGB values, e.g `{r: 255, g: 0, b: 0}`

**Returns**: `{Object}` HSV values, e.g `{h: 360, s: 100, v: 50}`

### `hsvToHsl`

Convert a HSV object to a HSL object.

**Arguments**:

* `{Object}` HSV values, e.g `{h: 360, s: 50, v: 100}`

**Returns**: `{Object}` HSL values, e.g `{h: 360, s: 100, l: 100}`

### `hslToHsv`

Convert a HSL object to a HSV object.

**Arguments**:

* `{Object}` HSL values, e.g `{h: 360, s: 100, l: 100}`

**Returns**: `{Object}` HSV values, e.g `{h: 360, s: 50, v: 100}`


### `kelvinToRgb`

Convert a kelvin temperature to an approximated RGB object.

**Arguments**:

* `{Number}` kelvin temperature

**Returns**: `{Object}` RGB values, e.g `{r: 255, g: 0, b: 0}`

### `rgbToKelvin`

Convert an RGB object to an approximated kelvin temperature.

**Arguments**:

* `{Object}` RGB values, e.g `{r: 255, g: 0, b: 0}`

**Returns**: `{Number}` kelvin temperature