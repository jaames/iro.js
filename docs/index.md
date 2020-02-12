---
layout: Home
home: true
---

::: slot tutorial-iro-js
### Installation

#### Install with NPM

```bash
$ npm install @jaames/iro --save
```

If you are using a module bundler like Webpack or Rollup, import iro.js into your project: 

```javascript
// Using ES6 module syntax
import iro from '@jaames/iro';

// Using CommonJS modules
const iro = require('@jaames/iro');
```

#### Download and host yourself

**[Development version](https://raw.githubusercontent.com/jaames/iro.js/master/dist/iro.js)**<br/>
Uncompressed at around 52kB, with source comments included

**[Production version](https://raw.githubusercontent.com/jaames/iro.js/master/dist/iro.min.js)**<br/>
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

#### Using the jsDelivr CDN

```html
<script src="https://cdn.jsdelivr.net/npm/@jaames/iro/dist/iro.min.js"></script>
```

### Getting Started

Create a HTML element with a unique identifier (such as an `id` attribute) to act as a container for the color picker:

```html
<div id="color-picker-container"></div>
```

Then use JavaScript to create a new `iro.ColorPicker` with a CSS selector that matches your chosen container element:

```js
var colorPicker = new iro.ColorPicker('#color-picker-container');
```

You can also use a DOM object instead of a CSS selector here -- this might be more suitable if you're integrating iro.js into an application built with Vue, React, Angular, etc.