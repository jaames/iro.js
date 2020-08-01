---
layout: Home
home: true
---

::: slot introduction
A modern, SVG-based color picker widget for vanilla JavaScript.
:::

::: slot tutorial-iro-js
### 安装

##### 通过NPM安装

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

##### 也可使用 CDN

将此脚本拖放到您页面的 HTML `<head>` 中：

```html
<script src="https://cdn.jsdelivr.net/npm/@jaames/iro@5"></script>
```

当您手动包含这样的库时，iro.js将在 `window.iro` 上全局可用。

##### 也可下载并自己托管

**[开发版本](https://raw.githubusercontent.com/jaames/iro.js/master/dist/iro.js)**<br/>未压缩，包括源注释。 用于调试。

**[生产版本](https://raw.githubusercontent.com/jaames/iro.js/master/dist/iro.min.js)**<br/>缩小和优化的版本。

### 颜色选择器设置

首先， 我们需要一个具有唯一标识符的HTML元素 (例如一个 `id` 属性) 作为颜色选择器的容器：

```html
<div id="picker"></div>
```

然后使用 JavaScript 创建一个新的 `iro.ColorPicker` 与您选择的容器元素匹配的 CSS 选择器：

```js
var colorPicker = new iro.ColorPicker('#picker');
```

您还可以在此处使用DOM对象而不是CSS选择器 -- 如果将iro.js集成到使用诸如Vue，React等框架构建的应用程序中，这可能更合适。

### 颜色选择器选项

可以通过将一组选项传递给 `iro.ColorPicker` 的第二个参数来自定义颜色选择器：

```js
var colorPicker = new iro.ColorPicker("#picker", {
  //设置颜色选择器的大小
  width: 320,
  //将初始颜色设置为纯红色
  color: "#f00"
});
```

颜色选择器选项的完整列表可以在 [选项文档](guide.html#颜色选择器选项) 中找到。

### 使用颜色

每个颜色选择器都有一个 color 对象来存储当前选中的颜色。


```js
var hex = colorPicker.color.hexString;
console.log(hex); // hex = "#ff0000"
```

每当您设置这些颜色属性时，颜色选择器将自动更新以匹配它！

```js
colorPicker.color.hsl = { h: 180, s: 100, l: 50 };
// 颜色选择器更新以匹配hsl(180, 100, 50)
```

有关颜色属性的完整列表，请参见[颜色文档](/guide.html#使用颜色)。

### 事件


通过事件，您可以在某些事情发生后运行自己的代码，例如，当选定的颜色发生更改或用户与颜色选择器进行交互时。

拾色器的 [`on`](colorPicker_api.html#on) 方法可用于附加在触发特定事件时将调用的函数。 例如，我们可以添加一个监听器，当颜色被更改时触发：

```js
//收听颜色选择器的color:change事件
//color:change回调接收当前颜色
colorPicker.on('color:change', function(color) {
  //将当前颜色记录为十六进制字符串
  console.log(color.hexString);
});
```

关于可用事件的全面概述，可在 [事件文档](/guide.html#颜色选择事件) 中找到。