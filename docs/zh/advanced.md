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

#### Sliders 滑块

<ColorPicker :width="240" :handleRadius="8" :sliderMargin="12" :layout="[
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
      sliderType: 'alpha',
    }
  },
  {
    component: 'Slider',
    options: {
      sliderType: 'kelvin',
    }
  }, ]"/>

<ColorPicker :width="230" :handleRadius="8" :sliderMargin="12" :layout="[
  {
    component: 'Slider',
    options: {
      sliderType: 'saturation',
      sliderShape: 'circle',
    }
  }, ]"/>

滑块允许用户调整特定的颜色通道。 当前有多种类型的滑块可用，包括 色调 **hue**，饱和度 **saturation**，值 **value**，透明通道 **alpha** 和 冷暖值（开尔文温度） **kelvin temperature**.

##### `sliderType 滑块类型`

可以使用 `sliderType` 选项指定滑块类型：

```js
var colorPicker = new iro.ColorPicker('#picker', {
  layout: [
    { 
      component: iro.ui.Slider,
      options: {
        sliderType: 'hue' //也可以是 'saturation', 'value', 'alpha' 或 'kelvin'
      }
    },
  ]
});
```

如果 `sliderType` 设置为 `kelvin`, 色温范围可以用这些选项设置：

| 选项               | 用途                        | 默认值     |
|:---------------- |:------------------------- |:------- |
| `minTemperature` | Kelvin最小色温值(最小值为 `1000`)  | `2200`  |
| `maxTemperature` | Kelvin最大色温值(最大值是 `40000`) | `11000` |

##### `sliderShape 滑块形状`

`sliderShape` 选项也可用于使滑块变为圆形：

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

iro.js支持随时在同一颜色选择器上具有多种可选颜色，这对于希望用户能够处理颜色主题的情况非常有用！

### 设置

`colors` [配置选项](/guide.html#颜色选择器选项) 可以用来为颜色选择器提供一份颜色列表。 任何 [支持的颜色格式](/color_api.html#支持的颜色格式) 将在这里工作：

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

颜色对象数组可用于** get **和** set **，每种颜色的值可以在颜色选择器的` colors `属性中找到。 此数组将在 [设置](#设置) 期间以相同的颜色传递给颜色选择器。

值得查阅[使用颜色指南](/guide.html#使用颜色)，以了解有关这些单个颜色对象如何工作的更多信息，但这里有一个简要概述：

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

在处理[事件](/guide.html#颜色选择事件)时，请务必记住所有颜色更改事件将针对每种颜色触发 (例如` color:change ` ，` input:change `，` input:start `等)。 要找到触发事件的颜色，您可以使用颜色的 `index` 属性：

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

“活动”颜色是指最近由用户选择的颜色。 当在同一颜色选择器上使用多个颜色时，颜色选择器的 `color` 属性将永远反映当前活动的颜色：

```js
//记录活动颜色的十六进制值
console.log(colorPicker.color.hexString);

//您还可以使用color.index来获取活动的颜色索引！
var activeColorIndex = colorPicker.color.index;
```

当活动颜色改变时， `color:setActive` 事件将会触发：

```js
colorPicker.on('color:setActive', function(color) {
  console.log('新的活动颜色：', color.index);
});
```

也可以通过将所需颜色的索引传递到 `setActiveColor` 方法来设置活动颜色：

```js
colorPicker.setActiveColor(1);
```

### 添加和删除颜色

颜色可以随时从颜色选择器中添加和删除：

```js
//为颜色选择器添加颜色
//这会将颜色添加到colors数组的末尾
colorPicker.addColor('rgb(100%, 100%, 100%)');

//您还可以为新颜色指定索引
//在索引0添加颜色
colorPicker.addColor('rgb(100%, 100%, 100%)', 0);

//删除索引1处的颜色
colorPicker.removeColor(1);
```

您也可以用 `setColors` 方法一次性替换所有颜色：

```js
colorPicker.setColors([
  'rgba(100%, 0%, 100%)'
  'rgba(0%, 0%, 0%)'
  'rgba(0%, 100%, 100%)'
]);
```

## 自定义手柄

默认情况下，颜色选择器使用圆形控制手柄，可以使用 `handleRadius` 选项进行调整。 然而，可以覆盖这个并使用你自己的SVG来创建自定义手柄。

手柄的SVG需要放置在页面HTML内的某处，并且SVG内容也需要包装在具有唯一 `id` 的 `<g>` 标签内，该标签本身包装在 `<defs>` 标签中：

```svg
<svg>
  <defs>
    <g id="handle"><!-- 手柄的svg内容开始 --><rect x="0" y="0" width="8" height="8"></rect><!-- 手柄的svg内容结束 --></g>
  </defs>
</svg>
```

然后，在创建颜色选择器时，确保` handleSvg `选项是与手柄SVG匹配的 **id选择器 **：

```js
var colorPicker = new iro.ColorPicker('#picker', {
  handleSvg: '#handle'
});
```

自定义手柄SVG将被绘制为中心点在 `x 0, y 0` ，但是如果需要调整手柄的位置，` handleProps` 选项用于更改中心点：

```js
var colorPicker = new iro.ColorPicker('#picker', {
  handleSvg: '#handle',
  handleProps: { x: -4, y: -4 }
});
```

建议在 Codepen 上查看交互式 [自定义手柄演示](https://codepen.io/rakujira/pen/vbeENp?editors=1010) 以更好地了解此功能的运作方式。