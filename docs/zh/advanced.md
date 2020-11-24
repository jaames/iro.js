---
title: 高级使用
---


## 自定义 UI 布局

iro.js带有各种内置UI组件。 使用颜色选择器的`layout`选项，可以根据需要将它们组合在一起。

布局使用颜色选择器的 `layout` 选项配置。 这应该是一个数组，每个元素都是具有 `component` 属性的对象。 `component` 属性指定了要使用的组件类型，可以是 `iro.ui.Wheel`, `iro.ui.Box` 或者 `iro.ui.Slider`.

例如，此处默认布局的组件定义(颜色轮和值滑块) 将会是这样的：

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

组件定义还可以包含一个 `选项` 属性来提供 [配置选项](/guide.html#颜色选择器设置) 覆盖个别组件。 在这个示例中，滚轮和滑块的边框宽度都是2，但是边框颜色不同：

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

### 可选组件

#### Wheel 轮子

<ColorPicker :width="240" :handleRadius="8" :sliderMargin="12" :layout="[
  {
    component: 'Wheel',
  }
]"/>

轮子允许用户调整颜色的 **色调** 和 **饱和度**. 它们还支持 [同时显示多个可选颜色](#多颜色选择器)。

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

有几个可选的轮子专用配置选项可以使用：

| 选项               | 用途                                                     | 默认值               |
|:---------------- |:------------------------------------------------------ |:----------------- |
| `wheelLightness` | 如果设置为 `false`, 当亮度降低时，颜色轮将不会变成黑色.                      | `true`            |
| `wheelAngle`     | 色轮的色调渐变的起始角度，以度为单位。                                    | `0`               |
| `wheelDirection` | 颜色轮的色调渐变方向；可选 顺时针`"clockwise"` 或 逆时针`"anticlockwise"`。 | `"anticlockwise"` |

#### Box 盒子

<ColorPicker :width="240" :handleRadius="8" :sliderMargin="12" :layout="[
  {
    component: 'Box',
  }
]"/>

盒子允许用户调整颜色的 **饱和度** 和 **值**。 它们还支持 [同时显示多个可选颜色](#多颜色选择器)。

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

There's a few optional box-specific config options that can be used:

| 选项          | 用途                                                                                                  | 默认值    |
|:----------- |:--------------------------------------------------------------------------------------------------- |:------ |
| `boxHeight` | Height of the box, measured in pixels. If this isn't set, it will use the box's width as its height | `null` |

#### Sliders 滑块

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
  }, ]"/>
<!-- 
<ColorPicker :width="230" :handleRadius="8" :sliderMargin="12" :layout="[
  
]"/> -->

Sliders allow the user to adjust a specific color channel. There are multiple slider types available, covering **hue**, **saturation**, **value**, **red**, **green**, **blue**, **alpha** and **kelvin temperature**.

##### `sliderType 滑块类型`

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

| Option           | Purpose                                                         | Default Value |
|:---------------- |:--------------------------------------------------------------- |:------------- |
| `minTemperature` | Minimum color temperature, in Kelvin (smallest value is `2000`) | `2200`        |
| `maxTemperature` | Maximum color temperature, in Kelvin (largest value is `40000`) | `11000`       |

##### `sliderShape 滑块形状`

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

## 多颜色选择器

iro.js supports having more than one selectable colors on the same color picker at any time, which can be useful for situations where you want the user to be able to work with color themes or harmonies!

### 设置

The `colors` [config option](/guide.html#color-picker-options) can be used to provide an intial list of colors to the color picker. Any [supported color format](/color_api.html#supported-color-formats) will work here:

```js
var colorPicker = new iro.ColorPicker('#picker', {
  colors: [
    'rgb(100%, 0, 0)', //纯红色
    'rgb(0, 100%, 0)', //纯绿色
    'rgb(0, 0, 100%)', //纯蓝色
  ]
});
```

### 使用多个颜色

An array of color objects which can be used to **get** and **set** the value of each color can be found on the color picker's `colors` property. This array will be in the same order as the colors passed to the color picker during [setup](#setup).

It's worth checking out the [working with colors guide](/guide.html#working-with-colors) to learn more about how these individual color objects work, but here's a quick overview:

```js
//将第一种颜色设置为新值
colorPicker.colors[0].rgbString = 'rgb(0%, 0%, 0%)';

//获得第二种颜色的饱和度
var saturation = colorPicker.colors[1].saturation;

//我们还可以遍历颜色数组
colorPicker.colors.forEach(function (color) {
  console.log(color.hexString);
});
```

### 事件

When working with [events](/guide.html#color-picker-events), it's important to remember that all of the color-change events (like `color:change`, `input:change`, `input:start`, etc) will fire for every color. To find which color fired the event, you can use the color's `index` property:

```js
colorPicker.on('color:change', function(color) {
//如果第一种颜色改变了
  if (color.index === 0) {
    console.log('颜色0变了！');
    //记录颜色索引和十六进制值
    console.log(color.index, color.hexString);
  }
});
```

### 活动颜色

The 'active' color refers to the color that was most recently selected by the user. When working with multiple colors on the same color picker, the colorPicker's `color` property will always reflect the currently active color:

```js
//记录活动颜色的十六进制值
console.log(colorPicker.color.hexString);

//您还可以使用color.index来获取活动的颜色索引！
var activeColorIndex = colorPicker.color.index;
```

Whenever the active color changes, the `color:setActive` event will fire:

```js
colorPicker.on('color:setActive', function(color) {
  console.log('新的活动颜色：', color.index);
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

## 自定义手柄

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