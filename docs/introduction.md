---
title: Introduction
---

## Features

 * Customizable SVG-based UI
 * Convert colors between RGB, HSV, HSL and hex RGB
 * Dynamicly update CSS styles when the selected color changes
 * Lightweight, at around 13kB minified (or 5kB minified + gzipped)
 * Zero dependencies (not even jQuery or extra stylesheets/images)
 * Supports IE9+

## Download

[Development Version](https://raw.githubusercontent.com/jaames/iro.js/master/dist/iro.js) <br>
Uncompressed with comments at around 50kB

[Production Version](https://raw.githubusercontent.com/jaames/iro.js/master/dist/iro.min.js) <br>
Minified to 13kB

## Installation

[Download](#Download) iro.js and add it to the `<head>` of your page with a `<script>` tag:

```html
<html>
  <head>
    <!-- ... -->
    <script src="./path/to/iro.min.js"></script>
  </head>
  <!-- ... -->
</html>
```

When using the library this way, it will be available globally as `window.iro`.

----

*Or* install the latest version of iro.js from [npm](https://www.npmjs.com/package/@jaames/iro):

```bash
$ npm install @jaames/iro
```

Then using a module bundler like Rollup or Webpack, import it into your code:

```js
// Using ES6 module syntax
import iro from "@jaames/iro";

// Using CommonJS
var iro = require("@jaames/iro");
```