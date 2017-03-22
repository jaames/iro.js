import dom from "../util/dom.js";

const doc = document;

let stylesheet = function (overrides) {
  let style = dom.create("style");
  dom.append(style, doc.createTextNode(""));
  dom.append(doc.head, style);
  this.style = style;
  let sheet = style.sheet;
  this.sheet = sheet;
  this.rules = sheet.rules || sheet.cssRules;
  this.map = {};
  this.overrides = overrides || {};
};

stylesheet.prototype = {
  on: function () {
    this.sheet.disabled = false;
  },
  off: function () {
    this.sheet.disabled = true;
  },
  setRule: function (selector, property, value) {
    var sheet = this.sheet;
    var rules = sheet.rules || sheet.cssRules;
    var map = this.map;
    // convert property to snake-case
    property = property.replace(/([A-Z])/g, function($1) {
      return "-" + $1.toLowerCase();
    });
    // if the selector hasn't been used yet
    if (!map.hasOwnProperty(selector)){
      var index = rules.length;
      var declaration = property + ": " + value;
      // insert the new rule into the stylesheet
      try {
        sheet.insertRule(selector + " {" + declaration + ";}", index);
      } catch(e) {
        sheet.addRule(selector, declaration, index);
      } finally {
        rules = sheet.rules || sheet.cssRules;
        map[selector] = rules[index].style;
      }
    }
    else {
      map[selector].setProperty(property, value);
    }
  },
  getCss: function () {
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
  },
  getCssText: function () {
    var map = this.map;
    var ret = [];
    for (var selector in map) {
      ret.push(selector + " {\n\t" + map[selector].cssText.replace(/;\W/g, ";\n\t") + "\n}");
    }
    return ret.join("\n");
  },
  update: function (color) {
    var overrides = this.overrides;
    var rgb = color.rgbString;
    for (var selector in overrides) {
      var properties = overrides[selector];
      for (var prop in properties) {
        this.setRule(selector, prop, rgb);
      }
    }
  }
};

module.exports = stylesheet;
