---
layout: 首页
home: true
---

::: slot tutorial-iro-js
### 安装

##### 通过NPM安装

```bash
$ npm install @jaames/iro --save
```

如果您使用的是Webpack或Rollup之类的模块捆绑器，请将iro.js导入您的项目中：

```js
// Using ES6 module syntax
import iro from '@jaames/iro';

// Using CommonJS modules
const iro = require('@jaames/iro');
```

##### 也可使用 CDN

将此脚本拖放到您页面的 HTML `<head>` 中：

```html
<script src="https://cdn.jsdelivr.net/npm/@jaames/iro@5"></script>
```

当您手动包含这样的库时，iro.js将在 `window.iro` 上全局可用。

##### 也可下载并自己托管

**[Development version](https://raw.githubusercontent.com/jaames/iro.js/master/dist/iro.js)**<br/> Uncompressed, with source comments included. 用于调试。

**[Production version](https://raw.githubusercontent.com/jaames/iro.js/master/dist/iro.min.js)**<br/> Minified and optimized version.

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
  // Set the size of the color picker
  width: 320,
  // Set the initial color to pure red
  color: "#f00"
});
```

颜色选择器选项的完整列表可以在 [选项文档](guide.html#color-picker-options) 中找到。

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

A full list of color properties can be found in the [color documentation](/guide.html#working-with-colors).

### Events


Events let you to run your own code after certain things have happened, like when the selected color has changed or when the user has interacted with the color picker.

The color picker's [`on`](colorPicker_api.html#on) method can be used to attach functions that will be called whenever a particular event is fired. For example, we can add a listener that fires whenever the color is changed:

```js
// listen to a color picker's color:change event
// color:change callbacks receive the current color
colorPicker.on('color:change', function(color) {
  // log the current color as a HEX string
  console.log(color.hexString);
});
```

For a full overview of the available events can be found in the [events documentation](/guide.html#color-picker-events).