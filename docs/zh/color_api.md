---
title: 颜色 API
---

颜色选择器使用颜色API来存储选定的颜色和处理不同颜色模型之间的转换。 还可以通过 `iro.``Color` 对其进行访问，以便可以将其用作常规颜色实用程序库。

## 构造函数

**参数：**

* `{String | Object | Color}` 初始颜色。 这可以是任何 [支持的颜色格式](#supported-color-formats)或另一个颜色实例。

## 支持的颜色格式

* **十六进制字符串**: `"#ff0000"`
* **带透明通道的十六进制字符串**: `"#ff0000ff"`
* **简写的十六进制字符串**: `"#f00"`
* **简写的带透明通道的十六进制字符串**: `"#ff0000ff"`
* **RGB字符串**: `"rgb(255, 0, 0)"`
* **带透明通道的RGB字符串**: `"rgba(255, 0, 0, 1)"`
* **百分比RGB字符串**: `"rgb(100%，0%，0%)"`
* **带透明通道的百分比RGB字符串**: `"rgba(100%，0%，0%，100%)"`
* **RGB对象**: `{r: 255, g: 0, b: 0}`
* **带透明通道的RGB对象**: `{r: 255, g: 0, b: 0, a: 1}`
* **HSL字符串**: `"hsl(360%, 50%)"`
* **带透明通道的HSL字符串**: `"hslam (360, 50%, 100%, 1)"`
* **HSL对象**: `{h: 360, s: 50, l: 100}`
* **带透明通道的HSL对象**: `{h: 360, s: 50, l: 100, a: 1}`
* **HSV对象**: `{h: 360, s: 100, v: 50}`
* **带透明通道的HSV对象**: `{h: 360, s: 100, v: 50, a: 1}`

## 属性

颜色对象有几个“魔法”属性，它们以不同格式反映颜色的值。 神奇之处在于它们既可读又可写，因此它们都可以 **get** 和 **set** 给定的格式。

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

## 方法

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

## 静态方法

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