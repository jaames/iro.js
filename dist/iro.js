/*!
 * iro.js v4.5.1
 * 2016-2019 James Daniel
 * Licensed under MPL 2.0
 * github.com/jaames/iro.js
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.iro = factory());
}(this, (function () { 'use strict';

  var n,u,t,i,r,o,f={},e=[],c=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|^--/i;function s(n,l){for(var u in l){ n[u]=l[u]; }return n}function a(n){var l=n.parentNode;l&&l.removeChild(n);}function h(n,l,u){var t,i,r,o,f=arguments;if(l=s({},l),arguments.length>3){ for(u=[u],t=3;t<arguments.length;t++){ u.push(f[t]); } }if(null!=u&&(l.children=u),null!=n&&null!=n.defaultProps){ for(i in n.defaultProps){ void 0===l[i]&&(l[i]=n.defaultProps[i]); } }return o=l.key,null!=(r=l.ref)&&delete l.ref,null!=o&&delete l.key,v(n,l,o,r)}function v(l,u,t,i){var r={type:l,props:u,key:t,ref:i,__k:null,__p:null,__b:0,__e:null,l:null,__c:null,constructor:void 0};return n.vnode&&n.vnode(r),r}function d(n){return n.children}function y(n){if(null==n||"boolean"==typeof n){ return null; }if("string"==typeof n||"number"==typeof n){ return v(null,n,null,null); }if(null!=n.__e||null!=n.__c){var l=v(n.type,n.props,n.key,null);return l.__e=n.__e,l}return n}function m(n,l){this.props=n,this.context=l;}function w(n,l){if(null==l){ return n.__p?w(n.__p,n.__p.__k.indexOf(n)+1):null; }for(var u;l<n.__k.length;l++){ if(null!=(u=n.__k[l])&&null!=u.__e){ return u.__e; } }return "function"==typeof n.type?w(n):null}function g(n){var l,u;if(null!=(n=n.__p)&&null!=n.__c){for(n.__e=n.__c.base=null,l=0;l<n.__k.length;l++){ if(null!=(u=n.__k[l])&&null!=u.__e){n.__e=n.__c.base=u.__e;break} }return g(n)}}function k(l){(!l.__d&&(l.__d=!0)&&1===u.push(l)||i!==n.debounceRendering)&&(i=n.debounceRendering,(n.debounceRendering||t)(_));}function _(){var n,l,t,i,r,o,f,e;for(u.sort(function(n,l){return l.__v.__b-n.__v.__b});n=u.pop();){ n.__d&&(t=void 0,i=void 0,o=(r=(l=n).__v).__e,f=l.__P,e=l.u,l.u=!1,f&&(t=[],i=$(f,r,s({},r),l.__n,void 0!==f.ownerSVGElement,null,t,e,null==o?w(r):o),j(t,r),i!=o&&g(r))); }}function b(n,l,u,t,i,r,o,c,s){var h,v,p,d,y,m,g,k=u&&u.__k||e,_=k.length;if(c==f&&(c=null!=r?r[0]:_?w(u,0):null),h=0,l.__k=x(l.__k,function(u){if(null!=u){if(u.__p=l,u.__b=l.__b+1,null===(p=k[h])||p&&u.key==p.key&&u.type===p.type){ k[h]=void 0; }else { for(v=0;v<_;v++){if((p=k[v])&&u.key==p.key&&u.type===p.type){k[v]=void 0;break}p=null;} }if(d=$(n,u,p=p||f,t,i,r,o,null,c,s),(v=u.ref)&&p.ref!=v&&(g||(g=[])).push(v,u.__c||d,u),null!=d){if(null==m&&(m=d),null!=u.l){ d=u.l,u.l=null; }else if(r==p||d!=c||null==d.parentNode){n:if(null==c||c.parentNode!==n){ n.appendChild(d); }else{for(y=c,v=0;(y=y.nextSibling)&&v<_;v+=2){ if(y==d){ break n; } }n.insertBefore(d,c);}"option"==l.type&&(n.value="");}c=d.nextSibling,"function"==typeof l.type&&(l.l=d);}}return h++,u}),l.__e=m,null!=r&&"function"!=typeof l.type){ for(h=r.length;h--;){ null!=r[h]&&a(r[h]); } }for(h=_;h--;){ null!=k[h]&&D(k[h],k[h]); }if(g){ for(h=0;h<g.length;h++){ A(g[h],g[++h],g[++h]); } }}function x(n,l,u){if(null==u&&(u=[]),null==n||"boolean"==typeof n){ l&&u.push(l(null)); }else if(Array.isArray(n)){ for(var t=0;t<n.length;t++){ x(n[t],l,u); } }else { u.push(l?l(y(n)):n); }return u}function C(n,l,u,t,i){var r;for(r in u){ r in l||N(n,r,null,u[r],t); }for(r in l){ i&&"function"!=typeof l[r]||"value"===r||"checked"===r||u[r]===l[r]||N(n,r,l[r],u[r],t); }}function P(n,l,u){"-"===l[0]?n.setProperty(l,u):n[l]="number"==typeof u&&!1===c.test(l)?u+"px":null==u?"":u;}function N(n,l,u,t,i){var r,o,f,e,c;if("key"===(l=i?"className"===l?"class":l:"class"===l?"className":l)||"children"===l);else if("style"===l){ if(r=n.style,"string"==typeof u){ r.cssText=u; }else{if("string"==typeof t&&(r.cssText="",t=null),t){ for(o in t){ u&&o in u||P(r,o,""); } }if(u){ for(f in u){ t&&u[f]===t[f]||P(r,f,u[f]); } }} }else{ "o"===l[0]&&"n"===l[1]?(e=l!==(l=l.replace(/Capture$/,"")),c=l.toLowerCase(),l=(c in n?c:l).slice(2),u?(t||n.addEventListener(l,T,e),(n.t||(n.t={}))[l]=u):n.removeEventListener(l,T,e)):"list"!==l&&"tagName"!==l&&"form"!==l&&!i&&l in n?n[l]=null==u?"":u:"function"!=typeof u&&"dangerouslySetInnerHTML"!==l&&(l!==(l=l.replace(/^xlink:?/,""))?null==u||!1===u?n.removeAttributeNS("http://www.w3.org/1999/xlink",l.toLowerCase()):n.setAttributeNS("http://www.w3.org/1999/xlink",l.toLowerCase(),u):null==u||!1===u?n.removeAttribute(l):n.setAttribute(l,u)); }}function T(l){return this.t[l.type](n.event?n.event(l):l)}function $(l,u,t,i,r,o,f,e,c,a){var h,v,p,y,w,g,k,_,C,P,N=u.type;if(void 0!==u.constructor){ return null; }(h=n.__b)&&h(u);try{n:if("function"==typeof N){if(_=u.props,C=(h=N.contextType)&&i[h.__c],P=h?C?C.props.value:h.__p:i,t.__c?k=(v=u.__c=t.__c).__p=v.__E:("prototype"in N&&N.prototype.render?u.__c=v=new N(_,P):(u.__c=v=new m(_,P),v.constructor=N,v.render=H),C&&C.sub(v),v.props=_,v.state||(v.state={}),v.context=P,v.__n=i,p=v.__d=!0,v.__h=[]),null==v.__s&&(v.__s=v.state),null!=N.getDerivedStateFromProps&&s(v.__s==v.state?v.__s=s({},v.__s):v.__s,N.getDerivedStateFromProps(_,v.__s)),p){ null==N.getDerivedStateFromProps&&null!=v.componentWillMount&&v.componentWillMount(),null!=v.componentDidMount&&f.push(v); }else{if(null==N.getDerivedStateFromProps&&null==e&&null!=v.componentWillReceiveProps&&v.componentWillReceiveProps(_,P),!e&&null!=v.shouldComponentUpdate&&!1===v.shouldComponentUpdate(_,v.__s,P)){for(v.props=_,v.state=v.__s,v.__d=!1,v.__v=u,u.__e=null!=c?c!==t.__e?c:t.__e:null,u.__k=t.__k,h=0;h<u.__k.length;h++){ u.__k[h]&&(u.__k[h].__p=u); }break n}null!=v.componentWillUpdate&&v.componentWillUpdate(_,v.__s,P);}for(y=v.props,w=v.state,v.context=P,v.props=_,v.state=v.__s,(h=n.__r)&&h(u),v.__d=!1,v.__v=u,v.__P=l,h=v.render(v.props,v.state,v.context),u.__k=x(null!=h&&h.type==d&&null==h.key?h.props.children:h),null!=v.getChildContext&&(i=s(s({},i),v.getChildContext())),p||null==v.getSnapshotBeforeUpdate||(g=v.getSnapshotBeforeUpdate(y,w)),b(l,u,t,i,r,o,f,c,a),v.base=u.__e;h=v.__h.pop();){ v.__s&&(v.state=v.__s),h.call(v); }p||null==y||null==v.componentDidUpdate||v.componentDidUpdate(y,w,g),k&&(v.__E=v.__p=null);}else { u.__e=z(t.__e,u,t,i,r,o,f,a); }(h=n.diffed)&&h(u);}catch(l){n.__e(l,u,t);}return u.__e}function j(l,u){for(var t;t=l.pop();){ try{t.componentDidMount();}catch(l){n.__e(l,t.__v);} }n.__c&&n.__c(u);}function z(n,l,u,t,i,r,o,c){var s,a,h,v,p=u.props,d=l.props;if(i="svg"===l.type||i,null==n&&null!=r){ for(s=0;s<r.length;s++){ if(null!=(a=r[s])&&(null===l.type?3===a.nodeType:a.localName===l.type)){n=a,r[s]=null;break} } }if(null==n){if(null===l.type){ return document.createTextNode(d); }n=i?document.createElementNS("http://www.w3.org/2000/svg",l.type):document.createElement(l.type),r=null;}return null===l.type?p!==d&&(null!=r&&(r[r.indexOf(n)]=null),n.data=d):l!==u&&(null!=r&&(r=e.slice.call(n.childNodes)),h=(p=u.props||f).dangerouslySetInnerHTML,v=d.dangerouslySetInnerHTML,c||(v||h)&&(v&&h&&v.__html==h.__html||(n.innerHTML=v&&v.__html||"")),C(n,d,p,i,c),l.__k=l.props.children,v||b(n,l,u,t,"foreignObject"!==l.type&&i,r,o,f,c),c||("value"in d&&void 0!==d.value&&d.value!==n.value&&(n.value=null==d.value?"":d.value),"checked"in d&&void 0!==d.checked&&d.checked!==n.checked&&(n.checked=d.checked))),n}function A(l,u,t){try{"function"==typeof l?l(u):l.current=u;}catch(l){n.__e(l,t);}}function D(l,u,t){var i,r,o;if(n.unmount&&n.unmount(l),(i=l.ref)&&A(i,null,u),t||"function"==typeof l.type||(t=null!=(r=l.__e)),l.__e=l.l=null,null!=(i=l.__c)){if(i.componentWillUnmount){ try{i.componentWillUnmount();}catch(l){n.__e(l,u);} }i.base=i.__P=null;}if(i=l.__k){ for(o=0;o<i.length;o++){ i[o]&&D(i[o],u,t); } }null!=r&&a(r);}function H(n,l,u){return this.constructor(n,u)}function I(l,u,t){var i,o,c;n.__p&&n.__p(l,u),o=(i=t===r)?null:t&&t.__k||u.__k,l=h(d,null,[l]),c=[],$(u,i?u.__k=l:(t||u).__k=l,o||f,f,void 0!==u.ownerSVGElement,t&&!i?[t]:o?null:e.slice.call(u.childNodes),c,!1,t||f,i),j(c,l);}n={},m.prototype.setState=function(n,l){var u=this.__s!==this.state&&this.__s||(this.__s=s({},this.state));("function"!=typeof n||(n=n(u,this.props)))&&s(u,n),null!=n&&this.__v&&(this.u=!1,l&&this.__h.push(l),k(this));},m.prototype.forceUpdate=function(n){this.__v&&(n&&this.__h.push(n),this.u=!0,k(this));},m.prototype.render=d,u=[],t="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,i=n.debounceRendering,n.__e=function(n,l,u){for(var t;l=l.__p;){ if((t=l.__c)&&!t.__p){ try{if(t.constructor&&null!=t.constructor.getDerivedStateFromError){ t.setState(t.constructor.getDerivedStateFromError(n)); }else{if(null==t.componentDidCatch){ continue; }t.componentDidCatch(n);}return k(t.__E=t)}catch(l){n=l;} } }throw n},r=f,o=0;

  function t$1(t,r){var e=t.indexOf("%")>-1,n=parseFloat(t);return e?r/100*n:n}function r$1(t){return parseInt(t,16)}function e$1(t){return t.toString(16).padStart(2,"0")}var n$1="(?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?)",s$1="[\\s|\\(]+("+n$1+")[,|\\s]+("+n$1+")[,|\\s]+("+n$1+")\\s*\\)?",i$1="[\\s|\\(]+("+n$1+")[,|\\s]+("+n$1+")[,|\\s]+("+n$1+")[,|\\s]+("+n$1+")\\s*\\)?",h$1=new RegExp("rgb"+s$1),a$1=new RegExp("rgba"+i$1),o$1=new RegExp("hsl"+s$1),f$1=new RegExp("hsla"+i$1),u$1=new RegExp("^(?:#?|0x?)([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$"),c$1=new RegExp("^(?:#?|0x?)([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$"),l$1=new RegExp("^(?:#?|0x?)([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$"),v$1=new RegExp("^(?:#?|0x?)([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$"),g$1=function(t,r){this.onChange=r,this.value={h:0,s:0,v:0,a:1},t&&this.set(t);},d$1={hsv:{configurable:!0},rgb:{configurable:!0},hsl:{configurable:!0},rgbString:{configurable:!0},hexString:{configurable:!0},hslString:{configurable:!0}};function b$1(t){var r=t.sliderHeight;return {radius:(r=r||2*t.padding+2*t.handleRadius+2*t.borderWidth)/2,x:0,y:0,width:t.width,height:r}}function w$1(t){var r=t.color.hsv;switch(t.sliderType){case"hue":return r.h/=3.6;case"saturation":return r.s;case"value":default:return r.v}}function x$1(t,r,e,n){var s=n.width-n.height,i=r-(n.left+n.height/2);return i=Math.max(Math.min(i,s),0),Math.round(100/s*i)}function p$1(t){var r=b$1(t),e=r.width,n=r.height,s=r.radius;return {x:s+w$1(t)/100*(e-2*s),y:n/2}}function M$1(t){var r=t.color.hsv;switch(t.sliderType){case"hue":return [{offset:"0",color:"#f00"},{offset:"16.666",color:"#ff0"},{offset:"33.333",color:"#0f0"},{offset:"50",color:"#0ff"},{offset:"66.666",color:"#00f"},{offset:"83.333",color:"#f0f"},{offset:"100",color:"#f00"}];case"saturation":var e=g$1.hsvToHsl({h:r.h,s:0,v:r.v}),n=g$1.hsvToHsl({h:r.h,s:100,v:r.v});return [{offset:"0",color:"hsl("+e.h+", "+e.s+"%, "+e.l+"%)"},{offset:"100",color:"hsl("+n.h+", "+n.s+"%, "+n.l+"%)"}];case"value":default:var s=g$1.hsvToHsl({h:r.h,s:r.s,v:100});return [{offset:"0",color:"#000"},{offset:"100",color:"hsl("+s.h+", "+s.s+"%, "+s.l+"%)"}]}}function A$1(t,r){var e=t.wheelAngle;return ((r="clockwise"===t.wheelDirection?-360+r-e:e-r)%360+360)%360}function F(t){var r=t.width/2;return {x:r,y:r}}function S(t){var r=t.color.hsv,e=t.borderWidth,n=t.padding,s=t.handleRadius,i=t.wheelDirection,h=t.width/2-e,a=F(t),o=A$1(t,r.h)*(Math.PI/180),f=r.s/100*(h-n-s-e),u="clockwise"===i?-1:1;return {x:a.x+f*Math.cos(o)*u,y:a.y+f*Math.sin(o)*u}}function y$1(t,r,e,n){var s=t.width/2,i=s-t.padding-t.handleRadius-t.borderWidth;r=s-(r-n.left),e=s-(e-n.top);var h=Math.atan2(e,r),a=A$1(t,Math.round(h*(180/Math.PI))+180),o=Math.min(Math.sqrt(r*r+e*e),i);return {h:a,s:Math.round(100/i*o)}}function R(t){var r=window.navigator.userAgent,e=/^((?!chrome|android).)*safari/i.test(r),n=/iPhone|iPod|iPad/i.test(r),s=window.location;return e||n?s.protocol+"//"+s.host+s.pathname+s.search+t:t}function T$1(t,r,e,n,s){var i=s-n<=180?0:1;return n*=Math.PI/180,s*=Math.PI/180,"M "+(t+e*Math.cos(s))+" "+(r+e*Math.sin(s))+" A "+e+" "+e+" 0 "+i+" 0 "+(t+e*Math.cos(n))+" "+(r+e*Math.sin(n))}g$1.prototype.set=function(t){var r="string"==typeof t,e="object"==typeof t;if(r&&/^(?:#?|0x?)[0-9a-fA-F]{3,8}$/.test(t)){ this.hexString=t; }else if(r&&/^rgba?/.test(t)){ this.rgbString=t; }else if(r&&/^hsla?/.test(t)){ this.hslString=t; }else if(e&&t instanceof g$1){ this.hsv=t.hsv; }else if(e&&function(t){return "r"in t&&"g"in t&&"b"in t}(t)){ this.rgb=t; }else if(e&&function(t){return "h"in t&&"s"in t&&"v"in t}(t)){ this.hsv=t; }else{if(!e||!function(t){return "h"in t&&"s"in t&&"l"in t}(t)){ throw new Error("invalid color value"); }this.hsl=t;}},g$1.prototype.setChannel=function(t,r,e){var n;this[t]=Object.assign({},this[t],((n={})[r]=e,n));},g$1.prototype.clone=function(){return new g$1(this)},g$1.hsvToRgb=function(t){var r=t.h/60,e=t.s/100,n=t.v/100,s=Math.floor(r),i=r-s,h=n*(1-e),a=n*(1-i*e),o=n*(1-(1-i)*e),f=s%6;return {r:255*[n,a,h,h,o,n][f],g:255*[o,n,n,a,h,h][f],b:255*[h,h,o,n,n,a][f]}},g$1.rgbToHsv=function(t){var r=t.r/255,e=t.g/255,n=t.b/255,s=Math.max(r,e,n),i=Math.min(r,e,n),h=s-i,a=0,o=s,f=0===s?0:h/s;switch(s){case i:a=0;break;case r:a=(e-n)/h+(e<n?6:0);break;case e:a=(n-r)/h+2;break;case n:a=(r-e)/h+4;}return {h:60*a,s:100*f,v:100*o}},g$1.hsvToHsl=function(t){var r=t.s/100,e=t.v/100,n=(2-r)*e,s=n<=1?n:2-n;return {h:t.h,s:100*(s<1e-9?0:r*e/s),l:50*n}},g$1.hslToHsv=function(t){var r=2*t.l,e=t.s*(r<=100?r:200-r)/100;return {h:t.h,s:100*(r+e<1e-9?0:2*e/(r+e)),v:(r+e)/2}},d$1.hsv.get=function(){var t=this.value;return {h:t.h,s:t.s,v:t.v}},d$1.hsv.set=function(t){var r=this.value;if(t=Object.assign({},r,t),this.onChange){var e={h:!1,v:!1,s:!1};for(var n in r){ e[n]=t[n]!=r[n]; }this.value=t,(e.h||e.s||e.v||e.a)&&this.onChange(this,e);}else { this.value=t; }},d$1.rgb.get=function(){var t=g$1.hsvToRgb(this.value),r=t.g,e=t.b;return {r:Math.round(t.r),g:Math.round(r),b:Math.round(e)}},d$1.rgb.set=function(t){this.hsv=Object.assign({},g$1.rgbToHsv(t));},d$1.hsl.get=function(){var t=g$1.hsvToHsl(this.value),r=t.s,e=t.l;return {h:Math.round(t.h),s:Math.round(r),l:Math.round(e)}},d$1.hsl.set=function(t){this.hsv=Object.assign({},g$1.hslToHsv(t));},d$1.rgbString.get=function(){var t=this.rgb;return "rgb("+t.r+", "+t.g+", "+t.b+")"},d$1.rgbString.set=function(r){var e,n,s,i,o=1;if((e=h$1.exec(r))?(n=t$1(e[1],255),s=t$1(e[2],255),i=t$1(e[3],255)):(e=a$1.exec(r))&&(n=t$1(e[1],255),s=t$1(e[2],255),i=t$1(e[3],255),o=t$1(e[4],1)),!e){ throw new Error("invalid rgb string"); }this.rgb={r:n,g:s,b:i,a:o};},d$1.hexString.get=function(){var t=this.rgb;return "#"+e$1(t.r)+e$1(t.g)+e$1(t.b)},d$1.hexString.set=function(t){var e,n,s,i,h=255;if((e=u$1.exec(t))?(n=17*r$1(e[1]),s=17*r$1(e[2]),i=17*r$1(e[3])):(e=c$1.exec(t))?(n=17*r$1(e[1]),s=17*r$1(e[2]),i=17*r$1(e[3]),h=17*r$1(e[4])):(e=l$1.exec(t))?(n=r$1(e[1]),s=r$1(e[2]),i=r$1(e[3])):(e=v$1.exec(t))&&(n=r$1(e[1]),s=r$1(e[2]),i=r$1(e[3]),h=r$1(e[4])),!e){ throw new Error("invalid hex string"); }this.rgb={r:n,g:s,b:i,a:h/255};},d$1.hslString.get=function(){var t=this.hsl;return "hsl("+t.h+", "+t.s+"%, "+t.l+"%)"},d$1.hslString.set=function(r){var e,n,s,i,h=1;if((e=o$1.exec(r))?(n=t$1(e[1],360),s=t$1(e[2],100),i=t$1(e[3],100)):(e=f$1.exec(r))&&(n=t$1(e[1],360),s=t$1(e[2],100),i=t$1(e[3],100),h=t$1(e[4],1)),!e){ throw new Error("invalid hsl string"); }this.hsl={h:n,s:s,l:i,a:h};},Object.defineProperties(g$1.prototype,d$1);

  /**
   * Listen to one or more events on an element
   */
  function listen(el, eventList, callback, params) {
      for (var i = 0; i < eventList.length; i++) {
          el.addEventListener(eventList[i], callback, params);
      }
  }
  /**
   * Remove an event listener on an element
   */
  function unlisten(el, eventList, callback, params) {
      for (var i = 0; i < eventList.length; i++) {
          el.removeEventListener(eventList[i], callback, params);
      }
  }
  /**
   * Call fn callback when the page document has fully loaded
   */
  function onDocumentReady(callback) {
      if (document.readyState !== 'loading') {
          callback();
      }
      else {
          listen(document, ['DOMContentLoaded'], callback);
      }
  }

  var EventType;
  (function (EventType) {
      EventType["MouseDown"] = "mousedown";
      EventType["MouseMove"] = "mousemove";
      EventType["MouseUp"] = "mouseup";
      EventType["TouchStart"] = "touchstart";
      EventType["TouchMove"] = "touchstart";
      EventType["TouchEnd"] = "touchend";
  })(EventType || (EventType = {}));
  var EventResult;
  (function (EventResult) {
      EventResult[EventResult["start"] = 0] = "start";
      EventResult[EventResult["move"] = 1] = "move";
      EventResult[EventResult["end"] = 2] = "end";
  })(EventResult || (EventResult = {}));
  /**
   * Base component class for iro UI components
   * This extends the Preact component class to allow them to react to mouse/touch input events by themselves
   */
  var IroComponent = /*@__PURE__*/(function (Component) {
      function IroComponent(props) {
          Component.call(this, props);
          // Generate unique ID for the component
          // This can be used to generate unique IDs for gradients, etc
          this.uid = (Math.random() + 1).toString(36).substring(5);
      }

      if ( Component ) IroComponent.__proto__ = Component;
      IroComponent.prototype = Object.create( Component && Component.prototype );
      IroComponent.prototype.constructor = IroComponent;
      IroComponent.prototype.componentDidMount = function componentDidMount () {
          listen(this.base, [EventType.MouseDown, EventType.TouchStart], this, { passive: false });
      };
      IroComponent.prototype.componentWillUnmount = function componentWillUnmount () {
          unlisten(this.base, [EventType.MouseDown, EventType.TouchStart], this);
      };
      // More info on handleEvent:
      // https://medium.com/@WebReflection/dom-handleevent-a-cross-platform-standard-since-year-2000-5bf17287fd38
      // TL;DR this lets us have a single point of entry for multiple events, and we can avoid callback/binding hell
      IroComponent.prototype.handleEvent = function handleEvent (e) {
          e.preventDefault();
          // Detect if the event is a touch event by checking if it has the `touches` property
          // If it is a touch event, use the first touch input
          var point = e.touches ? e.changedTouches[0] : e;
          var x$$1 = point.clientX;
          var y = point.clientY;
          // Get the screen position of the component
          var bounds = this.base.getBoundingClientRect();
          switch (e.type) {
              case EventType.MouseDown:
              case EventType.TouchStart:
                  listen(document, [EventType.MouseMove, EventType.TouchMove, EventType.MouseUp, EventType.TouchEnd], this, { passive: false });
                  this.handleInput(x$$1, y, bounds, EventResult.start);
                  break;
              case EventType.MouseMove:
              case EventType.TouchMove:
                  this.handleInput(x$$1, y, bounds, EventResult.move);
                  break;
              case EventType.MouseUp:
              case EventType.TouchEnd:
                  this.handleInput(x$$1, y, bounds, EventResult.end);
                  unlisten(document, [EventType.MouseMove, EventType.TouchMove, EventType.MouseUp, EventType.TouchEnd], this, { passive: false });
                  break;
          }
      };

      return IroComponent;
  }(m));

  function IroHandle(props) {
      var radius = props.r;
      var url = props.url;
      return (h("svg", { className: "iro__handle", x: props.x, y: props.y, style: { overflow: 'visible' } },
          url && (h("use", Object.assign({ xlinkHref: R(url) }, props.origin))),
          !url && (h("circle", { className: "iro__handle__inner", r: radius, fill: "none", "stroke-width": 2, stroke: "#000" })),
          !url && (h("circle", { className: "iro__handle__outer", r: radius - 2, fill: "none", "stroke-width": 2, stroke: "#fff" }))));
  }
  IroHandle.defaultProps = {
      x: 0,
      y: 0,
      r: 8,
      url: null,
      origin: { x: 0, y: 0 }
  };

  var HUE_STEPS = Array.apply(null, { length: 360 }).map(function (_, index) { return index; });
  var IroWheel = /*@__PURE__*/(function (IroComponent$$1) {
      function IroWheel () {
          IroComponent$$1.apply(this, arguments);
      }

      if ( IroComponent$$1 ) IroWheel.__proto__ = IroComponent$$1;
      IroWheel.prototype = Object.create( IroComponent$$1 && IroComponent$$1.prototype );
      IroWheel.prototype.constructor = IroWheel;

      IroWheel.prototype.handleInput = function handleInput (x$$1, y, bounds, type) {
          this.props.onInput(type, y$1(this.props, x$$1, y, bounds));
      };
      IroWheel.prototype.render = function render (props) {
          var width = props.width;
          var borderWidth = props.borderWidth;
          var hsv = props.color.hsv;
          var radius = (width / 2) - borderWidth;
          var center = F(props);
          var cX = center.x;
          var cY = center.y;
          var handlePos = S(props);
          return (h("svg", { className: "iro__wheel", width: width, height: width, style: {
                  overflow: 'visible',
                  display: 'block'
              } },
              h("defs", null,
                  h("radialGradient", { id: this.uid },
                      h("stop", { offset: "0%", "stop-color": "#fff" }),
                      h("stop", { offset: "100%", "stop-color": "#fff", "stop-opacity": "0" }))),
              h("g", { className: "iro__wheel__hue", "stroke-width": radius, fill: "none" }, HUE_STEPS.map(function (angle) { return (h("path", { key: angle, d: T$1(cX, cY, radius / 2, angle, angle + 1.5), stroke: ("hsl(" + (A$1(props, angle)) + ", 100%, 50%)") })); })),
              h("circle", { className: "iro__wheel__saturation", cx: cX, cy: cY, r: radius, fill: ("url(" + (R('#' + this.uid)) + ")") }),
              props.wheelLightness && (h("circle", { className: "iro__wheel__lightness", cx: cX, cy: cY, r: radius, fill: "#000", opacity: 1 - hsv.v / 100 })),
              h("circle", { className: "iro__wheel__border", cx: cX, cy: cY, r: radius, fill: "none", stroke: props.borderColor, "stroke-width": borderWidth }),
              h(IroHandle, { r: props.handleRadius, url: props.handleSvg, origin: props.handleOrigin, x: handlePos.x, y: handlePos.y })));
      };

      return IroWheel;
  }(IroComponent));

  var IroSlider = /*@__PURE__*/(function (IroComponent$$1) {
      function IroSlider () {
          IroComponent$$1.apply(this, arguments);
      }

      if ( IroComponent$$1 ) IroSlider.__proto__ = IroComponent$$1;
      IroSlider.prototype = Object.create( IroComponent$$1 && IroComponent$$1.prototype );
      IroSlider.prototype.constructor = IroSlider;

      IroSlider.prototype.render = function render (props) {
          var ref = b$1(props);
          var width = ref.width;
          var height = ref.height;
          var radius = ref.radius;
          var handlePos = p$1(props);
          var gradient = M$1(props);
          return (h("svg", { className: "iro__slider", width: width, height: height, style: {
                  marginTop: props.sliderMargin,
                  overflow: 'visible',
                  display: 'block'
              } },
              h("defs", null,
                  h("linearGradient", { id: this.uid }, gradient.map(function (stop) { return (h("stop", { offset: ((stop.offset) + "%"), "stop-color": stop.color })); }))),
              h("rect", { className: "iro__slider__value", rx: radius, ry: radius, x: props.borderWidth / 2, y: props.borderWidth / 2, width: width - props.borderWidth, height: height - props.borderWidth, "stroke-width": props.borderWidth, stroke: props.borderColor, fill: ("url(" + (R('#' + this.uid)) + ")") }),
              h(IroHandle, { r: props.handleRadius, url: props.handleSvg, origin: props.handleOrigin, x: handlePos.x, y: handlePos.y })));
      };
      /**
        * @desc handles mouse input for this component
        * @param {Number} x - point x coordinate
        * @param {Number} y - point y coordinate
        * @param {DOMRect} rect - bounding client rect for the component's base element
        * @param {String} type - input type: "START", "MOVE" or "END"
      */
      IroSlider.prototype.handleInput = function handleInput (x$$1, y, bounds, type) {
          var obj;

          var value = x$1(this.props, x$$1, y, bounds);
          var channel;
          switch (this.props.sliderType) {
              case 'hue':
                  channel = 'h';
                  value *= 3.6;
                  break;
              case 'saturation':
                  channel = 's';
                  break;
              case 'value':
              default:
                  channel = 'v';
                  break;
          }
          this.props.onInput(type, ( obj = {}, obj[channel] = value, obj ));
      };

      return IroSlider;
  }(IroComponent));

  /**
   * @desc Turn a component into a widget
   * This returns a factory function that can be used to create an instance of the widget component
   * The first function param is a DOM element or CSS selector for the element to mount to,
   * The second param is for config options which are passed to the component as props
   * This factory function can also delay mounting the element into the DOM until the page is ready
   * @param {Component} widgetComonpent ui component to turn into a widget
   * @returns {Function} widget factory
   */
  function createWidget(widgetComponent) {
      var widgetFactory = function (parent, props) {
          var widget = null; // will become an instance of the widget component class
          var widgetRoot = document.createElement('div');
          // Render widget into a temp DOM node
          I(h(widgetComponent, Object.assign({}, {ref: function (ref) { return widget = ref; }},
              props)), widgetRoot);
          // Mount it into the DOM when the page document is ready
          onDocumentReady(function () {
              var container = parent instanceof Element ? parent : document.querySelector(parent);
              container.appendChild(widget.base);
              widget.onMount(container);
          });
          return widget;
      };
      // Allow the widget factory to inherit component prototype + static class methods
      // This makes it easier for plugin authors to extend the base widget component
      widgetFactory.prototype = widgetComponent.prototype;
      Object.assign(widgetFactory, widgetComponent);
      // Add reference to base component too
      widgetFactory.__component = widgetComponent;
      return widgetFactory;
  }

  var IroColorPicker = /*@__PURE__*/(function (Component) {
      function IroColorPicker(props) {
          Component.call(this, props, {});
          this.emitHook('init:before');
          this.events = {};
          this.deferredEvents = {};
          this.colorUpdateActive = false;
          this.colorUpdateSrc = null;
          this.id = props.id;
          this.color = new g$1(props.color);
          this.deferredEmit('color:init', this.color, { h: false, s: false, v: false, a: false });
          // Whenever the color changes, update the color wheel
          this.color.onChange = this.updateColor.bind(this);
          // Pass all the props into the component's state,
          // Except we want to add the color object and make sure that refs aren't passed down to children
          this.state = Object.assign({}, props,
              {color: this.color,
              ref: undefined});
          this.emitHook('init:state');
          if (props.layout) {
              this.layout = props.layout;
          }
          else {
              this.layout = [
                  { component: IroWheel, options: {} },
                  { component: IroSlider, options: {} } ];
          }
          this.emitHook('init:after');
      }

      if ( Component ) IroColorPicker.__proto__ = Component;
      IroColorPicker.prototype = Object.create( Component && Component.prototype );
      IroColorPicker.prototype.constructor = IroColorPicker;
      // Public ColorPicker events API
      /**
       * @desc Set a callback function for an event
       * @param {String | Array} eventList event(s) to listen to
       * @param {Function} callback
       */
      IroColorPicker.prototype.on = function on (eventList, callback) {
          var this$1 = this;

          var events = this.events;
          // eventList can be an eventType string or an array of eventType strings
          (!Array.isArray(eventList) ? [eventList] : eventList).forEach(function (eventType) {
              // Emit plugin hook
              this$1.emitHook('event:on', eventType, callback);
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
       * @param {String | Array} eventList The name of the event
       * @param {Function} callback
       */
      IroColorPicker.prototype.off = function off (eventList, callback) {
          var this$1 = this;

          (!Array.isArray(eventList) ? [eventList] : eventList).forEach(function (eventType) {
              var callbackList = this$1.events[eventType];
              this$1.emitHook('event:off', eventType, callback);
              if (callbackList)
                  { callbackList.splice(callbackList.indexOf(callback), 1); }
          });
      };
      /**
       * @desc Emit an event
       * @param {String} eventType The name of the event to emit
       * @param {Array} args array of args to pass to callbacks
       */
      IroColorPicker.prototype.emit = function emit (eventType) {
          var ref;

          var args = [], len = arguments.length - 1;
          while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];
          // Events are plugin hooks too
          (ref = this).emitHook.apply(ref, [ eventType ].concat( args ));
          var callbackList = this.events[eventType] || [];
          for (var i = 0; i < callbackList.length; i++) {
              callbackList[i].apply(this, args);
          }
      };
      /**
       * @desc Emit an event now, or save it for when the relevent event listener is added
       * @param {String} eventType The name of the event to emit
       * @param {Array} args array of args to pass to callbacks
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
      /**
       * @desc Resize the color picker
       * @param {Number} width
       */
      IroColorPicker.prototype.resize = function resize (width) {
          this.setState({ width: width }, function () { });
      };
      /**
       * @desc Reset the color picker to the initial color provided in the color picker options
       */
      IroColorPicker.prototype.reset = function reset () {
          this.color.set(this.props.color);
      };
      // Plugin hooks API
      /**
       * @desc Set a callback function for a hook
       * @param {String} hookType The name of the hook to listen to
       * @param {Function} callback
       */
      IroColorPicker.addHook = function addHook (hookType, callback) {
          var pluginHooks = IroColorPicker.pluginHooks;
          (pluginHooks[hookType] || (pluginHooks[hookType] = [])).push(callback);
      };
      /**
       * @desc Emit a callback hook
       * @access private
       * @param {String} hookType The type of hook event to emit
       */
      IroColorPicker.prototype.emitHook = function emitHook (hookType) {
          var args = [], len = arguments.length - 1;
          while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

          var callbackList = IroColorPicker.pluginHooks[hookType] || [];
          for (var i = 0; i < callbackList.length; i++) {
              callbackList[i].apply(this, args);
          }
      };
      // Internal methods
      /**
       * @desc Called by the createWidget wrapper when the element is mounted into the page
       * @access private
       * @param {Element} container the container element for this ColorPicker instance
       */
      IroColorPicker.prototype.onMount = function onMount (container) {
          this.el = container;
          this.deferredEmit('mount', this);
      };
      /**
       * @desc React to a color update
       * @access private
       * @param {IroColor} color current color
       * @param {Object} changes shows which h,s,v color channels changed
       */
      IroColorPicker.prototype.updateColor = function updateColor (color, changes) {
          this.emitHook('color:beforeUpdate', color, changes);
          this.setState({ "color": color });
          this.emitHook('color:afterUpdate', color, changes);
          // Prevent infinite loops if the color is set inside a color:change or input:change callback
          if (!this.colorUpdateActive) {
              // While _colorUpdateActive == true, branch cannot be entered
              this.colorUpdateActive = true;
              // If the color change originates from user input, fire input:change
              if (this.colorUpdateSrc == 'input') { // colorUpdateSrc is cleared in handeInput()
                  this.emit('input:change', color, changes);
              }
              // Always fire color:change event
              this.emit('color:change', color, changes);
              this.colorUpdateActive = false;
          }
      };
      /**
       * @desc Handle input from a UI control element
       * @access private
       * @param {String} type "START" | "MOVE" | "END"
       * @param {Object} hsv new hsv values for the color
       */
      IroColorPicker.prototype.handleInput = function handleInput (type, hsv) {
          // Fire input start and move events before color update
          if (type === 'START')
              { this.emit('input:start', [this.color]); }
          if (type === 'MOVE')
              { this.emit('input:move', this.color); }
          // Set the color update source
          this.colorUpdateSrc = 'input';
          // Setting the color HSV here will automatically update the UI
          // Since we bound the color's _onChange callback
          this.color.hsv = hsv;
          // Fire input end event after color update
          if (type === 'END')
              { this.emit('input:end', this.color); }
          // Reset color update source so it doesn't interfere with future color updates
          // Super important to do this here and not in updateColor()
          this.colorUpdateSrc = null;
      };
      IroColorPicker.prototype.render = function render (props, state) {
          var this$1 = this;

          return (h("div", { class: "iro__colorPicker", id: props.id, style: {
                  display: state.display,
                  width: state.width
              } }, this.layout.map(function (ref) {
                  var UiComponent = ref.component;
                  var options = ref.options;

                  return (h(UiComponent, Object.assign({}, state, options, { onInput: function (type, hsv) { return this$1.handleInput(type, hsv); }, parent: this$1 })));
          })));
      };

      return IroColorPicker;
  }(m));
  IroColorPicker.pluginHooks = {};
  IroColorPicker.defaultProps = {
      width: 300,
      height: 300,
      handleRadius: 8,
      handleSvg: null,
      handleOrigin: { x: 0, y: 0 },
      color: '#fff',
      borderColor: '#fff',
      borderWidth: 0,
      display: 'block',
      id: null,
      wheelLightness: true,
      wheelAngle: 0,
      wheelDirection: 'anticlockwise',
      sliderHeight: null,
      sliderMargin: 12,
      padding: 6,
      layout: null
  };
  var IroColorPickerWidget = createWidget(IroColorPicker);

  /**
   * iro.js plugins API
   * This provides the iro.use method, which can be used to register plugins which extend the iro.js core
   */
  function usePlugins(core) {
      var installedPlugins = [];
      /**
       * @desc Register iro.js plugin
       * @param {Function} plugin = plugin constructor
       * @param {Object} pluginOptions = plugin options passed to constructor
       */
      core.use = function (plugin, pluginOptions) {
          if ( pluginOptions === void 0 ) pluginOptions = {};

          // Check that the plugin hasn't already been registered
          if (!(installedPlugins.indexOf(plugin) > -1)) {
              // Init plugin
              // TODO: consider collection of plugin utils, which are passed as a thrid param
              plugin(core, pluginOptions);
              // Register plugin
              installedPlugins.push(plugin);
          }
      };
      core.installedPlugins = installedPlugins;
      return core;
  }

  var index = usePlugins({
      Color: g$1,
      ColorPicker: IroColorPickerWidget,
      ui: {
          h: h,
          Component: IroComponent,
          Handle: IroHandle,
          Slider: IroSlider,
          Wheel: IroWheel,
      },
      version: "4.5.1",
  });

  return index;

})));
//# sourceMappingURL=iro.js.map
