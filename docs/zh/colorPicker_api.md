---
title: 颜色选择器 API
---

颜色选择器 API 是iro.js 的主要功能，可在 `iro.ColorPicker` 上访问。

## 构造函数

**参数：**

* `{String | DOM Element}` 颜色选择器容器的CSS选择器或DOM节点
* `{Object}` [选取颜色的选项](#选项)

## 选项

### `width`

以像素为单位的颜色选择器界面的总宽度。

**默认值**: `300`

### `color`

默认选中的颜色。 此选项可以是任意 [支持的颜色格式](/color_api.html#支持的颜色格式)。

**默认值**: `"#ffffffff"`

### `display`

颜色选择器根元素的 CSS 显示值。

**默认值**: `"block"`

### `id`

颜色选择器根元素的 HTML ID。

**默认值**: `null`

### `layout`

用于 [自定义布局](/advanced.html#自定义-UI-布局) 的组件定义数组。

**默认值**: `null`

### `layoutDirection`

组件堆叠方向； 垂直 `"vertical"` 或 水平 `"horizontal"`.

**默认值**: `"vertical"`

### `borderWidth`

控件的边框宽度，以像素为单位。

**默认值**: `0` (无边框)

### `borderColor`

边框的颜色。 支持任何有效的 CSS 颜色。

**默认值**: `"#ffffffff"`

### `padding`

控制手柄和组件边缘之间的填充。

**默认值**: `6`

### `margin`

各个组件之间的间隙。

**默认值**: `12`

### `handleRadius`

控制手柄的半径，以像素为单位。

**默认值**: `8`

### `handleSvg`

[自定义手柄](/advanced.html#自定义手柄)的SVG参考。 这应该是一个与您的手柄SVG匹配的ID选择器。

**默认值**: `null` (使用默认手柄)

### `handleProps`

[自定义手柄](/advanced.html#自定义手柄) 的属性。

**默认值**: `{ x: 0, y: 0 }`

### `wheelLightness`

如果设置为 `false`，当亮度降低时，颜色轮将不会变成黑色。

**默认值**: `true`

### `wheelAngle`

色轮的色调渐变的起始角度，以度为单位。

**默认值**: `0`

### `wheelDirection`

颜色轮的色调渐变方向，可选 顺时针`"clockwise"` 或 逆时针`"anticlockwise"`。

**默认值**: `"anticlockwise"`

### `sliderSize`

滑块大小，以像素为单位。

**默认值**: 默认情况下，这将自动以 `padding` 和 `handleRadius` 计算。

## 属性

### `color`

[`iro.Color`](/colorPicker_api.html) 对象代表当前选中的颜色。 更新此颜色对象也会更新选择器中的选定颜色。

<strong x-id =“ 1”>另请参见：</strong>[使用选定的颜色](/guide.html#颜色选择器选项)

### `colors`

代表当前选定颜色的 [`iro.Color`](/colorPicker_api.html) 对象数组，用于[多颜色](/advanced.html#多颜色选择器)。 更新任何这些颜色对象也将更新选择器中的选定颜色。

### `el`

使用 HTML 元素作为颜色选择器容器。

### `base`

使用 HTML 元素作为颜色选择器的基本元素。

### `props`

初始配置选项传递到颜色选择器。

### `id`

将ID值传递到颜色选择器配置。

## 事件方法

**参数：**

* `{Number}` width 宽度
* `{Number}` height 高度

### `on`

将监听器添加到颜色选择器事件中。

**参数：**

* `{String | Array}` [事件类型](#事件)
* `{Function}` 回调

**示例︰**

```js
//做一个处理函数
function colorChangeCallback(color) {
  console.log(color.hexString);
}

//开始听颜色变化事件
//颜色变化时将调用colorChangeCallback
example.on("color:change", colorChangeCallback);
```

### `off`

删除在 `on` 上注册的事件侦听器。

**参数：**

* `{String | Array}` [事件类型](#事件)
* `{Function}` 回调

**示例︰**

```js
//做一个处理函数
function colorChangeCallback(color) {
  console.log(color.hexString);
}

//开始听颜色变化事件
//颜色变化时将调用colorChangeCallback
example.on("color:change", colorChangeCallback);

//停止听颜色变化事件
//颜色更改时将不会调用颜色更改回调
example.off("color:change", colorChangeCallback);
```

## 多种颜色方法

### `addColor`

添加另一个可选择的颜色到颜色选择器。

**参数：**

* `{IroColorValue}` 颜色值 - 要添加的颜色，这可以是 `iro.Color` 或任意 [支持的颜色格式](/color_api.html#支持的颜色格式)。
* `{Number}` 颜色索引 (可选) - 默认为颜色数组的末尾

### `removeColor`

从颜色选择器中移除颜色。

**参数：**

* `{Number}` 颜色索引

### `setActiveColor`

设置当前的“活动”颜色 (选定并高亮的颜色)。

**参数：**

* `{Number}` 颜色索引

### `setColors`

将当前颜色选择器上的所有颜色替换为新的颜色。

**参数：**

* `{Color []}` 新的颜色值

## 实用方法

### `resize`

将颜色选择器设置为新的大小。

**参数：**

* `{Number}` width 宽度

### `reset`

将颜色选择器重置为传递到颜色选择器配置的原始颜色值。

### `forceUpdate`

强制选取颜色者重新渲染。

### `emit`

用于内部发送事件。 事件类型之后的所有函数参数都将传递给事件回调。

**参数：**

* `{String}` [事件类型](#事件)

### `deferredEmit`

用于内部发送延期事件。 延迟事件将被存储到事件监听器添加到 `on` 上。

**参数：**

* `{String}` [事件类型](#事件)

## 事件

颜色选择器的 [on](#on) 方法可用于注册颜色选择器事件的回调，例如，当选定的颜色发生更改或用户开始与选择器进行交互时。 这些回调也可以使用 [off](#off) 方法被删除。

### `color:change`

当颜色发生变化时 -- 当用户与控制器交互时，或者当它是通过代码设置时 -- 触发。 此事件的回调将收到更改的颜色对象，以及一个反映 h,s,v 频道改变的对象。 在回调中修改此事件的 `color` 对象是安全的。

### `input:change`

类似于 `color:change`，除非这只是在颜色与 *直接用户输入* 改变时才触发的。 回调此事件接收的参数与 `color:change` 完全相同。 在回调中修改此事件的 `color` 对象也是安全的。

### `input:start`

每当用户开始与色彩选择器控制交互时都会触发。 此事件的回调将收到当前的颜色对象。

### `input:move`

当用户在开始交互后移动他们的指针/鼠标时触发。 此事件的回调将收到当前的颜色对象。

### `input:end`

每当用户停止与色彩选择器控件交互时触发。 此事件的回调将收到当前的颜色对象。

### `color:init`

每次创建新颜色时都会触发。 此事件的回调将收到新的创建颜色对象。

### `color:remove`

当从颜色选择器中移除颜色时触发。 此事件的回调将接收删除的颜色对象。

### `color:setActive`

切换“活动”颜色时触发。 此事件的回调将收到活动的颜色对象。

### `mount`

当颜色选择器的界面已安装到 DOM 并准备好用户交互时触发。 颜色选择器对象会传递到此事件的回调函数中。