// Quick reference to the document object and some strings since we usethem more than once
const doc = document,
      READYSTATE_COMPLETE = "complete",
      READYSTATE_CHANGE = "readystatechange";

module.exports = {
  /**
   * @desc listen to one or more events on an element
   * @param {Element} el target element
   * @param {ArrayOrString} eventList the events to listen to
   * @param {Function} callback the event callback function
  */
  listen: function (el, eventList, callback) {
    for (var i = 0; i < eventList.length; i++) {
      el.addEventListener(eventList[i], callback);
    }
  },

  /**
   * @desc remove an event listener on an element
   * @param {Element} el target element
   * @param {ArrayOrString} eventList the events to remove
   * @param {Function} callback the event callback function
  */
  unlisten: function (el, eventList, callback) {
    for (var i = 0; i < eventList.length; i++) {
      el.removeEventListener(eventList[i], callback);
    }
  },

  /**
   * @desc call callback when the page document is ready
   * @param {Function} callback callback function to be called
  */
  whenReady: function (callback) {
    var _this = this;
    if (doc.readyState == READYSTATE_COMPLETE) {
      callback();
    }
    else {
      _this.listen(doc, [READYSTATE_CHANGE], function stateChange(e) {
        if (doc.readyState == READYSTATE_COMPLETE) {
          callback();
          _this.unlisten(doc, [READYSTATE_CHANGE], stateChange);
        }
      });
    }
  },
}
