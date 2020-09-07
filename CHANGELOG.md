### Changelog

#### 5.2.3

Bumps iro-core version to fix server-side environment issues noted in https://github.com/jaames/iro.js/issues/131

#### 5.2.2

Fixes https://github.com/jaames/iro.js/issues/129

#### 5.2.1

Fixed an issue where the touchstart event wasn't firing on certain touchscreen desktop PCs, see https://github.com/jaames/iro.js/issues/126

#### 5.2.0

Added slider types for red, green and blue color channels! See https://github.com/jaames/iro.js/issues/78

#### 5.1.10

Fixes issue with kelvin -> RGB conversion that resulted in the red channel overflowing the 0-255 range in certain cases, see https://github.com/jaames/iro.js/issues/124

#### 5.1.9

Adds `activeIndex` option for Slider and Box components, for manually specifying which color to use in multi-color setups

```js
var colorPicker = new iro.ColorPicker("#demoWheel", {
  layout: [
    // default slider, will reflect whichever color is currently active
    {
      component: iro.ui.Slider,
    },
    // this slider will always reflect the color at index 2
    {
      component: iro.ui.Slider,
      options: {
        activeIndex: 2,
      }
    },
  ]
});
```

#### 5.1.8

Re-adds iro.version since it was accidentally omitted in 5.1.7

#### 5.1.7

Fixes Typescript issues noted in #109

#### 5.1.6

Fixes `package.json` to include Typescript typedef files in the NPM package

#### 5.1.5

##### Additions

Added `margin` color picker option for setting the gap between individual components. `sliderMargin` will also work for now, but will be deprecated in a later version.

#### 5.1.4

Internal improvements to prevent events causing infinite loops 

#### 5.1.3

##### Additions

- Added `transparency` color picker option
- Made it easier to style handles individually

#### 5.1.2

Further tweaks to input handling so that interacting with handles is more predictable overall.

#### 5.1.1

Tweaked input handling so that interacting with handles on a multi-color picker is more predictable.

#### 5.0.0

##### Additions

- Rewritten entire library in Typescript (thanks KaanMol and mksglu for getting me started!)
- Split color and generic UI coordinate logic into a separate package ([iro-core](https://github.com/irojs/iro-core)), in preparation for creating dedicated React and Vue packages on top of the same core logic
- Added support for kelvin temperatures (with `color.kelvin`, `iro.Color.rgbToKelvin()` and `iro.Color.kelvinToRgb()`).
- Added transparency support without the need for a separate plugin
- Added some shorthand `color` properties for common color channels
  - `red`
  - `green`
  - `blue`
  - `hue`
  - `saturation`
  - `value`
  - `alpha`
- Added new `color` properties for color-with-alpha formats
  - `rgba`
  - `hsva`
  - `hsla`
  - `rgbaString`
  - `hslaString`
  - `hex8String`
- New API for handling multiple selectable colors on the same color picker:
  - Added color objects `index` property, for keeping track of their position in the color array
  - Color pickers now have a `colors` property which provides an array of its selectable colors 
  - Color pickers now have `addColor`, `removeColor`, `setActiveColor` and `setColors` methods for manipulating the color array
  - Added `color:setActive` and `color:remove` and `color:setAll` events
- UI additions:
  - Customisable layout direction with the new `layoutDirection` property (thanks asonix!)
  - New saturation-value box component
  - New slider types for kelvin temperatures and transparency
  - New circular slider shape
  - Improved touch input handling
- Added color picker `setOptions` method to update config options at any point
- Added color picker `reset` method to reset all colors back to their initial values
- Redesigned the [project website](http://iro.js.org/) so that it does a bet
  
##### Breaking changes
- Removed plugin API
- `sliderHeight` option renamed to `sliderSize`
- `handleOrigin` option renamed to `handleProps`
- `iro.Color.onChange` no longer external
- `color:init` event no longer provides color changester job of showing off what the library can do

#### 4.5.3

##### Fixes

* Further fixes to UI gradient rendering in cases where iro.js is used in a page where a `<base>` tag is also present. 

#### 4.5.2

##### Fixes

* Fixes an issue where UI gradients were rendering as black when iro.js was used in an Ionic Webview on iOS. See #18 for more info.

#### 4.5.1

##### Fixes

* Prevents a rendering bug caused when the color was updated before the picker was mounted into the DOM

#### 4.5.0

##### Additions

Added a new param for iro.ColorPicker:

* `id` - HTML ID for the color picker root element, also available as a prop on the color picker instance

Color picker event callbacks `this` context is now set to the active color picker instance

See [issue thread #71](https://github.com/jaames/iro.js/issues/71) for more information

#### 4.4.0

##### Additions

Added two new params for iro.ColorPicker:

* `wheelAngle` - starting angle for the color wheel's hue gradient
* `wheelDirection` - direction of the color wheel's hue gradient (clockwise/anticlockwise)

See [issue thread #66](https://github.com/jaames/iro.js/issues/66) for more information

#### 4.3.3

##### Fixes

Fixes an issue where the alpha component wasn't being parsed correctly from rgba and hsla strings. For more info, see [issue thread #2](https://github.com/jaames/iro-transparency-plugin/issues/2) on the iro-transparency-plugin repository.

#### 4.3.2

##### Fixes

Somehow a line of code was missed when the new events API was merged, so the input:change event wasn't actually firing (issue thread #64). This is now fixed.

#### 4.3.1

##### Fixes

Fixes a few issues related to how color alpha/transparency was handled internally, which was causing problems with iro-transparency-plugin. Setting a color to a value without an alpha component (e.g `hexString = "#fff"`) will now set the alpha value to 1, and the alpha component will no longer be `undefined` when using `new iro.Color`. For more info, see [issue thread #2](https://github.com/jaames/iro-transparency-plugin/issues/2) on the iro-transparency-plugin repository.

#### 4.3.0

##### Additions

* New events added:
  * `input:change` - The same as `color:change`, but only fires when the color has been set with user input
  * `color:init` - Same as `color:change`, but fired once with the initial color value
* colorPicker methods:
  * `on` and `off` methods can now take arrays of eventTypes as well as strings
  * New `deferredEmit` method (should only be used by plugins)

##### Changes

The `color:change` event no longer fires with the initial color value, as this was catching a few people out.

If you need to reproduce previous behaviour, please make sure to listen for both `color:init` and `color:change` events with the same listener, like so:

```js
colorPicker.on(['color:init', 'color:change'], function(color, change) {
  // do whatever
});
```

#### 4.2.3

##### Fixes

Fixes a typo in the `input:move` event (was previously "input:mode"). Thanks @jbellue for the contribution!

#### 4.2.2

##### Fixes

Makes sure that `input:start` fires before `color:update` and that `input:end` fires after `color:update`. See thread [#59](https://github.com/jaames/iro.js/issues/59).

#### 4.2.1

##### Fixes

Fixes color picker DOM event handling in IE11, issue thread [#58](https://github.com/jaames/iro.js/issues/58).

#### 4.2.0

<sub>(nice)</sub>

Adds support for hue and saturation sliders, [documented here](https://iro.js.org/guide.html#extra-slider-types)

#### 4.1.0

Internal plugin API changes to allow for plugins to customise the slider type

#### 4.0.0

iro.js version 4.0.0 is a major rewrite of the core library which aims to solve numerous long-standing issues. There are numerous changes and deprecations, so please check the [migration guide](https://iro.js.org/migrating.html) before moving your project over. If needed, version 3.5.1 has been preserved in the [v3 branch](https://github.com/jaames/iro.js/tree/v3).

##### Additions

* Custom SVG handles
* Custom layout config options
* Plugin API
* Code tests
* Rewritten codebase, is now *much* cleaner
* Color picker components are now built using [preact](https://preactjs.com/)
* Rewritten documentaion and readme, with huge focus on making things easier to follow

##### Breaking Changes

**Color Picker**

* `anticlockwise` option has been removed, and is now hardcoded to `true`
* `markerRadius` option has been renamed as `handleRadius`

**Safari Bugfix Note**

To resolve an issue where Safari wasn't rendering the color picker properly because of certain client-side routing libraries, it was previously recommended to call `emit('history:statechange')` on the color picker when navigating to new client-side routes. This has been deprecated in favour of the catch-all `forceUpdate()` color picker method.

**Static Color Methods**

* `hsv2Hsl` renamed to `hsvToHsl`
* `hsl2Hsv` renamed to `hslToHsv`
* `rgb2Hsv` renamed to `rgbToHsv`
* `hsv2Rgb` renamed to `hsvToRgb`
* `parseHexStr` removed
* `parseRgbStr` removed
* `parseHslStr` removed
* `rgb2Hex` removed
* `rgb2Str` removed
* `hsl2Str` removed
* `mix` removed
* `lighten` removed
* `darken` removed
* `compare` removed

**Color Methods**

* `mix` removed
* `lighten` removed
* `darken` removed

**Stylesheet API**

* The Dynamic CSS feature and has become a seperate plugin; [iro-dynamic-css](https://github.com/jaames/iro-dynamic-css).

#### 3.5.1

##### Additions

 - Add es6 module build, since both rollup and webpack [will import this directly](https://github.com/rollup/rollup/wiki/pkg.module) if it's available.

#### 3.5.0

This is more of a spring cleaning release, no changes / fixes that might affect the API have been made.

##### Changes

 - Rewritten API classes using the es6 syntax -- more could be rewritten to use other es6 features such as the spread operator, etc, but I'll save that for v4. Everything should remain functionally identical to the previous version for now.

 - Moved the build process from webpack to [bili](https://github.com/egoist/bili) (which uses rollup under the hood). I've found the code it produces to be more lightweight than webpack + babel while still having the same functionality (even *before* messing about with force-mangling specific property names!). Config is also a lot cleaner.

 - Removed `yarn.lock` file. Yarn was neat back in late 2017 because it fixed a lot of issues that NPM had at the time, but they've since caught up so Yarn is no longer relevant imo.

#### 3.4.3

##### Fixes

 - Further fixes to touch scrolling intervention in Chrome, referencing the advice given [here](https://developers.google.com/web/updates/2017/01/scrolling-intervention).

#### 3.4.2

##### Fixes

 - Fixes a warning caused by [some recent Chrome changes](https://www.chromestatus.com/features/5093566007214080), as reported in [#36](https://github.com/jaames/iro.js/issues/36).

#### 3.4.1

##### Fixes

 - Fixed rounding issues when converting between color models, particularly when converting certain colors from RGB hex -> HSL -> RGB hex. See issue #26 for more details

#### 3.4.0

##### Additions

 - `iro.ColorPicker` has a new `mount` event which fires once color picker's UI has been inserted into the DOM, as requested in [#28](https://github.com/jaames/iro.js/issues/28).

 - The `input:start` and `input:end` events now get passed the color picker's `color` object as per [#24](https://github.com/jaames/iro.js/issues/24).

#### 3.3.0

iro is now available as an [npm module](https://www.npmjs.com/package/@jaames/iro).

#### 3.2.2

##### Fixes

 - Fix typo in `iro.ColorPicker`'s `off` method. Thanks to @mdmower for their [pull request](https://github.com/jaames/iro.js/pull/25).

#### 3.2.1

##### Additions

 - `iro.ColorPicker` instances now have a `display` option, as requested in issue thread [#23](https://github.com/jaames/iro.js/issues/23).

#### 3.2.0

##### Additions

 - `iro.ColorPicker` instances now have a `wheelLightness` option, as requested in issue threads [#9](https://github.com/jaames/iro.js/issues/9) and [#19](https://github.com/jaames/iro.js/issues/19).

#### 3.1.1

This version works around two bugs in Safari's handling of SVG gradient URLs. The first issue is caused by the library being used in combination with the HTML `<base>` element, and the second is a similar issue that may arise when using a client-side routing library that uses the HTML5 history API to navigate between views. More details can be found in [this issue thread](https://github.com/jaames/iro.js/issues/18).

##### Additions

- If you are using iro.js in a web application that uses client-side routing, `iro.ColorPicker` instances now have a `history:stateChange` event that should be emitted whenever the user navigates to another view. Doing so force-updates the SVG gradient URLs, working around a bug present in Safari. To emit the event, call `emit("history:stateChange")` on your `iro.ColorPicker` instance.

#### 3.1.0

##### Additions

 - `iro.Color` instances have new `clone`, `compare` and `setChannel` methods.

#### 3.0.0

Another major release, there are some breaking changes this time around, particularly for those still using remnants of the older v1 API like `watch` and `unwatch`. While I understand that this may be frustrating (and bad practice...) I felt that it was important to remove/change a number of things to make iro.js more pleasant to use. I'm pretty happy with the current API as it stands, so I think it can be considered "locked" from here on. \ o /

**Note:** The v1 branch where version 1.0.0 of the library was formerly preserved has been deleted; the current version of the library supports IE9+ so there was no reason to keep it around any longer. 

##### Breaking Changes

 - **removed:** `iro.ColorPicker`'s `watch` and `unwatch` methods were removed in favor of using the Event API methods (`on` and `off`) intead.
 - **changed:** `iro.colorPicker`'s dynamic CSS used to replace template values set to `rgb` with the selected color. This value will be renamed to `$color` going forward.
 - **removed:** `iro.Color`'s `watch` and `unwatch` methods were removed as it seemed unnecessary for devs to add watchers to single color instances. Such behaviour was only ever in place for internal use, but if you want it to return then please [raise an issue](https://github.com/jaames/iro.js/issues).
 - **removed:** `iro.Color`'s `set` method no longer takes a second "triggerEvents" param. Now you can just set the color in any way you like within a `color:watch` callback function without having to worry about infinite event loops.
 - **removed:** `iro.Color`'s `get` method was removed, just use the `hsv` property instead.
 - **changed:** `iro.Stylesheet`'s `on` and `off` methods were replaced with the new `enabled` property. Keeping them around with the recently added Event API methods could have lead to a lot of confusion. 
 - **changed:** `iro.Stylesheet`'s `getCss` and `getCssText` methods were replaced with the `css` and `cssText` properties, respectively. 
 - **removed:** finally removed `iro.ColorWheel` as an alias of `iro.ColorPicker`, which was added in 2.0.0.

##### Additions

 - IE 9 support is back!
 - `iro.Color` instances have new `mix`, `lighten` and `darken` methods.
 - `iro.Color` also has a bunch of new static helper methods for color mixing + conversion.
 - `iro.ColorPicker` has a new `anticlockwise` option, which draws the hue wheel in the opposite direction (¯\\\_(ツ)_/¯ it looks nicer, imo).
 - Slightly redesigned landing page and logo, plus a snazzy new documentation site (with better docs!).

##### Improvements

 - Full UI rewrite - everything is SVG based, but still looks the same!
 - Better memory usage and performance.
 - DOM event handling is much cleaner and no longer relies on permanent global mousemove/mouseup listeners.
 - `iro.ColorPicker`'s `color` option works with supported color format, or even an iro.Color instance.
 - Fixed HSL conversion and a bunch of smaller bugs.

----

#### 2.2.1

##### Improvements

* `iro.ColorPicker.set` method was changed as per https://github.com/jaames/iro.js/issues/11#issuecomment-336940566

----

#### 2.2.0

##### Additions

* `iro.ColorPicker` instances now have a full event system, with `on`, `off` and `emit` methods. Listening for `color:change` is the same as using the `watch` method, and there are new `input:start` and `input:end` methods for detecting when the user begins and finishes interacting with the color picker. 

----

#### 2.1.0

##### Additions

* The `iro.ColorPicker` constructor has new (optional) `borderWidth` and `borderColor` options, which can be used to add borders around the color picker's UI elements

##### Improvements

* The gradient used by the color picker's value slider is now based on the currently selected color
* Clean up the build process, and get webpack-dev-server's HMR mode to work properly
* Replace relative module import paths with aliased absolute paths

----

#### 2.0.0

This version represents a major rewrite of the library, although there are no major API changes. Anything using the publicly documented 1.0.0 API should be fully compatible with ver 2.0.0 and above (but not vice versa) for the foreseeable future.

**Note:** version 1.0.0 of the library has been preserved in the `v1` branch. Feel free to use it if you want IE 9 support, but note that I don't intend to actively maintain it.

##### Additions

 - Stylesheet API has some new methods and properties:
	* `on()` and `off()` - enable and disable the stylesheet styles
    * `getCss()` - returns the stylesheet content as an object
    * `getCssText()` - returns the stylesheet content as a string
    * `sheet`  - stylesheet's [CSSStyleSheet](//developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet) object
    * `rules`  - stylesheet's [CSSRuleList](//developer.mozilla.org/en-US/docs/Web/API/CSSRuleList) object
    * `map`  - stylesheet's [CSSStyleDeclaration](//developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration) objects; keyed by the CSS selector that they belong to

 - Added a proper build process using webpack

##### Improvements

 - Full rewrite, including splitting code into seperate files and switching to es6 syntax
 - IE 9 support dropped in favor of filesize
 - `iro.ColorWheel` was renamed to `iro.ColorPicker`, although `ColorWheel` is still supported for backwards compatibility.
 - The `styles` option for `iro.ColorPicker` was renamed to `css`, but again, the former is still supported
 - Docsite was dropped in favor of just using github (I may use hexo in the future, though!)
 - Landing page redesigned

----

#### 1.0.0 - Initial version
