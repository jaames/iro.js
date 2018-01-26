var GRADIENT_INDEX = 0;
var GRADIENT_SUFFIX = "Gradient";
var SVG_NAMESPACE = "http://www.w3.org/2000/svg";
var SVG_ATTRIBUTE_SHORTHANDS = {
  class: "class",
  stroke: "stroke",
  strokeWidth: "stroke-width",
  fill: "fill",
  opacity: "opacity",
  offset: "offset",
  stopColor: "stop-color",
  stopOpacity: "stop-opacity",
};
// TODO: figure out why these aren't being compressed properly?
var SVG_TRANSFORM_SHORTHANDS = {
  translate: "setTranslate",
  scale: "setScale",
  rotate: "setRotate"
};
// sniff useragent string to check if the user is running IE, Edge or Safari
var ua = window.navigator.userAgent.toLowerCase();
var IS_IE = /msie|trident|edge/.test(ua);
var IS_SAFARI = /^((?!chrome|android).)*safari/i.test(ua);
/**
  * @constructor svg element wrapper
  * @param {svgRoot} root - svgRoot object
  * @param {svgElement | Element} parent - parent node 
  * @param {String} type - element tag name
  * @param {Object} attrs - element attributes
*/
const svgElement = function(root, parent, type, attrs) {
  var el = document.createElementNS(SVG_NAMESPACE, type);
  this.el = el;
  this.setAttrs(attrs);
  (parent.el || parent).appendChild(el);
  this._root = root;
  this._svgTransforms = {};
  this._transformList = el.transform ? el.transform.baseVal : false;
};

svgElement.prototype = {
  constructor: svgElement,

  /**
    * @desc insert a new svgElement
    * @param {String} type - element tag name
    * @param {Object} attrs - element attributes
  */
  insert: function(type, attrs) {
    return new svgElement(this._root, this, type, attrs);
  },

  /**
    * @desc shorthand to insert a new group svgElement
    * @param {Object} attrs - element attributes
  */
  g: function(attrs) {
    return this.insert("g", attrs);
  },

  /**
    * @desc shorthand to insert a new arc svgElement
    * @param {Number} cx - arc center x
    * @param {Number} cy - arc center y
    * @param {Number} radius - arc radius
    * @param {Number} startAngle - arc start angle (in degrees)
    * @param {Number} endAngle - arc end angle (in degrees)
    * @param {Object} attrs - element attributes
  */
  arc: function(cx, cy, radius, startAngle, endAngle, attrs) {
    var largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
    startAngle *= Math.PI / 180;
    endAngle *= Math.PI / 180;
    var x1 = cx + radius * Math.cos(endAngle),
        y1 = cy + radius * Math.sin(endAngle),
        x2 = cx + radius * Math.cos(startAngle),
        y2 = cy + radius * Math.sin(startAngle);
    attrs = attrs || {};
    attrs.d = ["M", x1, y1, "A", radius, radius, 0, largeArcFlag, 0, x2, y2].join(" ");
    return this.insert("path", attrs);
  },

  /**
    * @desc shorthand to insert a new circle svgElement
    * @param {Number} cx - circle center x
    * @param {Number} cy - circle center y
    * @param {Number} radius - circle radius
    * @param {Object} attrs - element attributes
  */
  circle: function(cx, cy, radius, attrs) {
    attrs = attrs || {};
    attrs.cx = cx;
    attrs.cy = cy;
    attrs.r = radius;
    return this.insert("circle", attrs);
  },

  /**
    * @desc set a rotate/translate/scale transform on this element
    * @param {String} type - transform (rotate | translate | scale)
    * @param {Array} args - transform values
  */
  setTransform: function(type, args) {
    if (!IS_IE) {  
      var transform, transformFn;
      var svgTransforms = this._svgTransforms;
      if (!svgTransforms[type]) {
        transform = this._root.el.createSVGTransform();
        svgTransforms[type] = transform;
        this._transformList.appendItem(transform);
      } else {
        transform = svgTransforms[type];
      }
      transformFn = (type in SVG_TRANSFORM_SHORTHANDS) ? SVG_TRANSFORM_SHORTHANDS[type] : type;
      transform[transformFn].apply(transform, args);
    } else {
      // Microsoft still can't make a web browser that actually works, as such, Edge + IE dont implement SVG transforms properly.
      // We have to force them instead... geez
      this.setAttrs({"transform": type + "(" + args.join(", ") + ")"});
    }
  },

  /**
    * @desc set attributes on this element
    * @param {Object} attrs - element attributes
  */
  setAttrs: function (attrs) {
    for (var attr in attrs) {
      var name = (attr in SVG_ATTRIBUTE_SHORTHANDS) ? SVG_ATTRIBUTE_SHORTHANDS[attr] : attr;
      this.el.setAttribute(name, attrs[attr]);
    }
  },

  setGradient: function(attr, gradient) {
    var attrs = {};
    attrs[attr] = gradient.getUrl();
    gradient._refs[attr] = this;
    this.gradient = gradient;
    this.setAttrs(attrs);
  }
};

/**
  * @constructor svg gradient wrapper
  * @param {svgRoot} root - svgRoot object
  * @param {String} type - gradient type (linear | radial)
  * @param {Object} stops - gradient stops = {color, opacity} keyed by offset value
*/
const svgGradient = function(root, type, stops) {
  var stopElements = [];
  var gradient = root._defs.insert(type + GRADIENT_SUFFIX, {
    id: "iro" + GRADIENT_SUFFIX + (GRADIENT_INDEX++)
  });
  for (var offset in stops) {
    var stop = stops[offset];
    stopElements.push(gradient.insert("stop", {
      offset: offset + "%",
      stopColor: stop.color,
      stopOpacity: stop.opacity === undefined ? 1 : stop.opacity,
    }));
  }
  this.el = gradient.el;
  this.stops = stopElements;
  this._refs = {};
};

svgGradient.prototype.getUrl = function(base) {
  var root = IS_SAFARI ? (base || window.location.href) : "";
  return "url(" + root + "#" + this.el.id + ")";
};

/**
  * @constructor svg root element (inherits svgElement)
  * @param {svgElement | Element} parent - parent node 
  * @param {Number} width - svg width
  * @param {Number} height - svg height
*/
const svgRoot = function(parent, width, height, display) {
  svgElement.call(this, this, parent, "svg", {
    width, 
    height, 
    style: "display:" + (display || "block")
  });
  this._defs = this.insert("defs");
  this._gradients = [];
};

svgRoot.prototype = Object.create(svgElement.prototype);
svgRoot.prototype.constructor = svgRoot;
svgRoot.prototype.gradient = function(type, stops) {
  var gradient = new svgGradient(this, type, stops);
  this._gradients.push(gradient);
  return gradient;
};
svgRoot.prototype.updateUrls = function(base) {
  if (IS_SAFARI) {
    var gradients = this._gradients;
    for (var i = 0; i < gradients.length; i++) {
      for (var key in gradients[i]._refs) {
        var attrs = {};
        attrs[key] = gradients[i].getUrl(base);
        gradients[i]._refs[key].setAttrs(attrs);
      }
    }
  }
};

module.exports = svgRoot;