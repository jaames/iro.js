---
title: Stylesheet API
github_url: https://github.com/jaames/iro.js/blob/master/www/src/stylesheet_api.md
---

The stylesheet API is used by colorPicker objects to dynamically update CSS styles whenever the selected color changes.

Under the hood, it works with the [StyleSheet API](https://developer.mozilla.org/en-US/docs/Web/API/Stylesheet) to update the contents of a `<style>` element rather than using inline `style=""` attributes, so it's actually rather flexible once cross-browser inconsistencies have been taken care of.

The API is made accessible through the `iro.Stylesheet` constructor so that developers can make use of it should they wish to, however if you're looking for more functionality then I highly recommend using something like [cssobj](https://github.com/cssobj/cssobj). Iro is a color picker widget at heart, not a fancy CSS-in-JS library. :P

### Methods

##### setRule

**Arguments:**

* `{String} selector`

* `{String} property`

* `{String} value`

**Details:**

Set a CSS rule within the stylesheet; either by creating a new rule or overriding an existing one.

**Example:**

```js
// make the body's background red:
stylesheet.setRule("body", "background-color", "red")

// add a border to all elements with the class "example"
stylesheet.setRule(".example", "border", "1px solid red")
```

### Properties

##### enabled

**Details:**

Used to enable/disable a stylesheet; if set to `false`, the styles will not be applied to the page.

##### css

**Details:**

The stylesheet's current CSS rules as an object. For example:

```js
"body": {
  "background-color": "red"
},
".example": {
  "border": "1px solid red"
}
```

##### cssText

**Details:**

The stylesheet's current CSS as a string. For example:

```css
body {
  background-color: red;
}
.example: {
  border: 1px solid red;
}
```

##### sheet

**Details:**

A reference to the stylesheet's [CSSStyleSheet](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet) object.

##### rules

**Details:**

A reference to the stylesheet's [CSSRuleList](https://developer.mozilla.org/en-US/docs/Web/API/CSSRuleList) object.
