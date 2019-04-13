/*!
 * iro.js v4.3.3
 * 2016-2019 James Daniel
 * Licensed under MPL 2.0
 * github.com/jaames/iro.js
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.iro = factory());
}(this, (function () { 'use strict';

	var VNode = function VNode() {};

	var options = {};

	var stack = [];

	var EMPTY_CHILDREN = [];

	function h(nodeName, attributes) {
		var arguments$1 = arguments;

		var children = EMPTY_CHILDREN,
		    lastSimple,
		    child,
		    simple,
		    i;
		for (i = arguments.length; i-- > 2;) {
			stack.push(arguments$1[i]);
		}
		if (attributes && attributes.children != null) {
			if (!stack.length) { stack.push(attributes.children); }
			delete attributes.children;
		}
		while (stack.length) {
			if ((child = stack.pop()) && child.pop !== undefined) {
				for (i = child.length; i--;) {
					stack.push(child[i]);
				}
			} else {
				if (typeof child === 'boolean') { child = null; }

				if (simple = typeof nodeName !== 'function') {
					if (child == null) { child = ''; }else if (typeof child === 'number') { child = String(child); }else if (typeof child !== 'string') { simple = false; }
				}

				if (simple && lastSimple) {
					children[children.length - 1] += child;
				} else if (children === EMPTY_CHILDREN) {
					children = [child];
				} else {
					children.push(child);
				}

				lastSimple = simple;
			}
		}

		var p = new VNode();
		p.nodeName = nodeName;
		p.children = children;
		p.attributes = attributes == null ? undefined : attributes;
		p.key = attributes == null ? undefined : attributes.key;

		return p;
	}

	function extend(obj, props) {
	  for (var i in props) {
	    obj[i] = props[i];
	  }return obj;
	}

	function applyRef(ref, value) {
	  if (ref != null) {
	    if (typeof ref == 'function') { ref(value); }else { ref.current = value; }
	  }
	}

	var defer = typeof Promise == 'function' ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout;

	var IS_NON_DIMENSIONAL = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i;

	var items = [];

	function enqueueRender(component) {
		if (!component._dirty && (component._dirty = true) && items.push(component) == 1) {
			(defer)(rerender);
		}
	}

	function rerender() {
		var p;
		while (p = items.pop()) {
			if (p._dirty) { renderComponent(p); }
		}
	}

	function isSameNodeType(node, vnode, hydrating) {
		if (typeof vnode === 'string' || typeof vnode === 'number') {
			return node.splitText !== undefined;
		}
		if (typeof vnode.nodeName === 'string') {
			return !node._componentConstructor && isNamedNode(node, vnode.nodeName);
		}
		return hydrating || node._componentConstructor === vnode.nodeName;
	}

	function isNamedNode(node, nodeName) {
		return node.normalizedNodeName === nodeName || node.nodeName.toLowerCase() === nodeName.toLowerCase();
	}

	function getNodeProps(vnode) {
		var props = extend({}, vnode.attributes);
		props.children = vnode.children;

		var defaultProps = vnode.nodeName.defaultProps;
		if (defaultProps !== undefined) {
			for (var i in defaultProps) {
				if (props[i] === undefined) {
					props[i] = defaultProps[i];
				}
			}
		}

		return props;
	}

	function createNode(nodeName, isSvg) {
		var node = isSvg ? document.createElementNS('http://www.w3.org/2000/svg', nodeName) : document.createElement(nodeName);
		node.normalizedNodeName = nodeName;
		return node;
	}

	function removeNode(node) {
		var parentNode = node.parentNode;
		if (parentNode) { parentNode.removeChild(node); }
	}

	function setAccessor(node, name, old, value, isSvg) {
		if (name === 'className') { name = 'class'; }

		if (name === 'key') ; else if (name === 'ref') {
			applyRef(old, null);
			applyRef(value, node);
		} else if (name === 'class' && !isSvg) {
			node.className = value || '';
		} else if (name === 'style') {
			if (!value || typeof value === 'string' || typeof old === 'string') {
				node.style.cssText = value || '';
			}
			if (value && typeof value === 'object') {
				if (typeof old !== 'string') {
					for (var i in old) {
						if (!(i in value)) { node.style[i] = ''; }
					}
				}
				for (var i in value) {
					node.style[i] = typeof value[i] === 'number' && IS_NON_DIMENSIONAL.test(i) === false ? value[i] + 'px' : value[i];
				}
			}
		} else if (name === 'dangerouslySetInnerHTML') {
			if (value) { node.innerHTML = value.__html || ''; }
		} else if (name[0] == 'o' && name[1] == 'n') {
			var useCapture = name !== (name = name.replace(/Capture$/, ''));
			name = name.toLowerCase().substring(2);
			if (value) {
				if (!old) { node.addEventListener(name, eventProxy, useCapture); }
			} else {
				node.removeEventListener(name, eventProxy, useCapture);
			}
			(node._listeners || (node._listeners = {}))[name] = value;
		} else if (name !== 'list' && name !== 'type' && !isSvg && name in node) {
			try {
				node[name] = value == null ? '' : value;
			} catch (e) {}
			if ((value == null || value === false) && name != 'spellcheck') { node.removeAttribute(name); }
		} else {
			var ns = isSvg && name !== (name = name.replace(/^xlink:?/, ''));

			if (value == null || value === false) {
				if (ns) { node.removeAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase()); }else { node.removeAttribute(name); }
			} else if (typeof value !== 'function') {
				if (ns) { node.setAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase(), value); }else { node.setAttribute(name, value); }
			}
		}
	}

	function eventProxy(e) {
		return this._listeners[e.type](e);
	}

	var mounts = [];

	var diffLevel = 0;

	var isSvgMode = false;

	var hydrating = false;

	function flushMounts() {
		var c;
		while (c = mounts.shift()) {
			if (c.componentDidMount) { c.componentDidMount(); }
		}
	}

	function diff(dom, vnode, context, mountAll, parent, componentRoot) {
		if (!diffLevel++) {
			isSvgMode = parent != null && parent.ownerSVGElement !== undefined;

			hydrating = dom != null && !('__preactattr_' in dom);
		}

		var ret = idiff(dom, vnode, context, mountAll, componentRoot);

		if (parent && ret.parentNode !== parent) { parent.appendChild(ret); }

		if (! --diffLevel) {
			hydrating = false;

			if (!componentRoot) { flushMounts(); }
		}

		return ret;
	}

	function idiff(dom, vnode, context, mountAll, componentRoot) {
		var out = dom,
		    prevSvgMode = isSvgMode;

		if (vnode == null || typeof vnode === 'boolean') { vnode = ''; }

		if (typeof vnode === 'string' || typeof vnode === 'number') {
			if (dom && dom.splitText !== undefined && dom.parentNode && (!dom._component || componentRoot)) {
				if (dom.nodeValue != vnode) {
					dom.nodeValue = vnode;
				}
			} else {
				out = document.createTextNode(vnode);
				if (dom) {
					if (dom.parentNode) { dom.parentNode.replaceChild(out, dom); }
					recollectNodeTree(dom, true);
				}
			}

			out['__preactattr_'] = true;

			return out;
		}

		var vnodeName = vnode.nodeName;
		if (typeof vnodeName === 'function') {
			return buildComponentFromVNode(dom, vnode, context, mountAll);
		}

		isSvgMode = vnodeName === 'svg' ? true : vnodeName === 'foreignObject' ? false : isSvgMode;

		vnodeName = String(vnodeName);
		if (!dom || !isNamedNode(dom, vnodeName)) {
			out = createNode(vnodeName, isSvgMode);

			if (dom) {
				while (dom.firstChild) {
					out.appendChild(dom.firstChild);
				}
				if (dom.parentNode) { dom.parentNode.replaceChild(out, dom); }

				recollectNodeTree(dom, true);
			}
		}

		var fc = out.firstChild,
		    props = out['__preactattr_'],
		    vchildren = vnode.children;

		if (props == null) {
			props = out['__preactattr_'] = {};
			for (var a = out.attributes, i = a.length; i--;) {
				props[a[i].name] = a[i].value;
			}
		}

		if (!hydrating && vchildren && vchildren.length === 1 && typeof vchildren[0] === 'string' && fc != null && fc.splitText !== undefined && fc.nextSibling == null) {
			if (fc.nodeValue != vchildren[0]) {
				fc.nodeValue = vchildren[0];
			}
		} else if (vchildren && vchildren.length || fc != null) {
				innerDiffNode(out, vchildren, context, mountAll, hydrating || props.dangerouslySetInnerHTML != null);
			}

		diffAttributes(out, vnode.attributes, props);

		isSvgMode = prevSvgMode;

		return out;
	}

	function innerDiffNode(dom, vchildren, context, mountAll, isHydrating) {
		var originalChildren = dom.childNodes,
		    children = [],
		    keyed = {},
		    keyedLen = 0,
		    min = 0,
		    len = originalChildren.length,
		    childrenLen = 0,
		    vlen = vchildren ? vchildren.length : 0,
		    j,
		    c,
		    f,
		    vchild,
		    child;

		if (len !== 0) {
			for (var i = 0; i < len; i++) {
				var _child = originalChildren[i],
				    props = _child['__preactattr_'],
				    key = vlen && props ? _child._component ? _child._component.__key : props.key : null;
				if (key != null) {
					keyedLen++;
					keyed[key] = _child;
				} else if (props || (_child.splitText !== undefined ? isHydrating ? _child.nodeValue.trim() : true : isHydrating)) {
					children[childrenLen++] = _child;
				}
			}
		}

		if (vlen !== 0) {
			for (var i = 0; i < vlen; i++) {
				vchild = vchildren[i];
				child = null;

				var key = vchild.key;
				if (key != null) {
					if (keyedLen && keyed[key] !== undefined) {
						child = keyed[key];
						keyed[key] = undefined;
						keyedLen--;
					}
				} else if (min < childrenLen) {
						for (j = min; j < childrenLen; j++) {
							if (children[j] !== undefined && isSameNodeType(c = children[j], vchild, isHydrating)) {
								child = c;
								children[j] = undefined;
								if (j === childrenLen - 1) { childrenLen--; }
								if (j === min) { min++; }
								break;
							}
						}
					}

				child = idiff(child, vchild, context, mountAll);

				f = originalChildren[i];
				if (child && child !== dom && child !== f) {
					if (f == null) {
						dom.appendChild(child);
					} else if (child === f.nextSibling) {
						removeNode(f);
					} else {
						dom.insertBefore(child, f);
					}
				}
			}
		}

		if (keyedLen) {
			for (var i in keyed) {
				if (keyed[i] !== undefined) { recollectNodeTree(keyed[i], false); }
			}
		}

		while (min <= childrenLen) {
			if ((child = children[childrenLen--]) !== undefined) { recollectNodeTree(child, false); }
		}
	}

	function recollectNodeTree(node, unmountOnly) {
		var component = node._component;
		if (component) {
			unmountComponent(component);
		} else {
			if (node['__preactattr_'] != null) { applyRef(node['__preactattr_'].ref, null); }

			if (unmountOnly === false || node['__preactattr_'] == null) {
				removeNode(node);
			}

			removeChildren(node);
		}
	}

	function removeChildren(node) {
		node = node.lastChild;
		while (node) {
			var next = node.previousSibling;
			recollectNodeTree(node, true);
			node = next;
		}
	}

	function diffAttributes(dom, attrs, old) {
		var name;

		for (name in old) {
			if (!(attrs && attrs[name] != null) && old[name] != null) {
				setAccessor(dom, name, old[name], old[name] = undefined, isSvgMode);
			}
		}

		for (name in attrs) {
			if (name !== 'children' && name !== 'innerHTML' && (!(name in old) || attrs[name] !== (name === 'value' || name === 'checked' ? dom[name] : old[name]))) {
				setAccessor(dom, name, old[name], old[name] = attrs[name], isSvgMode);
			}
		}
	}

	var recyclerComponents = [];

	function createComponent(Ctor, props, context) {
		var inst,
		    i = recyclerComponents.length;

		if (Ctor.prototype && Ctor.prototype.render) {
			inst = new Ctor(props, context);
			Component.call(inst, props, context);
		} else {
			inst = new Component(props, context);
			inst.constructor = Ctor;
			inst.render = doRender;
		}

		while (i--) {
			if (recyclerComponents[i].constructor === Ctor) {
				inst.nextBase = recyclerComponents[i].nextBase;
				recyclerComponents.splice(i, 1);
				return inst;
			}
		}

		return inst;
	}

	function doRender(props, state, context) {
		return this.constructor(props, context);
	}

	function setComponentProps(component, props, renderMode, context, mountAll) {
		if (component._disable) { return; }
		component._disable = true;

		component.__ref = props.ref;
		component.__key = props.key;
		delete props.ref;
		delete props.key;

		if (typeof component.constructor.getDerivedStateFromProps === 'undefined') {
			if (!component.base || mountAll) {
				if (component.componentWillMount) { component.componentWillMount(); }
			} else if (component.componentWillReceiveProps) {
				component.componentWillReceiveProps(props, context);
			}
		}

		if (context && context !== component.context) {
			if (!component.prevContext) { component.prevContext = component.context; }
			component.context = context;
		}

		if (!component.prevProps) { component.prevProps = component.props; }
		component.props = props;

		component._disable = false;

		if (renderMode !== 0) {
			if (renderMode === 1 || options.syncComponentUpdates !== false || !component.base) {
				renderComponent(component, 1, mountAll);
			} else {
				enqueueRender(component);
			}
		}

		applyRef(component.__ref, component);
	}

	function renderComponent(component, renderMode, mountAll, isChild) {
		if (component._disable) { return; }

		var props = component.props,
		    state = component.state,
		    context = component.context,
		    previousProps = component.prevProps || props,
		    previousState = component.prevState || state,
		    previousContext = component.prevContext || context,
		    isUpdate = component.base,
		    nextBase = component.nextBase,
		    initialBase = isUpdate || nextBase,
		    initialChildComponent = component._component,
		    skip = false,
		    snapshot = previousContext,
		    rendered,
		    inst,
		    cbase;

		if (component.constructor.getDerivedStateFromProps) {
			state = extend(extend({}, state), component.constructor.getDerivedStateFromProps(props, state));
			component.state = state;
		}

		if (isUpdate) {
			component.props = previousProps;
			component.state = previousState;
			component.context = previousContext;
			if (renderMode !== 2 && component.shouldComponentUpdate && component.shouldComponentUpdate(props, state, context) === false) {
				skip = true;
			} else if (component.componentWillUpdate) {
				component.componentWillUpdate(props, state, context);
			}
			component.props = props;
			component.state = state;
			component.context = context;
		}

		component.prevProps = component.prevState = component.prevContext = component.nextBase = null;
		component._dirty = false;

		if (!skip) {
			rendered = component.render(props, state, context);

			if (component.getChildContext) {
				context = extend(extend({}, context), component.getChildContext());
			}

			if (isUpdate && component.getSnapshotBeforeUpdate) {
				snapshot = component.getSnapshotBeforeUpdate(previousProps, previousState);
			}

			var childComponent = rendered && rendered.nodeName,
			    toUnmount,
			    base;

			if (typeof childComponent === 'function') {

				var childProps = getNodeProps(rendered);
				inst = initialChildComponent;

				if (inst && inst.constructor === childComponent && childProps.key == inst.__key) {
					setComponentProps(inst, childProps, 1, context, false);
				} else {
					toUnmount = inst;

					component._component = inst = createComponent(childComponent, childProps, context);
					inst.nextBase = inst.nextBase || nextBase;
					inst._parentComponent = component;
					setComponentProps(inst, childProps, 0, context, false);
					renderComponent(inst, 1, mountAll, true);
				}

				base = inst.base;
			} else {
				cbase = initialBase;

				toUnmount = initialChildComponent;
				if (toUnmount) {
					cbase = component._component = null;
				}

				if (initialBase || renderMode === 1) {
					if (cbase) { cbase._component = null; }
					base = diff(cbase, rendered, context, mountAll || !isUpdate, initialBase && initialBase.parentNode, true);
				}
			}

			if (initialBase && base !== initialBase && inst !== initialChildComponent) {
				var baseParent = initialBase.parentNode;
				if (baseParent && base !== baseParent) {
					baseParent.replaceChild(base, initialBase);

					if (!toUnmount) {
						initialBase._component = null;
						recollectNodeTree(initialBase, false);
					}
				}
			}

			if (toUnmount) {
				unmountComponent(toUnmount);
			}

			component.base = base;
			if (base && !isChild) {
				var componentRef = component,
				    t = component;
				while (t = t._parentComponent) {
					(componentRef = t).base = base;
				}
				base._component = componentRef;
				base._componentConstructor = componentRef.constructor;
			}
		}

		if (!isUpdate || mountAll) {
			mounts.push(component);
		} else if (!skip) {

			if (component.componentDidUpdate) {
				component.componentDidUpdate(previousProps, previousState, snapshot);
			}
		}

		while (component._renderCallbacks.length) {
			component._renderCallbacks.pop().call(component);
		}if (!diffLevel && !isChild) { flushMounts(); }
	}

	function buildComponentFromVNode(dom, vnode, context, mountAll) {
		var c = dom && dom._component,
		    originalComponent = c,
		    oldDom = dom,
		    isDirectOwner = c && dom._componentConstructor === vnode.nodeName,
		    isOwner = isDirectOwner,
		    props = getNodeProps(vnode);
		while (c && !isOwner && (c = c._parentComponent)) {
			isOwner = c.constructor === vnode.nodeName;
		}

		if (c && isOwner && (!mountAll || c._component)) {
			setComponentProps(c, props, 3, context, mountAll);
			dom = c.base;
		} else {
			if (originalComponent && !isDirectOwner) {
				unmountComponent(originalComponent);
				dom = oldDom = null;
			}

			c = createComponent(vnode.nodeName, props, context);
			if (dom && !c.nextBase) {
				c.nextBase = dom;

				oldDom = null;
			}
			setComponentProps(c, props, 1, context, mountAll);
			dom = c.base;

			if (oldDom && dom !== oldDom) {
				oldDom._component = null;
				recollectNodeTree(oldDom, false);
			}
		}

		return dom;
	}

	function unmountComponent(component) {

		var base = component.base;

		component._disable = true;

		if (component.componentWillUnmount) { component.componentWillUnmount(); }

		component.base = null;

		var inner = component._component;
		if (inner) {
			unmountComponent(inner);
		} else if (base) {
			if (base['__preactattr_'] != null) { applyRef(base['__preactattr_'].ref, null); }

			component.nextBase = base;

			removeNode(base);
			recyclerComponents.push(component);

			removeChildren(base);
		}

		applyRef(component.__ref, null);
	}

	function Component(props, context) {
		this._dirty = true;

		this.context = context;

		this.props = props;

		this.state = this.state || {};

		this._renderCallbacks = [];
	}

	extend(Component.prototype, {
		setState: function setState(state, callback) {
			if (!this.prevState) { this.prevState = this.state; }
			this.state = extend(extend({}, this.state), typeof state === 'function' ? state(this.state, this.props) : state);
			if (callback) { this._renderCallbacks.push(callback); }
			enqueueRender(this);
		},
		forceUpdate: function forceUpdate(callback) {
			if (callback) { this._renderCallbacks.push(callback); }
			renderComponent(this, 2);
		},
		render: function render() {}
	});

	function render(vnode, parent, merge) {
	  return diff(merge, vnode, {}, false, parent, false);
	}

	/**
	 * @desc listen to one or more events on an element
	 * @param {Element} el target element
	 * @param {Array} eventList the events to listen to
	 * @param {Function} callback
	 * @param {Object} params params to pass to addEventListener
	 */
	function listen(el, eventList, callback, params) {
	  if ( params === void 0 ) params={};

	  for (var i = 0; i < eventList.length; i++) {
	    el.addEventListener(eventList[i], callback, params);
	  }
	}
	/**
	 * @desc remove an event listener on an element
	 * @param {Element} el target element
	 * @param {Array} eventList the events to remove
	 * @param {Function} callback
	 * @param {Object} params params to pass to removeEventListener
	 */
	function unlisten(el, eventList, callback, params) {
	  if ( params === void 0 ) params={};

	  for (var i = 0; i < eventList.length; i++) {
	    el.removeEventListener(eventList[i], callback, params);
	  }
	}
	/**
	 * @desc call fn callback when the page document has fully loaded
	 * @param {Function} callback
	 */
	function onDocumentReady(callback) {
	  if (document.readyState !== 'loading') {
	    callback();
	  } else {
	    listen(document, ['DOMContentLoaded'], callback);
	  }
	}

	var EVENT_MOUSEDOWN = 'mousedown';
	var EVENT_MOUSEMOVE = 'mousemove';
	var EVENT_MOUSEUP = 'mouseup';
	var EVENT_TOUCHSTART = 'touchstart';
	var EVENT_TOUCHMOVE = 'touchmove';
	var EVENT_TOUCHEND = 'touchend';

	/**
	 * Base component class for iro UI components
	 * This extends the Preact component class to allow them to react to mouse/touch input events by themselves
	 */
	var IroComponent = /*@__PURE__*/(function (Component$$1) {
	  function IroComponent(props) {
	    Component$$1.call(this, props);
	    // Generate unique ID for the component
	    // This can be used to generate unique IDs for gradients, etc
	    this.uid = (Math.random() + 1).toString(36).substring(5);
	  }

	  if ( Component$$1 ) IroComponent.__proto__ = Component$$1;
	  IroComponent.prototype = Object.create( Component$$1 && Component$$1.prototype );
	  IroComponent.prototype.constructor = IroComponent;
	  
	  IroComponent.prototype.componentDidMount = function componentDidMount () {
	    listen(this.base, [EVENT_MOUSEDOWN, EVENT_TOUCHSTART], this, { passive: false });
	  };

	  IroComponent.prototype.componentWillUnmount = function componentWillUnmount () {
	    unlisten(this.base, [EVENT_MOUSEDOWN, EVENT_TOUCHSTART], this);
	  };

	  // More info on handleEvent:
	  // http://download-cdn.miitomo.com/native/20180125111639/manifests/v2_20180405_3_android/manifest.json
	  // TL;DR this lets us have a single point of entry for multiple events, and we can avoid callback/binding hell
	  IroComponent.prototype.handleEvent = function handleEvent (e) {
	    e.preventDefault();
	    // Detect if the event is a touch event by checking if it has the `touches` property
	    // If it is a touch event, use the first touch input
	    var point = e.touches ? e.changedTouches[0] : e;
	    var x = point.clientX;
	    var y = point.clientY;
	    // Get the screen position of the component
	    var bounds = this.base.getBoundingClientRect();

	    switch (e.type) {
	      case EVENT_MOUSEDOWN:
	      case EVENT_TOUCHSTART:
	        listen(document, [EVENT_MOUSEMOVE, EVENT_TOUCHMOVE, EVENT_MOUSEUP, EVENT_TOUCHEND], this, { passive: false });
	        this.handleInput(x, y, bounds, 'START');
	        break;
	      case EVENT_MOUSEMOVE:
	      case EVENT_TOUCHMOVE:
	        this.handleInput(x, y, bounds, 'MOVE');
	        break;
	      case EVENT_MOUSEUP:
	      case EVENT_TOUCHEND:
	        this.handleInput(x, y, bounds, 'END');
	        unlisten(document, [EVENT_MOUSEMOVE, EVENT_TOUCHMOVE, EVENT_MOUSEUP, EVENT_TOUCHEND], this, { passive: false });
	        break;
	    }
	  };

	  return IroComponent;
	}(Component));

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

	  return (
	    h( 'svg', { class: "iro__handle", x: props.x, y: props.y, style: { overflow: 'visible' } },
	      url && (
	        h( 'use', Object.assign({}, { xlinkHref: resolveUrl(url) }, props.origin))
	      ),
	      !url && (
	        h( 'circle', { 
	          class: "iro__handle__inner", r: radius, fill: "none", 'stroke-width': 2, stroke: "#000" })
	      ),
	      !url && (
	        h( 'circle', { 
	          class: "iro__handle__outer", r: radius - 2, fill: "none", 'stroke-width': 2, stroke: "#fff" })
	      )
	    )
	  );
	}

	IroHandle.defaultProps = {
	  x: 0,
	  y: 0,
	  r: 8,
	  url: null,
	  origin: {x: 0, y: 0}
	};

	var IroWheel = /*@__PURE__*/(function (IroComponent$$1) {
	  function IroWheel () {
	    IroComponent$$1.apply(this, arguments);
	  }

	  if ( IroComponent$$1 ) IroWheel.__proto__ = IroComponent$$1;
	  IroWheel.prototype = Object.create( IroComponent$$1 && IroComponent$$1.prototype );
	  IroWheel.prototype.constructor = IroWheel;

	  IroWheel.prototype.render = function render$$1 (props) {
	    var width = props.width;
	    var borderWidth = props.borderWidth;
	    var handleRadius = props.handleRadius;
	    var hsv = props.color.hsv;
	    var radius = (width / 2) - borderWidth;
	    var handleAngle = (360 - hsv.h) * (Math.PI / 180);
	    var handleDist = (hsv.s / 100) * (radius - props.padding - handleRadius - borderWidth);
	    var cX = radius + borderWidth;
	    var cY = radius + borderWidth;
	    
	    return (
	      h( 'svg', { 
	        class: "iro__wheel", width: width, height: width, style: {
	          overflow: 'visible',
	          display: 'block'
	        } },
	        h( 'defs', null,
	          h( 'radialGradient', { id: this.uid },
	            h( 'stop', { offset: "0%", 'stop-color': "#fff" }),
	            h( 'stop', { offset: "100%", 'stop-color': "#fff", 'stop-opacity': "0" })
	          )
	        ),
	        h( 'g', { class: "iro__wheel__hue", 'stroke-width': radius, fill: "none" },
	          Array.apply(null, { length: 360 }).map(function (_, hue) { return (
	            h( 'path', { 
	              key: hue, d: createArcPath(cX, cY, radius / 2, hue, hue + 1.5), stroke: ("hsl(" + (360 - hue) + ", 100%, 50%)") })
	          ); })
	        ),
	        h( 'circle', { 
	          class: "iro__wheel__saturation", cx: cX, cy: cY, r: radius, fill: ("url(" + (resolveUrl('#' + this.uid)) + ")") }),
	        props.wheelLightness && (
	          h( 'circle', { 
	            class: "iro__wheel__lightness", cx: cX, cy: cY, r: radius, fill: "#000", opacity: 1 - hsv.v / 100 })
	        ),
	        h( 'circle', { 
	          class: "iro__wheel__border", cx: cX, cy: cY, r: radius, fill: "none", stroke: props.borderColor, 'stroke-width': borderWidth }),
	        h( IroHandle, { 
	          r: handleRadius, url: props.handleSvg, origin: props.handleOrigin, x: cX + handleDist * Math.cos(handleAngle), y: cY + handleDist * Math.sin(handleAngle) })
	      )
	    );
	  };

	  /**
	    * @desc handles mouse input for this component
	    * @param {Number} x - point x coordinate
	    * @param {Number} y - point y coordinate
	    * @param {DOMRect} rect - bounding client rect for the component's base element
	    * @param {String} type - input type: "START", "MOVE" or "END"
	  */
	  IroWheel.prototype.handleInput = function handleInput (x, y, ref, type) {
	    var left = ref.left;
	    var top = ref.top;

	    var props = this.props;
	    var radius = props.width / 2;
	    var handleRange = (radius - props.padding - props.handleRadius - props.borderWidth);
	    var cX = radius;
	    var cY = radius;

	    x = cX - (x - left);
	    y = cY - (y - top);

	    var handleAngle = Math.atan2(y, x);
	    // Calculate the hue by converting the angle to radians
	    var hue = 360 - (Math.round(handleAngle * (180 / Math.PI)) + 180);
	    // Find the point's distance from the center of the wheel
	    // This is used to show the saturation level
	    var handleDist = Math.min(Math.sqrt(x * x + y * y), handleRange);
	    props.onInput(type, {
	      h: hue,
	      s: Math.round((100 / handleRange) * handleDist)
	    });
	  };

	  return IroWheel;
	}(IroComponent));

	/**
	 * @desc Parse a css unit string - either regular int or a percentage number
	 * @param {String} str input string
	 * @param {String} max max number for converting percentages
	 * @returns {Number} 
	 */
	function parseUnit(str, max) {
	  var isPercentage = str.indexOf('%') > -1;
	  var num = parseFloat(str);
	  return isPercentage ? (max / 100) * num : num;
	}

	/**
	 * @desc Parse hex str to an int
	 * @param {String} str input string
	 * @returns {Number} 
	 */
	function parseHexInt(str) {
	  return parseInt(str, 16);
	}

	/**
	 * @desc Convert into to 2-digit hex
	 * @param {Number} int input number
	 * @returns {String} 
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

	var Color = function Color(value) {
	  // The watch callback function for this Color will be stored here
	  this._onChange = false;
	  // The default Color value
	  this._value = {h: 0, s: 0, v: 0, a: 1};
	  if (value) { this.set(value); }
	};

	var prototypeAccessors = { hsv: { configurable: true },rgb: { configurable: true },hsl: { configurable: true },rgbString: { configurable: true },hexString: { configurable: true },hslString: { configurable: true } };

	/**
	  * @desc set the Color from any valid value
	  * @param {Object | String | Color} value - Color instance, object (hsv, hsl or rgb), string (hsl, rgb, hex)
	*/
	Color.prototype.set = function set (value) {
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
	  else if ((isObject) && (value instanceof Color)) {
	    this.hsv = value.hsv;
	  }
	  else if ((isObject) && ('r' in value) && ('g' in value) && ('b' in value)) {
	    this.rgb = value;
	  }
	  else if ((isObject) && ('h' in value) && ('s' in value) && ('v' in value)) {
	    this.hsv = value;
	  }
	  else if ((isObject) && ('h' in value) && ('s' in value) && ('l' in value)) {
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
	Color.prototype.setChannel = function setChannel (format, channel, value) {
	    var obj;

	  this[format] = Object.assign({}, this[format], ( obj = {}, obj[channel] = value, obj ));
	};

	/**
	  * @desc make new Color instance with the same value as this one
	  * @return {Color}
	*/
	Color.prototype.clone = function clone () {
	  return new Color(this);
	};

	/**
	  * @desc convert hsv object to rgb
	  * @param {Object} hsv hsv object
	  * @return {Object} rgb object
	*/
	Color.hsvToRgb = function hsvToRgb (hsv) {
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
	Color.rgbToHsv = function rgbToHsv (rgb) {
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
	  }
	};

	/**
	  * @desc convert hsv object to hsl
	  * @param {Object} hsv - hsv object
	  * @return {Object} hsl object
	*/
	Color.hsvToHsl = function hsvToHsl (hsv) {
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
	Color.hslToHsv = function hslToHsv (hsl) {
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
	  var value = this._value;
	  return {h: value.h, s: value.s, v: value.v};
	};

	prototypeAccessors.hsv.set = function (newValue) {
	  var oldValue = this._value;
	  newValue = Object.assign({}, oldValue, newValue);
	  // If this Color is being watched for changes we need to compare the new and old values to check the difference
	  // Otherwise we can just be lazy
	  if (this._onChange) {
	    // Compute changed values
	    var changes = {};
	    for (var key in oldValue) {
	      changes[key] = newValue[key] != oldValue[key];
	    }    // Update the old value
	    this._value = newValue;
	    // If the value has changed, call hook callback
	    if (changes.h || changes.s || changes.v || changes.a) { this._onChange(this, changes); }
	  } else {
	    this._value = newValue;
	  }
	};

	prototypeAccessors.rgb.get = function () {
	  var ref = Color.hsvToRgb(this._value);
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
	  this.hsv = Object.assign({}, Color.rgbToHsv(value), {a: (value.a === undefined) ? 1 : value.a});
	};

	prototypeAccessors.hsl.get = function () {
	  var ref = Color.hsvToHsl(this._value);
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
	  this.hsv = Object.assign({}, Color.hslToHsv(value), {a: (value.a === undefined) ? 1 : value.a});
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
	    this.rgb = {r: r, g: g, b: b, a: a};
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
	    this.rgb = {r: r, g: g, b: b, a: a / 255};
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
	    this.hsl = {h: h, s: s, l: l, a: a};
	  } 
	  else {
	    throw new Error('invalid hsl string');
	  }
	};

	Object.defineProperties( Color.prototype, prototypeAccessors );

	var IroSlider = /*@__PURE__*/(function (IroComponent$$1) {
	  function IroSlider () {
	    IroComponent$$1.apply(this, arguments);
	  }

	  if ( IroComponent$$1 ) IroSlider.__proto__ = IroComponent$$1;
	  IroSlider.prototype = Object.create( IroComponent$$1 && IroComponent$$1.prototype );
	  IroSlider.prototype.constructor = IroSlider;

	  IroSlider.prototype.renderGradient = function renderGradient (props) {
	    var hsv = props.color.hsv;
	    var stops = [];

	    switch (props.sliderType) {
	      case 'hue':
	        stops = [
	          {offset: '0',      color: '#f00'},
	          {offset: '16.666', color: '#ff0'},
	          {offset: '33.333', color: '#0f0'},
	          {offset: '50',     color: '#0ff'},
	          {offset: '66.666', color: '#00f'},
	          {offset: '83.333', color: '#f0f'},
	          {offset: '100',    color: '#f00'} ];
	        break;
	      case 'saturation':
	        var noSat = Color.hsvToHsl({h: hsv.h, s: 0, v: hsv.v});
	        var fullSat = Color.hsvToHsl({h: hsv.h, s: 100, v: hsv.v});
	        stops = [
	          {offset: '0', color: ("hsl(" + (noSat.h) + ", " + (noSat.s) + "%, " + (noSat.l) + "%)")},
	          {offset: '100', color: ("hsl(" + (fullSat.h) + ", " + (fullSat.s) + "%, " + (fullSat.l) + "%)")}
	        ];
	        break;
	      case 'value':
	      default:
	        var hsl = Color.hsvToHsl({h: hsv.h, s: hsv.s, v: 100});
	        stops = [
	          {offset: '0', color: '#000'},
	          {offset: '100', color: ("hsl(" + (hsl.h) + ", " + (hsl.s) + "%, " + (hsl.l) + "%)")}
	        ];
	        break;
	    }

	    return (
	      h( 'linearGradient', { id: this.uid },
	        stops.map(function (stop) { return (
	          h( 'stop', { offset: ((stop.offset) + "%"), 'stop-color': stop.color })
	        ); })
	      )
	    )
	  };

	  IroSlider.prototype.render = function render$$1 (props) {
	    var width = props.width;
	    var sliderHeight = props.sliderHeight;
	    var borderWidth = props.borderWidth;
	    var handleRadius = props.handleRadius;
	    sliderHeight = sliderHeight ? sliderHeight : props.padding * 2 + handleRadius * 2 + borderWidth * 2;
	    this.width = width;
	    this.height = sliderHeight;
	    var cornerRadius = sliderHeight / 2;
	    var range = width - cornerRadius * 2;
	    var hsv = props.color.hsv;
	    
	    var sliderValue;
	    switch (props.sliderType) {
	      case 'hue':
	        sliderValue = hsv.h /= 3.6;
	        break;
	      case 'saturation':
	        sliderValue = hsv.s;
	        break;
	      case 'value':
	      default:
	        sliderValue = hsv.v;
	        break;
	    }

	    return (
	      h( 'svg', { 
	        class: "iro__slider", width: width, height: sliderHeight, style: {
	          marginTop: props.sliderMargin,
	          overflow: 'visible',
	          display: 'block'
	        } },
	        h( 'defs', null,
	          this.renderGradient(props)
	        ),
	        h( 'rect', { 
	          class: "iro__slider__value", rx: cornerRadius, ry: cornerRadius, x: borderWidth / 2, y: borderWidth / 2, width: width - borderWidth, height: sliderHeight - borderWidth, 'stroke-width': borderWidth, stroke: props.borderColor, fill: ("url(" + (resolveUrl('#' + this.uid)) + ")") }),
	        h( IroHandle, {
	          r: handleRadius, url: props.handleSvg, origin: props.handleOrigin, x: cornerRadius + (sliderValue / 100) * range, y: sliderHeight / 2 })
	      )
	    );
	  };

	  IroSlider.prototype.getValueFromPoint = function getValueFromPoint (x, y, ref) {
	    var left = ref.left;

	    var handleRange = this.width - this.height;
	    var cornerRadius = this.height / 2;
	    x = x - (left + cornerRadius);
	    var dist = Math.max(Math.min(x, handleRange), 0);
	    return Math.round((100 / handleRange) * dist);
	  };

	  /**
	    * @desc handles mouse input for this component
	    * @param {Number} x - point x coordinate
	    * @param {Number} y - point y coordinate
	    * @param {DOMRect} rect - bounding client rect for the component's base element
	    * @param {String} type - input type: "START", "MOVE" or "END"
	  */
	  IroSlider.prototype.handleInput = function handleInput (x, y, bounds, type) {
	    var obj;

	    var value = this.getValueFromPoint(x, y, bounds);
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
	    render(
	      h(widgetComponent, Object.assign({}, {ref: function (ref) { return widget = ref; }},
	        props)),
	      widgetRoot
	    );
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

	var ColorPicker = /*@__PURE__*/(function (Component$$1) {
	  function ColorPicker(props) {
	    Component$$1.call(this, props);
	    this.emitHook('init:before');
	    this._events = {};
	    this._deferredEvents = {};
	    this._colorUpdateActive = false;
	    this._colorUpdateSrc = null;
	    this.color = new Color(props.color);
	    this.deferredEmit('color:init', this.color, { h: false, s: false, v: false, a: false });
	    // Whenever the color changes, update the color wheel
	    this.color._onChange = this.updateColor.bind(this);
	    this.state = Object.assign({}, props,
	      {color: this.color});
	    this.emitHook('init:state');

	    if (props.layout) {
	      this.layout = props.layout;
	    } else {
	      this.layout = [
	        {component: IroWheel, options: {}},
	        {component: IroSlider, options: {}} ];
	    }
	    this.emitHook('init:after');
	  }

	  if ( Component$$1 ) ColorPicker.__proto__ = Component$$1;
	  ColorPicker.prototype = Object.create( Component$$1 && Component$$1.prototype );
	  ColorPicker.prototype.constructor = ColorPicker;

	  // Public ColorPicker events API

	  /**
	   * @desc Set a callback function for an event
	   * @param {String | Array} eventList event(s) to listen to
	   * @param {Function} callback
	   */
	  ColorPicker.prototype.on = function on (eventList, callback) {
	    var this$1 = this;

	    var events = this._events;
	    // eventList can be an eventType string or an array of eventType strings
	    (!Array.isArray(eventList) ? [eventList] : eventList).forEach(function (eventType) {
	      // Emit plugin hook
	      this$1.emitHook('event:on', eventType, callback);
	      // Add event callback
	      (events[eventType] || (events[eventType] = [])).push(callback);
	      // Call deferred events
	      // These are events that can be stored until a listener for them is added
	      if (this$1._deferredEvents[eventType]) {
	        // Deffered events store an array of arguments from when the event was called
	        this$1._deferredEvents[eventType].forEach(function (args) {
	          callback.apply(null, args); 
	        });
	        // Clear deferred events
	        this$1._deferredEvents[eventType] = [];
	      }
	    });
	  };

	  /**
	   * @desc Remove a callback function for an event added with on()
	   * @param {String | Array} eventList The name of the event
	   * @param {Function} callback
	   */
	  ColorPicker.prototype.off = function off (eventList, callback) {
	    var this$1 = this;

	    (!Array.isArray(eventList) ? [eventList] : eventList).forEach(function (eventType) {
	      var callbackList = this$1._events[eventType];
	      this$1.emitHook('event:off', eventType, callback);
	      if (callbackList) { callbackList.splice(callbackList.indexOf(callback), 1); }
	    });
	  };

	  /**
	   * @desc Emit an event
	   * @param {String} eventType The name of the event to emit
	   * @param {Array} args array of args to pass to callbacks
	   */
	  ColorPicker.prototype.emit = function emit (eventType) {
	    var ref;

	    var args = [], len = arguments.length - 1;
	    while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];
	    // Events are plugin hooks too
	    (ref = this).emitHook.apply(ref, [ eventType ].concat( args ));
	    var callbackList = this._events[eventType] || [];
	    for (var i = 0; i < callbackList.length; i++) {
	      callbackList[i].apply(null, args); 
	    }
	  };

	  /**
	   * @desc Emit an event now, or save it for when the relevent event listener is added
	   * @param {String} eventType The name of the event to emit
	   * @param {Array} args array of args to pass to callbacks
	   */
	  ColorPicker.prototype.deferredEmit = function deferredEmit (eventType) {
	    var ref;

	    var args = [], len = arguments.length - 1;
	    while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];
	    var deferredEvents = this._deferredEvents;
	    (ref = this).emit.apply(ref, [ eventType ].concat( args ));
	    (deferredEvents[eventType] || (deferredEvents[eventType] = [])).push(args);
	  };

	  // Public utility methods

	  /**
	   * @desc Resize the color picker
	   * @param {Number} width
	   */
	  ColorPicker.prototype.resize = function resize (width) {
	    this.setState({width: width});
	  };

	  /**
	   * @desc Reset the color picker to the initial color provided in the color picker options
	   */
	  ColorPicker.prototype.reset = function reset () {
	    this.color.set(this.props.color);
	  };

	  // Plugin hooks API

	  /**
	   * @desc Set a callback function for a hook
	   * @param {String} hookType The name of the hook to listen to
	   * @param {Function} callback
	   */
	  ColorPicker.addHook = function addHook (hookType, callback) {
	    var pluginHooks = ColorPicker.pluginHooks;
	    (pluginHooks[hookType] || (pluginHooks[hookType] = [])).push(callback);
	  };

	  /**
	   * @desc Emit a callback hook
	   * @access private
	   * @param {String} hookType The type of hook event to emit
	   */
	  ColorPicker.prototype.emitHook = function emitHook (hookType) {
	    var args = [], len = arguments.length - 1;
	    while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

	    var callbackList = ColorPicker.pluginHooks[hookType] || [];
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
	  ColorPicker.prototype.onMount = function onMount (container) {
	    this.el = container;
	    this.deferredEmit('mount', this);
	  };

	  /**
	   * @desc React to a color update
	   * @access private
	   * @param {IroColor} color current color
	   * @param {Object} changes shows which h,s,v color channels changed
	   */
	  ColorPicker.prototype.updateColor = function updateColor (color, changes) {
	    this.emitHook('color:beforeUpdate', color, changes);
	    this.setState({ color: color });
	    this.emitHook('color:afterUpdate', color, changes);
	    // Prevent infinite loops if the color is set inside a color:change or input:change callback
	    if (!this._colorUpdateActive) {
	      // While _colorUpdateActive == true, branch cannot be entered
	      this._colorUpdateActive = true;
	      // If the color change originates from user input, fire input:change
	      if (this._colorUpdateSrc == 'input') { // colorUpdateSrc is cleared in handeInput()
	        this.emit('input:change', color, changes);
	      } 
	      // Always fire color:change event
	      this.emit('color:change', color, changes);
	      this._colorUpdateActive = false;
	    }
	  };

	  /**
	   * @desc Handle input from a UI control element
	   * @access private
	   * @param {String} type "START" | "MOVE" | "END"
	   * @param {Object} hsv new hsv values for the color
	   */
	  ColorPicker.prototype.handleInput = function handleInput (type, hsv) {
	    // Fire input start and move events before color update
	    if (type === 'START') { this.emit('input:start', this.color); }
	    if (type === 'MOVE') { this.emit('input:move', this.color); }
	    // Set the color update source
	    this._colorUpdateSrc = 'input';
	    // Setting the color HSV here will automatically update the UI
	    // Since we bound the color's _onChange callback
	    this.color.hsv = hsv;
	    // Fire input end event after color update
	    if (type === 'END') { this.emit('input:end', this.color); }
	    // Reset color update source so it doesn't interfere with future color updates
	    // Super important to do this here and not in updateColor()
	    this._colorUpdateSrc = null;
	  };

	  ColorPicker.prototype.render = function render$$1 (props, state) {
	    var this$1 = this;

	    return (
	      h( 'div', { 
	        class: "iro__colorPicker", style: {
	          display: state.display,
	          width: state.width
	        } },
	        this.layout.map(function (ref) {
	          var UiComponent = ref.component;
	          var options$$1 = ref.options;

	          return (
	          h( UiComponent, Object.assign({},
	            state, options$$1, { onInput: function (type, hsv) { return this$1.handleInput(type, hsv); }, parent: this$1 }))
	        );
	    })
	      )
	    )
	  };

	  return ColorPicker;
	}(Component));

	ColorPicker.pluginHooks = {};

	ColorPicker.defaultProps = {
	  width: 300,
	  height: 300,
	  handleRadius: 8,
	  handleSvg: null,
	  handleOrigin: {x: 0, y: 0},
	  color: '#fff',
	  borderColor: '#fff',
	  borderWidth: 0,
	  display: 'block',
	  wheelLightness: true,
	  sliderHeight: null,
	  sliderMargin: 12,
	  padding: 6,
	  layout: null,
	};

	var ColorPicker$1 = createWidget(ColorPicker);

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
	  core.use = function(plugin, pluginOptions) {
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

	var iro = usePlugins({
	  Color: Color,
	  ColorPicker: ColorPicker$1,
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
	  version: "4.3.3",
	});

	return iro;

})));
//# sourceMappingURL=iro.js.map
