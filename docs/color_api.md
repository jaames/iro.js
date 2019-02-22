---
title: Color API
---

The Color API is used by color pickers to store the selected color and to handle conversions between different color models. It's also made accessible via `iro.Color` so that it can be used as a general color utility library.

## Constructor

**Arguments:**

* `{String | Object | Color}` Initial color. This can be any [supported color format](#supported-color-formats), or another Color instance.

## Supported Color Formats

* **hex string**: `"#ff0000"`
* **hex rgba string**: `"#ff0000ff"`
* **shorthand hex string**: `"#f00"`
* **shorthand hex rgba string**: `"#f00f"`
* **rgb(a) string**: `"rgb(255, 0, 0)"`, `"rgba(255, 0, 0, 1)"`
* **percentage rgb(a) string**: `"rgb(100%, 0%, 0%)"`, `"rgba(100%, 0%, 0%, 100%)"`
* **rgb object**: `{r: 255, g: 0, b: 0}`
* **hsl(a) string**: `"hsl(360, 50%, 100%)"`, `"hsla(360, 50%, 100%, 1)"`
* **hsl object**: `{h: 360, s: 50, l: 100}`
* **hsv object**: `{h: 360, s: 100, v: 50}`

## Properties

Color objects have several "magic" properties that reflect the value of the color in different formats. The magic is that they are readable as well as writable, so they can both **get** and **set** the color from that given format.

### `hsv`

The color as a [hsv](https://www.wikiwand.com/en/HSL_and_HSV) object.

**Example format**: `{h: 360, s: 100, v: 50}`

### `hsl`

The color as a [hsl](https://www.wikiwand.com/en/HSL_and_HSV) object.

**Example format**: `{h: 360, s: 50, l: 100}`

### `rgb`

The color as an [rgb](https://www.wikiwand.com/en/RGB_color_model) object

**Example format**: `{r: 255, g: 0, b: 0}`

### `hslString`

The color as a percentage hsl string.

**Example format**: `"hsl(360, 100%, 50%)"`

### `rgbString`

The color as an rgb string. Percentage-based rgb strings are also accepted as inputs.

**Example format**: `"rgb(255, 0, 0)"` or `"rgb(100%, 0%, 0%)"`

### `hexString`

The color as a hex rgb string. Shorthand hex input is also accepted.

**Example format**: `"#ff0000"` or `"#f00"`

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

## Static Methods

### `hsvToRgb`

Convert a hsv object to an rgb object.

**Arguments**:

* `{Object}` hsv values, e.g `{h: 360, s: 100, v: 50}`

**Returns**: `{Object}` rgb values, e.g `{r: 255, g: 0, b: 0}`

### `rgbToHsv`

Convert an rgb object to a hsv object.

**Arguments**:

* `{Object}` rgb values, e.g `{r: 255, g: 0, b: 0}`

**Returns**: `{Object}` hsv values, e.g `{h: 360, s: 100, v: 50}`

### `hsvToHsl`

Convert a hsv object to a hsl object.

**Arguments**:

* `{Object}` hsv values, e.g `{h: 360, s: 50, v: 100}`

**Returns**: `{Object}` hsl values, e.g `{h: 360, s: 100, l: 100}`

### `hslToHsv`

Convert a hsl object to a hsv object.

**Arguments**:

* `{Object}` hsl values, e.g `{h: 360, s: 100, l: 100}`

**Returns**: `{Object}` hsv values, e.g `{h: 360, s: 50, v: 100}`