## Color API

The color API is used by `colorPicker` objects to store the selected color and to handle conversions between different color models.

The API is made accessible via `iro.Color`.

### Supported Color Formats

#### HSV

* HSV object: `{h: 360, s: 100, v: 50}`.

#### RGB

* RGB object: `{r: 255, g: 0, b: 0}`.
* RGB string: `rgb(255, 0, 0)`, percentage values like `rgb(100%, 0%, 0%)` also work.
* HEX RGB string: `#FFFFFF`, the shorthand format (`#FFF`) is supported too.

#### HSL

* HSL object: `{h: 360, s: 50, l: 100}`.
* HSL string: `hsl(360, 50%, 100%)`.

### Methods

#### `set`

**Arguments:**

* `{Color} color`

**Usage:** Set the color from any [supported color format]().

#### `mix`

**Arguments:**

* `{Color} color`
* `{Number} weight`

**Usage:** Mix a color into the current one.`weight` is a value between 0 and 100 - closer to 0 = more current color, closer to 100 = more new color.

#### `lighten`

**Arguments:**

* `{Number} amount`

**Usage:** Lighten color by `amount`.

#### `darken`

**Arguments:**

* `{Number} amount`

**Usage:** Darken color by `amount`.

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

### Static Methods

These functions are provided by `iro.Color` at all times.

#### `mix`

**Arguments:**

* `{Color} color1`
* `{Color} color2`
* `{Number} weight`

**Usage:** Mix two colors together, returning a new `iro.Color` instance. `weight` is a value between 0 and 100 - closer to 0 = more color1, closer to 100 = more color2.

#### `lighten`

**Arguments:**

* `{Color} color`
* `{Number} amount`

**Usage:** Lighten `color` by `amount`, returning a new `iro.Color` instance.

#### `darken`

**Arguments:**

* `{Color} color`
* `{Number} amount`

**Usage:** Darken `color` by `amount`, returning a new `iro.Color` instance.

#### `hsv2Rgb`

**Usage:** Convert a HSV object `{h: 360, s: 100, v: 50}` to an RGB object `{r: 255, g: 0, b: 0}`.

#### `rgb2Hsv`

**Usage:** Convert an RGB object `{r: 255, g: 0, b: 0}` to a HSV object `{h: 360, s: 100, v: 50}`.

#### `hsv2Hsl`

**Usage:** Convert a HSV object `{h: 360, s:50, v:100}` to a HSL object `{h: 360, s: 100, l: 100}`.

#### `hsl2Hsv`

**Usage:** Convert a HSL object `{h: 360, s: 100, l: 100}` to a HSV object `{h: 360, s:50, v:100}`.

#### `hsl2Str`

**Usage:** Convert a HSL object `{h: 360, s: 100, l: 100}` to a HSL string `hsl(360, 100, 100)`.

#### `rgb2Str`

**Usage:** Convert an RGB object `{r: 255, g: 0, b: 0}` to an RGB string `rgb(255, 0, 0)`.

#### `rgb2Hex`

**Usage:** Convert a RGB object `{r: 255, g: 0, b: 0}` to a HEX string `#FF0000`.

#### `parseHexStr`

**Usage:** Convert a HEX string `#FF0000` to an RGB object `{r: 255, g: 0, b: 0}`.

#### `parseHslStr`

**Usage:** Convert a HSL string `hsl(360, 100, 100)` to a HSL object `{h: 360, s: 100, l: 100}`.

#### `parseRgbStr`

**Usage:** Convert an RGB string `rgb(255, 0, 0)` to an RGB object `{r: 255, g: 0, b: 0}`.