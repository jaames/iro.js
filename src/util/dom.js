var doc = document;

function iterateList(list, callback) {
  list = ("string" == typeof list) ? [list] : list;
  list.forEach(callback);
}

module.exports = {
  $: function (selector) {
    return doc.querySelector(selector);
  },
  create: function (tagName) {
    return doc.createElement(tagName);
  },
  append: function (el, child) {
    return el.appendChild(child);
  },
  attr: function (el, attrName) {
    return el.getAttribute(attrName);
  },
  listen: function (el, eventList, callback) {
    iterateList(eventList, function (eventName) {
      el.addEventListener(eventName, callback);
    });
  },
  unlisten: function (el, eventList, callback) {
    iterateList(eventList, function (eventName) {
      el.removeEventListener(eventName, callback);
    });
  },
}
