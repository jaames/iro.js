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

  // Initial color value -- any valid CSS color string works:
  color: "#fff"
});
```

### Using the Wheel's Color Value

Each color wheel instance has a `color` object which - as you might expect - stores current color of the wheel.

#### Getting and Setting the Color

The current color can be accessed in a variety of formats from the following `color` properties:

```javascript
var demoWheel = new iro.ColorWheel("#colorWheelDemo");

// hsv object:
var hsv = demoWheel.color.hsv
// hsv =  { h: 60, s: 100, v: 100 }

// hsl object:
var hsl = demoWheel.color.hsl;
// hsl = { h: 60, s: 100, l: 50 }

// hsl string:
var hslString = demoWheel.color.hslString;
// hslString = "hsl(60, 100%, 50%)"

// rgb object:
var rgb = demoWheel.color.rgb;
// rgb = { r: 255, g: 255, b: 0 }

// rgb string:
var rgbString = demoWheel.color.rgbString;
// rgbString = "rgb(255, 250, 0)"

// hex string:
var hexString = demoWheel.color.hexString;
// hexString = "#ffff00"
```

In addition, the current color can be changed by setting any of these properties to a new value, as long as the value given is valid, the color wheel UI will update to match:

```javascript
var demoWheel = new iro.ColorWheel("#colorWheelDemo");

// set the color wheel to red (in rgb notation):
demoWheel.color.hexString = "rgb(255, 0, 0)"

// set the color wheel to red (in hex notation):
demoWheel.color.hexString = "#ff0000";

// set the color wheel to red (in hsv notation, from an object):
demoWheel.color.hsv = { h: 0, s: 100, v: 100 }

```


#### Watching the color for changes

Sometimes you may want to update something external when a color wheel's selected color changes. To accomplish this, you can attach a "watch" function to a color wheel, which will get called whenever the selected color changes.

The new color is passed to the watch function whenever it is called.

```javascript
var demoWheel = new iro.ColorWheel("#colorWheelDemo");

// Whenever it changes, log the selected color to the dev console as a HEX string
demoWheel.watch(function(color) {
  console.log(color.hexString);
});

// If you ever want to remove the watch function, use:
demoWheel.unwatch();
```
