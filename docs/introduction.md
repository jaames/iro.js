---
title: Introduction
---

## Features

 * **Simple**: Low friction API, with robust support for hex, rgb, hsl and hsv color formats.
 * **Extendable**: Tweak the library to your requirements with [Plugins](/extensions.html) and custom UI elements.
 * **Great design**: The controls are designed to be intuitive and responsive, plus they're built with SVG so they look super crisp at any resolution.
 * **Consistent behaviour**: Works across all modern browsers and devices, including touchscreens.
 * **Small footprint**: [7kb](https://bundlephobia.com/result?p=@jaames/iro@beta) minified and gzipped, with absolutely no external dependencies, extra css/images, or jQuery in sight.
 * **Licenced under MPL 2.0**: 100% free for personal and commercial use.

## Demo

An collection of interactive demos are available on Codepen.

## Installation

### Install with NPM

```bash
$ npm install @jaames/iro@beta --save
```

If you are using a module bundler like Webpack or Rollup, import iro.js into your project: 

```javascript
// Using ES6 module syntax
import iro from '@jaames/iro';

// Using CommonJS modules
const iro = require('@jaames/iro');
```

### Download and host yourself

**[Development version](https://raw.githubusercontent.com/jaames/iro.js/v4/dist/iro.js)**<br/>
Uncompressed at around 52kB, with source comments included

**[Production version](https://raw.githubusercontent.com/jaames/iro.js/v4/dist/iro.min.js)**<br/>
Minified to 20kB

Then add it to the `<head>` of your page with a `<script>` tag:

```html
<html>
  <head>
    <!-- ... -->
    <script src="./path/to/iro.min.js"></script>
  </head>
  <!-- ... -->
</html>
```

When manually including the library like this, it will be globally available as `window.iro`.

### Using the jsDelivr CDN

```html
<script src="https://cdn.jsdelivr.net/npm/@jaames/iro@beta/dist/iro.min.js"></script>
```

## Support

