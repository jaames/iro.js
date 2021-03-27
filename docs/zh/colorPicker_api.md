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

### `activeHandleRadius`

Overrides `handleRadius` for the handle of the currently selected color.

**Default value**: Inherits `handleRadius` value by default

### `handleSvg`

SVG reference for [Custom Handles](/advanced.html#custom-handles). This should be an ID selector that matches your handle SVG.

**Default value**: `null` (default handle is used)

### `handleProps`

Properties for [Custom Handles](/advanced.html#custom-handles).

**Default value**: `{ x: 0, y: 0 }`

### `wheelLightness`

If set to `false`, the color wheel will not fade to black when the lightness decreases.

**Default value**: `true`

### `wheelAngle`

Starting angle of the color wheel's hue gradient, measured in degrees.

**Default value**: `0`

### `wheelDirection`

Direction of the color wheel's hue gradient, either `"clockwise"` or `"anticlockwise"`.

**Default value**: `"anticlockwise"`

### `sliderSize`

Slider size, measued in pixels.

**Default value**: By default this will be calculated automatically from `padding` and `handleRadius`.

### `boxHeight`

Box control height, measued in pixels.

**Default value**: By default this will be the same value as `width`.

## 属性

### `color`

An [`iro.Color`](/colorPicker_api.html) object representing the currently selected color. Updating this color object will also update the seclected color in the picker.

**See also:** [Using the Selected Color](/guide.html#color-picker-options)

### `colors`

An array of [`iro.Color`](/colorPicker_api.html) objects representing the currently selected colors, used for [multicolor](/advanced.html#multicolor). Updating any of these color objects will also update the seclected color in the picker.

### `el`

The HTML element being used as the color picker container.

### `base`

The HTML element being used as the color picker's base element.

### `props`

The initial configeration options passed to the color picker.

### `id`

The ID value passed to the color picker config.

## 事件方法

**Arguments:**

* `{Number}` width 宽度
* `{Number}` height 高度

### `on`

Add a listener to a color picker event.

**Arguments:**

* `{String | Array}` [事件类型](#事件)
* `{Function}` 回调

**Example:**

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

* `{String | Array}` [事件类型](#事件)
* `{Function}` 回调

**Example:**

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

Add another selectable color to the color picker.

**参数：**

* `{IroColorValue}` 颜色值 - 要添加的颜色，这可以是 `iro.Color` 或任意 [支持的颜色格式](/color_api.html#支持的颜色格式)。
* `{Number}` 颜色索引 (可选) - 默认为颜色数组的末尾

### `removeColor`

Remove a color from the color picker.

**参数：**

* `{Number}` 颜色索引

### `setActiveColor`

Set the currently 'active' color (the color that is selected and highlighted).

**参数：**

* `{Number}` 颜色索引

### `setColors`

Replaces all the colors currently on the color picker with a new set of colors.

**Arguments:**

* `{Color []}` 新的颜色值

## 实用方法

### `resize`

Set the color picker to a new size.

**Arguments:**

* `{Number}` width 宽度

### `reset`

Reset the color picker back to the original color value passed to the color picker config.

### `forceUpdate`

Force the color picker to rerender.

### `emit`

Used internally to dispatch an event. All function arguments after the event type will be passed to the event callback.

**Arguments:**

* `{String}` [事件类型](#事件)

### `deferredEmit`

Used internally to dispatch an deferred event. Deferred events are stored until an event listener for them is added with `on`.

**Arguments:**

* `{String}` [事件类型](#事件)

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