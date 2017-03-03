let color = function (opts) {
  if (!(this instanceof color)) return new color(opts);
  this._onChange = false;
  this._oldValue = {h: undefined, s: undefined, v: undefined};
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
    var changes = {};
    var oldValue = this._oldValue;
    for (var channel in oldValue){
      if (!newValue.hasOwnProperty(channel)) newValue[channel] = oldValue[channel];
      changes[channel] = !(newValue[channel] == oldValue[channel]);
    }
    //this._hsv = newValue;
    // if the value has changed, call hook callback
    if ((changes.h || changes.s || changes.v) && ("function" == typeof this._onChange)) this._onChange(newValue, oldValue, changes);
    // update the old value
    this._oldValue = newValue;
  }
};

module.exports = color;
