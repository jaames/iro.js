---
title: Introduction
github_url: https://github.com/jaames/iro.js/blob/master/www/src/introduction.md
---
### Features

 * Customizable SVG-based UI
 * Lightweight, at just under 15KB minified (or about 5KB minified + gzipped)
 * Zero dependencies (not even jQuery or extra stylesheets/images)
 * Dynamicly update CSS styles when the selected color changes
 * Convert colors between RGB, HSV, HSL and hex RGB
 * Support for all major browsers (including mobile!) from IE9 up

### Download

[Development Version](https://raw.githubusercontent.com/jaames/iro.js/blob/master/dist/iro.js) 
Uncompressed with comments at around 50kb

[Production Version](https://raw.githubusercontent.com/jaames/iro.js/blob/master/dist/iro.min.js) 
Minified to just under 15kb

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

### Getting Started

To set up a color picker, we need to make a HTML element with a unique identifier (an `id` attribute works well!) to act as a container:
```html
<div id="color-picker-container"></div>
```

Now all we need to do is create a new instance of iro.ColorPicker, and tell it to use the container element we just made by providing it with a matching [CSS selector](https://developer.mozilla.org/en-US/docs/Learn/CSS/Introduction_to_CSS/Selectors):
```js
var demoColorPicker = new iro.ColorPicker("#color-picker-container");
```
_Note: You can provide a DOM object instead of a CSS selector if you prefer_ 

Of course you probably want to customise some things, just provide a list of options when creating a new color picker:

```js
var demoColorPicker = new iro.ColorPicker("#color-picker-container", {
  // Set the size of the color picker UI
  width: 320,
  height: 320,
  // Set the initial color to red
  defaultValue: "#f00"
});
```

For a full list of options check out the [options guide](guide.html#Color-Picker-Options).






