/*!
 * iro.js v5.2.0
 * 2016-2020 James Daniel
 * Licensed under MPL 2.0
 * github.com/jaames/iro.js
 */

var n,u,i,t,o,r,f={},e=[],c=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;function s(n,l){for(var u in l){ n[u]=l[u]; }return n}function a(n){var l=n.parentNode;l&&l.removeChild(n);}function v(n,l,u){var i,t=arguments,o={};for(i in l){ "key"!==i&&"ref"!==i&&(o[i]=l[i]); }if(arguments.length>3){ for(u=[u],i=3;i<arguments.length;i++){ u.push(t[i]); } }if(null!=u&&(o.children=u),"function"==typeof n&&null!=n.defaultProps){ for(i in n.defaultProps){ void 0===o[i]&&(o[i]=n.defaultProps[i]); } }return h(n,o,l&&l.key,l&&l.ref,null)}function h(l,u,i,t,o){var r={type:l,props:u,key:i,ref:t,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,constructor:void 0,__v:o};return null==o&&(r.__v=r),n.vnode&&n.vnode(r),r}function p(n){return n.children}function d(n,l){this.props=n,this.context=l;}function _(n,l){if(null==l){ return n.__?_(n.__,n.__.__k.indexOf(n)+1):null; }for(var u;l<n.__k.length;l++){ if(null!=(u=n.__k[l])&&null!=u.__e){ return u.__e; } }return "function"==typeof n.type?_(n):null}function w(n){var l,u;if(null!=(n=n.__)&&null!=n.__c){for(n.__e=n.__c.base=null,l=0;l<n.__k.length;l++){ if(null!=(u=n.__k[l])&&null!=u.__e){n.__e=n.__c.base=u.__e;break} }return w(n)}}function k(l){(!l.__d&&(l.__d=!0)&&u.push(l)&&!m.__r++||t!==n.debounceRendering)&&((t=n.debounceRendering)||i)(m);}function m(){for(var n;m.__r=u.length;){ n=u.sort(function(n,l){return n.__v.__b-l.__v.__b}),u=[],n.some(function(n){var l,u,i,t,o,r,f;n.__d&&(r=(o=(l=n).__v).__e,(f=l.__P)&&(u=[],(i=s({},o)).__v=i,t=T(f,o,i,l.__n,void 0!==f.ownerSVGElement,null,u,null==r?_(o):r),$(u,o),t!=r&&w(o)));}); }}function g(n,l,u,i,t,o,r,c,s,v){var y,d,w,k,m,g,b,A=i&&i.__k||e,P=A.length;for(s==f&&(s=null!=r?r[0]:P?_(i,0):null),u.__k=[],y=0;y<l.length;y++){ if(null!=(k=u.__k[y]=null==(k=l[y])||"boolean"==typeof k?null:"string"==typeof k||"number"==typeof k?h(null,k,null,null,k):Array.isArray(k)?h(p,{children:k},null,null,null):null!=k.__e||null!=k.__c?h(k.type,k.props,k.key,null,k.__v):k)){if(k.__=u,k.__b=u.__b+1,null===(w=A[y])||w&&k.key==w.key&&k.type===w.type){ A[y]=void 0; }else { for(d=0;d<P;d++){if((w=A[d])&&k.key==w.key&&k.type===w.type){A[d]=void 0;break}w=null;} }m=T(n,k,w=w||f,t,o,r,c,s,v),(d=k.ref)&&w.ref!=d&&(b||(b=[]),w.ref&&b.push(w.ref,null,k),b.push(d,k.__c||m,k)),null!=m?(null==g&&(g=m),s=x(n,k,w,A,r,m,s),v||"option"!=u.type?"function"==typeof u.type&&(u.__d=s):n.value=""):s&&w.__e==s&&s.parentNode!=n&&(s=_(w));} }if(u.__e=g,null!=r&&"function"!=typeof u.type){ for(y=r.length;y--;){ null!=r[y]&&a(r[y]); } }for(y=P;y--;){ null!=A[y]&&I(A[y],A[y]); }if(b){ for(y=0;y<b.length;y++){ H(b[y],b[++y],b[++y]); } }}function x(n,l,u,i,t,o,r){var f,e,c;if(void 0!==l.__d){ f=l.__d,l.__d=void 0; }else if(t==u||o!=r||null==o.parentNode){ n:if(null==r||r.parentNode!==n){ n.appendChild(o),f=null; }else {for(e=r,c=0;(e=e.nextSibling)&&c<i.length;c+=2){ if(e==o){ break n; } }n.insertBefore(o,r),f=r;} }return void 0!==f?f:o.nextSibling}function A(n,l,u,i,t){var o;for(o in u){ "children"===o||"key"===o||o in l||C(n,o,null,u[o],i); }for(o in l){ t&&"function"!=typeof l[o]||"children"===o||"key"===o||"value"===o||"checked"===o||u[o]===l[o]||C(n,o,l[o],u[o],i); }}function P(n,l,u){"-"===l[0]?n.setProperty(l,u):n[l]="number"==typeof u&&!1===c.test(l)?u+"px":null==u?"":u;}function C(n,l,u,i,t){var o,r,f,e,c;if(t?"className"===l&&(l="class"):"class"===l&&(l="className"),"style"===l){ if(o=n.style,"string"==typeof u){ o.cssText=u; }else {if("string"==typeof i&&(o.cssText="",i=null),i){ for(e in i){ u&&e in u||P(o,e,""); } }if(u){ for(c in u){ i&&u[c]===i[c]||P(o,c,u[c]); } }} }else { "o"===l[0]&&"n"===l[1]?(r=l!==(l=l.replace(/Capture$/,"")),f=l.toLowerCase(),l=(f in n?f:l).slice(2),u?(i||n.addEventListener(l,N,r),(n.l||(n.l={}))[l]=u):n.removeEventListener(l,N,r)):"list"!==l&&"tagName"!==l&&"form"!==l&&"type"!==l&&"size"!==l&&"download"!==l&&!t&&l in n?n[l]=null==u?"":u:"function"!=typeof u&&"dangerouslySetInnerHTML"!==l&&(l!==(l=l.replace(/^xlink:?/,""))?null==u||!1===u?n.removeAttributeNS("http://www.w3.org/1999/xlink",l.toLowerCase()):n.setAttributeNS("http://www.w3.org/1999/xlink",l.toLowerCase(),u):null==u||!1===u&&!/^ar/.test(l)?n.removeAttribute(l):n.setAttribute(l,u)); }}function N(l){this.l[l.type](n.event?n.event(l):l);}function z(n,l,u){var i,t;for(i=0;i<n.__k.length;i++){ (t=n.__k[i])&&(t.__=n,t.__e&&("function"==typeof t.type&&t.__k.length>1&&z(t,l,u),l=x(u,t,t,n.__k,null,t.__e,l),"function"==typeof n.type&&(n.__d=l))); }}function T(l,u,i,t,o,r,f,e,c){var a,v,h,y,_,w,k,m,b,x,A,P=u.type;if(void 0!==u.constructor){ return null; }(a=n.__b)&&a(u);try{n:if("function"==typeof P){if(m=u.props,b=(a=P.contextType)&&t[a.__c],x=a?b?b.props.value:a.__:t,i.__c?k=(v=u.__c=i.__c).__=v.__E:("prototype"in P&&P.prototype.render?u.__c=v=new P(m,x):(u.__c=v=new d(m,x),v.constructor=P,v.render=L),b&&b.sub(v),v.props=m,v.state||(v.state={}),v.context=x,v.__n=t,h=v.__d=!0,v.__h=[]),null==v.__s&&(v.__s=v.state),null!=P.getDerivedStateFromProps&&(v.__s==v.state&&(v.__s=s({},v.__s)),s(v.__s,P.getDerivedStateFromProps(m,v.__s))),y=v.props,_=v.state,h){ null==P.getDerivedStateFromProps&&null!=v.componentWillMount&&v.componentWillMount(),null!=v.componentDidMount&&v.__h.push(v.componentDidMount); }else {if(null==P.getDerivedStateFromProps&&m!==y&&null!=v.componentWillReceiveProps&&v.componentWillReceiveProps(m,x),!v.__e&&null!=v.shouldComponentUpdate&&!1===v.shouldComponentUpdate(m,v.__s,x)||u.__v===i.__v){v.props=m,v.state=v.__s,u.__v!==i.__v&&(v.__d=!1),v.__v=u,u.__e=i.__e,u.__k=i.__k,v.__h.length&&f.push(v),z(u,e,l);break n}null!=v.componentWillUpdate&&v.componentWillUpdate(m,v.__s,x),null!=v.componentDidUpdate&&v.__h.push(function(){v.componentDidUpdate(y,_,w);});}v.context=x,v.props=m,v.state=v.__s,(a=n.__r)&&a(u),v.__d=!1,v.__v=u,v.__P=l,a=v.render(v.props,v.state,v.context),v.state=v.__s,null!=v.getChildContext&&(t=s(s({},t),v.getChildContext())),h||null==v.getSnapshotBeforeUpdate||(w=v.getSnapshotBeforeUpdate(y,_)),A=null!=a&&a.type==p&&null==a.key?a.props.children:a,g(l,Array.isArray(A)?A:[A],u,i,t,o,r,f,e,c),v.base=u.__e,v.__h.length&&f.push(v),k&&(v.__E=v.__=null),v.__e=!1;}else { null==r&&u.__v===i.__v?(u.__k=i.__k,u.__e=i.__e):u.__e=j(i.__e,u,i,t,o,r,f,c); }(a=n.diffed)&&a(u);}catch(l$1){u.__v=null,n.__e(l$1,u,i);}return u.__e}function $(l,u){n.__c&&n.__c(u,l),l.some(function(u){try{l=u.__h,u.__h=[],l.some(function(n){n.call(u);});}catch(l$1){n.__e(l$1,u.__v);}});}function j(n,l,u,i,t,o,r,c){var s,a,v,h,y,p=u.props,d=l.props;if(t="svg"===l.type||t,null!=o){ for(s=0;s<o.length;s++){ if(null!=(a=o[s])&&((null===l.type?3===a.nodeType:a.localName===l.type)||n==a)){n=a,o[s]=null;break} } }if(null==n){if(null===l.type){ return document.createTextNode(d); }n=t?document.createElementNS("http://www.w3.org/2000/svg",l.type):document.createElement(l.type,d.is&&{is:d.is}),o=null,c=!1;}if(null===l.type){ p!==d&&n.data!==d&&(n.data=d); }else {if(null!=o&&(o=e.slice.call(n.childNodes)),v=(p=u.props||f).dangerouslySetInnerHTML,h=d.dangerouslySetInnerHTML,!c){if(null!=o){ for(p={},y=0;y<n.attributes.length;y++){ p[n.attributes[y].name]=n.attributes[y].value; } }(h||v)&&(h&&v&&h.__html==v.__html||(n.innerHTML=h&&h.__html||""));}A(n,d,p,t,c),h?l.__k=[]:(s=l.props.children,g(n,Array.isArray(s)?s:[s],l,u,i,"foreignObject"!==l.type&&t,o,r,f,c)),c||("value"in d&&void 0!==(s=d.value)&&s!==n.value&&C(n,"value",s,p.value,!1),"checked"in d&&void 0!==(s=d.checked)&&s!==n.checked&&C(n,"checked",s,p.checked,!1));}return n}function H(l,u,i){try{"function"==typeof l?l(u):l.current=u;}catch(l$1){n.__e(l$1,i);}}function I(l,u,i){var t,o,r;if(n.unmount&&n.unmount(l),(t=l.ref)&&(t.current&&t.current!==l.__e||H(t,null,u)),i||"function"==typeof l.type||(i=null!=(o=l.__e)),l.__e=l.__d=void 0,null!=(t=l.__c)){if(t.componentWillUnmount){ try{t.componentWillUnmount();}catch(l$1){n.__e(l$1,u);} }t.base=t.__P=null;}if(t=l.__k){ for(r=0;r<t.length;r++){ t[r]&&I(t[r],u,i); } }null!=o&&a(o);}function L(n,l,u){return this.constructor(n,u)}function M(l,u,i){var t,r,c;n.__&&n.__(l,u),r=(t=i===o)?null:i&&i.__k||u.__k,l=v(p,null,[l]),c=[],T(u,(t?u:i||u).__k=l,r||f,f,void 0!==u.ownerSVGElement,i&&!t?[i]:r?null:u.childNodes.length?e.slice.call(u.childNodes):null,c,i||f,t),$(c,l);}n={__e:function(n,l){for(var u,i;l=l.__;){ if((u=l.__c)&&!u.__){ try{if(u.constructor&&null!=u.constructor.getDerivedStateFromError&&(i=!0,u.setState(u.constructor.getDerivedStateFromError(n))),null!=u.componentDidCatch&&(i=!0,u.componentDidCatch(n)),i){ return k(u.__E=u) }}catch(l$1){n=l$1;} } }throw n}},d.prototype.setState=function(n,l){var u;u=null!=this.__s&&this.__s!==this.state?this.__s:this.__s=s({},this.state),"function"==typeof n&&(n=n(u,this.props)),n&&s(u,n),null!=n&&this.__v&&(l&&this.__h.push(l),k(this));},d.prototype.forceUpdate=function(n){this.__v&&(this.__e=!0,n&&this.__h.push(n),k(this));},d.prototype.render=p,u=[],i="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,m.__r=0,o=f,r=0;

// Some regular expressions for rgb() and hsl() Colors are borrowed from tinyColor
// https://github.com/bgrins/TinyColor
// Kelvin temperature math borrowed from Neil Barlett's implementation
// from https://github.com/neilbartlett/color-temperature
// https://www.w3.org/TR/css3-values/#integers
var CSS_INTEGER = '[-\\+]?\\d+%?'; // http://www.w3.org/TR/css3-values/#number-value

var CSS_NUMBER = '[-\\+]?\\d*\\.\\d+%?'; // Allow positive/negative integer/number. Don't capture the either/or, just the entire outcome

var CSS_UNIT = '(?:' + CSS_NUMBER + ')|(?:' + CSS_INTEGER + ')'; // Parse function params
// Parens and commas are optional, and this also allows for whitespace between numbers

var PERMISSIVE_MATCH_3 = '[\\s|\\(]+(' + CSS_UNIT + ')[,|\\s]+(' + CSS_UNIT + ')[,|\\s]+(' + CSS_UNIT + ')\\s*\\)?';
var PERMISSIVE_MATCH_4 = '[\\s|\\(]+(' + CSS_UNIT + ')[,|\\s]+(' + CSS_UNIT + ')[,|\\s]+(' + CSS_UNIT + ')[,|\\s]+(' + CSS_UNIT + ')\\s*\\)?'; // Regex patterns for functional color strings

var REGEX_FUNCTIONAL_RGB = new RegExp('rgb' + PERMISSIVE_MATCH_3);
var REGEX_FUNCTIONAL_RGBA = new RegExp('rgba' + PERMISSIVE_MATCH_4);
var REGEX_FUNCTIONAL_HSL = new RegExp('hsl' + PERMISSIVE_MATCH_3);
var REGEX_FUNCTIONAL_HSLA = new RegExp('hsla' + PERMISSIVE_MATCH_4); // Color string parsing regex

var HEX_START = '^(?:#?|0x?)';
var HEX_INT_SINGLE = '([0-9a-fA-F]{1})';
var HEX_INT_DOUBLE = '([0-9a-fA-F]{2})';
var REGEX_HEX_3 = new RegExp(HEX_START + HEX_INT_SINGLE + HEX_INT_SINGLE + HEX_INT_SINGLE + '$');
var REGEX_HEX_4 = new RegExp(HEX_START + HEX_INT_SINGLE + HEX_INT_SINGLE + HEX_INT_SINGLE + HEX_INT_SINGLE + '$');
var REGEX_HEX_6 = new RegExp(HEX_START + HEX_INT_DOUBLE + HEX_INT_DOUBLE + HEX_INT_DOUBLE + '$');
var REGEX_HEX_8 = new RegExp(HEX_START + HEX_INT_DOUBLE + HEX_INT_DOUBLE + HEX_INT_DOUBLE + HEX_INT_DOUBLE + '$'); // Kelvin temperature bounds

var KELVIN_MIN = 1000;
var KELVIN_MAX = 40000; // Math shorthands

var log = Math.log;
var round = Math.round;
var floor = Math.floor;
/**
 * @desc Clamp a number between a min and max value
 * @param num - input value
 * @param min - min allowed value
 * @param max - max allowed value
 */

function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max);
}
/**
 * @desc Parse a css unit string - either regular int or a percentage number
 * @param str - css unit string
 * @param max - max unit value, used for calculating percentages
 */


function parseUnit(str, max) {
  var isPercentage = str.indexOf('%') > -1;
  var num = parseFloat(str);
  return isPercentage ? max / 100 * num : num;
}
/**
 * @desc Parse hex str to an int
 * @param str - hex string to parse
 */


function parseHexInt(str) {
  return parseInt(str, 16);
}
/**
 * @desc Convert nunber into to 2-digit hex
 * @param int - number to convert
 */


function intToHex(int) {
  return int.toString(16).padStart(2, '0');
}

var IroColor = function IroColor(value, onChange) {
  // The default Color value
  this.$ = {
    h: 0,
    s: 0,
    v: 0,
    a: 1
  };
  if (value) { this.set(value); } // The watch callback function for this Color will be stored here

  this.onChange = onChange;
  this.initialValue = Object.assign({}, this.$); // copy initial value
};

var prototypeAccessors = { hsv: { configurable: true },hsva: { configurable: true },hue: { configurable: true },saturation: { configurable: true },value: { configurable: true },alpha: { configurable: true },kelvin: { configurable: true },red: { configurable: true },green: { configurable: true },blue: { configurable: true },rgb: { configurable: true },rgba: { configurable: true },hsl: { configurable: true },hsla: { configurable: true },rgbString: { configurable: true },rgbaString: { configurable: true },hexString: { configurable: true },hex8String: { configurable: true },hslString: { configurable: true },hslaString: { configurable: true } };
/**
  * @desc Set the Color from any valid value
  * @param value - new color value
*/


IroColor.prototype.set = function set (value) {
  if (typeof value === 'string') {
    if (/^(?:#?|0x?)[0-9a-fA-F]{3,8}$/.test(value)) {
      this.hexString = value;
    } else if (/^rgba?/.test(value)) {
      this.rgbString = value;
    } else if (/^hsla?/.test(value)) {
      this.hslString = value;
    }
  } else if (typeof value === 'object') {
    if (value instanceof IroColor) {
      this.hsv = value.hsv;
    } else if (typeof value === 'object' && 'r' in value && 'g' in value && 'b' in value) {
      this.rgb = value;
    } else if (typeof value === 'object' && 'h' in value && 's' in value && 'v' in value) {
      this.hsv = value;
    } else if (typeof value === 'object' && 'h' in value && 's' in value && 'l' in value) {
      this.hsl = value;
    }
  } else {
    throw new Error('Invalid color value');
  }
};
/**
  * @desc Shortcut to set a specific channel value
  * @param format - hsv | hsl | rgb
  * @param channel - individual channel to set, for example if model = hsl, chanel = h | s | l
  * @param value - new value for the channel
*/


IroColor.prototype.setChannel = function setChannel (format, channel, value) {
    var obj;

  this[format] = Object.assign({}, this[format],
    ( obj = {}, obj[channel] = value, obj ));
};
/**
 * @desc Reset color back to its initial value
 */


IroColor.prototype.reset = function reset () {
  this.hsva = this.initialValue;
};
/**
  * @desc make new Color instance with the same value as this one
*/


IroColor.prototype.clone = function clone () {
  return new IroColor(this);
};
/**
 * @desc remove color onChange
 */


IroColor.prototype.unbind = function unbind () {
  this.onChange = undefined;
};
/**
  * @desc Convert hsv object to rgb
  * @param hsv - hsv color object
*/


IroColor.hsvToRgb = function hsvToRgb (hsv) {
  var h = hsv.h / 60;
  var s = hsv.s / 100;
  var v = hsv.v / 100;
  var i = floor(h);
  var f = h - i;
  var p = v * (1 - s);
  var q = v * (1 - f * s);
  var t = v * (1 - (1 - f) * s);
  var mod = i % 6;
  var r = [v, q, p, p, t, v][mod];
  var g = [t, v, v, q, p, p][mod];
  var b = [p, p, t, v, v, q][mod];
  return {
    r: clamp(r * 255, 0, 255),
    g: clamp(g * 255, 0, 255),
    b: clamp(b * 255, 0, 255)
  };
};
/**
  * @desc Convert rgb object to hsv
  * @param rgb - rgb object
*/


IroColor.rgbToHsv = function rgbToHsv (rgb) {
  var r = rgb.r / 255;
  var g = rgb.g / 255;
  var b = rgb.b / 255;
  var max = Math.max(r, g, b);
  var min = Math.min(r, g, b);
  var delta = max - min;
  var hue = 0;
  var value = max;
  var saturation = max === 0 ? 0 : delta / max;

  switch (max) {
    case min:
      hue = 0; // achromatic

      break;

    case r:
      hue = (g - b) / delta + (g < b ? 6 : 0);
      break;

    case g:
      hue = (b - r) / delta + 2;
      break;

    case b:
      hue = (r - g) / delta + 4;
      break;
  }

  return {
    h: hue * 60 % 360,
    s: clamp(saturation * 100, 0, 100),
    v: clamp(value * 100, 0, 100)
  };
};
/**
  * @desc Convert hsv object to hsl
  * @param hsv - hsv object
*/


IroColor.hsvToHsl = function hsvToHsl (hsv) {
  var s = hsv.s / 100;
  var v = hsv.v / 100;
  var l = (2 - s) * v;
  var divisor = l <= 1 ? l : 2 - l; // Avoid division by zero when lightness is close to zero

  var saturation = divisor < 1e-9 ? 0 : s * v / divisor;
  return {
    h: hsv.h,
    s: clamp(saturation * 100, 0, 100),
    l: clamp(l * 50, 0, 100)
  };
};
/**
  * @desc Convert hsl object to hsv
  * @param hsl - hsl object
*/


IroColor.hslToHsv = function hslToHsv (hsl) {
  var l = hsl.l * 2;
  var s = hsl.s * (l <= 100 ? l : 200 - l) / 100; // Avoid division by zero when l + s is near 0

  var saturation = l + s < 1e-9 ? 0 : 2 * s / (l + s);
  return {
    h: hsl.h,
    s: clamp(saturation * 100, 0, 100),
    v: clamp((l + s) / 2, 0, 100)
  };
};
/**
  * @desc Convert a kelvin temperature to an approx, RGB value
  * @param kelvin - kelvin temperature
*/


IroColor.kelvinToRgb = function kelvinToRgb (kelvin) {
  var temp = kelvin / 100;
  var r, g, b;

  if (temp < 66) {
    r = 255;
    g = -155.25485562709179 - 0.44596950469579133 * (g = temp - 2) + 104.49216199393888 * log(g);
    b = temp < 20 ? 0 : -254.76935184120902 + 0.8274096064007395 * (b = temp - 10) + 115.67994401066147 * log(b);
  } else {
    r = 351.97690566805693 + 0.114206453784165 * (r = temp - 55) - 40.25366309332127 * log(r);
    g = 325.4494125711974 + 0.07943456536662342 * (g = temp - 50) - 28.0852963507957 * log(g);
    b = 255;
  }

  return {
    r: clamp(floor(r), 0, 255),
    g: clamp(floor(g), 0, 255),
    b: clamp(floor(b), 0, 255)
  };
};
/**
 * @desc Convert an RGB color to an approximate kelvin temperature
 * @param kelvin - kelvin temperature
*/


IroColor.rgbToKelvin = function rgbToKelvin (rgb) {
  var r = rgb.r;
    var b = rgb.b;
  var eps = 0.4;
  var minTemp = KELVIN_MIN;
  var maxTemp = KELVIN_MAX;
  var temp;

  while (maxTemp - minTemp > eps) {
    temp = (maxTemp + minTemp) * 0.5;
    var rgb$1 = IroColor.kelvinToRgb(temp);

    if (rgb$1.b / rgb$1.r >= b / r) {
      maxTemp = temp;
    } else {
      minTemp = temp;
    }
  }

  return temp;
};

prototypeAccessors.hsv.get = function () {
  // value is cloned to allow changes to be made to the values before passing them back
  var value = this.$;
  return {
    h: value.h,
    s: value.s,
    v: value.v
  };
};

prototypeAccessors.hsv.set = function (newValue) {
  var oldValue = this.$;
  newValue = Object.assign({}, oldValue,
    newValue); // If this Color is being watched for changes we need to compare the new and old values to check the difference
  // Otherwise we can just be lazy

  if (this.onChange) {
    // Compute changed values
    var changes = {
      h: false,
      v: false,
      s: false,
      a: false
    };

    for (var key in oldValue) {
      changes[key] = newValue[key] != oldValue[key];
    }

    this.$ = newValue; // If the value has changed, call hook callback

    if (changes.h || changes.s || changes.v || changes.a) { this.onChange(this, changes); }
  } else {
    this.$ = newValue;
  }
};

prototypeAccessors.hsva.get = function () {
  return Object.assign({}, this.$);
};

prototypeAccessors.hsva.set = function (value) {
  this.hsv = value;
};

prototypeAccessors.hue.get = function () {
  return this.$.h;
};

prototypeAccessors.hue.set = function (value) {
  this.hsv = {
    h: value
  };
};

prototypeAccessors.saturation.get = function () {
  return this.$.s;
};

prototypeAccessors.saturation.set = function (value) {
  this.hsv = {
    s: value
  };
};

prototypeAccessors.value.get = function () {
  return this.$.v;
};

prototypeAccessors.value.set = function (value) {
  this.hsv = {
    v: value
  };
};

prototypeAccessors.alpha.get = function () {
  return this.$.a;
};

prototypeAccessors.alpha.set = function (value) {
  this.hsv = Object.assign({}, this.hsv,
    {a: value});
};

prototypeAccessors.kelvin.get = function () {
  return IroColor.rgbToKelvin(this.rgb);
};

prototypeAccessors.kelvin.set = function (value) {
  this.rgb = IroColor.kelvinToRgb(value);
};

prototypeAccessors.red.get = function () {
  var rgb = this.rgb;
  return rgb.r;
};

prototypeAccessors.red.set = function (value) {
  this.rgb = Object.assign({}, this.rgb,
    {r: value});
};

prototypeAccessors.green.get = function () {
  var rgb = this.rgb;
  return rgb.g;
};

prototypeAccessors.green.set = function (value) {
  this.rgb = Object.assign({}, this.rgb,
    {g: value});
};

prototypeAccessors.blue.get = function () {
  var rgb = this.rgb;
  return rgb.b;
};

prototypeAccessors.blue.set = function (value) {
  this.rgb = Object.assign({}, this.rgb,
    {b: value});
};

prototypeAccessors.rgb.get = function () {
  var ref = IroColor.hsvToRgb(this.$);
    var r = ref.r;
    var g = ref.g;
    var b = ref.b;
  return {
    r: round(r),
    g: round(g),
    b: round(b)
  };
};

prototypeAccessors.rgb.set = function (value) {
  this.hsv = Object.assign({}, IroColor.rgbToHsv(value),
    {a: value.a === undefined ? 1 : value.a});
};

prototypeAccessors.rgba.get = function () {
  return Object.assign({}, this.rgb,
    {a: this.alpha});
};

prototypeAccessors.rgba.set = function (value) {
  this.rgb = value;
};

prototypeAccessors.hsl.get = function () {
  var ref = IroColor.hsvToHsl(this.$);
    var h = ref.h;
    var s = ref.s;
    var l = ref.l;
  return {
    h: round(h),
    s: round(s),
    l: round(l)
  };
};

prototypeAccessors.hsl.set = function (value) {
  this.hsv = Object.assign({}, IroColor.hslToHsv(value),
    {a: value.a === undefined ? 1 : value.a});
};

prototypeAccessors.hsla.get = function () {
  return Object.assign({}, this.hsl,
    {a: this.alpha});
};

prototypeAccessors.hsla.set = function (value) {
  this.hsl = value;
};

prototypeAccessors.rgbString.get = function () {
  var rgb = this.rgb;
  return ("rgb(" + (rgb.r) + ", " + (rgb.g) + ", " + (rgb.b) + ")");
};

prototypeAccessors.rgbString.set = function (value) {
  var match;
  var r,
      g,
      b,
      a = 1;

  if (match = REGEX_FUNCTIONAL_RGB.exec(value)) {
    r = parseUnit(match[1], 255);
    g = parseUnit(match[2], 255);
    b = parseUnit(match[3], 255);
  } else if (match = REGEX_FUNCTIONAL_RGBA.exec(value)) {
    r = parseUnit(match[1], 255);
    g = parseUnit(match[2], 255);
    b = parseUnit(match[3], 255);
    a = parseUnit(match[4], 1);
  }

  if (match) {
    this.rgb = {
      r: r,
      g: g,
      b: b,
      a: a
    };
  } else {
    throw new Error('Invalid rgb string');
  }
};

prototypeAccessors.rgbaString.get = function () {
  var rgba = this.rgba;
  return ("rgba(" + (rgba.r) + ", " + (rgba.g) + ", " + (rgba.b) + ", " + (rgba.a) + ")");
};

prototypeAccessors.rgbaString.set = function (value) {
  this.rgbString = value;
};

prototypeAccessors.hexString.get = function () {
  var rgb = this.rgb;
  return ("#" + (intToHex(rgb.r)) + (intToHex(rgb.g)) + (intToHex(rgb.b)));
};

prototypeAccessors.hexString.set = function (value) {
  var match;
  var r,
      g,
      b,
      a = 255;

  if (match = REGEX_HEX_3.exec(value)) {
    r = parseHexInt(match[1]) * 17;
    g = parseHexInt(match[2]) * 17;
    b = parseHexInt(match[3]) * 17;
  } else if (match = REGEX_HEX_4.exec(value)) {
    r = parseHexInt(match[1]) * 17;
    g = parseHexInt(match[2]) * 17;
    b = parseHexInt(match[3]) * 17;
    a = parseHexInt(match[4]) * 17;
  } else if (match = REGEX_HEX_6.exec(value)) {
    r = parseHexInt(match[1]);
    g = parseHexInt(match[2]);
    b = parseHexInt(match[3]);
  } else if (match = REGEX_HEX_8.exec(value)) {
    r = parseHexInt(match[1]);
    g = parseHexInt(match[2]);
    b = parseHexInt(match[3]);
    a = parseHexInt(match[4]);
  }

  if (match) {
    this.rgb = {
      r: r,
      g: g,
      b: b,
      a: a / 255
    };
  } else {
    throw new Error('Invalid hex string');
  }
};

prototypeAccessors.hex8String.get = function () {
  var rgba = this.rgba;
  return ("#" + (intToHex(rgba.r)) + (intToHex(rgba.g)) + (intToHex(rgba.b)) + (intToHex(floor(rgba.a * 255))));
};

prototypeAccessors.hex8String.set = function (value) {
  this.hexString = value;
};

prototypeAccessors.hslString.get = function () {
  var hsl = this.hsl;
  return ("hsl(" + (hsl.h) + ", " + (hsl.s) + "%, " + (hsl.l) + "%)");
};

prototypeAccessors.hslString.set = function (value) {
  var match;
  var h,
      s,
      l,
      a = 1;

  if (match = REGEX_FUNCTIONAL_HSL.exec(value)) {
    h = parseUnit(match[1], 360);
    s = parseUnit(match[2], 100);
    l = parseUnit(match[3], 100);
  } else if (match = REGEX_FUNCTIONAL_HSLA.exec(value)) {
    h = parseUnit(match[1], 360);
    s = parseUnit(match[2], 100);
    l = parseUnit(match[3], 100);
    a = parseUnit(match[4], 1);
  }

  if (match) {
    this.hsl = {
      h: h,
      s: s,
      l: l,
      a: a
    };
  } else {
    throw new Error('Invalid hsl string');
  }
};

prototypeAccessors.hslaString.get = function () {
  var hsla = this.hsla;
  return ("hsl(" + (hsla.h) + ", " + (hsla.s) + "%, " + (hsla.l) + "%, " + (hsla.a) + ")");
};

prototypeAccessors.hslaString.set = function (value) {
  this.hslString = value;
};

Object.defineProperties( IroColor.prototype, prototypeAccessors );

var sliderDefaultOptions = {
  sliderShape: 'bar',
  sliderType: 'value',
  minTemperature: 2200,
  maxTemperature: 11000
};
/**
 * @desc Get the bounding dimensions of the slider
 * @param props - slider props
 */

function getSliderDimensions(props) {
  var width = props.width;
  var sliderSize = props.sliderSize;
  var borderWidth = props.borderWidth;
  var handleRadius = props.handleRadius;
  var padding = props.padding;
  var sliderShape = props.sliderShape;
  var ishorizontal = props.layoutDirection === 'horizontal'; // automatically calculate sliderSize if its not defined

  sliderSize = sliderSize ? sliderSize : padding * 2 + handleRadius * 2 + borderWidth * 2;

  if (sliderShape === 'circle') {
    return {
      handleStart: props.padding + props.handleRadius,
      handleRange: width - padding * 2 - handleRadius * 2 - borderWidth * 2,
      width: width,
      height: width,
      cx: width / 2,
      cy: width / 2,
      radius: width / 2 - borderWidth / 2
    };
  } else {
    return {
      handleStart: sliderSize / 2,
      handleRange: width - sliderSize,
      radius: sliderSize / 2,
      x: 0,
      y: 0,
      width: ishorizontal ? sliderSize : width,
      height: ishorizontal ? width : sliderSize
    };
  }
}
/**
 * @desc Get the current slider value for a given color, as a percentage
 * @param props - slider props
 * @param color
 */

function getCurrentSliderValue(props, color) {
  var hsva = color.hsva;
  var rgb = color.rgb;

  switch (props.sliderType) {
    case 'red':
      return rgb.r / 2.55;

    case 'green':
      return rgb.g / 2.55;

    case 'blue':
      return rgb.b / 2.55;

    case 'alpha':
      return hsva.a * 100;

    case 'kelvin':
      var minTemperature = props.minTemperature;
  var maxTemperature = props.maxTemperature;
      var temperatureRange = maxTemperature - minTemperature;
      var percent = (color.kelvin - minTemperature) / temperatureRange * 100; // clmap percentage

      return Math.max(0, Math.min(percent, 100));

    case 'hue':
      return hsva.h /= 3.6;

    case 'saturation':
      return hsva.s;

    case 'value':
    default:
      return hsva.v;
  }
}
/**
 * @desc Get the current slider value from user input
 * @param props - slider props
 * @param x - global input x position
 * @param y - global input y position
 */

function getSliderValueFromInput(props, x, y) {
  var ref = getSliderDimensions(props);
  var handleRange = ref.handleRange;
  var handleStart = ref.handleStart;
  var handlePos;

  if (props.layoutDirection === 'horizontal') {
    handlePos = -1 * y + handleRange + handleStart;
  } else {
    handlePos = x - handleStart;
  } // clamp handle position


  handlePos = Math.max(Math.min(handlePos, handleRange), 0);
  var percent = Math.round(100 / handleRange * handlePos);

  switch (props.sliderType) {
    case 'kelvin':
      var minTemperature = props.minTemperature;
  var maxTemperature = props.maxTemperature;
      var temperatureRange = maxTemperature - minTemperature;
      return minTemperature + temperatureRange * (percent / 100);

    case 'alpha':
      return percent / 100;

    case 'hue':
      return percent * 3.6;

    case 'red':
    case 'blue':
    case 'green':
      return percent * 2.55;

    default:
      return percent;
  }
}
/**
 * @desc Get the current handle position for a given color
 * @param props - slider props
 * @param color
 */

function getSliderHandlePosition(props, color) {
  var ref = getSliderDimensions(props);
  var width = ref.width;
  var height = ref.height;
  var handleRange = ref.handleRange;
  var handleStart = ref.handleStart;
  var ishorizontal = props.layoutDirection === 'horizontal';
  var sliderValue = getCurrentSliderValue(props, color);
  var midPoint = ishorizontal ? width / 2 : height / 2;
  var handlePos = handleStart + sliderValue / 100 * handleRange;

  if (ishorizontal) {
    handlePos = -1 * handlePos + handleRange + handleStart * 2;
  }

  return {
    x: ishorizontal ? midPoint : handlePos,
    y: ishorizontal ? handlePos : midPoint
  };
}
/**
 * @desc Get the gradient stops for a slider
 * @param props - slider props
 * @param color
 */

function getSliderGradient(props, color) {
  var hsv = color.hsv;
  var rgb = color.rgb;

  switch (props.sliderType) {
    case 'red':
      return [[0, ("rgb(" + (0) + "," + (rgb.g) + "," + (rgb.b) + ")")], [100, ("rgb(" + (255) + "," + (rgb.g) + "," + (rgb.b) + ")")]];

    case 'green':
      return [[0, ("rgb(" + (rgb.r) + "," + (0) + "," + (rgb.b) + ")")], [100, ("rgb(" + (rgb.r) + "," + (255) + "," + (rgb.b) + ")")]];

    case 'blue':
      return [[0, ("rgb(" + (rgb.r) + "," + (rgb.g) + "," + (0) + ")")], [100, ("rgb(" + (rgb.r) + "," + (rgb.g) + "," + (255) + ")")]];

    case 'alpha':
      return [[0, ("rgba(" + (rgb.r) + "," + (rgb.g) + "," + (rgb.b) + ",0)")], [100, ("rgb(" + (rgb.r) + "," + (rgb.g) + "," + (rgb.b) + ")")]];

    case 'kelvin':
      var stops = [];
      var min = props.minTemperature;
      var max = props.maxTemperature;
      var numStops = 8;
      var range = max - min;

      for (var kelvin = min, stop = 0; kelvin < max; kelvin += range / numStops, stop += 1) {
        var ref = IroColor.kelvinToRgb(kelvin);
        var r = ref.r;
        var g = ref.g;
        var b = ref.b;
        stops.push([100 / numStops * stop, ("rgb(" + r + "," + g + "," + b + ")")]);
      }

      return stops;

    case 'hue':
      return [[0, '#f00'], [16.666, '#ff0'], [33.333, '#0f0'], [50, '#0ff'], [66.666, '#00f'], [83.333, '#f0f'], [100, '#f00']];

    case 'saturation':
      var noSat = IroColor.hsvToHsl({
        h: hsv.h,
        s: 0,
        v: hsv.v
      });
      var fullSat = IroColor.hsvToHsl({
        h: hsv.h,
        s: 100,
        v: hsv.v
      });
      return [[0, ("hsl(" + (noSat.h) + "," + (noSat.s) + "%," + (noSat.l) + "%)")], [100, ("hsl(" + (fullSat.h) + "," + (fullSat.s) + "%," + (fullSat.l) + "%)")]];

    case 'value':
    default:
      var hsl = IroColor.hsvToHsl({
        h: hsv.h,
        s: hsv.s,
        v: 100
      });
      return [[0, '#000'], [100, ("hsl(" + (hsl.h) + "," + (hsl.s) + "%," + (hsl.l) + "%)")]];
  }
}
/**
 * @desc Get the gradient coords for a slider
 * @param props - slider props
 */

function getSliderGradientCoords(props) {
  var ishorizontal = props.layoutDirection === 'horizontal';
  return {
    x1: '0%',
    y1: ishorizontal ? '100%' : '0%',
    x2: ishorizontal ? '0%' : '100%',
    y2: '0%'
  };
}

/**
 * @desc Get the point as the center of the wheel
 * @param props - wheel props
 */
function getWheelDimensions(props) {
  var rad = props.width / 2;
  return {
    width: props.width,
    radius: rad - props.borderWidth,
    cx: rad,
    cy: rad
  };
}
/**
 * @desc Translate an angle according to wheelAngle and wheelDirection
 * @param props - wheel props
 * @param angle - input angle
 */

function translateWheelAngle(props, angle, invert) {
  var wheelAngle = props.wheelAngle;
  var wheelDirection = props.wheelDirection;

  if (!invert && wheelDirection === 'clockwise' || invert && wheelDirection === 'anticlockwise') {
    angle = (invert ? 180 : 360) - (wheelAngle - angle);
  } else {
    angle = wheelAngle + angle;
  } // javascript's modulo operator doesn't produce positive numbers with negative input
  // https://dev.to/maurobringolf/a-neat-trick-to-compute-modulo-of-negative-numbers-111e


  return (angle % 360 + 360) % 360;
}
/**
 * @desc Get the current handle position for a given color
 * @param props - wheel props
 * @param color
 */

function getWheelHandlePosition(props, color) {
  var hsv = color.hsv;
  var ref = getWheelDimensions(props);
  var cx = ref.cx;
  var cy = ref.cy;
  var handleRange = props.width / 2 - props.padding - props.handleRadius - props.borderWidth;
  var handleAngle = (180 + translateWheelAngle(props, hsv.h, true)) * (Math.PI / 180);
  var handleDist = hsv.s / 100 * handleRange;
  var direction = props.wheelDirection === 'clockwise' ? -1 : 1;
  return {
    x: cx + handleDist * Math.cos(handleAngle) * direction,
    y: cy + handleDist * Math.sin(handleAngle) * direction
  };
}
/**
 * @desc Get the current wheel value from user input
 * @param props - wheel props
 * @param x - global input x position
 * @param y - global input y position
 */

function getWheelValueFromInput(props, x, y) {
  var ref = getWheelDimensions(props);
  var cx = ref.cx;
  var cy = ref.cy;
  var handleRange = props.width / 2 - props.padding - props.handleRadius - props.borderWidth;
  x = cx - x;
  y = cy - y; // Calculate the hue by converting the angle to radians

  var hue = translateWheelAngle(props, Math.atan2(-y, -x) * (180 / Math.PI)); // Find the point's distance from the center of the wheel
  // This is used to show the saturation level

  var handleDist = Math.min(Math.sqrt(x * x + y * y), handleRange);
  return {
    h: Math.round(hue),
    s: Math.round(100 / handleRange * handleDist)
  };
}
/**
 * @desc Get the bounding dimensions of the box
 * @param props - box props
 */

function getBoxDimensions(props) {
  var width = props.width;
  var padding = props.padding;
  var handleRadius = props.handleRadius;
  return {
    width: width,
    height: width,
    radius: padding + handleRadius
  };
}
/**
 * @desc Get the current box value from user input
 * @param props - box props
 * @param x - global input x position
 * @param y - global input y position
 */

function getBoxValueFromInput(props, x, y) {
  var ref = getBoxDimensions(props);
  var width = ref.width;
  var height = ref.height;
  var radius = ref.radius;
  var handleStart = radius;
  var handleRangeX = width - radius * 2;
  var handleRangeY = height - radius * 2;
  var percentX = (x - handleStart) / handleRangeX * 100;
  var percentY = (y - handleStart) / handleRangeY * 100;
  return {
    s: Math.max(0, Math.min(percentX, 100)),
    v: Math.max(0, Math.min(100 - percentY, 100))
  };
}
/**
 * @desc Get the current box handle position for a given color
 * @param props - box props
 * @param color
 */

function getBoxHandlePosition(props, color) {
  var ref = getBoxDimensions(props);
  var width = ref.width;
  var height = ref.height;
  var radius = ref.radius;
  var hsv = color.hsv;
  var handleStart = radius;
  var handleRangeX = width - radius * 2;
  var handleRangeY = height - radius * 2;
  return {
    x: handleStart + hsv.s / 100 * handleRangeX,
    y: handleStart + (handleRangeY - hsv.v / 100 * handleRangeY)
  };
}
/**
 * @desc Get the gradient stops for a box
 * @param props - box props
 * @param color
 */

function getBoxGradients(props, color) {
  var hue = color.hue;
  return [// saturation gradient
  [[0, '#fff'], [100, ("hsl(" + hue + ",100%,50%)")]], // lightness gradient
  [[0, 'rgba(0,0,0,0)'], [100, '#000']]];
}

// Keep track of html <base> elements for resolveSvgUrl
// getElementsByTagName returns a live HTMLCollection, which stays in sync with the DOM tree
// So it only needs to be called once
var BASE_ELEMENTS = document.getElementsByTagName('base');
/**
 * @desc Resolve an SVG reference URL
 * This is required to work around how Safari and iOS webviews handle gradient URLS under certain conditions
 * If a page is using a client-side routing library which makes use of the HTML <base> tag,
 * Safari won't be able to render SVG gradients properly (as they are referenced by URLs)
 * More info on the problem:
 * https://stackoverflow.com/questions/19742805/angular-and-svg-filters/19753427#19753427
 * https://github.com/jaames/iro.js/issues/18
 * https://github.com/jaames/iro.js/issues/45
 * https://github.com/jaames/iro.js/pull/89
 * @props url - SVG reference URL
 */

function resolveSvgUrl(url) {
  // Sniff useragent string to check if the user is running Safari
  var ua = window.navigator.userAgent;
  var isSafari = /^((?!chrome|android).)*safari/i.test(ua);
  var isIos = /iPhone|iPod|iPad/i.test(ua);
  var location = window.location;
  return (isSafari || isIos) && BASE_ELEMENTS.length > 0 ? ((location.protocol) + "//" + (location.host) + (location.pathname) + (location.search) + url) : url;
}
/**
 * @desc Get the path commands to draw an svg arc
 * @props cx - arc center point x
 * @props cy - arc center point y
 * @props radius - arc radius
 * @props startAngle - arc start angle
 * @props endAngle - arc end angle
 */

function getSvgArcPath(cx, cy, radius, startAngle, endAngle) {
  var largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
  startAngle *= Math.PI / 180;
  endAngle *= Math.PI / 180;
  var x1 = cx + radius * Math.cos(endAngle);
  var y1 = cy + radius * Math.sin(endAngle);
  var x2 = cx + radius * Math.cos(startAngle);
  var y2 = cy + radius * Math.sin(startAngle);
  return ("M " + x1 + " " + y1 + " A " + radius + " " + radius + " 0 " + largeArcFlag + " 0 " + x2 + " " + y2);
}
/**
 * @desc Given a specifc (x, y) position, test if there's a handle there and return its index, else return null.
 *       This is used for components like the box and wheel which support multiple handles when multicolor is active
 * @props x - point x position
 * @props y - point y position
 * @props handlePositions - array of {x, y} coords for each handle
 */

function getHandleAtPoint(props, x, y, handlePositions) {
  for (var i = 0; i < handlePositions.length; i++) {
    var dX = handlePositions[i].x - x;
    var dY = handlePositions[i].y - y;
    var dist = Math.sqrt(dX * dX + dY * dY);

    if (dist < props.handleRadius) {
      return i;
    }
  }

  return null;
}

var iroColorPickerOptionDefaults = {
  width: 300,
  height: 300,
  handleRadius: 8,
  handleSvg: null,
  handleProps: {
    x: 0,
    y: 0
  },
  color: '#fff',
  colors: [],
  borderColor: '#fff',
  borderWidth: 0,
  wheelLightness: true,
  wheelAngle: 0,
  wheelDirection: 'anticlockwise',
  layoutDirection: 'vertical',
  sliderSize: null,
  sliderMargin: 12,
  padding: 6
};

var SECONDARY_EVENTS = ["mousemove" /* MouseMove */, "touchmove" /* TouchMove */, "mouseup" /* MouseUp */, "touchend" /* TouchEnd */];
// Base component class for iro UI components
// This extends the Preact component class to allow them to react to mouse/touch input events by themselves
var IroComponentBase = /*@__PURE__*/(function (Component) {
    function IroComponentBase(props) {
        Component.call(this, props);
        // Generate unique ID for the component
        // This can be used to generate unique IDs for gradients, etc
        this.uid = (Math.random() + 1).toString(36).substring(5);
    }

    if ( Component ) IroComponentBase.__proto__ = Component;
    IroComponentBase.prototype = Object.create( Component && Component.prototype );
    IroComponentBase.prototype.constructor = IroComponentBase;
    IroComponentBase.prototype.render = function render (props) {
        var eventHandler = this.handleEvent.bind(this);
        var rootProps = {
            onMouseDown: eventHandler
        };
        if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) {
            rootProps['onTouchStart'] = eventHandler;
        }
        else {
            rootProps['ontouchstart'] = eventHandler;
        }
        var isHorizontal = props.layoutDirection === 'horizontal';
        var margin = props.margin === null ? props.sliderMargin : props.margin;
        var rootStyles = {
            overflow: 'visible',
            display: isHorizontal ? 'inline-block' : 'block'
        };
        // first component shouldn't have any margin
        if (props.index > 0) {
            rootStyles[isHorizontal ? 'marginLeft' : 'marginTop'] = margin;
        }
        return (v(p, null, props.children(this.uid, rootProps, rootStyles)));
    };
    // More info on handleEvent:
    // https://medium.com/@WebReflection/dom-handleevent-a-cross-platform-standard-since-year-2000-5bf17287fd38
    // TL;DR this lets us have a single point of entry for multiple events, and we can avoid callback/binding hell
    IroComponentBase.prototype.handleEvent = function handleEvent (e) {
        var this$1 = this;

        var inputHandler = this.props.onInput;
        // Get the screen position of the component
        var bounds = this.base.getBoundingClientRect();
        // Prefect default browser action
        e.preventDefault();
        // Detect if the event is a touch event by checking if it has the `touches` property
        // If it is a touch event, use the first touch input
        var point = e.touches ? e.changedTouches[0] : e;
        var x = point.clientX - bounds.left;
        var y = point.clientY - bounds.top;
        switch (e.type) {
            case "mousedown" /* MouseDown */:
            case "touchstart" /* TouchStart */:
                console.log('EventType.TouchStart');
                SECONDARY_EVENTS.forEach(function (event) {
                    document.addEventListener(event, this$1, { passive: false });
                });
                inputHandler(x, y, 0 /* Start */);
                break;
            case "mousemove" /* MouseMove */:
            case "touchmove" /* TouchMove */:
                inputHandler(x, y, 1 /* Move */);
                break;
            case "mouseup" /* MouseUp */:
            case "touchend" /* TouchEnd */:
                inputHandler(x, y, 2 /* End */);
                SECONDARY_EVENTS.forEach(function (event) {
                    document.removeEventListener(event, this$1);
                });
                break;
        }
    };

    return IroComponentBase;
}(d));

function IroHandle(props) {
    var radius = props.r;
    var url = props.url;
    return (v("svg", { className: ("IroHandle IroHandle--" + (props.index) + " " + (props.isActive ? 'IroHandle--isActive' : '')), x: props.x, y: props.y, style: {
            overflow: 'visible'
        } },
        url && (v("use", Object.assign({ xlinkHref: resolveSvgUrl(url) }, props.props))),
        !url && (v("circle", { r: radius, fill: "none", "stroke-width": 2, stroke: "#000" })),
        !url && (v("circle", { r: radius - 2, fill: props.fill, "stroke-width": 2, stroke: "#fff" }))));
}
IroHandle.defaultProps = {
    fill: 'none',
    x: 0,
    y: 0,
    r: 8,
    url: null,
    props: { x: 0, y: 0 }
};

function IroSlider(props) {
    var activeIndex = props.activeIndex;
    var activeColor = (activeIndex !== undefined && activeIndex < props.colors.length) ? props.colors[activeIndex] : props.color;
    var ref = getSliderDimensions(props);
    var width = ref.width;
    var height = ref.height;
    var radius = ref.radius;
    var handlePos = getSliderHandlePosition(props, activeColor);
    var gradient = getSliderGradient(props, activeColor);
    var isAlpha = props.sliderType === 'alpha';
    function handleInput(x, y, type) {
        var value = getSliderValueFromInput(props, x, y);
        props.parent.inputActive = true;
        activeColor[props.sliderType] = value;
        props.onInput(type);
    }
    return (v(IroComponentBase, Object.assign({}, props, { onInput: handleInput }), function (uid, rootProps, rootStyles) { return (v("svg", Object.assign({}, rootProps, { className: "IroSlider", width: width, height: height, style: rootStyles }),
        v("defs", null,
            v("linearGradient", Object.assign({ id: 'g' + uid }, getSliderGradientCoords(props)), gradient.map(function (ref) {
                var offset = ref[0];
                var color = ref[1];

                return (v("stop", { offset: (offset + "%"), "stop-color": color }));
        })),
            isAlpha && (v("pattern", { id: 'b' + uid, width: "8", height: "8", patternUnits: "userSpaceOnUse" },
                v("rect", { x: "0", y: "0", width: "8", height: "8", fill: "#fff" }),
                v("rect", { x: "0", y: "0", width: "4", height: "4", fill: "#ccc" }),
                v("rect", { x: "4", y: "4", width: "4", height: "4", fill: "#ccc" }))),
            isAlpha && (v("pattern", { id: 'f' + uid, width: "100%", height: "100%" },
                v("rect", { x: "0", y: "0", width: "100%", height: "100%", fill: ("url(" + (resolveSvgUrl('#b' + uid)) + ")") }),
                v("rect", { x: "0", y: "0", width: "100%", height: "100%", fill: ("url(" + (resolveSvgUrl('#g' + uid)) + ")") })))),
        v("rect", { className: "IroSliderBg", rx: radius, ry: radius, x: props.borderWidth / 2, y: props.borderWidth / 2, width: width - props.borderWidth, height: height - props.borderWidth, "stroke-width": props.borderWidth, stroke: props.borderColor, fill: ("url(" + (resolveSvgUrl((isAlpha ? '#f' : '#g') + uid)) + ")") }),
        v(IroHandle, { isActive: true, index: activeColor.index, r: props.handleRadius, url: props.handleSvg, props: props.handleProps, x: handlePos.x, y: handlePos.y }))); }));
}
IroSlider.defaultProps = Object.assign({}, sliderDefaultOptions);

function IroBox(props) {
    var ref = getBoxDimensions(props);
    var width = ref.width;
    var height = ref.height;
    var radius = ref.radius;
    var colors = props.colors;
    var colorPicker = props.parent;
    var activeIndex = props.activeIndex;
    var activeColor = (activeIndex !== undefined && activeIndex < props.colors.length) ? props.colors[activeIndex] : props.color;
    var gradients = getBoxGradients(props, activeColor);
    var handlePositions = colors.map(function (color) { return getBoxHandlePosition(props, color); });
    function handleInput(x, y, inputType) {
        if (inputType === 0 /* Start */) {
            // getHandleAtPoint() returns the index for the handle if the point 'hits' it, or null otherwise
            var activeHandle = getHandleAtPoint(props, x, y, handlePositions);
            // If the input hit a handle, set it as the active handle, but don't update the color
            if (activeHandle !== null) {
                colorPicker.setActiveColor(activeHandle);
            }
            // If the input didn't hit a handle, set the currently active handle to that position
            else {
                colorPicker.inputActive = true;
                activeColor.hsv = getBoxValueFromInput(props, x, y);
                props.onInput(inputType);
            }
        }
        // move is fired when the user has started dragging
        else if (inputType === 1 /* Move */) {
            colorPicker.inputActive = true;
            activeColor.hsv = getBoxValueFromInput(props, x, y);
        }
        // let the color picker fire input:start, input:move or input:end events
        props.onInput(inputType);
    }
    return (v(IroComponentBase, Object.assign({}, props, { onInput: handleInput }), function (uid, rootProps, rootStyles) { return (v("svg", Object.assign({}, rootProps, { className: "IroBox", width: width, height: height, style: rootStyles }),
        v("defs", null,
            v("linearGradient", { id: 's' + uid, x1: "0%", y1: "0%", x2: "100%", y2: "0%" }, gradients[0].map(function (ref) {
                var offset = ref[0];
                var color = ref[1];

                return (v("stop", { offset: (offset + "%"), "stop-color": color }));
        })),
            v("linearGradient", { id: 'l' + uid, x1: "0%", y1: "0%", x2: "0%", y2: "100%" }, gradients[1].map(function (ref) {
                var offset = ref[0];
                var color = ref[1];

                return (v("stop", { offset: (offset + "%"), "stop-color": color }));
        })),
            v("pattern", { id: 'f' + uid, width: "100%", height: "100%" },
                v("rect", { x: "0", y: "0", width: "100%", height: "100%", fill: ("url(" + (resolveSvgUrl('#s' + uid)) + ")") }),
                v("rect", { x: "0", y: "0", width: "100%", height: "100%", fill: ("url(" + (resolveSvgUrl('#l' + uid)) + ")") }))),
        v("rect", { rx: radius, ry: radius, x: props.borderWidth / 2, y: props.borderWidth / 2, width: width - props.borderWidth, height: height - props.borderWidth, "stroke-width": props.borderWidth, stroke: props.borderColor, fill: ("url(" + (resolveSvgUrl('#f' + uid)) + ")") }),
        colors.filter(function (color) { return color !== activeColor; }).map(function (color) { return (v(IroHandle, { isActive: false, index: color.index, fill: color.hslString, r: props.handleRadius, url: props.handleSvg, props: props.handleProps, x: handlePositions[color.index].x, y: handlePositions[color.index].y })); }),
        v(IroHandle, { isActive: true, index: activeColor.index, fill: activeColor.hslString, r: props.handleRadius, url: props.handleSvg, props: props.handleProps, x: handlePositions[activeColor.index].x, y: handlePositions[activeColor.index].y }))); }));
}

var HUE_STEPS = Array.apply(null, { length: 360 }).map(function (_, index) { return index; });
function IroWheel(props) {
    var ref = getWheelDimensions(props);
    var width = ref.width;
    var radius = ref.radius;
    var cx = ref.cx;
    var cy = ref.cy;
    var colors = props.colors;
    var borderWidth = props.borderWidth;
    var colorPicker = props.parent;
    var activeColor = props.color;
    var hsv = activeColor.hsv;
    var handlePositions = colors.map(function (color) { return getWheelHandlePosition(props, color); });
    function handleInput(x, y, inputType) {
        console.log('handleInput:', inputType);
        if (inputType === 0 /* Start */) {
            // getHandleAtPoint() returns the index for the handle if the point 'hits' it, or null otherwise
            var activeHandle = getHandleAtPoint(props, x, y, handlePositions);
            // If the input hit a handle, set it as the active handle, but don't update the color
            if (activeHandle !== null) {
                colorPicker.setActiveColor(activeHandle);
            }
            // If the input didn't hit a handle, set the currently active handle to that position
            else {
                colorPicker.inputActive = true;
                activeColor.hsv = getWheelValueFromInput(props, x, y);
                props.onInput(inputType);
            }
        }
        // move is fired when the user has started dragging
        else if (inputType === 1 /* Move */) {
            colorPicker.inputActive = true;
            activeColor.hsv = getWheelValueFromInput(props, x, y);
        }
        // let the color picker fire input:start, input:move or input:end events
        props.onInput(inputType);
    }
    return (v(IroComponentBase, Object.assign({}, props, { onInput: handleInput }), function (uid, rootProps, rootStyles) { return (v("svg", Object.assign({}, rootProps, { className: "IroWheel", width: width, height: width, style: rootStyles }),
        v("defs", null,
            v("radialGradient", { id: uid },
                v("stop", { offset: "0%", "stop-color": "#fff" }),
                v("stop", { offset: "100%", "stop-color": "#fff", "stop-opacity": "0" }))),
        v("g", { className: "IroWheelHue", "stroke-width": radius, fill: "none" }, HUE_STEPS.map(function (angle) { return (v("path", { key: angle, d: getSvgArcPath(cx, cy, radius / 2, angle, angle + 1.5), stroke: ("hsl(" + (translateWheelAngle(props, angle)) + ", 100%, 50%)") })); })),
        v("circle", { className: "IroWheelSaturation", cx: cx, cy: cy, r: radius, fill: ("url(" + (resolveSvgUrl('#' + uid)) + ")") }),
        props.wheelLightness && (v("circle", { className: "IroWheelLightness", cx: cx, cy: cy, r: radius, fill: "#000", opacity: 1 - hsv.v / 100 })),
        v("circle", { className: "IroWheelBorder", cx: cx, cy: cy, r: radius, fill: "none", stroke: props.borderColor, "stroke-width": borderWidth }),
        colors.filter(function (color) { return color !== activeColor; }).map(function (color) { return (v(IroHandle, { isActive: false, index: color.index, fill: color.hslString, r: props.handleRadius, url: props.handleSvg, props: props.handleProps, x: handlePositions[color.index].x, y: handlePositions[color.index].y })); }),
        v(IroHandle, { isActive: true, index: activeColor.index, fill: activeColor.hslString, r: props.handleRadius, url: props.handleSvg, props: props.handleProps, x: handlePositions[activeColor.index].x, y: handlePositions[activeColor.index].y }))); }));
}

// Turn a component into a widget
// This returns a factory function that can be used to create an instance of the widget component
// The first function param is a DOM element or CSS selector for the element to mount to,
// The second param is for config options which are passed to the component as props
// This factory function can also delay mounting the element into the DOM until the page is ready
function createWidget(WidgetComponent) {
    var widgetFactory = function (parent, props) {
        var widget; // will become an instance of the widget component class
        var widgetRoot = document.createElement('div');
        // Render widget into a temp DOM node
        M(v(WidgetComponent, Object.assign({}, {ref: function (ref) { return widget = ref; }},
            props)), widgetRoot);
        function mountWidget() {
            var container = parent instanceof Element ? parent : document.querySelector(parent);
            container.appendChild(widget.base);
            widget.onMount(container);
        }
        // Mount it into the DOM when the page document is ready
        if (document.readyState !== 'loading') {
            mountWidget();
        }
        else {
            document.addEventListener('DOMContentLoaded', mountWidget);
        }
        return widget;
    };
    // Allow the widget factory to inherit component prototype + static class methods
    // This makes it easier for plugin authors to extend the base widget component
    widgetFactory.prototype = WidgetComponent.prototype;
    Object.assign(widgetFactory, WidgetComponent);
    // Add reference to base component too
    widgetFactory.__component = WidgetComponent;
    return widgetFactory;
}

var IroColorPicker = /*@__PURE__*/(function (Component) {
    function IroColorPicker(props) {
        var this$1 = this;

        Component.call(this, props);
        this.colors = [];
        this.inputActive = false;
        this.events = {};
        this.activeEvents = {};
        this.deferredEvents = {};
        this.id = props.id;
        var colors = props.colors.length > 0 ? props.colors : [props.color];
        colors.forEach(function (colorValue) { return this$1.addColor(colorValue); });
        this.setActiveColor(0);
        // Pass all the props into the component's state,
        // Except we want to add the color object and make sure that refs aren't passed down to children
        this.state = Object.assign({}, props,
            {color: this.color,
            colors: this.colors,
            layout: props.layout});
    }

    if ( Component ) IroColorPicker.__proto__ = Component;
    IroColorPicker.prototype = Object.create( Component && Component.prototype );
    IroColorPicker.prototype.constructor = IroColorPicker;
    // Plubic multicolor API
    /**
    * @desc Add a color to the color picker
    * @param color new color to add
    * @param index optional color index
    */
    IroColorPicker.prototype.addColor = function addColor (color, index) {
        if ( index === void 0 ) index = this.colors.length;

        // Create a new iro.Color
        // Also bind it to onColorChange, so whenever the color changes it updates the color picker
        var newColor = new IroColor(color, this.onColorChange.bind(this));
        // Insert color @ the given index
        this.colors.splice(index, 0, newColor);
        // Reindex colors
        this.colors.forEach(function (color, index) { return color.index = index; });
        // Update picker state if necessary
        if (this.state) {
            this.setState({ colors: this.colors });
        }
        // Fire color init event
        this.deferredEmit('color:init', newColor);
    };
    /**
     * @desc Remove a color from the color picker
     * @param index color index
     */
    IroColorPicker.prototype.removeColor = function removeColor (index) {
        var color = this.colors.splice(index, 1)[0];
        // Destroy the color object -- this unbinds it from the color picker
        color.unbind();
        // Reindex colors
        this.colors.forEach(function (color, index) { return color.index = index; });
        // Update picker state if necessary
        if (this.state) {
            this.setState({ colors: this.colors });
        }
        // If the active color was removed, default active color to 0
        if (color.index === this.color.index) {
            this.setActiveColor(0);
        }
        // Fire color remove event
        this.emit('color:remove', color);
    };
    /**
     * @desc Set the currently active color
     * @param index color index
     */
    IroColorPicker.prototype.setActiveColor = function setActiveColor (index) {
        this.color = this.colors[index];
        if (this.state) {
            this.setState({ color: this.color });
        }
        // Fire color switch event
        this.emit('color:setActive', this.color);
    };
    /**
     * @desc Replace all of the current colorPicker colors
     * @param newColorValues list of new colors to add
     */
    IroColorPicker.prototype.setColors = function setColors (newColorValues) {
        var this$1 = this;

        // Unbind color events
        this.colors.forEach(function (color) { return color.unbind(); });
        // Destroy old colors
        this.colors = [];
        // Add new colors
        newColorValues.forEach(function (colorValue) { return this$1.addColor(colorValue); });
        // Reset active color
        this.setActiveColor(0);
        this.emit('color:setAll', this.colors);
    };
    // Public ColorPicker events API
    /**
     * @desc Set a callback function for an event
     * @param eventList event(s) to listen to
     * @param callback - Function called when the event is fired
     */
    IroColorPicker.prototype.on = function on (eventList, callback) {
        var this$1 = this;

        var events = this.events;
        // eventList can be an eventType string or an array of eventType strings
        (!Array.isArray(eventList) ? [eventList] : eventList).forEach(function (eventType) {
            // Add event callback
            (events[eventType] || (events[eventType] = [])).push(callback);
            // Call deferred events
            // These are events that can be stored until a listener for them is added
            if (this$1.deferredEvents[eventType]) {
                // Deffered events store an array of arguments from when the event was called
                this$1.deferredEvents[eventType].forEach(function (args) {
                    callback.apply(null, args);
                });
                // Clear deferred events
                this$1.deferredEvents[eventType] = [];
            }
        });
    };
    /**
     * @desc Remove a callback function for an event added with on()
     * @param eventList - event(s) to listen to
     * @param callback - original callback function to remove
     */
    IroColorPicker.prototype.off = function off (eventList, callback) {
        var this$1 = this;

        (!Array.isArray(eventList) ? [eventList] : eventList).forEach(function (eventType) {
            var callbackList = this$1.events[eventType];
            // this.emitHook('event:off', eventType, callback);
            if (callbackList)
                { callbackList.splice(callbackList.indexOf(callback), 1); }
        });
    };
    /**
     * @desc Emit an event
     * @param eventType event to emit
     */
    IroColorPicker.prototype.emit = function emit (eventType) {
        var this$1 = this;
        var args = [], len = arguments.length - 1;
        while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

        var activeEvents = this.activeEvents;
        var isEventActive = activeEvents.hasOwnProperty(eventType) ? activeEvents[eventType] : false;
        // Prevent event callbacks from firing if the event is already active
        // This stops infinite loops if something in an event callback causes the same event to be fired again
        // (e.g. setting the color inside a color:change callback)
        if (!isEventActive) {
            activeEvents[eventType] = true;
            var callbackList = this.events[eventType] || [];
            callbackList.forEach(function (fn) { return fn.apply(this$1, args); });
            activeEvents[eventType] = false;
        }
    };
    /**
     * @desc Emit an event now, or save it for when the relevent event listener is added
     * @param eventType - The name of the event to emit
     */
    IroColorPicker.prototype.deferredEmit = function deferredEmit (eventType) {
        var ref;

        var args = [], len = arguments.length - 1;
        while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];
        var deferredEvents = this.deferredEvents;
        (ref = this).emit.apply(ref, [ eventType ].concat( args ));
        (deferredEvents[eventType] || (deferredEvents[eventType] = [])).push(args);
    };
    // Public utility methods
    IroColorPicker.prototype.setOptions = function setOptions (newOptions) {
        this.setState(Object.assign({}, this.state, newOptions));
    };
    /**
     * @desc Resize the color picker
     * @param width - new width
     */
    IroColorPicker.prototype.resize = function resize (width) {
        this.setOptions({ width: width });
    };
    /**
     * @desc Reset the color picker to the initial color provided in the color picker options
     */
    IroColorPicker.prototype.reset = function reset () {
        this.colors.forEach(function (color) { return color.reset(); });
        this.setState({ colors: this.colors });
    };
    /**
     * @desc Called by the createWidget wrapper when the element is mounted into the page
     * @param container - the container element for this ColorPicker instance
     */
    IroColorPicker.prototype.onMount = function onMount (container) {
        this.el = container;
        this.deferredEmit('mount', this);
    };
    // Internal methods
    /**
     * @desc React to a color update
     * @param color - current color
     * @param changes - shows which h,s,v,a color channels changed
     */
    IroColorPicker.prototype.onColorChange = function onColorChange (color, changes) {
        this.setState({ color: this.color });
        if (this.inputActive) {
            this.inputActive = false;
            this.emit('input:change', color, changes);
        }
        this.emit('color:change', color, changes);
    };
    /**
     * @desc Handle input from a UI control element
     * @param type - event type
     */
    IroColorPicker.prototype.emitInputEvent = function emitInputEvent (type) {
        console.log('emitInputEvent', type, event);
        if (type === 0 /* Start */) {
            this.emit('input:start', this.color);
        }
        else if (type === 1 /* Move */) {
            this.emit('input:move', this.color);
        }
        else if (type === 2 /* End */) {
            this.emit('input:end', this.color);
        }
    };
    IroColorPicker.prototype.render = function render (props, state) {
        var this$1 = this;

        var layout = state.layout;
        // use layout shorthands
        if (!Array.isArray(layout)) {
            switch (layout) {
                // TODO: implement some?
                default:
                    layout = [
                        { component: IroWheel },
                        { component: IroSlider } ];
            }
            // add transparency slider to the layout
            if (state.transparency) {
                layout.push({
                    component: IroSlider,
                    options: {
                        sliderType: 'alpha'
                    }
                });
            }
        }
        return (v("div", { class: "IroColorPicker", id: state.id, style: {
                display: state.display
            } }, layout.map(function (ref, componentIndex) {
                var UiComponent = ref.component;
                var options = ref.options;

                return (v(UiComponent, Object.assign({}, state, options, { ref: undefined, onInput: this$1.emitInputEvent.bind(this$1), parent: this$1, index: componentIndex })));
        })));
    };

    return IroColorPicker;
}(d));
IroColorPicker.defaultProps = Object.assign({}, iroColorPickerOptionDefaults,
    {colors: [],
    display: 'block',
    id: null,
    layout: 'default',
    margin: null});
var IroColorPickerWidget = createWidget(IroColorPicker);

var iro;
(function (iro) {
    iro.version = "5.2.0"; // replaced by @rollup/plugin-replace; see rollup.config.js
    iro.Color = IroColor;
    iro.ColorPicker = IroColorPickerWidget;
    var ui;
    (function (ui) {
        ui.h = v;
        ui.ComponentBase = IroComponentBase;
        ui.Handle = IroHandle;
        ui.Slider = IroSlider;
        ui.Wheel = IroWheel;
        ui.Box = IroBox;
    })(ui = iro.ui || (iro.ui = {}));
})(iro || (iro = {}));
var iro$1 = iro;

export default iro$1;
