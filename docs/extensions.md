---
title: Extensions
---

As of version 4.0.0, iro.js can be extended with plugins and custom UI elements. Plugins usually add global functionality to iro.js, 

## Available Plugins

### Official Plugins

* [**iro-dynamic-css**](https://github.com/jaames/iro-dynamic-css): Allows you to dynamically update CSS rules whenever the selected color changes.

### Third-party Plugins

## Using Plugins

Plugins are registered  `iro.use`

`iro.use` automatically prevents you from using the same plugin more than once, so calling it multiple times on the same plugin will install the plugin only once.

All plugins have to be installed before calling `new iro.ColorPicker`.

```js
  import iro from '@jaames/iro';
  import iroPluginExample from 'iro-plugin-example';

  iro.use(iroPluginExample);

  var colorPicker = new iro.ColorPicker();
  ...
```

## Writing a Plugin

## Creating Components