## Guide

*This guide is a work-in-progress and doesn't cover all of Iro's functionality at the moment -- please bare with me as I finish it!*

### Installation

To use Iro in your project, first [download the minified script](https://raw.githubusercontent.com/jaames/iro.js/master/dist/iro.min.js) then link it at the bottom of your HTML (just before the closing `</body>` tag) like so:

```html
<html>
  <head>
    <!-- ... -->
  </head>
  <body>
    <!-- ... -->
    <script src="/path/to/iro.min.js"></script>
  </body>
</html>
```

### Quick Start

To set up a color wheel, all you need to do is have a HTML element to "mount" it to.

Both of these snippets do the same thing; they will create a new color wheel and mount it to an element with the ID of "colorWheelDemo".
It's up to you to choose which is more appropriate for your needs.

```javascript
// You can use a CSS selector and let Iro find the element itself
var demoWheel = new iro.ColorWheel("#colorWheelDemo");
```

```javascript
// Or for more control, you can directly pass it a HTML DOM Object
var demoWheelElement = document.getElementById("colorWheelDemo");
var demoWheel = new iro.ColorWheel(demoWheelElement);
```

### Basic Options

You can customize the color wheel by passing an options object into the second parameter of the constructor.

The values shown here are the defaults for each option.

```javascript
var demoWheel = new iro.ColorWheel("#colorWheelDemo", {
  // UI canvas dimensions:
  // (Iro will try to use up as much canvas space as possible)
  width: 320,
  height: 320,

  // Radius of the markers that show the current color:
  markerRadius: 8,
  // Padding space around the markers:
  padding: 4,
  // Space between the hue/saturation ring and the value slider:
  sliderMargin: 24,

  // Initial color value (any valid CSS color string works!):
  color: "#fff"
});
```

### Working with the Color Value

Each color wheel instance has a 'color' property which - as you might expect - stores the currently selected color. It has a variety of methods attached to it to set and get the color value.

#### Programmatically setting the selected color

Whenever the selected color is set with one of these methods, the color wheel UI will update to show the new value.

It should be noted that Iro doesn't support transparency yet, so any alpha channel values will be ignored.

```javascript
var demoWheel = new iro.ColorWheel("#colorWheelDemo");

/* Set the color from a CSS color string */

// set from HEX (in either full or shorthand form):
demoWheel.color.setFromString("#fff");
demoWheel.color.setFromString("#ffffff");
// set from RGB or RGBA:
demoWheel.color.setFromString("rgb(255, 255, 255)");
demoWheel.color.setFromString("rgba(255, 255, 255, 1)");
// set from HSL or HSLA:
demoWheel.color.setFromString("hsl(0, 0%, 100%)");
demoWheel.color.setFromString("hsla(0, 0%, 100%, 1)");

/* Set the color from numeric values */

// set from RGB:
demoWheel.color.setFromRgb({
  r: 255,
  g: 255,
  b: 255
});
// set from HSL:
demoWheel.color.setFromHsl({
  h: 0,
  s: 0,
  l: 100
});
// set from HSV:
demoWheel.color.setFromHsv({
  h: 0,
  s: 0,
  v: 100
});
```

#### Getting the currently selected color

```javascript
var demoWheel = new iro.ColorWheel("#colorWheelDemo");

// Return the color as a HEX string:
demoWheel.color.getHexString();
// -> "#ffffff"

// Return the color as a HEX string, using shorthand form when possible:
demoWheel.color.getHexString(true);
// -> "#fff"

// Return the color as an RGB string:
demoWheel.color.getRgbString();
// -> "rgb(255, 255, 255)"

// Return the color as an RGB string:
demoWheel.color.getRgb();
// -> {r: 255, g: 255, b: 255}

// Return the color as an RGB string:
demoWheel.color.getHslString();
// -> "hsl(0, 0%, 100%)"

// Return the color as an RGB string:
demoWheel.color.getHsl();
// -> {h: 0, s: 0, l: 100}
```

#### Watching the color for changes

Sometimes you may want to update something external when a color wheel's selected color changes. To accomplish this, you can attach a "watch" function to a color wheel, which will get called whenever the selected color changes.

The new color is passed to the watch function whenever it is called.

```javascript
var demoWheel = new iro.ColorWheel("#colorWheelDemo");

// Whenever it changes, log the selected color to the dev console as a HEX string
demoWheel.watch(function(color) {
  console.log(color.getHexString());
});

// If you ever want to remove the watch function, use:
demoWheel.unwatch();
```
