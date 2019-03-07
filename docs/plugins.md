---
title: Plugins
---

## Available Plugins

### Official Plugins

* [**iro-dynamic-css**](https://github.com/jaames/iro-dynamic-css): Allows you to dynamically update CSS rules whenever the selected color changes.
* [**iro-transparency-plugin**](https://github.com/jaames/iro-transparency-plugin): Adds optional transparency slider to the color picker and support for color-with-alpha color formats.

## Using Plugins

Plugins are registered with `iro.use`, although some plugins may automatically register themselves. The library will prevent the same plugin being registered more than once, so it's always wise to explicity register it yourself just in case.

All plugins must be registered before calling `new iro.ColorPicker`:

```js
import iro from '@jaames/iro';
import iroPluginExample from 'iro-plugin-example';

iro.use(iroPluginExample);

var colorPicker = new iro.ColorPicker();
```

You may also pass some global config options as the second parameter when calling `iro.use` to register a plugin:

```js
import iro from '@jaames/iro';
import iroPluginExample from 'iro-plugin-example';

iro.use(iroPluginExample, {
  // plugin config goes here
});

var colorPicker = new iro.ColorPicker();
```