---
title: Migration Guide
---

## Migrating from v3

iro.js version 4.0.0 is a major rewrite of the core library which aims to solve numerous long-standing issues with the library. Most of these changes won't affect 99% of the core use-cases, but if needed, version 3.5.1 has been preserved in the [v3 branch](https://github.com/jaames/iro.js/tree/v3).

### Color Picker Options

* `anticlockwise` option has been removed, and is now hardcoded to `true`
* `markerRadius` option has been renamed as `handleRadius`

### Safari Bugfix Note

To resolve an issue where Safari wasn't rendering the color picker properly because of certain client-side routing libraries, it was previously recommended to call `emit('history:statechange')` on the color picker when navigating to new client-side routes. This has been deprecated in favour of the catch-all `forceUpdate()` color picker method.

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

The following color methods have been removed:

* `mix`
* `lighten`
* `darken`

### Dynamic CSS

The Dynamic CSS feature and has become a seperate plugin; [iro-dynamic-css](https://github.com/jaames/iro-dynamic-css).