---
title: Introduction
github_url: https://github.com/jaames/iro.js/blob/master/www/src/introduction.md
---
### Features

 * Customizable SVG-based UI
 * Lightweight, at just over 12KB minified (or about 5KB minified + gzipped)
 * Zero dependencies (not even jQuery or extra stylesheets/images)
 * Dynamicly update CSS styles when the selected color changes
 * Convert colors between RGB, HSV, HSL and hex RGB
 * Support for all major browsers (including mobile!) from IE9 up

### Download

[Development Version](https://raw.githubusercontent.com/jaames/iro.js/master/dist/iro.js) 
Uncompressed with comments at around 45kb

[Production Version](https://raw.githubusercontent.com/jaames/iro.js/master/dist/iro.min.js) 
Minified to just above 12kb

### Installation

Before starting you'll want to [download](#Download) iro.js and add it to your page. Once you've downloaded the script, place it inside the `<head>` of the document using a `<script>` tag: `<script src="./path/to/iro.min.js"></script>`

----

Alternatively, you can grab the latest version of iro.js from GitHub via NPM:
`npm install git+https://git@github.com/jaames/iro.js.git --save`

Then using a module bundler like Rollup or Webpack, use as you would anything else:
```js
// Using ES6 modules
import iro from "iro.js";

// Using CommonJS modules
var iro = require("iro.js");
```

### What Now?

Continue over to the [Guide](guide.html) page to learn about using iro.js main features. If you're more of a practical learner, you might prefer to take a look at the [Codepen Demo]()



