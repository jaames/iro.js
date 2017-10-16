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
var SVG_TRANSFORM_SHORTHANDS = {
  translate: "setTranslate",
  scale: "setScale",
  rotate: "setRotate"
};
// sniff useragent string to check if the user is running IE
var IS_IE = /msie|trident/.test(window.navigator.userAgent.toLowerCase());

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

  insert: function(type, attrs) {
    return new svgElement(this._root, this, type, attrs);
  },

  g: function(attrs) {
    return this.insert("g", attrs);
  },

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

  circle: function(cx, cy, radius, attrs) {
    attrs = attrs || {};
    attrs.cx = cx;
    attrs.cy = cy;
    attrs.r = radius;
    return this.insert("circle", attrs);
  },

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
      // older internet explorer versions dont implement SVG transforms properly, instead we have to force them
      this.setAttrs({"transform": type + "(" + args.join(", ") + ")"});
    }
  },

  setAttrs (attrs) {
    for (var attr in attrs) {
      var name = (attr in SVG_ATTRIBUTE_SHORTHANDS) ? SVG_ATTRIBUTE_SHORTHANDS[attr] : attr;
      this.el.setAttribute(name, attrs[attr]);
    }
  }
};

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
  this.url = "url(#" + gradient.el.id + ")";
  this.stops = stopElements;
};

const svgRoot = function(parent, width, height) {
  svgElement.call(this, this, parent, "svg", {width, height, style: "display:block;overflow:hidden;"});
  this._defs = this.insert("defs");
};

svgRoot.prototype = Object.create(svgElement.prototype);
svgRoot.prototype.constructor = svgRoot;
svgRoot.prototype.gradient = function(type, stops) {
  return new svgGradient(this, type, stops);
}

module.exports = svgRoot;