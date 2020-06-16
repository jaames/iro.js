---
title: 开始使用
---

## 安装

### 通过NPM安装

```bash
$ npm install @jaames/iro --save
```

如果您使用的是Webpack或Rollup之类的模块捆绑器，请将iro.js导入您的项目中：

```js
//使用ES6模块语法
import iro from '@jaames/iro';

//使用CommonJS模块
const iro = require('@jaames/iro');
```

### 也可使用 CDN

将此脚本拖放到您页面的 HTML `<head>` 中：

```html
<script src="https://cdn.jsdelivr.net/npm/@jaames/iro@5"></script>
```

当您手动包含这样的库时，iro.js将在 `window.iro` 上全局可用。

### 也可下载并自己托管

**[开发版本](https://raw.githubusercontent.com/jaames/iro.js/master/dist/iro.js)**<br/>未压缩，包括源注释。 用于调试。

**[生产版本](https://raw.githubusercontent.com/jaames/iro.js/master/dist/iro.min.js)**<br/>缩小和优化的版本。

## 颜色选择器设置

首先， 我们需要一个具有唯一标识符的HTML元素 (例如一个 `id` 属性) 作为颜色选择器的容器：

```html
<div id="picker"></div>
```

然后使用 JavaScript 创建一个新的 `iro.ColorPicker` 与您选择的容器元素匹配的 CSS 选择器：

```js
var colorPicker = new iro.ColorPicker('#picker');
```

您还可以在此处使用DOM对象而不是CSS选择器 -- 如果将iro.js集成到使用诸如Vue，React等框架构建的应用程序中，这可能更合适。

## 颜色选择器选项

可以通过将一组选项传递给 `iro.ColorPicker` 的第二个参数来自定义颜色选择器：

```js
var colorPicker = new iro.ColorPicker("#picker", {
  //设置颜色选择器的大小
  width: 320,
  //将初始颜色设置为纯红色
  color: "#f00"
});
```

### 可选选项

| 选项                | 用途                                                     | 默认值               |
|:----------------- |:------------------------------------------------------ |:----------------- |
| `width`           | 控件的总宽度。                                                | `300`             |
| `color`           | 初始颜色值。 这可以是任意 [支持的颜色格式](/color_api.html#支持的颜色格式)。      | `"#ffffff"`       |
| `colors`          | 用于 [多颜色选择](/advanced.html#多颜色选择器) 的初始颜色值。              | null              |
| `display`         | 颜色选择器根元素的 CSS 显示值。                                     | `"block"`         |
| `id`              | 颜色选择器根元素的 HTML ID。                                     | `null`            |
| `layout`          | 用于自定义 [UI 组件布局](/advanced.html#自定义-UI-布局)。             | `null`            |
| `layoutDirection` | UI组件堆叠方向； 垂直 `"vertical"` 或 水平 `"horizontal"`.         | `"vertical"`      |
| `padding`         | 在控制手柄周围填充。                                             | `6`               |
| `margin`          | 各个组件之间的间隙。                                             | `12`              |
| `borderWidth`     | 控制点边框的宽度。 设置为 `0` 表示无边框。                               | `0`               |
| `borderColor`     | 边框的颜色。 支持任何有效的 CSS 颜色。                                 | `"#ffffff"`       |
| `handleRadius`    | 控制手柄的半径                                                | `8`               |
| `handleSvg`       | 自定义手柄SVG，用于 [自定义手柄](/advanced.html#自定义手柄)。             | `null`            |
| `handleProps`     | 自定义手柄属性，用于 [自定义手柄](/advanced.html#自定义手柄)。              | `{x:0, y:0}`      |
| `wheelLightness`  | 如果设置为 `false`, 当亮度降低时，颜色轮将不会变成黑色.                      | `true`            |
| `wheelAngle`      | 色轮的色调渐变的起始角度，以度为单位。                                    | `0`               |
| `wheelDirection`  | 颜色轮的色调渐变方向；可选 顺时针`"clockwise"` 或 逆时针`"anticlockwise"`。 | `"anticlockwise"` |
| `sliderSize`      | 滑块控制大小。 默认情况下，这将自动计算。                                  | `undefined`       |

更多关于颜色选择器选项、属性和方法的详细信息可以在 [颜色选择器API 文档](/colorPicker_api.html) 中找到。

## 使用颜色

每个颜色选择器都有一个 `color` 对象来存储当前选中的颜色。 此颜色对象与颜色选择器绑定，所以其值的任何更改都会被选择器反射，反之亦然。

### 颜色属性

颜色对象有一些“魔法”属性，可用于 **get** 和 **set** 不同的格式。 每当设置其中一个属性时，颜色选择器控制将更新， [`color:change`](#颜色选择事件) 事件将触发。

例如，获取当前颜色作为十六进制字符串：

```js
var hex = colorPicker.color.hexString;
console.log(hex); // hex = "#ff0000"
```

或者从Hsl 对象中设置选中的颜色：

```js
colorPicker.color.hsl = { h: 180, s: 100, l: 50 };
// 颜色选择器更新以匹配hsl(180, 100, 50)
```

颜色对象具有涵盖所有最常见的 web 颜色格式 (HEX, RGB, HSL 和 HSV) 的属性，以及一些额外的属性：

| 属性           | 示例格式                               |
|:------------ |:---------------------------------- |
| `hexString`  | `"#ff0000"`                        |
| `hex8String` | `"#ff0000ff"`                      |
| `rgb`        | `{ r: 255, g: 0, b: 0 }`           |
| `rgba`       | `{ r: 255, g: 0, b: 0, a: 1 }`     |
| `rgbString`  | `"rgb(255, 0, 0)"`                 |
| `rgbaString` | `"rgb(255, 0, 0, 1)"`              |
| `hsl`        | `{ h: 360, s: 100, l: 50 }`        |
| `hsla`       | `{ h: 360, s: 100, l: 50, a: 1 }`  |
| `hslString`  | `"hsl(360, 100%, 50%)"`            |
| `hslaString` | `"hsla(360, 100%, 50%, 1)"`        |
| `hsv`        | `{ h: 360, s: 100, v: 100 }`       |
| `hsva`       | `{ h: 360, s: 100, v: 100, a: 1 }` |
| `red`        | `0` - `255`                        |
| `green`      | `0` - `255`                        |
| `blue`       | `0` - `255`                        |
| `alpha`      | `0` - `1`                          |
| `hue`        | `0` - `360`                        |
| `saturation` | `0` - `100`                        |
| `value`      | `0` - `100`                        |
| `kelvin`     | `1000` - `40000`                   |

有关颜色对象的更多详细信息，请查阅[颜色API文档](/color_api.html)。

## 颜色选择事件

通过事件，您可以在某些事情发生后运行自己的代码，例如，当选定的颜色发生更改或用户与颜色选择器进行交互时。

拾色器的 [`on`](colorPicker_api.html#on) 方法可用于附加在触发特定事件时将调用的函数。 在此示例中，我们为 `color:change` 事件添加了一个监听器：

```js
//收听颜色选择器的color:change事件
//color:change回调接收当前颜色
colorPicker.on('color:change', function(color) {
  //将当前颜色记录为十六进制字符串
  console.log(color.hexString);
});
```

[`on`](colorPicker_api.html#on) 方法还可以采用事件名称数组，以防您想使用一个功能监听多个事件：

```js
//监听颜色选择器的color:init和color:change事件
colorPicker.on(['color:init', 'color:change'], function(color) {
  //将当前颜色记录为十六进制字符串
  console.log(color.hexString);
});
```

通过将相同的函数传递给颜色选择器的 [`off`](colorPicker_api.html#off) 方法，还可以随时删除事件侦听器：

```js
//创建一个回调函数
function onColorChange(color) {
  console.log(color.hexString);
}

//添加color:change侦听器
colorPicker.on('color:change', onColorChange);

//以后，如果我们要停止侦听color:change ...
colorPicker.off('color:change', onColorChange);
```

### 可用事件

##### `color:change`

当选中的颜色发生变化时 -- 当用户与颜色选择器交互时触发， 或者当颜色由您自己的代码更新。 此事件的回调函数将接收两个值：

* `color`: [目前选定的颜色](#使用颜色)
* `changes`: 显示自上次事件触发以来哪些HSV 频道已经改变的对象

在回调中修改此事件的 `color` 对象是安全的。 如果你想限制范围或某个颜色通道, 例如:

```js
colorPicker.on('color:change', function(color) {
  //不允许颜色饱和度低于50!
  if (color.saturation < 50) {
    color.saturation = 50;
  }
});
```

##### `input:change`

类似于 `color:change`，除非此事件只在用户的 **鼠标或触摸输入**更改颜色时才会触发。

此事件的回调接收与 `color:change` 相同的值，并且在此事件的回调中修改 `color ` 对象也是安全的。

##### `input:start`

每当用户开始与色彩选择器控制交互时都会触发。 [当前选中的颜色](#使用颜色) 被传递到此事件的回调函数中。

##### `input:move`

当用户在开始交互后移动他们的指针/鼠标时触发。 [当前选中的颜色](#使用颜色) 被传递到此事件的回调函数中。

##### `input:end`

每当用户停止与色彩选择器控件交互时触发。 [当前选中的颜色](#使用颜色) 被传递到此事件的回调函数中。

##### `color:init`

每次添加颜色时都会触发。 此事件的回调将接收新添加的颜色对象。

##### `color:remove`

当从颜色选择器中移除颜色时触发。 此事件的回调将接收删除的颜色对象。

##### `color:setActive`

切换“活动”颜色时触发。 此事件的回调将收到活动的颜色对象。

##### `mount`

当颜色选择器的界面已安装到 DOM 并准备好用户交互时触发。 颜色选择器对象会传递到此事件的回调函数中。