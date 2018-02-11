---
title: Introduction
github_url: https://github.com/jaames/iro.js/blob/master/www/src/introduction.md
---
### Features

 * Customizable SVG-based UI
 * Convert colors between RGB, HSV, HSL and hex RGB
 * Dynamicly update CSS styles when the selected color changes
 * Lightweight, at around 13KB minified (or ~5KB minified + gzipped)
 * Zero dependencies (not even jQuery or extra stylesheets/images)
 * Supports IE9+

### Download

[Development Version](https://raw.githubusercontent.com/jaames/iro.js/master/dist/iro.js) 
Uncompressed with comments at around 50kb

[Production Version](https://raw.githubusercontent.com/jaames/iro.js/master/dist/iro.min.js) 
Minified to just above 13kb

### Installation

Before starting you'll want to [download](#Download) iro.js and add it to your page. Once you've downloaded the script, add it to the `<head>` of your page with a `<script>` tag: 

```html
<html>
  <head>
    <!-- ... -->
    <script src="./path/to/iro.min.js"></script>
  </head>
  <!-- ... -->
</html>
```

----

Alternatively, you can grab the latest version of iro.js from NPM

```bash
$ npm install @jaames/iro
```

Then using a module bundler like Rollup or Webpack, use as you would anything else:

```js
// Using ES6 module syntax
import iro from "@jaames/iro";

// Using CommonJS
var iro = require("@jaames/iro");
```

### What's Next?

Continue over to the [Guide](guide.html) page to learn about using the library's main features. If you would prefer a whirlwind tour, check out the [Codepen Demo](https://codepen.io/rakujira/pen/WZOeNq?editors=0010).



