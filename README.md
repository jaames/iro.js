<p align="center">
  <a href="https://rakujira.jp/projects/iro/"">
    <img width="666" src="https://raw.githubusercontent.com/jaames/iro.js/master/assets/animated_logo.gif"/>
  </a>
</p>

### Main Features

* Pretty color wheel UI with touch and HiDPI/retina screen support
* Color model conversion between RGB, HSV, HSL and hexadecimal RGB
* Dynamically update CSS styles when the selected color changes
* Zero dependencies (not even jQuery or extra stylesheets/images!)
* Supports all major browsers from IE10 up
* Lightweight, at just about 11KB minified (or ~4KB minified + gzipped)
* Buzzword buzzword buzzword, you get the idea

### Install

 * download [iro.min.js](https://raw.githubusercontent.com/jaames/iro.js/master/dist/iro.min.js)

### Quick Start

To set up a color picker, first we need to make a HTML element to act as a container for it:

```html
<div id="example">
  <!-- The color picker will be inserted here -->
</div>
```

Then we can initialize it with JavaScript, by passing a [CSS selector](https://css-tricks.com/how-css-selectors-work/) for the container element to the `iro.ColorPicker` constructor:

```javascript
var exampleColorPicker = new iro.ColorPicker("#example");
```

Color pickers can also be customized by passing an option object to the `iro.ColorPicker` constructor. All options are, uh, optional:

```javascript
var exampleColorPicker = new iro.ColorPicker("#example", {
  // Canvas dimensions:
  width: 320,
  height: 320,
  // Initial color value -- any hex, rgb or hsl color string works:
  color: "#fff",
  // Radius of the markers that show the current color:
  markerRadius: 8,
  // Padding space around the markers:
  padding: 4,
  // Space between the hue/saturation ring and the value slider:
  sliderMargin: 24,
  // Add a border around the controls:
  borderWidth: 2,
  // Set the border color (defaults to white):
  borderColor: "#000",
  // CSS rules to update as the selected color changes
  css: {
    "body": {
      "background-color": "rgb"
    },
    "input, button": {
      "border-color": "rgb",
      "color": "rgb"
    }
  }
});
```

That's it! For more information about what Iro can do, check out the [`/docs`](https://github.com/jaames/iro.js/tree/master/docs). (:

### Building

#### Install dependencies:

`npm install`

#### Build:

`npm run build`

#### Run dev server:

`npm run dev`

### Todo

 * Add code tests (I really need to learn how to do this tbh, it's super important)
 * Add options to change the position of the value slider to the left or right
 * Add transparency support
 * Publish on NPM

### Changelog

#### 2.2.0

##### Additions

* `iro.ColorPicker` instances now have a full event system, with `on`, `off` and `emit` methods. Listening for `color:change` is the same as using the `watch` method, and there are new `input:start` and `input:end` methods for detecting when the user begins and finishes interacting with the color picker. 

#### 2.1.0

##### Additions

* The `iro.ColorPicker` constructor has new (optional) `borderWidth` and `borderColor` options, which can be used to add borders around the color picker's UI elements

##### Changes

* The gradient used by the color picker's value slider is now based on the currently selected color
* Clean up the build process, and get webpack-dev-server's HMR mode to work properly
* Replace relative module import paths with aliased absolute paths

#### 2.0.0

This version represents a major rewrite of the library, although there are no major API changes. Anything using the publicly documented 1.0.0 API should be fully compatible with ver 2.0.0 and above (but not vice versa) for the foreseeable future.

**Note:** version 1.0.0 of the library has been preserved in the `v1` branch. Feel free to use it if you want IE 9 support, but note that I don't intend to actively maintain it.

##### Additions

 - Stylesheet API has some new methods and properties:
	* `on()` and `off()` - enable and disable the stylesheet styles
    * `getCss()` - returns the stylesheet content as an object
    * `getCssText()` - returns the stylesheet content as a string
    * `sheet`  - stylesheet's [CSSStyleSheet](//developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet) object
    * `rules`  - stylesheet's [CSSRuleList](//developer.mozilla.org/en-US/docs/Web/API/CSSRuleList) object
    * `map`  - stylesheet's [CSSStyleDeclaration](//developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration) objects; keyed by the CSS selector that they belong to

 - Added a proper build process using webpack

##### Changes

 - Full rewrite, including splitting code into seperate files and switching to es6 syntax
 - IE 9 support dropped in favor of filesize
 - `iro.ColorWheel` was renamed to `iro.ColorPicker`, although `ColorWheel` is still supported for backwards compatibility.
 - The `styles` option for `iro.ColorPicker` was renamed to `css`, but again, the former is still supported
 - Docsite was dropped in favor of just using github (I may use hexo in the future, though!)
 - Landing page redesigned


#### 1.0.0 - Initial version
