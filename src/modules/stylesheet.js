
export default class stylesheet {
  /**
    @constructor stylesheet writer
  */
  constructor() {
    // Create a new style element
    let style = document.createElement("style");
    document.head.appendChild(style);
    // Webkit apparently requires a text node to be inserted into the style element
    // (according to https://davidwalsh.name/add-rules-stylesheets)
    style.appendChild(document.createTextNode(""));
    this.style = style;
    // Create a reference to the style element's CSSStyleSheet object
    // CSSStyleSheet API: https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet
    let sheet = style.sheet;
    this.sheet = sheet;
    // Get a reference to the sheet's CSSRuleList object
    // CSSRuleList API: https://developer.mozilla.org/en-US/docs/Web/API/CSSRuleList
    this.rules = sheet.rules || sheet.cssRules;
    // We'll store references to all the CSSStyleDeclaration objects that we change here, keyed by the CSS selector they belong to
    // CSSStyleDeclaration API: https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration
    this.map = {};
  }

  get enabled() {
    return !this.sheet.disabled;
  }

  set enabled(value) {
    this.sheet.disabled = !value;
  }

  // TODO: consider removing cssText + css properties since i don't tink they're that useful
  get cssText() {
    var map = this.map;
    var ret = [];
    for (var selector in map) {
      ret.push(selector.replace(/,\W/g, ",\n") + " {\n\t" + map[selector].cssText.replace(/;\W/g, ";\n\t") + "\n}");
    }
    return ret.join("\n");
  }
  
  get css() {
    var map = this.map;
    var ret = {};
    for (var selector in map) {
      var ruleSet = map[selector];
      ret[selector] = {};
      for (var i = 0; i < ruleSet.length; i++) {
        var property = ruleSet[i];
        ret[selector][property] = ruleSet.getPropertyValue(property);
      }
    }
    return ret;
  }

  /**
    * @desc Set a specific rule for a given selector
    * @param {String} selector - the CSS selector for this rule (e.g. "body", ".class", "#id")
    * @param {String} property - the CSS property to set (e.g. "background-color", "font-family", "z-index")
    * @param {String} value    - the new value for the rule (e.g. "rgb(255, 255, 255)", "Helvetica", "99")
  */
  setRule(selector, property, value) {
    var sheet = this.sheet;
    var rules = sheet.rules || sheet.cssRules;
    var map = this.map;
    // Convert property from camelCase to snake-case
    property = property.replace(/([A-Z])/g, function($1) {
      return "-" + $1.toLowerCase();
    });
    if (!map.hasOwnProperty(selector)) {
      // If the selector hasn't been used yet we want to insert the rule at the end of the CSSRuleList, so we use its length as the index value
      var index = rules.length;
      // Prepare the rule declaration text, since both insertRule and addRule take this format
      var declaration = property + ": " + value;
      // Insert the new rule into the stylesheet
      try {
        // Some browsers only support insertRule, others only support addRule, so we have to use both
        sheet.insertRule(selector + " {" + declaration + ";}", index);
      } catch(e) {
        sheet.addRule(selector, declaration, index);
      } finally {
        // Because safari is perhaps the worst browser in all of history, we have to remind it to keep the sheet rules up-to-date
        rules = sheet.rules || sheet.cssRules;
        // Add our newly inserted rule's CSSStyleDeclaration object to the internal map
        map[selector] = rules[index].style;
      }
    }
    else {
      map[selector].setProperty(property, value);
    }
  }
}