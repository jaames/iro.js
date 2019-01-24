---
title: Color API
---

The color API is used by `colorPicker` objects to store the selected color and to handle conversions between different color models.

The API is made accessible via `iro.Color`.

## Supported Color Formats

### HSV

* HSV object: `{h: 360, s: 100, v: 50}`.

### RGB

* RGB object: `{r: 255, g: 0, b: 0}`.
* RGB string: `rgb(255, 0, 0)`, percentage values like `rgb(100%, 0%, 0%)` also work.
* HEX RGB string: `#FFFFFF`, the shorthand format (`#FFF`) is supported too.

### HSL

* HSL object: `{h: 360, s: 50, l: 100}`.
* HSL string: `hsl(360, 50%, 100%)`.

Any param with type `{Color}` listed below can be any one of these formats, or an existing instance of iro.Color.

## Methods

### set

Set the color from any [supported color format](#Supported-Color-Formats).

**Arguments:**

* `{Color} color`

### setChannel 

Set a specific color channel to a new value. `model` can be either `hsv`, `hsl` or `rgb`, and `channel` should be a single letter representing which channel from the model you wish to set.

**Arguments:**

* `{String} model`
* `{String} channel`
* `{Number} value`

### compare

Compare differences between this color and another, returning an object that represents which channels have changed between the two. `model` can be used to specify either `hsv`, `hsl` or `rgb` (default is `hsv`). 

**Arguments:**

* `{Color} color`
* `{String} model`

### clone

Copy this color object, returning a new color object with the same value.

**Returns:** `{Color}`

### mix

Mix a color into the current one.`weight` is a value between 0 and 100 - closer to 0 = more current color, closer to 100 = more new color.

**Arguments:**

* `{Color} color`
* `{Number} weight`

### lighten

Lighten color by `amount`.

**Arguments:**

* `{Number} amount`

### darken

Darken color by `amount`.

**Arguments:**

* `{Number} amount`

## Properties

All of these color properties are writable as well as readable, which means they can be used to both *set* and *get* the color from various models.

### hsv

The color as a [HSV](https://www.wikiwand.com/en/HSL_and_HSV) object

**Example format:** `{h: 360, s: 100, v: 50}`

### hsl

The color as a [HSL](https://www.wikiwand.com/en/HSL_and_HSV) object

**Example format:** `{h: 360, s: 50, l: 100}`

### rgb

The color as an [RGB](https://www.wikiwand.com/en/RGB_color_model) object

**Example format:** `{r: 255, g: 0, b: 0}`

### hslString

The color as a HSL string

**Example format:** `hsl(360, 100%, 50%)`

### rgbString

The color as an RGB string

**Example format:** `rgb(255, 0, 0)` **or** `rgb(100%, 0%, 0%)`

### hexString

The color as a HEX string (supports shorthand notation)

**Example format:** `#ff0000` **or** where applicable, the shorthand format: `#f00`

## Static Methods

These functions are provided by `iro.Color` at all times.

### mix

Mix two colors together, returning a new `iro.Color` instance. `weight` is a value between 0 and 100 - closer to 0 = more color1, closer to 100 = more color2.

**Arguments:**

* `{Color} color1`
* `{Color} color2`
* `{Number} weight`

### lighten

Lighten `color` by `amount`, returning a new `iro.Color` instance.

**Arguments:**

* `{Color} color`
* `{Number} amount`

### darken

Darken `color` by `amount`, returning a new `iro.Color` instance.

**Arguments:**

* `{Color} color`
* `{Number} amount`

### hsv2Rgb

Convert a HSV object `{h: 360, s: 100, v: 50}` to an RGB object `{r: 255, g: 0, b: 0}`.

### rgb2Hsv

Convert an RGB object `{r: 255, g: 0, b: 0}` to a HSV object `{h: 360, s: 100, v: 50}`.

### hsv2Hsl

Convert a HSV object `{h: 360, s:50, v:100}` to a HSL object `{h: 360, s: 100, l: 100}`.

### hsl2Hsv

Convert a HSL object `{h: 360, s: 100, l: 100}` to a HSV object `{h: 360, s:50, v:100}`.

### hsl2Str

Convert a HSL object `{h: 360, s: 100, l: 100}` to a HSL string `hsl(360, 100, 100)`.

### rgb2Str

Convert an RGB object `{r: 255, g: 0, b: 0}` to an RGB string `rgb(255, 0, 0)`.

### rgb2Hex

Convert a RGB object `{r: 255, g: 0, b: 0}` to a HEX string `#FF0000`.

### parseHexStr

Convert a HEX string `#FF0000` to an RGB object `{r: 255, g: 0, b: 0}`.

### parseHslStr

Convert a HSL string `hsl(360, 100, 100)` to a HSL object `{h: 360, s: 100, l: 100}`.

### parseRgbStr

Convert an RGB string `rgb(255, 0, 0)` to an RGB object `{r: 255, g: 0, b: 0}`.