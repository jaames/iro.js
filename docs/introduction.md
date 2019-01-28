---
title: Introduction
---

<h1 align="center"><a href="//iro.js.org"><img height="340" src="https://raw.githubusercontent.com/jaames/iro.js/v4/assets/screenshot.png"/><br/>iro.js</a></h1>

<p align="center">
  <b>A highly customizable svg-based color picker with zero external dependencies | <a href="//iro.js.org">iro.js.org</a></b>
</p>

<p align="center">
  <a href="https://github.com/jaames/iro.js/blob/master/LICENSE.txt">
    <img src="https://badgen.net/github/license/jaames/iro.js?color=BB5FD1" alt="license" />
  </a>
  <a href="https://npmjs.org/package/@jaames/iro">
    <img src="https://badgen.net/npm/v/@jaames/iro?color=6C8FF2" alt="version" />
  </a>
  <a href="https://npmjs.org/package/@jaames/iro">
    <img src="https://badgen.net/npm/dt/@jaames/iro?color=6AD4E0" alt="downloads" />
  </a>
  <a href="https://bundlephobia.com/result?p=@jaames/iro@beta">
    <img src="https://badgen.net/bundlephobia/minzip/@jaames/iro@beta?color=6FDF89" alt="minzip size" />
  </a>
  <a href="">
    <img src="https://badgen.net/badge/dependencies/none/F8AE55" alt="dependencies" />
  </a>
  <a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=XS9R3QTLZYAXQ&source=url">
    <img src="https://badgen.net/badge/donate/paypal/ED5151" alt="donate" />
  </a>
</p>

## Features

 * **Simple**: Low friction API, with robust support for hex, rgb, hsl and hsv color formats.
 * **Good-looking**: A lot of attention has been spent making the UI look and feel intuitive. It's also all SVG, so it looks great on any screen, at any scale. 
 * **Small footprint**: Around [~7kb](https://bundlephobia.com/result?p=@jaames/iro@beta) minified and gzipped, with absolutely no external dependencies, extra css/images, or jQuery in sight.
 * **Consistent**: Supports all modern browsers and is responsive on touchscreen devices.
 * **Customizable**: Tweak the library to your requirements with [Plugins](#plugins) and custom UI elements.
 * **Licenced under MPL 2.0**: 100% free for personal and commercial use.

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
Uncompressed at around 50kB, with source comments included

**[Production version](https://raw.githubusercontent.com/jaames/iro.js/v4/dist/iro.min.js)**<br/>
Minified to 19kB

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

## Demo

Coming soon!
