---
title: 迁移指南
---

## 从 v4 迁移

iro.js 5.0.0版本添加了很多新功能，最小的更改不会影响大多数使用库的人。 然而，如果你需要使用 v4，那么最新的 v4 版本已经在 [v4 分支](https://github.com/jaames/iro.js/tree/v4) 中保存。

### 颜色选择器选项

* `sliderHeight` 选项已重命名为 `sliderSize`。
* `handleOrigin` 选项已改名为 `handleProps`。

### 插件

在 v4 中引入的插件 API 以及 [iro-dynamic-css](https://github.com/irojs/iro-dynamic-css) 和 [iro-obligy-plugin](https://github.com/irojs/iro-transparency-plugin) 插件已被废弃。 透明度滑块现在是核心iro.js库的一部分，动态CSS插件的整体功能可以轻松地通过 [CSS变量](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) 复制

#### 动态 CSS 插件替换

设置一些JavaScript，以在颜色更改时更新 `--iro-color-value` 变量：

```js
var rootStyle = document.documentElement.style;
colorPicker.on(['color:init', 'color:change'], function(color) {
  rootStyle.setProperty('--iro-color-value', color.rgbString);
});
```

然后以您要基于当前颜色更新的任何样式使用 `--iro-color-value` ：

```css
body {
  background-color: var(--iro-color-value);
}
```