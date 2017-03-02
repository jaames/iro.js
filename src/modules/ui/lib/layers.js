export default {
  create: function (wrapper, width, height, names) {
    wrapper.style.cssText += "position:relative";
    var pxRatio = window.devicePixelRatio || 1;
    var pxWidth = width * pxRatio;
    var pxHeight = height * pxRatio;
    var ret = {};
    names.forEach(function (name, index) {
      var canvas = document.createElement("canvas");
      var ctx = canvas.getContext("2d");
      canvas.width = pxWidth;
      canvas.height = pxHeight;
      canvas.style.cssText += "width:" + width + "px;" + "height" + height + "px";
      ctx.scale(pxRatio, pxRatio);
      if (index != 0) canvas.style.cssText += "position:absolute;top:0;left:0";
      wrapper.appendChild(canvas);
      ret[name] = {
        ctx,
        canvas
      };
    });
    return ret;
  }
};
