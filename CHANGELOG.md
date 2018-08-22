### Changelog

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