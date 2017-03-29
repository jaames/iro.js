import dom from "../util/dom.js";

module.exports = {
  create: function (wrapper, width, height, names) {
    wrapper.style.cssText += "position:relative";
    var pxRatio = devicePixelRatio || 1;
    var pxWidth = width * pxRatio;
    var pxHeight = height * pxRatio;
    var ret = {};
    names.forEach(function (name, index) {
      var canvas = dom.append(wrapper, dom.create("canvas"));
      var ctx = canvas.getContext("2d");
      var style = canvas.style;
      canvas.width = pxWidth;
      canvas.height = pxHeight;
      style.cssText += "width:" + width + "px;" + "height" + height + "px";
      ctx.scale(pxRatio, pxRatio);
      if (index != 0) style.cssText += "position:absolute;top:0;left:0";
      ret[name] = {
        ctx,
        canvas
      };
    });
    return ret;
  }
};
