let color = function (opts) {
  if (!(this instanceof color)) return new color(opts);
  this._onChange = false;
  this._oldHsv = {h: undefined, s: undefined, v: undefined};
};

color.prototype = {
  watch: function (callback) {
    this._onChange = callback;
  },
  unwatch: function () {
    this.watch(false);
  },
  setHsv: function (newValue) {
    // loop through the channels and check if any of them have changed
    var changed = {};
    var oldHsv = this._oldHsv;
    for (var channel in oldHsv){
      if (!newValue.hasOwnProperty(channel)) newValue[channel] = oldHsv[channel];
      changed[channel] = !(newValue[channel] == oldHsv[channel]);
    }
    //this._hsv = newValue;
    // if the value has changed, call hook callback
    if ((changed.h || changed.s || changed.v) && ("function" == typeof this._onChange)) this._onChange(newValue, oldHsv, changed);
    // update the old value
    this._oldHsv = newValue;
  }
};

module.exports = color;
