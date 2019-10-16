/*!
 * iro.js v4.5.1
 * 2016-2019 James Daniel
 * Licensed under MPL 2.0
 * github.com/jaames/iro.js
 */

var n,u,t,i,r,o,f={},e=[],c=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|^--/i;function s(n,l){for(var u in l){ n[u]=l[u]; }return n}function a(n){var l=n.parentNode;l&&l.removeChild(n);}function h(n,l,u){var t,i,r,o,f=arguments;if(l=s({},l),arguments.length>3){ for(u=[u],t=3;t<arguments.length;t++){ u.push(f[t]); } }if(null!=u&&(l.children=u),null!=n&&null!=n.defaultProps){ for(i in n.defaultProps){ void 0===l[i]&&(l[i]=n.defaultProps[i]); } }return o=l.key,null!=(r=l.ref)&&delete l.ref,null!=o&&delete l.key,v(n,l,o,r)}function v(l,u,t,i){var r={type:l,props:u,key:t,ref:i,__k:null,__p:null,__b:0,__e:null,l:null,__c:null,constructor:void 0};return n.vnode&&n.vnode(r),r}function d(n){return n.children}function y(n){if(null==n||"boolean"==typeof n){ return null; }if("string"==typeof n||"number"==typeof n){ return v(null,n,null,null); }if(null!=n.__e||null!=n.__c){var l=v(n.type,n.props,n.key,null);return l.__e=n.__e,l}return n}function m(n,l){this.props=n,this.context=l;}function w(n,l){if(null==l){ return n.__p?w(n.__p,n.__p.__k.indexOf(n)+1):null; }for(var u;l<n.__k.length;l++){ if(null!=(u=n.__k[l])&&null!=u.__e){ return u.__e; } }return "function"==typeof n.type?w(n):null}function g(n){var l,u;if(null!=(n=n.__p)&&null!=n.__c){for(n.__e=n.__c.base=null,l=0;l<n.__k.length;l++){ if(null!=(u=n.__k[l])&&null!=u.__e){n.__e=n.__c.base=u.__e;break} }return g(n)}}function k(l){(!l.__d&&(l.__d=!0)&&1===u.push(l)||i!==n.debounceRendering)&&(i=n.debounceRendering,(n.debounceRendering||t)(_));}function _(){var n,l,t,i,r,o,f,e;for(u.sort(function(n,l){return l.__v.__b-n.__v.__b});n=u.pop();){ n.__d&&(t=void 0,i=void 0,o=(r=(l=n).__v).__e,f=l.__P,e=l.u,l.u=!1,f&&(t=[],i=$(f,r,s({},r),l.__n,void 0!==f.ownerSVGElement,null,t,e,null==o?w(r):o),j(t,r),i!=o&&g(r))); }}function b(n,l,u,t,i,r,o,c,s){var h,v,p,d,y,m,g,k=u&&u.__k||e,_=k.length;if(c==f&&(c=null!=r?r[0]:_?w(u,0):null),h=0,l.__k=x(l.__k,function(u){if(null!=u){if(u.__p=l,u.__b=l.__b+1,null===(p=k[h])||p&&u.key==p.key&&u.type===p.type){ k[h]=void 0; }else { for(v=0;v<_;v++){if((p=k[v])&&u.key==p.key&&u.type===p.type){k[v]=void 0;break}p=null;} }if(d=$(n,u,p=p||f,t,i,r,o,null,c,s),(v=u.ref)&&p.ref!=v&&(g||(g=[])).push(v,u.__c||d,u),null!=d){if(null==m&&(m=d),null!=u.l){ d=u.l,u.l=null; }else if(r==p||d!=c||null==d.parentNode){n:if(null==c||c.parentNode!==n){ n.appendChild(d); }else{for(y=c,v=0;(y=y.nextSibling)&&v<_;v+=2){ if(y==d){ break n; } }n.insertBefore(d,c);}"option"==l.type&&(n.value="");}c=d.nextSibling,"function"==typeof l.type&&(l.l=d);}}return h++,u}),l.__e=m,null!=r&&"function"!=typeof l.type){ for(h=r.length;h--;){ null!=r[h]&&a(r[h]); } }for(h=_;h--;){ null!=k[h]&&D(k[h],k[h]); }if(g){ for(h=0;h<g.length;h++){ A(g[h],g[++h],g[++h]); } }}function x(n,l,u){if(null==u&&(u=[]),null==n||"boolean"==typeof n){ l&&u.push(l(null)); }else if(Array.isArray(n)){ for(var t=0;t<n.length;t++){ x(n[t],l,u); } }else { u.push(l?l(y(n)):n); }return u}function C(n,l,u,t,i){var r;for(r in u){ r in l||N(n,r,null,u[r],t); }for(r in l){ i&&"function"!=typeof l[r]||"value"===r||"checked"===r||u[r]===l[r]||N(n,r,l[r],u[r],t); }}function P(n,l,u){"-"===l[0]?n.setProperty(l,u):n[l]="number"==typeof u&&!1===c.test(l)?u+"px":null==u?"":u;}function N(n,l,u,t,i){var r,o,f,e,c;if("key"===(l=i?"className"===l?"class":l:"class"===l?"className":l)||"children"===l);else if("style"===l){ if(r=n.style,"string"==typeof u){ r.cssText=u; }else{if("string"==typeof t&&(r.cssText="",t=null),t){ for(o in t){ u&&o in u||P(r,o,""); } }if(u){ for(f in u){ t&&u[f]===t[f]||P(r,f,u[f]); } }} }else{ "o"===l[0]&&"n"===l[1]?(e=l!==(l=l.replace(/Capture$/,"")),c=l.toLowerCase(),l=(c in n?c:l).slice(2),u?(t||n.addEventListener(l,T,e),(n.t||(n.t={}))[l]=u):n.removeEventListener(l,T,e)):"list"!==l&&"tagName"!==l&&"form"!==l&&!i&&l in n?n[l]=null==u?"":u:"function"!=typeof u&&"dangerouslySetInnerHTML"!==l&&(l!==(l=l.replace(/^xlink:?/,""))?null==u||!1===u?n.removeAttributeNS("http://www.w3.org/1999/xlink",l.toLowerCase()):n.setAttributeNS("http://www.w3.org/1999/xlink",l.toLowerCase(),u):null==u||!1===u?n.removeAttribute(l):n.setAttribute(l,u)); }}function T(l){return this.t[l.type](n.event?n.event(l):l)}function $(l,u,t,i,r,o,f,e,c,a){var h,v,p,y,w,g,k,_,C,P,N=u.type;if(void 0!==u.constructor){ return null; }(h=n.__b)&&h(u);try{n:if("function"==typeof N){if(_=u.props,C=(h=N.contextType)&&i[h.__c],P=h?C?C.props.value:h.__p:i,t.__c?k=(v=u.__c=t.__c).__p=v.__E:("prototype"in N&&N.prototype.render?u.__c=v=new N(_,P):(u.__c=v=new m(_,P),v.constructor=N,v.render=H),C&&C.sub(v),v.props=_,v.state||(v.state={}),v.context=P,v.__n=i,p=v.__d=!0,v.__h=[]),null==v.__s&&(v.__s=v.state),null!=N.getDerivedStateFromProps&&s(v.__s==v.state?v.__s=s({},v.__s):v.__s,N.getDerivedStateFromProps(_,v.__s)),p){ null==N.getDerivedStateFromProps&&null!=v.componentWillMount&&v.componentWillMount(),null!=v.componentDidMount&&f.push(v); }else{if(null==N.getDerivedStateFromProps&&null==e&&null!=v.componentWillReceiveProps&&v.componentWillReceiveProps(_,P),!e&&null!=v.shouldComponentUpdate&&!1===v.shouldComponentUpdate(_,v.__s,P)){for(v.props=_,v.state=v.__s,v.__d=!1,v.__v=u,u.__e=null!=c?c!==t.__e?c:t.__e:null,u.__k=t.__k,h=0;h<u.__k.length;h++){ u.__k[h]&&(u.__k[h].__p=u); }break n}null!=v.componentWillUpdate&&v.componentWillUpdate(_,v.__s,P);}for(y=v.props,w=v.state,v.context=P,v.props=_,v.state=v.__s,(h=n.__r)&&h(u),v.__d=!1,v.__v=u,v.__P=l,h=v.render(v.props,v.state,v.context),u.__k=x(null!=h&&h.type==d&&null==h.key?h.props.children:h),null!=v.getChildContext&&(i=s(s({},i),v.getChildContext())),p||null==v.getSnapshotBeforeUpdate||(g=v.getSnapshotBeforeUpdate(y,w)),b(l,u,t,i,r,o,f,c,a),v.base=u.__e;h=v.__h.pop();){ v.__s&&(v.state=v.__s),h.call(v); }p||null==y||null==v.componentDidUpdate||v.componentDidUpdate(y,w,g),k&&(v.__E=v.__p=null);}else { u.__e=z(t.__e,u,t,i,r,o,f,a); }(h=n.diffed)&&h(u);}catch(l){n.__e(l,u,t);}return u.__e}function j(l,u){for(var t;t=l.pop();){ try{t.componentDidMount();}catch(l){n.__e(l,t.__v);} }n.__c&&n.__c(u);}function z(n,l,u,t,i,r,o,c){var s,a,h,v,p=u.props,d=l.props;if(i="svg"===l.type||i,null==n&&null!=r){ for(s=0;s<r.length;s++){ if(null!=(a=r[s])&&(null===l.type?3===a.nodeType:a.localName===l.type)){n=a,r[s]=null;break} } }if(null==n){if(null===l.type){ return document.createTextNode(d); }n=i?document.createElementNS("http://www.w3.org/2000/svg",l.type):document.createElement(l.type),r=null;}return null===l.type?p!==d&&(null!=r&&(r[r.indexOf(n)]=null),n.data=d):l!==u&&(null!=r&&(r=e.slice.call(n.childNodes)),h=(p=u.props||f).dangerouslySetInnerHTML,v=d.dangerouslySetInnerHTML,c||(v||h)&&(v&&h&&v.__html==h.__html||(n.innerHTML=v&&v.__html||"")),C(n,d,p,i,c),l.__k=l.props.children,v||b(n,l,u,t,"foreignObject"!==l.type&&i,r,o,f,c),c||("value"in d&&void 0!==d.value&&d.value!==n.value&&(n.value=null==d.value?"":d.value),"checked"in d&&void 0!==d.checked&&d.checked!==n.checked&&(n.checked=d.checked))),n}function A(l,u,t){try{"function"==typeof l?l(u):l.current=u;}catch(l){n.__e(l,t);}}function D(l,u,t){var i,r,o;if(n.unmount&&n.unmount(l),(i=l.ref)&&A(i,null,u),t||"function"==typeof l.type||(t=null!=(r=l.__e)),l.__e=l.l=null,null!=(i=l.__c)){if(i.componentWillUnmount){ try{i.componentWillUnmount();}catch(l){n.__e(l,u);} }i.base=i.__P=null;}if(i=l.__k){ for(o=0;o<i.length;o++){ i[o]&&D(i[o],u,t); } }null!=r&&a(r);}function H(n,l,u){return this.constructor(n,u)}function I(l,u,t){var i,o,c;n.__p&&n.__p(l,u),o=(i=t===r)?null:t&&t.__k||u.__k,l=h(d,null,[l]),c=[],$(u,i?u.__k=l:(t||u).__k=l,o||f,f,void 0!==u.ownerSVGElement,t&&!i?[t]:o?null:e.slice.call(u.childNodes),c,!1,t||f,i),j(c,l);}n={},m.prototype.setState=function(n,l){var u=this.__s!==this.state&&this.__s||(this.__s=s({},this.state));("function"!=typeof n||(n=n(u,this.props)))&&s(u,n),null!=n&&this.__v&&(this.u=!1,l&&this.__h.push(l),k(this));},m.prototype.forceUpdate=function(n){this.__v&&(n&&this.__h.push(n),this.u=!0,k(this));},m.prototype.render=d,u=[],t="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,i=n.debounceRendering,n.__e=function(n,l,u){for(var t;l=l.__p;){ if((t=l.__c)&&!t.__p){ try{if(t.constructor&&null!=t.constructor.getDerivedStateFromError){ t.setState(t.constructor.getDerivedStateFromError(n)); }else{if(null==t.componentDidCatch){ continue; }t.componentDidCatch(n);}return k(t.__E=t)}catch(l){n=l;} } }throw n},r=f,o=0;

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

/**
 * @desc Resolve an SVG URL
 * This is required to work around how Safari handles gradient URLS under certain conditions
 * If a page is using a client-side routing library which makes use of the HTML <base> tag,
 * Safari won't be able to render SVG gradients properly (as they are referenced by URLs)
 * More info on the problem:
 * https://stackoverflow.com/questions/19742805/angular-and-svg-filters/19753427#19753427
 * https://github.com/jaames/iro.js/issues/18
 * https://github.com/jaames/iro.js/issues/45
 * @param {String} url resource url (should be an id selector e.g "#example")
 * @returns {String} resolved url
 */
function resolveUrl(url) {
    // Sniff useragent string to check if the user is running Safari
    var ua = window.navigator.userAgent;
    var isSafari = /^((?!chrome|android).)*safari/i.test(ua);
    var isIos = /iPhone|iPod|iPad/i.test(ua);
    var location = window.location;
    return (isSafari || isIos) ? ((location.protocol) + "//" + (location.host) + (location.pathname) + (location.search) + url) : url;
}
/**
 * @desc create the path commands to draw an svg arc
 * @param {Number} cx center point x
 * @param {Number} cy center point y
 * @param {Number} radius arc radius
 * @param {Number} startAngle arc start angle (degrees)
 * @param {Number} endAngle arc end angle (degrees)
 * @returns {String} arc path commands
 */
function createArcPath(cx, cy, radius, startAngle, endAngle) {
    var largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
    startAngle *= Math.PI / 180;
    endAngle *= Math.PI / 180;
    var x1 = cx + radius * Math.cos(endAngle);
    var y1 = cy + radius * Math.sin(endAngle);
    var x2 = cx + radius * Math.cos(startAngle);
    var y2 = cy + radius * Math.sin(startAngle);
    return ("M " + x1 + " " + y1 + " A " + radius + " " + radius + " 0 " + largeArcFlag + " 0 " + x2 + " " + y2);
}

function IroHandle(props) {
    var radius = props.r;
    var url = props.url;
    return (h("svg", { className: "iro__handle", x: props.x, y: props.y, style: { overflow: 'visible' } },
        url && (h("use", Object.assign({ xlinkHref: resolveUrl(url) }, props.origin))),
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

    IroWheel.prototype.transformAngle = function transformAngle (angle, handleFix) {
        var wheelAngle = this.props.wheelAngle;
        if (this.props.wheelDirection === 'clockwise') {
            // im sure this math could be simplified...
            angle = (-360 + angle - (handleFix ? -wheelAngle : wheelAngle));
        }
        else {
            angle = wheelAngle - angle;
        }
        // javascript's modulo operator doesn't produce positive numbers with negative input
        // https://dev.to/maurobringolf/a-neat-trick-to-compute-modulo-of-negative-numbers-111e
        return (angle % 360 + 360) % 360;
    };
    /**
      * @desc handles mouse input for this component
      * @param {Number} x - point x coordinate
      * @param {Number} y - point y coordinate
      * @param {DOMRect} rect - bounding client rect for the component's base element
      * @param {String} type - input type: "START", "MOVE" or "END"
    */
    IroWheel.prototype.handleInput = function handleInput (x$$1, y, bounds, type) {
        var left = bounds.left;
        var top = bounds.top;
        var props = this.props;
        var radius = props.width / 2;
        var handleRange = (radius - props.padding - props.handleRadius - props.borderWidth);
        var cX = radius;
        var cY = radius;
        x$$1 = cX - (x$$1 - left);
        y = cY - (y - top);
        var handleAngle = Math.atan2(y, x$$1);
        // Calculate the hue by converting the angle to radians
        var hue = this.transformAngle(Math.round(handleAngle * (180 / Math.PI)) + 180);
        // Find the point's distance from the center of the wheel
        // This is used to show the saturation level
        var handleDist = Math.min(Math.sqrt(x$$1 * x$$1 + y * y), handleRange);
        props.onInput(type, {
            h: hue,
            s: Math.round((100 / handleRange) * handleDist)
        });
    };
    IroWheel.prototype.render = function render (props) {
        var this$1 = this;

        var width = props.width;
        var borderWidth = props.borderWidth;
        var handleRadius = props.handleRadius;
        var hsv = props.color.hsv;
        var radius = (width / 2) - borderWidth;
        var handleAngle = this.transformAngle(hsv.h, true) * (Math.PI / 180);
        var handleDist = (hsv.s / 100) * (radius - props.padding - handleRadius - borderWidth);
        var cX = radius + borderWidth;
        var cY = radius + borderWidth;
        return (h("svg", { class: "iro__wheel", width: width, height: width, style: {
                overflow: 'visible',
                display: 'block'
            } },
            h("defs", null,
                h("radialGradient", { id: this.uid },
                    h("stop", { offset: "0%", "stop-color": "#fff" }),
                    h("stop", { offset: "100%", "stop-color": "#fff", "stop-opacity": "0" }))),
            h("g", { class: "iro__wheel__hue", "stroke-width": radius, fill: "none" }, HUE_STEPS.map(function (angle) { return (h("path", { key: angle, d: createArcPath(cX, cY, radius / 2, angle, angle + 1.5), stroke: ("hsl(" + (this$1.transformAngle(angle)) + ", 100%, 50%)") })); })),
            h("circle", { class: "iro__wheel__saturation", cx: cX, cy: cY, r: radius, fill: ("url(" + (resolveUrl('#' + this.uid)) + ")") }),
            props.wheelLightness && (h("circle", { class: "iro__wheel__lightness", cx: cX, cy: cY, r: radius, fill: "#000", opacity: 1 - hsv.v / 100 })),
            h("circle", { class: "iro__wheel__border", cx: cX, cy: cY, r: radius, fill: "none", stroke: props.borderColor, "stroke-width": borderWidth }),
            h(IroHandle, { r: handleRadius, url: props.handleSvg, origin: props.handleOrigin, x: cX + handleDist * Math.cos(handleAngle), y: cY + handleDist * Math.sin(handleAngle) })));
    };

    return IroWheel;
}(IroComponent));

/**
 * Parse a css unit string - either regular int or a percentage number
 */
function parseUnit(str, max) {
    var isPercentage = str.indexOf('%') > -1;
    var num = parseFloat(str);
    return isPercentage ? (max / 100) * num : num;
}
/**
 * Parse hex str to an int
 */
function parseHexInt(str) {
    return parseInt(str, 16);
}
/**
 * Convert into to 2-digit hex
 */
function intToHex(int) {
    return int.toString(16).padStart(2, '0');
}

// Some regular expressions for rgb() and hsl() Colors are borrowed from tinyColor
// https://github.com/bgrins/TinyColor
// https://www.w3.org/TR/css3-values/#integers
var CSS_INTEGER = "[-\\+]?\\d+%?";
// http://www.w3.org/TR/css3-values/#number-value
var CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?";
// Allow positive/negative integer/number. Don't capture the either/or, just the entire outcome
var CSS_UNIT = "(?:" + CSS_NUMBER + ")|(?:" + CSS_INTEGER + ")";
// Parse function params
// Parens and commas are optional, and this also allows for whitespace between numbers
var PERMISSIVE_MATCH_3 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
var PERMISSIVE_MATCH_4 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
// Regex patterns for functional colors
var REGEX_FUNCTIONAL_RGB = new RegExp(("rgb" + PERMISSIVE_MATCH_3));
var REGEX_FUNCTIONAL_RGBA = new RegExp(("rgba" + PERMISSIVE_MATCH_4));
var REGEX_FUNCTIONAL_HSL = new RegExp(("hsl" + PERMISSIVE_MATCH_3));
var REGEX_FUNCTIONAL_HSLA = new RegExp(("hsla" + PERMISSIVE_MATCH_4));
var HEX_START = "^(?:#?|0x?)";
var HEX_INT_SINGLE = "([0-9a-fA-F]{1})";
var HEX_INT_DOUBLE = "([0-9a-fA-F]{2})";
var REGEX_HEX_3 = new RegExp(("" + HEX_START + HEX_INT_SINGLE + HEX_INT_SINGLE + HEX_INT_SINGLE + "$"));
var REGEX_HEX_4 = new RegExp(("" + HEX_START + HEX_INT_SINGLE + HEX_INT_SINGLE + HEX_INT_SINGLE + HEX_INT_SINGLE + "$"));
var REGEX_HEX_6 = new RegExp(("" + HEX_START + HEX_INT_DOUBLE + HEX_INT_DOUBLE + HEX_INT_DOUBLE + "$"));
var REGEX_HEX_8 = new RegExp(("" + HEX_START + HEX_INT_DOUBLE + HEX_INT_DOUBLE + HEX_INT_DOUBLE + HEX_INT_DOUBLE + "$"));
function instanceOfHsv(value) {
    return ('h' in value) && ('s' in value) && ('v' in value);
}
function instanceOfRgb(value) {
    return ('r' in value) && ('g' in value) && ('b' in value);
}
function instanceOfHsl(value) {
    return ('h' in value) && ('s' in value) && ('l' in value);
}
var IroColor = function IroColor(value, onChange) {
    // The watch callback function for this Color will be stored here
    this.onChange = onChange;
    // The default Color value
    this.value = { h: 0, s: 0, v: 0, a: 1 };
    if (value)
        { this.set(value); }
};

var prototypeAccessors = { hsv: { configurable: true },rgb: { configurable: true },hsl: { configurable: true },rgbString: { configurable: true },hexString: { configurable: true },hslString: { configurable: true } };
/**
  * @desc set the Color from any valid value
  * @param {Object | String | IroColor} value - Color instance, object (hsv, hsl or rgb), string (hsl, rgb, hex)
*/
IroColor.prototype.set = function set (value) {
    var isString = typeof value === 'string';
    var isObject = typeof value === 'object';
    if ((isString) && (/^(?:#?|0x?)[0-9a-fA-F]{3,8}$/.test(value))) {
        this.hexString = value;
    }
    else if ((isString) && (/^rgba?/.test(value))) {
        this.rgbString = value;
    }
    else if ((isString) && (/^hsla?/.test(value))) {
        this.hslString = value;
    }
    else if ((isObject) && (value instanceof IroColor)) {
        this.hsv = value.hsv;
    }
    else if ((isObject) && instanceOfRgb(value)) {
        this.rgb = value;
    }
    else if ((isObject) && instanceOfHsv(value)) {
        this.hsv = value;
    }
    else if ((isObject) && instanceOfHsl(value)) {
        this.hsl = value;
    }
    else {
        throw new Error('invalid color value');
    }
};
/**
  * @desc shortcut to set a specific channel value
  * @param {String} format - hsv | hsl | rgb
  * @param {String} channel - individual channel to set, for example if model = hsl, chanel = h | s | l
  * @param {Number} value - new value for the channel
*/
IroColor.prototype.setChannel = function setChannel (format, channel, value) {
        var obj;

    this[format] = Object.assign({}, this[format], ( obj = {}, obj[channel] = value, obj ));
};
/**
  * @desc make new Color instance with the same value as this one
  * @return {IroColor}
*/
IroColor.prototype.clone = function clone () {
    return new IroColor(this);
};
/**
  * @desc convert hsv object to rgb
  * @param {Object} hsv hsv object
  * @return {Object} rgb object
*/
IroColor.hsvToRgb = function hsvToRgb (hsv) {
    var h = hsv.h / 60;
    var s = hsv.s / 100;
    var v = hsv.v / 100;
    var i = Math.floor(h);
    var f = h - i;
    var p = v * (1 - s);
    var q = v * (1 - f * s);
    var t = v * (1 - (1 - f) * s);
    var mod = i % 6;
    var r = [v, q, p, p, t, v][mod];
    var g = [t, v, v, q, p, p][mod];
    var b = [p, p, t, v, v, q][mod];
    return {
        r: r * 255,
        g: g * 255,
        b: b * 255
    };
};
/**
  * @desc convert rgb object to hsv
  * @param {Object} rgb - rgb object
  * @return {Object} hsv object
*/
IroColor.rgbToHsv = function rgbToHsv (rgb) {
    var r = rgb.r / 255;
    var g = rgb.g / 255;
    var b = rgb.b / 255;
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var delta = max - min;
    var hue;
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
        h: hue * 60,
        s: saturation * 100,
        v: value * 100
    };
};
/**
  * @desc convert hsv object to hsl
  * @param {Object} hsv - hsv object
  * @return {Object} hsl object
*/
IroColor.hsvToHsl = function hsvToHsl (hsv) {
    var s = hsv.s / 100;
    var v = hsv.v / 100;
    var l = (2 - s) * v;
    var divisor = l <= 1 ? l : (2 - l);
    // Avoid division by zero when lightness is close to zero
    var saturation = divisor < 1e-9 ? 0 : (s * v) / divisor;
    return {
        h: hsv.h,
        s: saturation * 100,
        l: l * 50
    };
};
/**
  * @desc convert hsl object to hsv
  * @param {Object} hsl - hsl object
  * @return {Object} hsv object
*/
IroColor.hslToHsv = function hslToHsv (hsl) {
    var l = hsl.l * 2;
    var s = (hsl.s * ((l <= 100) ? l : 200 - l)) / 100;
    // Avoid division by zero when l + s is near 0
    var saturation = (l + s < 1e-9) ? 0 : (2 * s) / (l + s);
    return {
        h: hsl.h,
        s: saturation * 100,
        v: (l + s) / 2
    };
};
prototypeAccessors.hsv.get = function () {
    // _value is cloned to allow changes to be made to the values before passing them back
    var value = this.value;
    return { h: value.h, s: value.s, v: value.v };
};
prototypeAccessors.hsv.set = function (newValue) {
    var oldValue = this.value;
    newValue = Object.assign({}, oldValue, newValue);
    // If this Color is being watched for changes we need to compare the new and old values to check the difference
    // Otherwise we can just be lazy
    if (this.onChange) {
        // Compute changed values
        var changes = {
            h: false,
            v: false,
            s: false
        };
        for (var key in oldValue) {
            changes[key] = newValue[key] != oldValue[key];
        }
        // Update the old value
        this.value = newValue;
        // If the value has changed, call hook callback
        if (changes.h || changes.s || changes.v || changes.a)
            { this.onChange(this, changes); }
    }
    else {
        this.value = newValue;
    }
};
prototypeAccessors.rgb.get = function () {
    var ref = IroColor.hsvToRgb(this.value);
        var r = ref.r;
        var g = ref.g;
        var b = ref.b;
    return {
        r: Math.round(r),
        g: Math.round(g),
        b: Math.round(b),
    };
};
prototypeAccessors.rgb.set = function (value) {
    this.hsv = Object.assign({}, IroColor.rgbToHsv(value));
};
prototypeAccessors.hsl.get = function () {
    var ref = IroColor.hsvToHsl(this.value);
        var h = ref.h;
        var s = ref.s;
        var l = ref.l;
    return {
        h: Math.round(h),
        s: Math.round(s),
        l: Math.round(l),
    };
};
prototypeAccessors.hsl.set = function (value) {
    this.hsv = Object.assign({}, IroColor.hslToHsv(value));
};
prototypeAccessors.rgbString.get = function () {
    var rgb = this.rgb;
    return ("rgb(" + (rgb.r) + ", " + (rgb.g) + ", " + (rgb.b) + ")");
};
prototypeAccessors.rgbString.set = function (value) {
    var match;
    var r, g, b, a = 1;
    if (match = REGEX_FUNCTIONAL_RGB.exec(value)) {
        r = parseUnit(match[1], 255);
        g = parseUnit(match[2], 255);
        b = parseUnit(match[3], 255);
    }
    else if (match = REGEX_FUNCTIONAL_RGBA.exec(value)) {
        r = parseUnit(match[1], 255);
        g = parseUnit(match[2], 255);
        b = parseUnit(match[3], 255);
        a = parseUnit(match[4], 1);
    }
    if (match) {
        this.rgb = { r: r, g: g, b: b, a: a };
    }
    else {
        throw new Error('invalid rgb string');
    }
};
prototypeAccessors.hexString.get = function () {
    var rgb = this.rgb;
    return ("#" + (intToHex(rgb.r)) + (intToHex(rgb.g)) + (intToHex(rgb.b)));
};
prototypeAccessors.hexString.set = function (value) {
    var match;
    var r, g, b, a = 255;
    if (match = REGEX_HEX_3.exec(value)) {
        r = parseHexInt(match[1]) * 17;
        g = parseHexInt(match[2]) * 17;
        b = parseHexInt(match[3]) * 17;
    }
    else if (match = REGEX_HEX_4.exec(value)) {
        r = parseHexInt(match[1]) * 17;
        g = parseHexInt(match[2]) * 17;
        b = parseHexInt(match[3]) * 17;
        a = parseHexInt(match[4]) * 17;
    }
    else if (match = REGEX_HEX_6.exec(value)) {
        r = parseHexInt(match[1]);
        g = parseHexInt(match[2]);
        b = parseHexInt(match[3]);
    }
    else if (match = REGEX_HEX_8.exec(value)) {
        r = parseHexInt(match[1]);
        g = parseHexInt(match[2]);
        b = parseHexInt(match[3]);
        a = parseHexInt(match[4]);
    }
    if (match) {
        this.rgb = { r: r, g: g, b: b, a: a / 255 };
    }
    else {
        throw new Error('invalid hex string');
    }
};
prototypeAccessors.hslString.get = function () {
    var hsl = this.hsl;
    return ("hsl(" + (hsl.h) + ", " + (hsl.s) + "%, " + (hsl.l) + "%)");
};
prototypeAccessors.hslString.set = function (value) {
    var match;
    var h, s, l, a = 1;
    if (match = REGEX_FUNCTIONAL_HSL.exec(value)) {
        h = parseUnit(match[1], 360);
        s = parseUnit(match[2], 100);
        l = parseUnit(match[3], 100);
    }
    else if (match = REGEX_FUNCTIONAL_HSLA.exec(value)) {
        h = parseUnit(match[1], 360);
        s = parseUnit(match[2], 100);
        l = parseUnit(match[3], 100);
        a = parseUnit(match[4], 1);
    }
    if (match) {
        this.hsl = { h: h, s: s, l: l, a: a };
    }
    else {
        throw new Error('invalid hsl string');
    }
};

Object.defineProperties( IroColor.prototype, prototypeAccessors );

function getRect(props) {
    var width = props.width;
    var sliderHeight = props.sliderHeight;
    var borderWidth = props.borderWidth;
    var handleRadius = props.handleRadius;
    sliderHeight = sliderHeight ? sliderHeight : props.padding * 2 + handleRadius * 2 + borderWidth * 2;
    return {
        radius: sliderHeight / 2,
        x: 0,
        y: 0,
        width: width,
        height: sliderHeight,
    };
}
function getValue(props) {
    var hsv = props.color.hsv;
    switch (props.sliderType) {
        case 'hue':
            return hsv.h /= 3.6;
        case 'saturation':
            return hsv.s;
        case 'value':
        default:
            return hsv.v;
    }
}
function getValueFromInput(x, y, bounds) {
    var handleRange = bounds.width - bounds.height;
    var cornerRadius = bounds.height / 2;
    x = x - (bounds.left + cornerRadius);
    var dist = Math.max(Math.min(x, handleRange), 0);
    return Math.round((100 / handleRange) * dist);
}
function getHandlePosition(props) {
    var ref = getRect(props);
    var width = ref.width;
    var height = ref.height;
    var radius = ref.radius;
    var sliderValue = getValue(props);
    var handleRange = width - radius * 2;
    var x = radius + (sliderValue / 100) * handleRange;
    var y = height / 2;
    return { x: x, y: y };
}
function getGradientStops(props) {
    var hsv = props.color.hsv;
    switch (props.sliderType) {
        case 'hue':
            return [
                { offset: '0', color: '#f00' },
                { offset: '16.666', color: '#ff0' },
                { offset: '33.333', color: '#0f0' },
                { offset: '50', color: '#0ff' },
                { offset: '66.666', color: '#00f' },
                { offset: '83.333', color: '#f0f' },
                { offset: '100', color: '#f00' } ];
        case 'saturation':
            var noSat = IroColor.hsvToHsl({ h: hsv.h, s: 0, v: hsv.v });
            var fullSat = IroColor.hsvToHsl({ h: hsv.h, s: 100, v: hsv.v });
            return [
                { offset: '0', color: ("hsl(" + (noSat.h) + ", " + (noSat.s) + "%, " + (noSat.l) + "%)") },
                { offset: '100', color: ("hsl(" + (fullSat.h) + ", " + (fullSat.s) + "%, " + (fullSat.l) + "%)") }
            ];
        case 'value':
        default:
            var hsl = IroColor.hsvToHsl({ h: hsv.h, s: hsv.s, v: 100 });
            return [
                { offset: '0', color: '#000' },
                { offset: '100', color: ("hsl(" + (hsl.h) + ", " + (hsl.s) + "%, " + (hsl.l) + "%)") }
            ];
    }
}

var IroSlider = /*@__PURE__*/(function (IroComponent$$1) {
    function IroSlider () {
        IroComponent$$1.apply(this, arguments);
    }

    if ( IroComponent$$1 ) IroSlider.__proto__ = IroComponent$$1;
    IroSlider.prototype = Object.create( IroComponent$$1 && IroComponent$$1.prototype );
    IroSlider.prototype.constructor = IroSlider;

    IroSlider.prototype.render = function render (props) {
        var ref = getRect(props);
        var width = ref.width;
        var height = ref.height;
        var radius = ref.radius;
        var handlePos = getHandlePosition(props);
        var gradient = getGradientStops(props);
        return (h("svg", { className: "iro__slider", width: width, height: height, style: {
                marginTop: props.sliderMargin,
                overflow: 'visible',
                display: 'block'
            } },
            h("defs", null,
                h("linearGradient", { id: this.uid }, gradient.map(function (stop) { return (h("stop", { offset: ((stop.offset) + "%"), "stop-color": stop.color })); }))),
            h("rect", { className: "iro__slider__value", rx: radius, ry: radius, x: props.borderWidth / 2, y: props.borderWidth / 2, width: width - props.borderWidth, height: height - props.borderWidth, "stroke-width": props.borderWidth, stroke: props.borderColor, fill: ("url(" + (resolveUrl('#' + this.uid)) + ")") }),
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

        var value = getValueFromInput(x$$1, y, bounds);
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
        this.color = new IroColor(props.color);
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
    Color: IroColor,
    ColorPicker: IroColorPickerWidget,
    ui: {
        h: h,
        Component: IroComponent,
        Handle: IroHandle,
        Slider: IroSlider,
        Wheel: IroWheel,
    },
    util: {
        resolveUrl: resolveUrl,
        createArcPath: createArcPath,
        parseUnit: parseUnit,
        parseHexInt: parseHexInt,
        intToHex: intToHex
    },
    version: "4.5.1",
});

export default index;
//# sourceMappingURL=iro.es.js.map
