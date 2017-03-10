import dom from "./util/dom.js";

const doc = document;

let stylesheet = function (overrides) {
  let style = dom.create("style");
  dom.append(style, doc.createTextNode(""));
  dom.append(doc.head, style);
  this.style = style;
  let sheet = style.sheet;
  this.sheet = sheet;
  this.rules = sheet.rules || sheet.cssRules;
  this._map = {};
  overrides = overrides || {};
  this.overrides = Object.keys(overrides).reduce(function (arr, selector) {
    var ruleSet = overrides[selector];
    for (var property in ruleSet) {
      let type = ruleSet[property];
      arr.push({selector, property, type})
    }
    return arr;
  }, []);
};

let snakeCase = function (str) {
  return str.replace(/([A-Z])/g, function($1) {
    return "-" + $1.toLowerCase();
  });
};

stylesheet.prototype = {
  on: function () {
    this.sheet.disabled = false;
  },
  off: function () {
    this.sheet.disabled = true;
  },
  setRule: function (selector, property, value) {
    var rules = this.rules;
    var sheet = this.sheet;
    var map = this._map;
    // convert property to snake-case
    property = snakeCase(property);
    // if the selector hasn't been used yet
    if (!map.hasOwnProperty(selector)){
      var index = rules.length;
      // insert the new rule into the stylesheet
      try {
        sheet.insertRule(selector + " {" + property + ": " + value + ";}", index);
      } catch(e) {
        sheet.addRule(selector, property + ": " + value, index);
      } finally {
        map[selector] = rules[index].style;
      }
    }
    else {
      map[selector].setProperty(property, value);
    }
  },
  _iterRules: function (fn) {
    var map = this._map;
    for (var selector in map) {
      fn(selector, map[selector]);
    }
  },
  getCSS: function () {
    var ret = {};
    this._iterRules((selector, ruleSet) => {
      ret[selector] = {};
      for (var i = 0; i < ruleSet.length; i++) {
        var property = ruleSet[i];
        ret[selector][property] = ruleSet.getPropertyValue(property);
      }
    });
    return ret;
  },
  getCSSText: function () {
    var ret = [];
    this._iterRules((selector, ruleSet) => {
      ret.push(selector + " {\n\t" + ruleSet.cssText.replace(/;\W/g, ";\n\t") + "\n}");
    });
    return ret.join("\n");
  },
  update: function (color) {
    var overrides = this.overrides;
    var rgb = color.rgbString;
    overrides.forEach((obj) => {
      this.setRule(obj.selector, obj.property, rgb);
    });
  }
};

module.exports = stylesheet;
