---
title: Migration Guide
---

## Migrating from v3

### Color Picker Options

* `anticlockwise` option has been removed, and is now hardcoded to `true`
* `markerRadius` option has been renamed as `handleRadius`

### Static Color Methods

The following methods have been renamed:

* `hsv2Hsl` -> `hsvToHsl`
* `hsl2Hsv` -> `hslToHsv`
* `rgb2Hsv` -> `rgbToHsv`
* `hsv2Rgb` -> `hsvToRgb`

The following methods have been removed:

* `parseHexStr`
* `parseRgbStr`
* `parseHslStr`
* `rgb2Hex`
* `rgb2Str`
* `hsl2Str`
* `mix`
* `lighten`
* `darken`
* `compare`

### Color Methods

The following

* `mix`
* `lighten`
* `darken`

### Dynamic CSS

The Dynamic CSS feature and has become a seperate plugin; [iro-dynamic-css](https://github.com/jaames/iro-dynamic-css).