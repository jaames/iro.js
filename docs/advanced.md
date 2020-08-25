---
title: Advanced Usage
---


## Custom UI Layouts

iro.js comes with a variety of built-in UI components. With the color picker's `layout` option, these can be combined together however you'd like.

Layouts are configured with the color picker's `layout` option. This should be an array where each item is an object with a `component` property. The `component` property specifies the type of component to use, which can be either `iro.ui.Wheel`, `iro.ui.Box` or `iro.ui.Slider`.

For example, here's what the component definitions for the default layout (a color wheel and a value slider) would look like:

```js
var colorPicker = new iro.ColorPicker('#picker', {
  layout: [
    { 
      component: iro.ui.Wheel,
    },
    { 
      component: iro.ui.Slider,
    },
  ]
});
```

Component definitions can also include an `options` property to provide [config option](/guide.html#color-picker-options) overrides to individual components. In this example, the wheel and slider will both have the same border width of 2, but different border colors:

```js
var colorPicker = new iro.ColorPicker('#color-picker', {
  borderWidth: 2,
  layout: [
    {
      component: iro.ui.Wheel,
      options: {
        borderColor: '#ffffff'
      }
    },
    {
      component: iro.ui.Slider,
      options: {
        borderColor: '#000000'
      }
    }
  ]
});
```

### Available Components

#### Wheel

<ColorPicker :width="240" :handleRadius="8" :sliderMargin="12" :layout="[
  {
    component: 'Wheel',
  }
]"/>

Wheels allow the user to adjust the color's **hue** and **saturation**. They can also support showing [more than one selectable color at once](#multi-color-selections).

```js
var colorPicker = new iro.ColorPicker('#picker', {
  layout: [
    { 
      component: iro.ui.Wheel,
      options: {}
    },
  ]
});
```

There's a few optional wheel-specific config options that can be used:

| Option           | Purpose | Default Value |
|:-----------------|:--------|:--------|
| `wheelLightness` | If set to `false`, the color wheel will not fade to black when the lightness decreases. | `true` |
| `wheelAngle`     | Starting angle of the color wheel's hue gradient, measured in degrees. | `0` |
| `wheelDirection` | Direction of the color wheel's hue gradient; either `"clockwise"` or `"anticlockwise"`. | `"anticlockwise"` |

#### Box

<ColorPicker :width="240" :handleRadius="8" :sliderMargin="12" :layout="[
  {
    component: 'Box',
  }
]"/>

Boxes allow the user to adjust the color's **saturation** and **value**. They can also support showing [more than one selectable color at once](#multi-color-selections).

```js
var colorPicker = new iro.ColorPicker('#picker', {
  layout: [
    { 
      component: iro.ui.Box,
      options: {}
    },
  ]
});
```

#### Sliders

<ColorPicker :width="240" :handleRadius="8" :sliderMargin="12" layoutDirection="horizontal" :layout="[
  {
    component: 'Slider',
    options: {
      sliderType: 'hue',
    }
  },
  {
    component: 'Slider',
    options: {
      sliderType: 'saturation',
    }
  },
  {
    component: 'Slider',
    options: {
      sliderType: 'value',
    }
  },
  {
    component: 'Slider',
    options: {
      sliderType: 'red',
    }
  },
  {
    component: 'Slider',
    options: {
      sliderType: 'green',
    }
  },
  {
    component: 'Slider',
    options: {
      sliderType: 'blue',
    }
  },
  {
    component: 'Slider',
    options: {
      sliderType: 'alpha',
    }
  },
  {
    component: 'Slider',
    options: {
      sliderType: 'kelvin',
    }
  },
  {
    component: 'Slider',
    options: {
      sliderType: 'saturation',
      sliderShape: 'circle',
    }
  },
]"/>
<!-- 
<ColorPicker :width="230" :handleRadius="8" :sliderMargin="12" :layout="[
  
]"/> -->

Sliders allow the user to adjust a specific color channel. There are multiple slider types available, covering **hue**, **saturation**, **value**, **red**, **green**, **blue**, **alpha** and **kelvin temperature**.

##### `sliderType`

The type of slider can be specified with the `sliderType` option:

```js
var colorPicker = new iro.ColorPicker('#picker', {
  layout: [
    { 
      component: iro.ui.Slider,
      options: {
        // can also be 'saturation', 'value', 'red', 'green', 'blue', 'alpha' or 'kelvin'
        sliderType: 'hue'
      }
    },
  ]
});
```

If `sliderType` is set to `'kelvin'`, the temperature range can be set with these options:

| Option           | Purpose | Default Value |
|:-----------------|:--------|:--------|
| `minTemperature` | Minimum color temperature, in Kelvin (smallest value is `1000`) | `2200` |
| `maxTemperature` | Maximum color temperature, in Kelvin (largest value is `40000`) | `11000` |

##### `sliderShape`

The `sliderShape` option can also be used to make the slider circular:

```js
var colorPicker = new iro.ColorPicker('#picker', {
  layout: [
    { 
      component: iro.ui.Slider,
      options: {
        sliderShape: 'circle'
      }
    },
  ]
});
```

## Multi-Color Selections

iro.js supports having more than one selectable colors on the same color picker at any time, which can be useful for situations where you want the user to be able to work with color themes or harmonies!

### Setup

The `colors` [config option](/guide.html#color-picker-options) can be used to provide an intial list of colors to the color picker. Any [supported color format](/color_api.html#supported-color-formats) will work here:

```js
var colorPicker = new iro.ColorPicker('#picker', {
  colors: [
    'rgb(100%, 0, 0)', // pure red
    'rgb(0, 100%, 0)', // pure green
    'rgb(0, 0, 100%)', // pure blue
  ]
});
```

### Working with Multiple Colors

An array of color objects which can be used to **get** and **set** the value of each color can be found on the color picker's `colors` property. This array will be in the same order as the colors passed to the color picker during [setup](#setup).

It's worth checking out the [working with colors guide](/guide.html#working-with-colors) to learn more about how these individual color objects work, but here's a quick overview:

```js
// set the first color to a new value
colorPicker.colors[0].rgbString = 'rgb(0%, 0%, 0%)';

// get the saturation of the second color
var saturation = colorPicker.colors[1].saturation;

// we can also loop through the colors array
colorPicker.colors.forEach(function (color) {
  console.log(color.hexString);
});
```

### Events

When working with [events](/guide.html#color-picker-events), it's important to remember that all of the color-change events (like `color:change`, `input:change`, `input:start`, etc) will fire for every color. To find which color fired the event, you can use the color's `index` property:

```js
colorPicker.on('color:change', function(color) {
  // if the first color changed
  if (color.index === 0) {
    console.log('color 0 changed!');
    // log the color index and hex value
    console.log(color.index, color.hexString);
  }
});
```

### The Active Color

The 'active' color refers to the color that was most recently selected by the user. When working with multiple colors on the same color picker, the colorPicker's `color` property will always reflect the currently active color:

```js
// log the active color's hex value
console.log(colorPicker.color.hexString);

// you can also use color.index to get the active color index!
var activeColorIndex = colorPicker.color.index;
```

Whenever the active color changes, the `color:setActive` event will fire:

```js
colorPicker.on('color:setActive', function(color) {
  console.log('New active color:', color.index);
});
```

It's also possible to programmatically set the active color, by passing the index of the desired color to the `setActiveColor` method:

```js
colorPicker.setActiveColor(1);
```

### Components Using the Active Color

By default, Silder and Box components will reflect whichever color is currently active. However this can be manually overriden with their `activeIndex` option:

```js
var colorPicker = new iro.ColorPicker("#demoWheel", {
  layout: [
    // default slider, will reflect whichever color is currently active
    {
      component: iro.ui.Slider,
      options: {
        sliderType: 'value'
      }
    },
    // this slider will always reflect the color at index 2
    {
      component: iro.ui.Slider,
      options: {
        sliderType: 'value',
        activeIndex: 2,
      }
    },
  ]
});
```

### Adding and Removing Colors

Colors can be added and removed from the color picker at any time:

```js
// add a color to the color picker
// this will add the color to the end of the colors array
colorPicker.addColor('rgb(100%, 100%, 100%)');

// you can also specify an index for the new color
// add a color at index 0
colorPicker.addColor('rgb(100%, 100%, 100%)', 0);

// remove the color at index 1
colorPicker.removeColor(1);
```

You can also replace all of the colors at once with the `setColors` method:

```js
colorPicker.setColors([
  'rgba(100%, 0%, 100%)'
  'rgba(0%, 0%, 0%)'
  'rgba(0%, 100%, 100%)'
]);
```

## Custom Handles

By default, the color picker uses circular control handles which can be adjusted with the `handleRadius` option. However, it's possible to override this and use your own SVGs to create custom handles.

Handle SVGs need to be placed somewhere within the page HTML, and the SVG content also needs to be wrapped inside a `<g>` tag with a unique `id`, which itself is wrapped in a `<defs>` tag:

```svg
<svg>
  <defs>
    <g id="handle">
      <!-- this is where the handle svg content starts -->
      <rect x="0" y="0" width="8" height="8"></rect>
      <!-- this is where the handle svg content ends -->
    </g>
  </defs>
</svg>
```

Then when the color picker is created, make sure the `handleSvg` option is an **id selector** which matches the handle SVG:

```js
var colorPicker = new iro.ColorPicker('#picker', {
  handleSvg: '#handle'
});
```

The custom handle SVG will be drawn as if the center point is at `x 0, y 0`, but if you need to adjust the position of the handle, the `handleProps` option can be used to change the center point:

```js
var colorPicker = new iro.ColorPicker('#picker', {
  handleSvg: '#handle',
  handleProps: { x: -4, y: -4 }
});
```

It's recommended to check out the interactive [Custom Handle Demo](https://codepen.io/rakujira/pen/vbeENp?editors=1010) on Codepen to get a better understanding of how this feature works.