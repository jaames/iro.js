/*!
 * iro.js v5.0.0-5
 * 2016-2019 James Daniel
 * Licensed under MPL 2.0
 * github.com/jaames/iro.js
 */

var n,u,t,i,r,o,f={},e=[],c=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|^--/i;function s(n,l){for(var u in l){ n[u]=l[u]; }return n}function a(n){var l=n.parentNode;l&&l.removeChild(n);}function h(n,l,u){var t,i,r,o,f=arguments;if(l=s({},l),arguments.length>3){ for(u=[u],t=3;t<arguments.length;t++){ u.push(f[t]); } }if(null!=u&&(l.children=u),null!=n&&null!=n.defaultProps){ for(i in n.defaultProps){ void 0===l[i]&&(l[i]=n.defaultProps[i]); } }return o=l.key,null!=(r=l.ref)&&delete l.ref,null!=o&&delete l.key,v(n,l,o,r)}function v(l,u,t,i){var r={type:l,props:u,key:t,ref:i,__k:null,__p:null,__b:0,__e:null,l:null,__c:null,constructor:void 0};return n.vnode&&n.vnode(r),r}function d(n){return n.children}function y(n){if(null==n||"boolean"==typeof n){ return null; }if("string"==typeof n||"number"==typeof n){ return v(null,n,null,null); }if(null!=n.__e||null!=n.__c){var l=v(n.type,n.props,n.key,null);return l.__e=n.__e,l}return n}function m(n,l){this.props=n,this.context=l;}function w(n,l){if(null==l){ return n.__p?w(n.__p,n.__p.__k.indexOf(n)+1):null; }for(var u;l<n.__k.length;l++){ if(null!=(u=n.__k[l])&&null!=u.__e){ return u.__e; } }return "function"==typeof n.type?w(n):null}function g(n){var l,u;if(null!=(n=n.__p)&&null!=n.__c){for(n.__e=n.__c.base=null,l=0;l<n.__k.length;l++){ if(null!=(u=n.__k[l])&&null!=u.__e){n.__e=n.__c.base=u.__e;break} }return g(n)}}function k(l){(!l.__d&&(l.__d=!0)&&1===u.push(l)||i!==n.debounceRendering)&&(i=n.debounceRendering,(n.debounceRendering||t)(_));}function _(){var n,l,t,i,r,o,f,e;for(u.sort(function(n,l){return l.__v.__b-n.__v.__b});n=u.pop();){ n.__d&&(t=void 0,i=void 0,o=(r=(l=n).__v).__e,f=l.__P,e=l.u,l.u=!1,f&&(t=[],i=$(f,r,s({},r),l.__n,void 0!==f.ownerSVGElement,null,t,e,null==o?w(r):o),j(t,r),i!=o&&g(r))); }}function b(n,l,u,t,i,r,o,c,s){var h,v,p,d,y,m,g,k=u&&u.__k||e,_=k.length;if(c==f&&(c=null!=r?r[0]:_?w(u,0):null),h=0,l.__k=x(l.__k,function(u){if(null!=u){if(u.__p=l,u.__b=l.__b+1,null===(p=k[h])||p&&u.key==p.key&&u.type===p.type){ k[h]=void 0; }else { for(v=0;v<_;v++){if((p=k[v])&&u.key==p.key&&u.type===p.type){k[v]=void 0;break}p=null;} }if(d=$(n,u,p=p||f,t,i,r,o,null,c,s),(v=u.ref)&&p.ref!=v&&(g||(g=[])).push(v,u.__c||d,u),null!=d){if(null==m&&(m=d),null!=u.l){ d=u.l,u.l=null; }else if(r==p||d!=c||null==d.parentNode){n:if(null==c||c.parentNode!==n){ n.appendChild(d); }else{for(y=c,v=0;(y=y.nextSibling)&&v<_;v+=2){ if(y==d){ break n; } }n.insertBefore(d,c);}"option"==l.type&&(n.value="");}c=d.nextSibling,"function"==typeof l.type&&(l.l=d);}}return h++,u}),l.__e=m,null!=r&&"function"!=typeof l.type){ for(h=r.length;h--;){ null!=r[h]&&a(r[h]); } }for(h=_;h--;){ null!=k[h]&&D(k[h],k[h]); }if(g){ for(h=0;h<g.length;h++){ A(g[h],g[++h],g[++h]); } }}function x(n,l,u){if(null==u&&(u=[]),null==n||"boolean"==typeof n){ l&&u.push(l(null)); }else if(Array.isArray(n)){ for(var t=0;t<n.length;t++){ x(n[t],l,u); } }else { u.push(l?l(y(n)):n); }return u}function C(n,l,u,t,i){var r;for(r in u){ r in l||N(n,r,null,u[r],t); }for(r in l){ i&&"function"!=typeof l[r]||"value"===r||"checked"===r||u[r]===l[r]||N(n,r,l[r],u[r],t); }}function P(n,l,u){"-"===l[0]?n.setProperty(l,u):n[l]="number"==typeof u&&!1===c.test(l)?u+"px":null==u?"":u;}function N(n,l,u,t,i){var r,o,f,e,c;if("key"===(l=i?"className"===l?"class":l:"class"===l?"className":l)||"children"===l);else if("style"===l){ if(r=n.style,"string"==typeof u){ r.cssText=u; }else{if("string"==typeof t&&(r.cssText="",t=null),t){ for(o in t){ u&&o in u||P(r,o,""); } }if(u){ for(f in u){ t&&u[f]===t[f]||P(r,f,u[f]); } }} }else{ "o"===l[0]&&"n"===l[1]?(e=l!==(l=l.replace(/Capture$/,"")),c=l.toLowerCase(),l=(c in n?c:l).slice(2),u?(t||n.addEventListener(l,T,e),(n.t||(n.t={}))[l]=u):n.removeEventListener(l,T,e)):"list"!==l&&"tagName"!==l&&"form"!==l&&!i&&l in n?n[l]=null==u?"":u:"function"!=typeof u&&"dangerouslySetInnerHTML"!==l&&(l!==(l=l.replace(/^xlink:?/,""))?null==u||!1===u?n.removeAttributeNS("http://www.w3.org/1999/xlink",l.toLowerCase()):n.setAttributeNS("http://www.w3.org/1999/xlink",l.toLowerCase(),u):null==u||!1===u?n.removeAttribute(l):n.setAttribute(l,u)); }}function T(l){return this.t[l.type](n.event?n.event(l):l)}function $(l,u,t,i,r,o,f,e,c,a){var h,v,p,y,w,g,k,_,C,P,N=u.type;if(void 0!==u.constructor){ return null; }(h=n.__b)&&h(u);try{n:if("function"==typeof N){if(_=u.props,C=(h=N.contextType)&&i[h.__c],P=h?C?C.props.value:h.__p:i,t.__c?k=(v=u.__c=t.__c).__p=v.__E:("prototype"in N&&N.prototype.render?u.__c=v=new N(_,P):(u.__c=v=new m(_,P),v.constructor=N,v.render=H),C&&C.sub(v),v.props=_,v.state||(v.state={}),v.context=P,v.__n=i,p=v.__d=!0,v.__h=[]),null==v.__s&&(v.__s=v.state),null!=N.getDerivedStateFromProps&&s(v.__s==v.state?v.__s=s({},v.__s):v.__s,N.getDerivedStateFromProps(_,v.__s)),p){ null==N.getDerivedStateFromProps&&null!=v.componentWillMount&&v.componentWillMount(),null!=v.componentDidMount&&f.push(v); }else{if(null==N.getDerivedStateFromProps&&null==e&&null!=v.componentWillReceiveProps&&v.componentWillReceiveProps(_,P),!e&&null!=v.shouldComponentUpdate&&!1===v.shouldComponentUpdate(_,v.__s,P)){for(v.props=_,v.state=v.__s,v.__d=!1,v.__v=u,u.__e=null!=c?c!==t.__e?c:t.__e:null,u.__k=t.__k,h=0;h<u.__k.length;h++){ u.__k[h]&&(u.__k[h].__p=u); }break n}null!=v.componentWillUpdate&&v.componentWillUpdate(_,v.__s,P);}for(y=v.props,w=v.state,v.context=P,v.props=_,v.state=v.__s,(h=n.__r)&&h(u),v.__d=!1,v.__v=u,v.__P=l,h=v.render(v.props,v.state,v.context),u.__k=x(null!=h&&h.type==d&&null==h.key?h.props.children:h),null!=v.getChildContext&&(i=s(s({},i),v.getChildContext())),p||null==v.getSnapshotBeforeUpdate||(g=v.getSnapshotBeforeUpdate(y,w)),b(l,u,t,i,r,o,f,c,a),v.base=u.__e;h=v.__h.pop();){ v.__s&&(v.state=v.__s),h.call(v); }p||null==y||null==v.componentDidUpdate||v.componentDidUpdate(y,w,g),k&&(v.__E=v.__p=null);}else { u.__e=z(t.__e,u,t,i,r,o,f,a); }(h=n.diffed)&&h(u);}catch(l){n.__e(l,u,t);}return u.__e}function j(l,u){for(var t;t=l.pop();){ try{t.componentDidMount();}catch(l){n.__e(l,t.__v);} }n.__c&&n.__c(u);}function z(n,l,u,t,i,r,o,c){var s,a,h,v,p=u.props,d=l.props;if(i="svg"===l.type||i,null==n&&null!=r){ for(s=0;s<r.length;s++){ if(null!=(a=r[s])&&(null===l.type?3===a.nodeType:a.localName===l.type)){n=a,r[s]=null;break} } }if(null==n){if(null===l.type){ return document.createTextNode(d); }n=i?document.createElementNS("http://www.w3.org/2000/svg",l.type):document.createElement(l.type),r=null;}return null===l.type?p!==d&&(null!=r&&(r[r.indexOf(n)]=null),n.data=d):l!==u&&(null!=r&&(r=e.slice.call(n.childNodes)),h=(p=u.props||f).dangerouslySetInnerHTML,v=d.dangerouslySetInnerHTML,c||(v||h)&&(v&&h&&v.__html==h.__html||(n.innerHTML=v&&v.__html||"")),C(n,d,p,i,c),l.__k=l.props.children,v||b(n,l,u,t,"foreignObject"!==l.type&&i,r,o,f,c),c||("value"in d&&void 0!==d.value&&d.value!==n.value&&(n.value=null==d.value?"":d.value),"checked"in d&&void 0!==d.checked&&d.checked!==n.checked&&(n.checked=d.checked))),n}function A(l,u,t){try{"function"==typeof l?l(u):l.current=u;}catch(l){n.__e(l,t);}}function D(l,u,t){var i,r,o;if(n.unmount&&n.unmount(l),(i=l.ref)&&A(i,null,u),t||"function"==typeof l.type||(t=null!=(r=l.__e)),l.__e=l.l=null,null!=(i=l.__c)){if(i.componentWillUnmount){ try{i.componentWillUnmount();}catch(l){n.__e(l,u);} }i.base=i.__P=null;}if(i=l.__k){ for(o=0;o<i.length;o++){ i[o]&&D(i[o],u,t); } }null!=r&&a(r);}function H(n,l,u){return this.constructor(n,u)}function I(l,u,t){var i,o,c;n.__p&&n.__p(l,u),o=(i=t===r)?null:t&&t.__k||u.__k,l=h(d,null,[l]),c=[],$(u,i?u.__k=l:(t||u).__k=l,o||f,f,void 0!==u.ownerSVGElement,t&&!i?[t]:o?null:e.slice.call(u.childNodes),c,!1,t||f,i),j(c,l);}n={},m.prototype.setState=function(n,l){var u=this.__s!==this.state&&this.__s||(this.__s=s({},this.state));("function"!=typeof n||(n=n(u,this.props)))&&s(u,n),null!=n&&this.__v&&(this.u=!1,l&&this.__h.push(l),k(this));},m.prototype.forceUpdate=function(n){this.__v&&(n&&this.__h.push(n),this.u=!0,k(this));},m.prototype.render=d,u=[],t="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,i=n.debounceRendering,n.__e=function(n,l,u){for(var t;l=l.__p;){ if((t=l.__c)&&!t.__p){ try{if(t.constructor&&null!=t.constructor.getDerivedStateFromError){ t.setState(t.constructor.getDerivedStateFromError(n)); }else{if(null==t.componentDidCatch){ continue; }t.componentDidCatch(n);}return k(t.__E=t)}catch(l){n=l;} } }throw n},r=f,o=0;

var t$1="(?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?)",r$1="[\\s|\\(]+("+t$1+")[,|\\s]+("+t$1+")[,|\\s]+("+t$1+")\\s*\\)?",n$1="[\\s|\\(]+("+t$1+")[,|\\s]+("+t$1+")[,|\\s]+("+t$1+")[,|\\s]+("+t$1+")\\s*\\)?",e$1=new RegExp("rgb"+r$1),i$1=new RegExp("rgba"+n$1),a$1=new RegExp("hsl"+r$1),s$1=new RegExp("hsla"+n$1),h$1=new RegExp("^(?:#?|0x?)([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$"),o$1=new RegExp("^(?:#?|0x?)([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$"),u$1=new RegExp("^(?:#?|0x?)([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$"),l=new RegExp("^(?:#?|0x?)([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$"),g$1=Math.log,c$1=Math.round,f$1=Math.floor;function v$1(t,r){var n=t.indexOf("%")>-1,e=parseFloat(t);return n?r/100*e:e}function b$1(t){return parseInt(t,16)}function d$1(t){return t.toString(16).padStart(2,"0")}var p=function(t,r){this.$={h:0,s:0,v:0,a:1},t&&this.set(t),this.onChange=r,this.initialValue=Object.assign({},this.$);},x$1={hsv:{configurable:!0},hsva:{configurable:!0},hue:{configurable:!0},saturation:{configurable:!0},value:{configurable:!0},alpha:{configurable:!0},kelvin:{configurable:!0},rgb:{configurable:!0},rgba:{configurable:!0},hsl:{configurable:!0},hsla:{configurable:!0},rgbString:{configurable:!0},rgbaString:{configurable:!0},hexString:{configurable:!0},hex8String:{configurable:!0},hslString:{configurable:!0},hslaString:{configurable:!0}};p.prototype.set=function(t){if("string"==typeof t){ /^(?:#?|0x?)[0-9a-fA-F]{3,8}$/.test(t)?this.hexString=t:/^rgba?/.test(t)?this.rgbString=t:/^hsla?/.test(t)&&(this.hslString=t); }else{if("object"!=typeof t){ throw new Error("Invalid color value"); }t instanceof p?this.hsv=t.hsv:"object"==typeof t&&"r"in t&&"g"in t&&"b"in t?this.rgb=t:"object"==typeof t&&"h"in t&&"s"in t&&"v"in t?this.hsv=t:"object"==typeof t&&"h"in t&&"s"in t&&"l"in t&&(this.hsl=t);}},p.prototype.setChannel=function(t,r,n){var e;this[t]=Object.assign({},this[t],((e={})[r]=n,e));},p.prototype.reset=function(){this.hsva=this.initialValue;},p.prototype.clone=function(){return new p(this)},p.prototype.unbind=function(){this.onChange=void 0;},p.hsvToRgb=function(t){var r=t.h/60,n=t.s/100,e=t.v/100,i=f$1(r),a=r-i,s=e*(1-n),h=e*(1-a*n),o=e*(1-(1-a)*n),u=i%6;return {r:255*[e,h,s,s,o,e][u],g:255*[o,e,e,h,s,s][u],b:255*[s,s,o,e,e,h][u]}},p.rgbToHsv=function(t){var r=t.r/255,n=t.g/255,e=t.b/255,i=Math.max(r,n,e),a=Math.min(r,n,e),s=i-a,h=0,o=i,u=0===i?0:s/i;switch(i){case a:h=0;break;case r:h=(n-e)/s+(n<e?6:0);break;case n:h=(e-r)/s+2;break;case e:h=(r-n)/s+4;}return {h:60*h,s:100*u,v:100*o}},p.hsvToHsl=function(t){var r=t.s/100,n=t.v/100,e=(2-r)*n,i=e<=1?e:2-e;return {h:t.h,s:100*(i<1e-9?0:r*n/i),l:50*e}},p.hslToHsv=function(t){var r=2*t.l,n=t.s*(r<=100?r:200-r)/100;return {h:t.h,s:100*(r+n<1e-9?0:2*n/(r+n)),v:(r+n)/2}},p.kelvinToRgb=function(t){var r,n,e,i=t/100;return i<66?(r=255,n=-155.25485562709179-.44596950469579133*(n=i-2)+104.49216199393888*g$1(n),e=i<20?0:.8274096064007395*(e=i-10)-254.76935184120902+115.67994401066147*g$1(e)):(r=351.97690566805693+.114206453784165*(r=i-55)-40.25366309332127*g$1(r),n=325.4494125711974+.07943456536662342*(n=i-50)-28.0852963507957*g$1(n),e=255),{r:f$1(r),g:f$1(n),b:f$1(e)}},p.rgbToKelvin=function(t){for(var r,n=t.r,e=t.b,i=1e3,a=4e4;a-i>.4;){var s=p.kelvinToRgb(r=.5*(a+i));s.b/s.r>=e/n?a=r:i=r;}return r},x$1.hsv.get=function(){var t=this.$;return {h:t.h,s:t.s,v:t.v}},x$1.hsv.set=function(t){var r=this.$;if(t=Object.assign({},r,t),this.onChange){var n={h:!1,v:!1,s:!1,a:!1};for(var e in r){ n[e]=t[e]!=r[e]; }this.$=t,(n.h||n.s||n.v||n.a)&&this.onChange(this,n);}else { this.$=t; }},x$1.hsva.get=function(){return Object.assign({},this.$)},x$1.hsva.set=function(t){this.hsv=t;},x$1.hue.get=function(){return this.$.h},x$1.hue.set=function(t){this.hsv={h:t};},x$1.saturation.get=function(){return this.$.s},x$1.saturation.set=function(t){this.hsv={s:t};},x$1.value.get=function(){return this.$.v},x$1.value.set=function(t){this.hsv={v:t};},x$1.alpha.get=function(){return this.$.a},x$1.alpha.set=function(t){this.hsv=Object.assign({},this.hsv,{a:t});},x$1.kelvin.get=function(){return p.rgbToKelvin(this.rgb)},x$1.kelvin.set=function(t){this.rgb=p.kelvinToRgb(t);},x$1.rgb.get=function(){var t=p.hsvToRgb(this.$),r=t.g,n=t.b;return {r:c$1(t.r),g:c$1(r),b:c$1(n)}},x$1.rgb.set=function(t){this.hsv=Object.assign({},p.rgbToHsv(t),{a:void 0===t.a?1:t.a});},x$1.rgba.get=function(){return Object.assign({},this.rgb,{a:this.alpha})},x$1.rgba.set=function(t){this.rgb=t;},x$1.hsl.get=function(){var t=p.hsvToHsl(this.$),r=t.s,n=t.l;return {h:c$1(t.h),s:c$1(r),l:c$1(n)}},x$1.hsl.set=function(t){this.hsv=Object.assign({},p.hslToHsv(t),{a:void 0===t.a?1:t.a});},x$1.hsla.get=function(){return Object.assign({},this.hsl,{a:this.alpha})},x$1.hsla.set=function(t){this.hsl=t;},x$1.rgbString.get=function(){var t=this.rgb;return "rgb("+t.r+", "+t.g+", "+t.b+")"},x$1.rgbString.set=function(t){var r,n,a,s,h=1;if((r=e$1.exec(t))?(n=v$1(r[1],255),a=v$1(r[2],255),s=v$1(r[3],255)):(r=i$1.exec(t))&&(n=v$1(r[1],255),a=v$1(r[2],255),s=v$1(r[3],255),h=v$1(r[4],1)),!r){ throw new Error("Invalid rgb string"); }this.rgb={r:n,g:a,b:s,a:h};},x$1.rgbaString.get=function(){var t=this.rgba;return "rgba("+t.r+", "+t.g+", "+t.b+", "+t.a+")"},x$1.rgbaString.set=function(t){this.rgbString=t;},x$1.hexString.get=function(){var t=this.rgb;return "#"+d$1(t.r)+d$1(t.g)+d$1(t.b)},x$1.hexString.set=function(t){var r,n,e,i,a=255;if((r=h$1.exec(t))?(n=17*b$1(r[1]),e=17*b$1(r[2]),i=17*b$1(r[3])):(r=o$1.exec(t))?(n=17*b$1(r[1]),e=17*b$1(r[2]),i=17*b$1(r[3]),a=17*b$1(r[4])):(r=u$1.exec(t))?(n=b$1(r[1]),e=b$1(r[2]),i=b$1(r[3])):(r=l.exec(t))&&(n=b$1(r[1]),e=b$1(r[2]),i=b$1(r[3]),a=b$1(r[4])),!r){ throw new Error("Invalid hex string"); }this.rgb={r:n,g:e,b:i,a:a/255};},x$1.hex8String.get=function(){var t=this.rgba;return "#"+d$1(t.r)+d$1(t.g)+d$1(t.b)+d$1(f$1(255*t.a))},x$1.hex8String.set=function(t){this.hexString=t;},x$1.hslString.get=function(){var t=this.hsl;return "hsl("+t.h+", "+t.s+"%, "+t.l+"%)"},x$1.hslString.set=function(t){var r,n,e,i,h=1;if((r=a$1.exec(t))?(n=v$1(r[1],360),e=v$1(r[2],100),i=v$1(r[3],100)):(r=s$1.exec(t))&&(n=v$1(r[1],360),e=v$1(r[2],100),i=v$1(r[3],100),h=v$1(r[4],1)),!r){ throw new Error("Invalid hsl string"); }this.hsl={h:n,s:e,l:i,a:h};},x$1.hslaString.get=function(){var t=this.hsla;return "hsl("+t.h+", "+t.s+"%, "+t.l+"%, "+t.a+")"},x$1.hslaString.set=function(t){this.hslString=t;},Object.defineProperties(p.prototype,x$1);var w$1={sliderShape:"bar",sliderType:"value",minTemperature:2200,maxTemperature:11e3};function m$1(t){var r;return (r={})["horizontal"===t.layoutDirection?"marginLeft":"marginTop"]=t.sliderMargin,r}function y$1(t){var r=t.width,n=t.sliderSize,e=t.borderWidth,i=t.handleRadius,a=t.padding,s="horizontal"===t.layoutDirection;return n=n||2*a+2*i+2*e,"circle"===t.sliderShape?{handleStart:t.padding+t.handleRadius,handleRange:r-2*a-2*i-2*e,width:r,height:r,cx:r/2,cy:r/2,radius:r/2-e/2}:{handleStart:n/2,handleRange:r-n,radius:n/2,x:0,y:0,width:s?n:r,height:s?r:n}}function S(t,r){var n=r.hsva;switch(t.sliderType){case"alpha":return 100*n.a;case"kelvin":var e=t.minTemperature;return Math.max(0,Math.min((r.kelvin-e)/(t.maxTemperature-e)*100,100));case"hue":return n.h/=3.6;case"saturation":return n.s;case"value":default:return n.v}}function M(t,r,n,e){var i,a=y$1(t),s=a.handleRange,h=a.handleStart;i="horizontal"===t.layoutDirection?-1*(n-e.top)+s+h:r-(e.left+h),i=Math.max(Math.min(i,s),0);var o=Math.round(100/s*i);switch(t.sliderType){case"kelvin":var u=t.minTemperature;return u+o/100*(t.maxTemperature-u);case"alpha":return o/100;case"hue":return 3.6*o;default:return o}}function T$1(t,r){var n=y$1(t),e=n.handleRange,i=n.handleStart,a="horizontal"===t.layoutDirection,s=a?n.width/2:n.height/2,h=i+S(t,r)/100*e;return a&&(h=-1*h+e+2*i),{x:a?s:h,y:a?h:s}}function R(t,r){var n=r.hsv;switch(t.sliderType){case"alpha":var e=r.rgb;return [[0,"rgba("+e.r+","+e.g+","+e.b+",0)"],[100,"rgb("+e.r+","+e.g+","+e.b+")"]];case"kelvin":for(var i=[],a=t.minTemperature,s=t.maxTemperature,h=s-a,o=a,u=0;o<s;o+=h/8,u+=1){var l=p.kelvinToRgb(o);i.push([12.5*u,"rgb("+l.r+","+l.g+","+l.b+")"]);}return i;case"hue":return [[0,"#f00"],[16.666,"#ff0"],[33.333,"#0f0"],[50,"#0ff"],[66.666,"#00f"],[83.333,"#f0f"],[100,"#f00"]];case"saturation":var g=p.hsvToHsl({h:n.h,s:0,v:n.v}),c=p.hsvToHsl({h:n.h,s:100,v:n.v});return [[0,"hsl("+g.h+","+g.s+"%,"+g.l+"%)"],[100,"hsl("+c.h+","+c.s+"%,"+c.l+"%)"]];case"value":default:var f=p.hsvToHsl({h:n.h,s:n.s,v:100});return [[0,"#000"],[100,"hsl("+f.h+","+f.s+"%,"+f.l+"%)"]]}}function A$1(t){var r="horizontal"===t.layoutDirection;return {x1:"0%",y1:r?"100%":"0%",x2:r?"0%":"100%",y2:"0%"}}function k$1(t){var r=t.width/2;return {width:t.width,radius:r-t.borderWidth,cx:r,cy:r}}function $$1(t,r,n){var e=t.wheelAngle,i=t.wheelDirection;return ((r=!n&&"clockwise"===i||n&&"anticlockwise"===i?(n?180:360)-(e-r):e+r)%360+360)%360}function F(t,r){var n=r.hsv,e=k$1(t),i=e.cx,a=e.cy,s=t.width/2-t.padding-t.handleRadius-t.borderWidth,h=(180+$$1(t,n.h,!0))*(Math.PI/180),o=n.s/100*s,u="clockwise"===t.wheelDirection?-1:1;return {x:i+o*Math.cos(h)*u,y:a+o*Math.sin(h)*u}}function j$1(t,r,n,e){var i=k$1(t),a=t.width/2-t.padding-t.handleRadius-t.borderWidth;r=i.cx-(r-e.left),n=i.cy-(n-e.top);var s=$$1(t,Math.atan2(-n,-r)*(180/Math.PI)),h=Math.min(Math.sqrt(r*r+n*n),a);return {h:Math.round(s),s:Math.round(100/a*h)}}function E(t){var r;return (r={})["horizontal"===t.layoutDirection?"marginLeft":"marginTop"]=t.sliderMargin,r}function O(t){var r=t.width;return {width:r,height:r,radius:t.padding+t.handleRadius}}function D$1(t,r,n,e){var i=O(t),a=i.radius,s=(n-=e.top+a)/(i.height-2*a)*100;return {s:Math.max(0,Math.min((r-=e.left+a)/(i.width-2*a)*100,100)),v:Math.max(0,Math.min(100-s,100))}}function H$1(t,r){var n=O(t),e=n.radius,i=r.hsv,a=n.height-2*e;return {x:e+i.s/100*(n.width-2*e),y:e+(a-i.v/100*a)}}function I$1(t,r){return [[[0,"#fff"],[100,"hsl("+r.hue+",100%,50%)"]],[[0,"rgba(0,0,0,0)"],[100,"#000"]]]}var P$1=document.getElementsByTagName("base");function z$1(t){var r=window.navigator.userAgent,n=/^((?!chrome|android).)*safari/i.test(r),e=/iPhone|iPod|iPad/i.test(r),i=window.location;return (n||e)&&P$1.length>0?i.protocol+"//"+i.host+i.pathname+i.search+t:t}function C$1(t,r,n,e,i){var a=i-e<=180?0:1;return e*=Math.PI/180,i*=Math.PI/180,"M "+(t+n*Math.cos(i))+" "+(r+n*Math.sin(i))+" A "+n+" "+n+" 0 "+a+" 0 "+(t+n*Math.cos(e))+" "+(r+n*Math.sin(e))}function W(t,r,n,e){for(var i=0;i<e.length;i++){var a=e[i].x-r,s=e[i].y-n;if(Math.sqrt(a*a+s*s)<t.handleRadius){ return i }}return null}var L={width:300,height:300,handleRadius:8,handleSvg:null,handleProps:{x:0,y:0},color:"#fff",colors:[],borderColor:"#fff",borderWidth:0,wheelLightness:!0,wheelAngle:0,wheelDirection:"anticlockwise",layoutDirection:"vertical",sliderSize:null,sliderMargin:12,padding:6};

// Listen to one or more events on an element
function listen(el, eventList, callback, params) {
    for (var i = 0; i < eventList.length; i++) {
        el.addEventListener(eventList[i], callback, params);
    }
}
// Remove an event listener on an element
function unlisten(el, eventList, callback, params) {
    for (var i = 0; i < eventList.length; i++) {
        el.removeEventListener(eventList[i], callback, params);
    }
}
var EventType;
(function (EventType) {
    EventType["MouseDown"] = "mousedown";
    EventType["MouseMove"] = "mousemove";
    EventType["MouseUp"] = "mouseup";
    EventType["TouchStart"] = "touchstart";
    EventType["TouchMove"] = "touchmove";
    EventType["TouchEnd"] = "touchend";
})(EventType || (EventType = {}));
var EventResult;
(function (EventResult) {
    EventResult[EventResult["start"] = 0] = "start";
    EventResult[EventResult["move"] = 1] = "move";
    EventResult[EventResult["end"] = 2] = "end";
})(EventResult || (EventResult = {}));
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
        var rootProps = {
            onMouseDown: this.handleEvent.bind(this),
            onTouchStart: this.handleEvent.bind(this)
        };
        var rootStyles = {
            overflow: 'visible',
            display: props.layoutDirection === 'vertical' ? 'block' : 'inline-block'
        };
        return (h(d, null, props.children(this.uid, rootProps, rootStyles)));
    };
    // More info on handleEvent:
    // https://medium.com/@WebReflection/dom-handleevent-a-cross-platform-standard-since-year-2000-5bf17287fd38
    // TL;DR this lets us have a single point of entry for multiple events, and we can avoid callback/binding hell
    IroComponentBase.prototype.handleEvent = function handleEvent (e) {
        e.preventDefault();
        // Detect if the event is a touch event by checking if it has the `touches` property
        // If it is a touch event, use the first touch input
        var point = e.touches ? e.changedTouches[0] : e;
        var x = point.clientX;
        var y = point.clientY;
        // Get the screen position of the component
        var bounds = this.base.getBoundingClientRect();
        var inputHandler = this.props.onInput;
        switch (e.type) {
            case EventType.MouseDown:
            case EventType.TouchStart:
                listen(document, [EventType.MouseMove, EventType.TouchMove, EventType.MouseUp, EventType.TouchEnd], this, { passive: false });
                inputHandler(x, y, bounds, EventResult.start);
                break;
            case EventType.MouseMove:
            case EventType.TouchMove:
                inputHandler(x, y, bounds, EventResult.move);
                break;
            case EventType.MouseUp:
            case EventType.TouchEnd:
                inputHandler(x, y, bounds, EventResult.end);
                unlisten(document, [EventType.MouseMove, EventType.TouchMove, EventType.MouseUp, EventType.TouchEnd], this, { passive: false });
                break;
        }
    };

    return IroComponentBase;
}(m));

function IroHandle(props) {
    var radius = props.r;
    var url = props.url;
    return (h("svg", { className: "IroHandle", x: props.x, y: props.y, style: { overflow: 'visible' } },
        url && (h("use", Object.assign({ xlinkHref: z$1(url) }, props.props))),
        !url && (h("circle", { r: radius, fill: "none", "stroke-width": 2, stroke: "#000" })),
        !url && (h("circle", { r: radius - 2, fill: props.fill, "stroke-width": 2, stroke: "#fff" }))));
}
IroHandle.defaultProps = {
    fill: 'none',
    x: 0,
    y: 0,
    r: 8,
    url: null,
    props: { x: 0, y: 0 }
};

var HUE_STEPS = Array.apply(null, { length: 360 }).map(function (_, index) { return index; });
function IroWheel(props) {
    var activeColor = props.color;
    var hsv = activeColor.hsv;
    var borderWidth = props.borderWidth;
    var ref = k$1(props);
    var width = ref.width;
    var radius = ref.radius;
    var cx = ref.cx;
    var cy = ref.cy;
    var handlePositions = props.colors.map(function (color) { return F(props, color); });
    function handleInput(x, y, bounds, type) {
        // props.colors.length > 1 = the wheel uses multiple colors
        // in multi color mode, to start with we want to find the color that the user clicked
        if ((props.colors.length > 1) && (type === EventResult.start)) {
            var activeHandle = W(props, x - bounds.left, y - bounds.top, handlePositions);
            if (activeHandle !== null) {
                props.parent.setActiveColor(activeHandle);
                props.parent.inputActive = true;
                props.onInput(type);
            }
        }
        else {
            props.parent.inputActive = true;
            activeColor.hsv = j$1(props, x, y, bounds);
            props.onInput(type);
        }
    }
    return (h(IroComponentBase, Object.assign({}, props, { onInput: handleInput }), function (uid, rootProps, rootStyles) { return (h("svg", Object.assign({}, rootProps, { className: "IroWheel", width: width, height: width, style: rootStyles }),
        h("defs", null,
            h("radialGradient", { id: uid },
                h("stop", { offset: "0%", "stop-color": "#fff" }),
                h("stop", { offset: "100%", "stop-color": "#fff", "stop-opacity": "0" }))),
        h("g", { className: "IroWheelHue", "stroke-width": radius, fill: "none" }, HUE_STEPS.map(function (angle) { return (h("path", { key: angle, d: C$1(cx, cy, radius / 2, angle, angle + 1.5), stroke: ("hsl(" + ($$1(props, angle)) + ", 100%, 50%)") })); })),
        h("circle", { className: "IroWheelSaturation", cx: cx, cy: cy, r: radius, fill: ("url(" + (z$1('#' + uid)) + ")") }),
        props.wheelLightness && (h("circle", { className: "IroWheelLightness", cx: cx, cy: cy, r: radius, fill: "#000", opacity: 1 - hsv.v / 100 })),
        h("circle", { className: "IroWheelBorder", cx: cx, cy: cy, r: radius, fill: "none", stroke: props.borderColor, "stroke-width": borderWidth }),
        props.colors.filter(function (color) { return color !== activeColor; }).map(function (color) { return (h(IroHandle, { fill: color.hslString, r: props.handleRadius, url: props.handleSvg, props: props.handleProps, x: handlePositions[color.index].x, y: handlePositions[color.index].y })); }),
        h(IroHandle, { fill: activeColor.hslString, r: props.handleRadius, url: props.handleSvg, props: props.handleProps, x: handlePositions[activeColor.index].x, y: handlePositions[activeColor.index].y }))); }));
}

function IroSlider(props) {
    var activeColor = props.color;
    var ref = y$1(props);
    var width = ref.width;
    var height = ref.height;
    var radius = ref.radius;
    var handlePos = T$1(props, activeColor);
    var gradient = R(props, activeColor);
    var isAlpha = props.sliderType === 'alpha';
    function handleInput(x, y, bounds, type) {
        var value = M(props, x, y, bounds);
        props.parent.inputActive = true;
        activeColor[props.sliderType] = value;
        props.onInput(type);
    }
    return (h(IroComponentBase, Object.assign({}, props, { onInput: handleInput }), function (uid, rootProps, rootStyles) { return (h("svg", Object.assign({}, rootProps, { className: "IroSlider", width: width, height: height, style: Object.assign({}, rootStyles,
            m$1(props)) }),
        h("defs", null,
            h("linearGradient", Object.assign({ id: 'g' + uid }, A$1(props)), gradient.map(function (ref) {
                var offset = ref[0];
                var color = ref[1];

                return (h("stop", { offset: (offset + "%"), "stop-color": color }));
        })),
            isAlpha && (h("pattern", { id: 'b' + uid, width: "8", height: "8", patternUnits: "userSpaceOnUse" },
                h("rect", { x: "0", y: "0", width: "8", height: "8", fill: "#fff" }),
                h("rect", { x: "0", y: "0", width: "4", height: "4", fill: "#ccc" }),
                h("rect", { x: "4", y: "4", width: "4", height: "4", fill: "#ccc" }))),
            isAlpha && (h("pattern", { id: 'f' + uid, width: "100%", height: "100%" },
                h("rect", { x: "0", y: "0", width: "100%", height: "100%", fill: ("url(" + (z$1('#b' + uid)) + ")") }),
                " }",
                h("rect", { x: "0", y: "0", width: "100%", height: "100%", fill: ("url(" + (z$1('#g' + uid)) + ")") })))),
        h("rect", { className: "IroSliderBg", rx: radius, ry: radius, x: props.borderWidth / 2, y: props.borderWidth / 2, width: width - props.borderWidth, height: height - props.borderWidth, "stroke-width": props.borderWidth, stroke: props.borderColor, fill: ("url(" + (z$1((isAlpha ? '#f' : '#g') + uid)) + ")") }),
        h(IroHandle, { r: props.handleRadius, url: props.handleSvg, props: props.handleProps, x: handlePos.x, y: handlePos.y }))); }));
}
IroSlider.defaultProps = Object.assign({}, w$1);

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
        I(h(WidgetComponent, Object.assign({}, {ref: function (ref) { return widget = ref; }},
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
        this.deferredEvents = {};
        this.colorUpdateActive = false;
        this.emitHook('init:before');
        this.id = props.id;
        var colors = props.colors.length > 0 ? props.colors : [props.color];
        colors.forEach(function (colorValue) { return this$1.addColor(colorValue); });
        this.setActiveColor(0);
        // Pass all the props into the component's state,
        // Except we want to add the color object and make sure that refs aren't passed down to children
        this.state = Object.assign({}, props,
            {color: this.color,
            colors: this.colors,
            layout: props.layout !== null ? props.layout : [
                // default layout is just a wheel and a slider
                { component: IroWheel, options: {} },
                { component: IroSlider, options: {} } ]});
        this.emitHook('init:state');
        this.emitHook('init:after');
    }

    if ( Component ) IroColorPicker.__proto__ = Component;
    IroColorPicker.prototype = Object.create( Component && Component.prototype );
    IroColorPicker.prototype.constructor = IroColorPicker;
    // Plubic multicolor API
    IroColorPicker.prototype.addColor = function addColor (color, index) {
        if ( index === void 0 ) index = this.colors.length;

        // Create a new iro.Color
        // Also bind it to onColorChange, so whenever the color changes it updates the color picker
        var newColor = new p(color, this.onColorChange.bind(this));
        // Insert color @ the given index
        this.colors.splice(index, 0, newColor);
        // Reindex colors
        for (var i = 0; i < this.colors.length; i++)
            { this.colors[i].index = i; }
        // Update picker state if necessary
        if (this.state)
            { this.setState({ colors: this.colors }); }
        // Fire color init event
        this.deferredEmit('color:init', newColor);
    };
    IroColorPicker.prototype.removeColor = function removeColor (index) {
        var color = this.colors.splice(index, 1)[0];
        // Destroy the color object -- this unbinds it from the color picker
        color.unbind();
        // Reindex colors
        for (var i = 0; i < this.colors.length; i++)
            { this.colors[i].index = i; }
        // TODO: what happens if removed color is active?
        // Update picker state if necessary
        if (this.state)
            { this.setState({ colors: this.colors }); }
        // Fire color remove event
        this.emit('color:remove', color);
    };
    IroColorPicker.prototype.setActiveColor = function setActiveColor (index) {
        this.color = this.colors[index];
        if (this.state)
            { this.setState({ color: this.color }); }
        // Fire color switch event
        this.emit('color:setActive', this.color);
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
     * @param eventList - event(s) to listen to
     * @param callback - original callback function to remove
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
     * @param eventType event to emit
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
    IroColorPicker.prototype.updateOptions = function updateOptions (newOptions) {
        this.setState(Object.assign({}, this.state, newOptions));
    };
    /**
     * @desc Resize the color picker
     * @param width - new width
     */
    IroColorPicker.prototype.resize = function resize (width) {
        this.updateOptions({ width: width });
    };
    /**
     * @desc Reset the color picker to the initial color provided in the color picker options
     */
    IroColorPicker.prototype.reset = function reset () {
        this.colors.forEach(function (color) { return color.reset(); });
        this.setState({ colors: this.colors });
    };
    // Plugin hooks API
    /**
     * @desc Set a callback function for a hook
     * @param hookType - The name of the hook to listen to
     * @param callback
     */
    IroColorPicker.addHook = function addHook (hookType, callback) {
        var pluginHooks = IroColorPicker.pluginHooks;
        (pluginHooks[hookType] || (pluginHooks[hookType] = [])).push(callback);
    };
    /**
     * @desc Emit a callback hook
     * @param hookType - The type of hook event to emit
     */
    IroColorPicker.prototype.emitHook = function emitHook (hookType) {
        var args = [], len = arguments.length - 1;
        while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

        var callbackList = IroColorPicker.pluginHooks[hookType] || [];
        for (var i = 0; i < callbackList.length; i++) {
            callbackList[i].apply(this, args);
        }
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
        this.emitHook('color:beforeUpdate', color, changes);
        this.setState({ color: this.color });
        this.emitHook('color:afterUpdate', color, changes);
        // Prevent infinite loops if the color is set inside a color:change or input:change callback
        if (!this.colorUpdateActive) {
            // While _colorUpdateActive == true, branch cannot be entered
            this.colorUpdateActive = true;
            // If the color change originates from user input, fire input:change
            if (this.inputActive) {
                this.inputActive = false;
                this.emit('input:change', color, changes);
            }
            // Always fire color:change event
            this.emit('color:change', color, changes);
            this.colorUpdateActive = false;
        }
    };
    /**
     * @desc Handle input from a UI control element
     * @param type - event type
     */
    IroColorPicker.prototype.handleInput = function handleInput (type) {
        if (type === EventResult.start)
            { this.emit('input:start', this.color); }
        if (type === EventResult.move)
            { this.emit('input:move', this.color); }
        if (type === EventResult.end)
            { this.emit('input:end', this.color); }
    };
    IroColorPicker.prototype.render = function render (props, state) {
        var this$1 = this;

        return (h("div", { class: "IroColorPicker", id: state.id, style: {
                display: state.display
            } }, state.layout.map(function (ref) {
                var UiComponent = ref.component;
                var options = ref.options;

                return (h(UiComponent, Object.assign({}, state, options, { ref: undefined, onInput: this$1.handleInput.bind(this$1), parent: this$1 })));
        })));
    };

    return IroColorPicker;
}(m));
IroColorPicker.pluginHooks = {};
IroColorPicker.defaultProps = Object.assign({}, L,
    {colors: [],
    display: 'block',
    id: null,
    layout: null});
var IroColorPickerWidget = createWidget(IroColorPicker);

function IroBox(props) {
    var activeColor = props.color;
    var ref = O(props);
    var width = ref.width;
    var height = ref.height;
    var radius = ref.radius;
    var gradients = I$1(props, activeColor);
    var handlePositions = props.colors.map(function (color) { return H$1(props, color); });
    function handleInput(x, y, bounds, type) {
        // props.colors.length > 1 = the wheel uses multiple colors
        // in multi color mode, to start with we want to find the color that the user clicked
        if ((props.colors.length > 1) && (type === EventResult.start)) {
            var activeHandle = W(props, x - bounds.left, y - bounds.top, handlePositions);
            if (activeHandle !== null) {
                props.parent.setActiveColor(activeHandle);
                props.parent.inputActive = true;
                props.onInput(type);
            }
        }
        else {
            props.parent.inputActive = true;
            activeColor.hsv = D$1(props, x, y, bounds);
            props.onInput(type);
        }
    }
    return (h(IroComponentBase, Object.assign({}, props, { onInput: handleInput }), function (uid, rootProps, rootStyles) { return (h("svg", Object.assign({}, rootProps, { className: "IroBox", width: width, height: height, style: Object.assign({}, rootStyles,
            E(props)) }),
        h("defs", null,
            h("linearGradient", { id: 's' + uid, x1: "0%", y1: "0%", x2: "100%", y2: "0%" }, gradients[0].map(function (ref) {
                var offset = ref[0];
                var color = ref[1];

                return (h("stop", { offset: (offset + "%"), "stop-color": color }));
        })),
            h("linearGradient", { id: 'l' + uid, x1: "0%", y1: "0%", x2: "0%", y2: "100%" }, gradients[1].map(function (ref) {
                var offset = ref[0];
                var color = ref[1];

                return (h("stop", { offset: (offset + "%"), "stop-color": color }));
        })),
            h("pattern", { id: 'f' + uid, width: "100%", height: "100%" },
                h("rect", { x: "0", y: "0", width: "100%", height: "100%", fill: ("url(" + (z$1('#s' + uid)) + ")") }),
                " }",
                h("rect", { x: "0", y: "0", width: "100%", height: "100%", fill: ("url(" + (z$1('#l' + uid)) + ")") }))),
        h("rect", { rx: radius, ry: radius, x: props.borderWidth / 2, y: props.borderWidth / 2, width: width - props.borderWidth, height: height - props.borderWidth, "stroke-width": props.borderWidth, stroke: props.borderColor, fill: ("url(" + (z$1('#f' + uid)) + ")") }),
        props.colors.filter(function (color) { return color !== activeColor; }).map(function (color) { return (h(IroHandle, { fill: color.hslString, r: props.handleRadius, url: props.handleSvg, props: props.handleProps, x: handlePositions[color.index].x, y: handlePositions[color.index].y })); }),
        h(IroHandle, { fill: activeColor.hslString, r: props.handleRadius, url: props.handleSvg, props: props.handleProps, x: handlePositions[activeColor.index].x, y: handlePositions[activeColor.index].y }))); }));
}

// iro.js plugins API
// This provides the iro.use method, which can be used to register plugins which extend the iro.js core
function usePlugins(core) {
    var installedPlugins = [];
    // Register iro.js plugin
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
    Color: p,
    ColorPicker: IroColorPickerWidget,
    ui: {
        h: h,
        ComponentBase: IroComponentBase,
        Handle: IroHandle,
        Slider: IroSlider,
        Wheel: IroWheel,
        Box: IroBox,
    },
    version: "5.0.0-5",
});

export default index;
//# sourceMappingURL=iro.es.js.map
