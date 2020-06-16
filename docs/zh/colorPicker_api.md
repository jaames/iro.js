---
title: 颜色选择器 API
---

颜色选择器 API 是iro.js 的主要功能，可在 `iro.ColorPicker` 上访问。

## 构造函数

**参数：**

* `{String | DOM Element}` 颜色选择器容器的CSS选择器或DOM节点
* `{Object}` [选取颜色的选项](#options)

## 选项

### `width`

以像素为单位的颜色选择器界面的总宽度。

**默认值**: `300`

### `color`

默认选中的颜色。 此选项可以是任意 [支持的颜色格式](/color_api.html#supported-color-formats)。

**默认值**: `"#ffffffff"`

### `display`

颜色选择器根元素的 CSS 显示值。

**默认值**: `"block"`

### `id`

颜色选择器根元素的 HTML ID。

**默认值**: `null`

### `layout`

用于 [自定义布局](/advanced.html#custom-ui-layouts) 的组件定义数组。

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

[自定义手柄](/advanced.html#custom-handles)的SVG参考。 这应该是一个与您的手柄SVG匹配的ID选择器。

**默认值**: `null` (使用默认手柄)

### `handleProps`

[自定义手柄](/advanced.html#custom-handles) 的属性。

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

<strong x-id =“ 1”>另请参见：</strong>[使用选定的颜色](/guide.html#color-picker-options)

### `colors`

代表当前选定颜色的 [`iro.Color`](/colorPicker_api.html) 对象数组，用于[多颜色](/advanced.html#multicolor)。 更新任何这些颜色对象也将更新选择器中的选定颜色。

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

* `{String | Array}` [事件类型](#events)
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

Remove event listeners that were registered with `on`.

**Arguments:**

* `{String | Array}` [Event Type(s)](#events)
* `{Function}` callback

**Example:**

```js
// make a handler function
function colorChangeCallback(color) {
  console.log(color.hexString);
}

// start listening to the color change event
// colorChangeCallback will be called whenever the color changes
example.on("color:change", colorChangeCallback);

// stop listening to the color change event
// colorChangeCallback won't be called ehen the color changes
example.off("color:change", colorChangeCallback);
```

## 多种颜色方法

### `addColor`

Add another selectable color to the color picker.

**Arguments:**

* `{IroColorValue}` color value - The color to add, this can be an `iro.Color` or any [supported color format](/color_api.html#supported-color-formats).
* `{Number}` color index (optional) - Defaults to the end of the color array

### `removeColor`

Remove a color from the color picker.

**Arguments:**

* `{Number}` color index

### `setActiveColor`

Set the currently 'active' color (the color that is selected and highlighted).

**Arguments:**

* `{Number}` color index

### `setColors`

Replaces all the colors currently on the color picker with a new set of colors.

**Arguments:**

* `{Color []}` new color values

## 实用方法

### `resize`

Set the color picker to a new size.

**Arguments:**

* `{Number}` width

### `reset`

Reset the color picker back to the original color value passed to the color picker config.

### `forceUpdate`

Force the color picker to rerender.

### `emit`

Used internally to dispatch an event. All function arguments after the event type will be passed to the event callback.

**Arguments:**

* `{String}` [Event Type](#events)

### `deferredEmit`

Used internally to dispatch an deferred event. Deferred events are stored until an event listener for them is added with `on`.

**Arguments:**

* `{String}` [Event Type](#events)

## 事件

The color picker's [on](#on) method can be used to register callbacks for color picker events, such as when the selected color changes or when the user begins interacting with the picker. These callbacks can also be removed with the [off](#off) method.

### `color:change`

Fired whenever the color changes -- either when the user interacts with the controls, or when it is set via code. This event's callbacks will receive the color object that changed, as well as an object which reflects which h,s,v channels changed. It is safe to modify the `color` object within callbacks for this event.

### `input:change`

Similar to `color:change`, except this is only fired whenever the color is changed with *direct user input*. Callbacks for this event recieve exactly the same parameters as `color:change`. It is also safe to modify the `color` object within callbacks for this event.

### `input:start`

Fired whenever the users starts interacting with the color picker controls. This event's callbacks will receive the current color object.

### `input:move`

Fired when the user moves their pointer/mouse after beginning interaction. This event's callbacks will receive the current color object.

### `input:end`

Fired whenever the user stops interacting with the color picker controls. This event's callbacks will receive the current color object.

### `color:init`

Fired whenever a new color is created. This event's callbacks will receive the new creat color object.

### `color:remove`

Fired when a color is removed from the color picker. This event's callbacks will receive the removed color object

### `color:setActive`

Fired whenever the 'active' color is switched. This event's callbacks will receive the active color object.

### `mount`

Fired when the colorPicker's UI has been mounted to the DOM and is ready for user interaction. The colorPicker object is passed to this event's callback function.