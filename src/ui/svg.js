import dom from "util/dom";
// Quick references to reused math functions
var PI = Math.PI,
    cos = Math.cos,
    sin = Math.sin;

var GRADIENT_ID = 0;
var SVG_NAMESPACE = "http://www.w3.org/2000/svg";

let svgGradient = function (root, type, stops) {
  switch (type) {
    case "linear":
      type = "linearGradient";
      break;
    default:
      type = "radialGradient";
  }
  var stopElements = [];
  var gradient = root.insert(root._defs, type, {
    "id": "irogradient" + (GRADIENT_ID++)
  });
  for (var offset in stops) {
    stopElements.push(root.insert(gradient, "stop", {
      "offset": offset + "%",
      "stop-color": stops[offset],
    }));
  }
  this.id = gradient.id;
  this.stops = stopElements;
};

svgGradient.prototype.setAttr = function (index, attr, value) {
  this.stops[index].setAttribute(attr, value);
};

let svg = function (parent, width, height) {
  this._root = dom.appendNew(parent, "svg", {
    viewBox: [0, 0, width, height].join(" "),
    width: width,
    height: height,
    style: "position:absolute;top:0;left:0;"
  }, "SVG");
  this._defs = this.insert(null, "defs");
};

svg.prototype = {

  insert: function (parent, tagName, attrs) {
    var el = document.createElementNS(SVG_NAMESPACE, tagName);
    for (var attr in (attrs || {})) {
      var name = attr;
      switch (attr) {
        case "s":
          name = "stroke";
          break;
        case "sw":
          name = "stroke-width";
          break;
        case "f":
          name = "fill";
          break;
        default:
          name = attr;
          break;
      }
      el.setAttribute(name, attrs[attr]);
    }
    (parent || this._root).appendChild(el);
    return el;
  },

  gradient: function (type, stops) {
    return new svgGradient(this, type, stops);
  },

  arc: function (cx, cy, radius, startAngle, endAngle, parent, attrs) {
    startAngle *= PI / 180;
    endAngle *= PI / 180;
    var x1 = cx + (radius * cos(endAngle)),
        y1 = cy + (radius * sin(endAngle)),
        x2 = cx + (radius * cos(startAngle)),
        y2 = cy + (radius * sin(startAngle));
    attrs = attrs || {};
    attrs.d = ["M", x1, y1, "A", radius, radius, 0, 0, 0, x2, y2].join(" ");
    return this.insert(parent, "path", attrs);
  },

  circle: function (cx, cy, radius, parent, attrs) {
    attrs = attrs || {};
    attrs.cx = cx;
    attrs.cy = cy;
    attrs.r = radius;
    return this.insert(parent, "circle", attrs);
  }

};

module.exports = svg;
