import {
  createElementBlock,
  defineComponent,
  h,
  nextTick,
  onMounted,
  onUnmounted,
  openBlock,
  ref,
  render,
  renderSlot,
  watch
} from "./chunk-HL5V7ANH.js";
import "./chunk-BQWMX7FD.js";

// node_modules/viewerjs/dist/viewer.esm.js
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _typeof(o) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof(o);
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}
var DEFAULTS = {
  /**
   * Enable a modal backdrop, specify `static` for a backdrop
   * which doesn't close the modal on click.
   * @type {boolean}
   */
  backdrop: true,
  /**
   * Show the button on the top-right of the viewer.
   * @type {boolean}
   */
  button: true,
  /**
   * Show the navbar.
   * @type {boolean | number}
   */
  navbar: true,
  /**
   * Specify the visibility and the content of the title.
   * @type {boolean | number | Function | Array}
   */
  title: true,
  /**
   * Show the toolbar.
   * @type {boolean | number | Object}
   */
  toolbar: true,
  /**
   * Custom class name(s) to add to the viewer's root element.
   * @type {string}
   */
  className: "",
  /**
   * Define where to put the viewer in modal mode.
   * @type {string | Element}
   */
  container: "body",
  /**
   * Filter the images for viewing. Return true if the image is viewable.
   * @type {Function}
   */
  filter: null,
  /**
   * Enable to request fullscreen when play.
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/FullscreenOptions}
   * @type {boolean|FullscreenOptions}
   */
  fullscreen: true,
  /**
   * Define the extra attributes to inherit from the original image.
   * @type {Array}
   */
  inheritedAttributes: ["crossOrigin", "decoding", "isMap", "loading", "referrerPolicy", "sizes", "srcset", "useMap"],
  /**
   * Define the initial coverage of the viewing image.
   * @type {number}
   */
  initialCoverage: 0.9,
  /**
   * Define the initial index of the image for viewing.
   * @type {number}
   */
  initialViewIndex: 0,
  /**
   * Enable inline mode.
   * @type {boolean}
   */
  inline: false,
  /**
   * The amount of time to delay between automatically cycling an image when playing.
   * @type {number}
   */
  interval: 5e3,
  /**
   * Enable keyboard support.
   * @type {boolean}
   */
  keyboard: true,
  /**
   * Focus the viewer when initialized.
   * @type {boolean}
   */
  focus: true,
  /**
   * Indicate if show a loading spinner when load image or not.
   * @type {boolean}
   */
  loading: true,
  /**
   * Indicate if enable loop viewing or not.
   * @type {boolean}
   */
  loop: true,
  /**
   * Min width of the viewer in inline mode.
   * @type {number}
   */
  minWidth: 200,
  /**
   * Min height of the viewer in inline mode.
   * @type {number}
   */
  minHeight: 100,
  /**
   * Enable to move the image.
   * @type {boolean}
   */
  movable: true,
  /**
   * Enable to rotate the image.
   * @type {boolean}
   */
  rotatable: true,
  /**
   * Enable to scale the image.
   * @type {boolean}
   */
  scalable: true,
  /**
   * Enable to zoom the image.
   * @type {boolean}
   */
  zoomable: true,
  /**
   * Enable to zoom the current image by dragging on the touch screen.
   * @type {boolean}
   */
  zoomOnTouch: true,
  /**
   * Enable to zoom the image by wheeling mouse.
   * @type {boolean}
   */
  zoomOnWheel: true,
  /**
   * Enable to slide to the next or previous image by swiping on the touch screen.
   * @type {boolean}
   */
  slideOnTouch: true,
  /**
   * Indicate if toggle the image size between its natural size
   * and initial size when double click on the image or not.
   * @type {boolean}
   */
  toggleOnDblclick: true,
  /**
   * Show the tooltip with image ratio (percentage) when zoom in or zoom out.
   * @type {boolean}
   */
  tooltip: true,
  /**
   * Enable CSS3 Transition for some special elements.
   * @type {boolean}
   */
  transition: true,
  /**
   * Define the CSS `z-index` value of viewer in modal mode.
   * @type {number}
   */
  zIndex: 2015,
  /**
   * Define the CSS `z-index` value of viewer in inline mode.
   * @type {number}
   */
  zIndexInline: 0,
  /**
   * Define the ratio when zoom the image by wheeling mouse.
   * @type {number}
   */
  zoomRatio: 0.1,
  /**
   * Define the min ratio of the image when zoom out.
   * @type {number}
   */
  minZoomRatio: 0.01,
  /**
   * Define the max ratio of the image when zoom in.
   * @type {number}
   */
  maxZoomRatio: 100,
  /**
   * Define where to get the original image URL for viewing.
   * @type {string | Function}
   */
  url: "src",
  /**
   * Event shortcuts.
   * @type {Function}
   */
  ready: null,
  show: null,
  shown: null,
  hide: null,
  hidden: null,
  view: null,
  viewed: null,
  move: null,
  moved: null,
  rotate: null,
  rotated: null,
  scale: null,
  scaled: null,
  zoom: null,
  zoomed: null,
  play: null,
  stop: null
};
var TEMPLATE = '<div class="viewer-container" tabindex="-1" touch-action="none"><div class="viewer-canvas"></div><div class="viewer-footer"><div class="viewer-title"></div><div class="viewer-toolbar"></div><div class="viewer-navbar"><ul class="viewer-list" role="navigation"></ul></div></div><div class="viewer-tooltip" role="alert" aria-hidden="true"></div><div class="viewer-button" data-viewer-action="mix" role="button"></div><div class="viewer-player"></div></div>';
var IS_BROWSER = typeof window !== "undefined" && typeof window.document !== "undefined";
var WINDOW = IS_BROWSER ? window : {};
var IS_TOUCH_DEVICE = IS_BROWSER && WINDOW.document.documentElement ? "ontouchstart" in WINDOW.document.documentElement : false;
var HAS_POINTER_EVENT = IS_BROWSER ? "PointerEvent" in WINDOW : false;
var NAMESPACE = "viewer";
var ACTION_MOVE = "move";
var ACTION_SWITCH = "switch";
var ACTION_ZOOM = "zoom";
var CLASS_ACTIVE = "".concat(NAMESPACE, "-active");
var CLASS_CLOSE = "".concat(NAMESPACE, "-close");
var CLASS_FADE = "".concat(NAMESPACE, "-fade");
var CLASS_FIXED = "".concat(NAMESPACE, "-fixed");
var CLASS_FULLSCREEN = "".concat(NAMESPACE, "-fullscreen");
var CLASS_FULLSCREEN_EXIT = "".concat(NAMESPACE, "-fullscreen-exit");
var CLASS_HIDE = "".concat(NAMESPACE, "-hide");
var CLASS_HIDE_MD_DOWN = "".concat(NAMESPACE, "-hide-md-down");
var CLASS_HIDE_SM_DOWN = "".concat(NAMESPACE, "-hide-sm-down");
var CLASS_HIDE_XS_DOWN = "".concat(NAMESPACE, "-hide-xs-down");
var CLASS_IN = "".concat(NAMESPACE, "-in");
var CLASS_INVISIBLE = "".concat(NAMESPACE, "-invisible");
var CLASS_LOADING = "".concat(NAMESPACE, "-loading");
var CLASS_MOVE = "".concat(NAMESPACE, "-move");
var CLASS_OPEN = "".concat(NAMESPACE, "-open");
var CLASS_SHOW = "".concat(NAMESPACE, "-show");
var CLASS_TRANSITION = "".concat(NAMESPACE, "-transition");
var EVENT_CLICK = "click";
var EVENT_DBLCLICK = "dblclick";
var EVENT_DRAG_START = "dragstart";
var EVENT_FOCUSIN = "focusin";
var EVENT_KEY_DOWN = "keydown";
var EVENT_LOAD = "load";
var EVENT_ERROR = "error";
var EVENT_TOUCH_END = IS_TOUCH_DEVICE ? "touchend touchcancel" : "mouseup";
var EVENT_TOUCH_MOVE = IS_TOUCH_DEVICE ? "touchmove" : "mousemove";
var EVENT_TOUCH_START = IS_TOUCH_DEVICE ? "touchstart" : "mousedown";
var EVENT_POINTER_DOWN = HAS_POINTER_EVENT ? "pointerdown" : EVENT_TOUCH_START;
var EVENT_POINTER_MOVE = HAS_POINTER_EVENT ? "pointermove" : EVENT_TOUCH_MOVE;
var EVENT_POINTER_UP = HAS_POINTER_EVENT ? "pointerup pointercancel" : EVENT_TOUCH_END;
var EVENT_RESIZE = "resize";
var EVENT_TRANSITION_END = "transitionend";
var EVENT_WHEEL = "wheel";
var EVENT_READY = "ready";
var EVENT_SHOW = "show";
var EVENT_SHOWN = "shown";
var EVENT_HIDE = "hide";
var EVENT_HIDDEN = "hidden";
var EVENT_VIEW = "view";
var EVENT_VIEWED = "viewed";
var EVENT_MOVE = "move";
var EVENT_MOVED = "moved";
var EVENT_ROTATE = "rotate";
var EVENT_ROTATED = "rotated";
var EVENT_SCALE = "scale";
var EVENT_SCALED = "scaled";
var EVENT_ZOOM = "zoom";
var EVENT_ZOOMED = "zoomed";
var EVENT_PLAY = "play";
var EVENT_STOP = "stop";
var DATA_ACTION = "".concat(NAMESPACE, "Action");
var REGEXP_SPACES = /\s\s*/;
var BUTTONS = ["zoom-in", "zoom-out", "one-to-one", "reset", "prev", "play", "next", "rotate-left", "rotate-right", "flip-horizontal", "flip-vertical"];
function isString(value) {
  return typeof value === "string";
}
var isNaN = Number.isNaN || WINDOW.isNaN;
function isNumber(value) {
  return typeof value === "number" && !isNaN(value);
}
function isUndefined(value) {
  return typeof value === "undefined";
}
function isObject(value) {
  return _typeof(value) === "object" && value !== null;
}
var hasOwnProperty = Object.prototype.hasOwnProperty;
function isPlainObject(value) {
  if (!isObject(value)) {
    return false;
  }
  try {
    var _constructor = value.constructor;
    var prototype = _constructor.prototype;
    return _constructor && prototype && hasOwnProperty.call(prototype, "isPrototypeOf");
  } catch (error) {
    return false;
  }
}
function isFunction(value) {
  return typeof value === "function";
}
function forEach(data, callback) {
  if (data && isFunction(callback)) {
    if (Array.isArray(data) || isNumber(data.length)) {
      var length = data.length;
      var i;
      for (i = 0; i < length; i += 1) {
        if (callback.call(data, data[i], i, data) === false) {
          break;
        }
      }
    } else if (isObject(data)) {
      Object.keys(data).forEach(function(key) {
        callback.call(data, data[key], key, data);
      });
    }
  }
  return data;
}
var assign = Object.assign || function assign2(obj) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  if (isObject(obj) && args.length > 0) {
    args.forEach(function(arg) {
      if (isObject(arg)) {
        Object.keys(arg).forEach(function(key) {
          obj[key] = arg[key];
        });
      }
    });
  }
  return obj;
};
var REGEXP_SUFFIX = /^(?:width|height|left|top|marginLeft|marginTop)$/;
function setStyle(element, styles) {
  var style = element.style;
  forEach(styles, function(value, property) {
    if (REGEXP_SUFFIX.test(property) && isNumber(value)) {
      value += "px";
    }
    style[property] = value;
  });
}
function escapeHTMLEntities(value) {
  return isString(value) ? value.replace(/&(?!amp;|quot;|#39;|lt;|gt;)/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;") : value;
}
function hasClass(element, value) {
  if (!element || !value) {
    return false;
  }
  return element.classList ? element.classList.contains(value) : element.className.indexOf(value) > -1;
}
function addClass(element, value) {
  if (!element || !value) {
    return;
  }
  if (isNumber(element.length)) {
    forEach(element, function(elem) {
      addClass(elem, value);
    });
    return;
  }
  if (element.classList) {
    element.classList.add(value);
    return;
  }
  var className = element.className.trim();
  if (!className) {
    element.className = value;
  } else if (className.indexOf(value) < 0) {
    element.className = "".concat(className, " ").concat(value);
  }
}
function removeClass(element, value) {
  if (!element || !value) {
    return;
  }
  if (isNumber(element.length)) {
    forEach(element, function(elem) {
      removeClass(elem, value);
    });
    return;
  }
  if (element.classList) {
    element.classList.remove(value);
    return;
  }
  if (element.className.indexOf(value) >= 0) {
    element.className = element.className.replace(value, "");
  }
}
function toggleClass(element, value, added) {
  if (!value) {
    return;
  }
  if (isNumber(element.length)) {
    forEach(element, function(elem) {
      toggleClass(elem, value, added);
    });
    return;
  }
  if (added) {
    addClass(element, value);
  } else {
    removeClass(element, value);
  }
}
var REGEXP_HYPHENATE = /([a-z\d])([A-Z])/g;
function hyphenate(value) {
  return value.replace(REGEXP_HYPHENATE, "$1-$2").toLowerCase();
}
function getData(element, name) {
  if (isObject(element[name])) {
    return element[name];
  }
  if (element.dataset) {
    return element.dataset[name];
  }
  return element.getAttribute("data-".concat(hyphenate(name)));
}
function setData(element, name, data) {
  if (isObject(data)) {
    element[name] = data;
  } else if (element.dataset) {
    element.dataset[name] = data;
  } else {
    element.setAttribute("data-".concat(hyphenate(name)), data);
  }
}
var onceSupported = function() {
  var supported = false;
  if (IS_BROWSER) {
    var once = false;
    var listener = function listener2() {
    };
    var options = Object.defineProperty({}, "once", {
      get: function get() {
        supported = true;
        return once;
      },
      /**
       * This setter can fix a `TypeError` in strict mode
       * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Getter_only}
       * @param {boolean} value - The value to set
       */
      set: function set(value) {
        once = value;
      }
    });
    WINDOW.addEventListener("test", listener, options);
    WINDOW.removeEventListener("test", listener, options);
  }
  return supported;
}();
function removeListener(element, type, listener) {
  var options = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
  var handler = listener;
  type.trim().split(REGEXP_SPACES).forEach(function(event) {
    if (!onceSupported) {
      var listeners = element.listeners;
      if (listeners && listeners[event] && listeners[event][listener]) {
        handler = listeners[event][listener];
        delete listeners[event][listener];
        if (Object.keys(listeners[event]).length === 0) {
          delete listeners[event];
        }
        if (Object.keys(listeners).length === 0) {
          delete element.listeners;
        }
      }
    }
    element.removeEventListener(event, handler, options);
  });
}
function addListener(element, type, listener) {
  var options = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
  var _handler = listener;
  type.trim().split(REGEXP_SPACES).forEach(function(event) {
    if (options.once && !onceSupported) {
      var _element$listeners = element.listeners, listeners = _element$listeners === void 0 ? {} : _element$listeners;
      _handler = function handler() {
        delete listeners[event][listener];
        element.removeEventListener(event, _handler, options);
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }
        listener.apply(element, args);
      };
      if (!listeners[event]) {
        listeners[event] = {};
      }
      if (listeners[event][listener]) {
        element.removeEventListener(event, listeners[event][listener], options);
      }
      listeners[event][listener] = _handler;
      element.listeners = listeners;
    }
    element.addEventListener(event, _handler, options);
  });
}
function dispatchEvent(element, type, data, options) {
  var event;
  if (isFunction(Event) && isFunction(CustomEvent)) {
    event = new CustomEvent(type, _objectSpread2({
      bubbles: true,
      cancelable: true,
      detail: data
    }, options));
  } else {
    event = document.createEvent("CustomEvent");
    event.initCustomEvent(type, true, true, data);
  }
  return element.dispatchEvent(event);
}
function getOffset(element) {
  var box = element.getBoundingClientRect();
  return {
    left: box.left + (window.pageXOffset - document.documentElement.clientLeft),
    top: box.top + (window.pageYOffset - document.documentElement.clientTop)
  };
}
function getTransforms(_ref) {
  var rotate2 = _ref.rotate, scaleX2 = _ref.scaleX, scaleY2 = _ref.scaleY, translateX = _ref.translateX, translateY = _ref.translateY;
  var values = [];
  if (isNumber(translateX) && translateX !== 0) {
    values.push("translateX(".concat(translateX, "px)"));
  }
  if (isNumber(translateY) && translateY !== 0) {
    values.push("translateY(".concat(translateY, "px)"));
  }
  if (isNumber(rotate2) && rotate2 !== 0) {
    values.push("rotate(".concat(rotate2, "deg)"));
  }
  if (isNumber(scaleX2) && scaleX2 !== 1) {
    values.push("scaleX(".concat(scaleX2, ")"));
  }
  if (isNumber(scaleY2) && scaleY2 !== 1) {
    values.push("scaleY(".concat(scaleY2, ")"));
  }
  var transform = values.length ? values.join(" ") : "none";
  return {
    WebkitTransform: transform,
    msTransform: transform,
    transform
  };
}
function getImageNameFromURL(url) {
  return isString(url) ? decodeURIComponent(url.replace(/^.*\//, "").replace(/[?&#].*$/, "")) : "";
}
var IS_SAFARI = WINDOW.navigator && /Version\/\d+(\.\d+)+?\s+Safari/i.test(WINDOW.navigator.userAgent);
function getImageNaturalSizes(image, options, callback) {
  var newImage = document.createElement("img");
  if (image.naturalWidth && !IS_SAFARI) {
    callback(image.naturalWidth, image.naturalHeight);
    return newImage;
  }
  var body = document.body || document.documentElement;
  newImage.onload = function() {
    callback(newImage.width, newImage.height);
    if (!IS_SAFARI) {
      body.removeChild(newImage);
    }
  };
  forEach(options.inheritedAttributes, function(name) {
    var value = image.getAttribute(name);
    if (value !== null) {
      newImage.setAttribute(name, value);
    }
  });
  newImage.src = image.src;
  if (!IS_SAFARI) {
    newImage.style.cssText = "left:0;max-height:none!important;max-width:none!important;min-height:0!important;min-width:0!important;opacity:0;position:absolute;top:0;z-index:-1;";
    body.appendChild(newImage);
  }
  return newImage;
}
function getResponsiveClass(type) {
  switch (type) {
    case 2:
      return CLASS_HIDE_XS_DOWN;
    case 3:
      return CLASS_HIDE_SM_DOWN;
    case 4:
      return CLASS_HIDE_MD_DOWN;
    default:
      return "";
  }
}
function getMaxZoomRatio(pointers) {
  var pointers2 = _objectSpread2({}, pointers);
  var ratios = [];
  forEach(pointers, function(pointer, pointerId) {
    delete pointers2[pointerId];
    forEach(pointers2, function(pointer2) {
      var x1 = Math.abs(pointer.startX - pointer2.startX);
      var y1 = Math.abs(pointer.startY - pointer2.startY);
      var x2 = Math.abs(pointer.endX - pointer2.endX);
      var y2 = Math.abs(pointer.endY - pointer2.endY);
      var z1 = Math.sqrt(x1 * x1 + y1 * y1);
      var z2 = Math.sqrt(x2 * x2 + y2 * y2);
      var ratio = (z2 - z1) / z1;
      ratios.push(ratio);
    });
  });
  ratios.sort(function(a, b2) {
    return Math.abs(a) < Math.abs(b2);
  });
  return ratios[0];
}
function getPointer(_ref2, endOnly) {
  var pageX = _ref2.pageX, pageY = _ref2.pageY;
  var end = {
    endX: pageX,
    endY: pageY
  };
  return endOnly ? end : _objectSpread2({
    timeStamp: Date.now(),
    startX: pageX,
    startY: pageY
  }, end);
}
function getPointersCenter(pointers) {
  var pageX = 0;
  var pageY = 0;
  var count = 0;
  forEach(pointers, function(_ref3) {
    var startX = _ref3.startX, startY = _ref3.startY;
    pageX += startX;
    pageY += startY;
    count += 1;
  });
  pageX /= count;
  pageY /= count;
  return {
    pageX,
    pageY
  };
}
var render2 = {
  render: function render3() {
    this.initContainer();
    this.initViewer();
    this.initList();
    this.renderViewer();
  },
  initBody: function initBody() {
    var ownerDocument = this.element.ownerDocument;
    var body = ownerDocument.body || ownerDocument.documentElement;
    this.body = body;
    this.scrollbarWidth = window.innerWidth - ownerDocument.documentElement.clientWidth;
    this.initialBodyPaddingRight = body.style.paddingRight;
    this.initialBodyComputedPaddingRight = window.getComputedStyle(body).paddingRight;
  },
  initContainer: function initContainer() {
    this.containerData = {
      width: window.innerWidth,
      height: window.innerHeight
    };
  },
  initViewer: function initViewer() {
    var options = this.options, parent = this.parent;
    var viewerData;
    if (options.inline) {
      viewerData = {
        width: Math.max(parent.offsetWidth, options.minWidth),
        height: Math.max(parent.offsetHeight, options.minHeight)
      };
      this.parentData = viewerData;
    }
    if (this.fulled || !viewerData) {
      viewerData = this.containerData;
    }
    this.viewerData = assign({}, viewerData);
  },
  renderViewer: function renderViewer() {
    if (this.options.inline && !this.fulled) {
      setStyle(this.viewer, this.viewerData);
    }
  },
  initList: function initList() {
    var _this = this;
    var element = this.element, options = this.options, list = this.list;
    var items = [];
    list.innerHTML = "";
    forEach(this.images, function(image, index) {
      var src = image.src;
      var alt = image.alt || getImageNameFromURL(src);
      var url = _this.getImageURL(image);
      if (src || url) {
        var item = document.createElement("li");
        var img = document.createElement("img");
        forEach(options.inheritedAttributes, function(name) {
          var value = image.getAttribute(name);
          if (value !== null) {
            img.setAttribute(name, value);
          }
        });
        if (options.navbar) {
          img.src = src || url;
        }
        img.alt = alt;
        img.setAttribute("data-original-url", url || src);
        item.setAttribute("data-index", index);
        item.setAttribute("data-viewer-action", "view");
        item.setAttribute("role", "button");
        if (options.keyboard) {
          item.setAttribute("tabindex", 0);
        }
        item.appendChild(img);
        list.appendChild(item);
        items.push(item);
      }
    });
    this.items = items;
    forEach(items, function(item) {
      var image = item.firstElementChild;
      var onLoad;
      var onError;
      setData(image, "filled", true);
      if (options.loading) {
        addClass(item, CLASS_LOADING);
      }
      addListener(image, EVENT_LOAD, onLoad = function onLoad2(event) {
        removeListener(image, EVENT_ERROR, onError);
        if (options.loading) {
          removeClass(item, CLASS_LOADING);
        }
        _this.loadImage(event);
      }, {
        once: true
      });
      addListener(image, EVENT_ERROR, onError = function onError2() {
        removeListener(image, EVENT_LOAD, onLoad);
        if (options.loading) {
          removeClass(item, CLASS_LOADING);
        }
      }, {
        once: true
      });
    });
    if (options.transition) {
      addListener(element, EVENT_VIEWED, function() {
        addClass(list, CLASS_TRANSITION);
      }, {
        once: true
      });
    }
  },
  renderList: function renderList() {
    var index = this.index;
    var item = this.items[index];
    if (!item) {
      return;
    }
    var next2 = item.nextElementSibling;
    var gutter = parseInt(window.getComputedStyle(next2 || item).marginLeft, 10);
    var offsetWidth = item.offsetWidth;
    var outerWidth = offsetWidth + gutter;
    setStyle(this.list, assign({
      width: outerWidth * this.length - gutter
    }, getTransforms({
      translateX: (this.viewerData.width - offsetWidth) / 2 - outerWidth * index
    })));
  },
  resetList: function resetList() {
    var list = this.list;
    list.innerHTML = "";
    removeClass(list, CLASS_TRANSITION);
    setStyle(list, getTransforms({
      translateX: 0
    }));
  },
  initImage: function initImage(done) {
    var _this2 = this;
    var options = this.options, image = this.image, viewerData = this.viewerData;
    var footerHeight = this.footer.offsetHeight;
    var viewerWidth = viewerData.width;
    var viewerHeight = Math.max(viewerData.height - footerHeight, footerHeight);
    var oldImageData = this.imageData || {};
    var sizingImage;
    this.imageInitializing = {
      abort: function abort() {
        sizingImage.onload = null;
      }
    };
    sizingImage = getImageNaturalSizes(image, options, function(naturalWidth, naturalHeight) {
      var aspectRatio = naturalWidth / naturalHeight;
      var initialCoverage = Math.max(0, Math.min(1, options.initialCoverage));
      var width = viewerWidth;
      var height = viewerHeight;
      _this2.imageInitializing = false;
      if (viewerHeight * aspectRatio > viewerWidth) {
        height = viewerWidth / aspectRatio;
      } else {
        width = viewerHeight * aspectRatio;
      }
      initialCoverage = isNumber(initialCoverage) ? initialCoverage : 0.9;
      width = Math.min(width * initialCoverage, naturalWidth);
      height = Math.min(height * initialCoverage, naturalHeight);
      var left = (viewerWidth - width) / 2;
      var top = (viewerHeight - height) / 2;
      var imageData = {
        left,
        top,
        x: left,
        y: top,
        width,
        height,
        oldRatio: 1,
        ratio: width / naturalWidth,
        aspectRatio,
        naturalWidth,
        naturalHeight
      };
      var initialImageData = assign({}, imageData);
      if (options.rotatable) {
        imageData.rotate = oldImageData.rotate || 0;
        initialImageData.rotate = 0;
      }
      if (options.scalable) {
        imageData.scaleX = oldImageData.scaleX || 1;
        imageData.scaleY = oldImageData.scaleY || 1;
        initialImageData.scaleX = 1;
        initialImageData.scaleY = 1;
      }
      _this2.imageData = imageData;
      _this2.initialImageData = initialImageData;
      if (done) {
        done();
      }
    });
  },
  renderImage: function renderImage(done) {
    var _this3 = this;
    var image = this.image, imageData = this.imageData;
    setStyle(image, assign({
      width: imageData.width,
      height: imageData.height,
      // XXX: Not to use translateX/Y to avoid image shaking when zooming
      marginLeft: imageData.x,
      marginTop: imageData.y
    }, getTransforms(imageData)));
    if (done) {
      if ((this.viewing || this.moving || this.rotating || this.scaling || this.zooming) && this.options.transition && hasClass(image, CLASS_TRANSITION)) {
        var onTransitionEnd = function onTransitionEnd2() {
          _this3.imageRendering = false;
          done();
        };
        this.imageRendering = {
          abort: function abort() {
            removeListener(image, EVENT_TRANSITION_END, onTransitionEnd);
          }
        };
        addListener(image, EVENT_TRANSITION_END, onTransitionEnd, {
          once: true
        });
      } else {
        done();
      }
    }
  },
  resetImage: function resetImage() {
    var image = this.image;
    if (image) {
      if (this.viewing) {
        this.viewing.abort();
      }
      image.parentNode.removeChild(image);
      this.image = null;
      this.title.innerHTML = "";
    }
  }
};
var events = {
  bind: function bind() {
    var options = this.options, viewer = this.viewer, canvas = this.canvas;
    var document2 = this.element.ownerDocument;
    addListener(viewer, EVENT_CLICK, this.onClick = this.click.bind(this));
    addListener(viewer, EVENT_DRAG_START, this.onDragStart = this.dragstart.bind(this));
    addListener(canvas, EVENT_POINTER_DOWN, this.onPointerDown = this.pointerdown.bind(this));
    addListener(document2, EVENT_POINTER_MOVE, this.onPointerMove = this.pointermove.bind(this));
    addListener(document2, EVENT_POINTER_UP, this.onPointerUp = this.pointerup.bind(this));
    addListener(document2, EVENT_KEY_DOWN, this.onKeyDown = this.keydown.bind(this));
    addListener(window, EVENT_RESIZE, this.onResize = this.resize.bind(this));
    if (options.zoomable && options.zoomOnWheel) {
      addListener(viewer, EVENT_WHEEL, this.onWheel = this.wheel.bind(this), {
        passive: false,
        capture: true
      });
    }
    if (options.toggleOnDblclick) {
      addListener(canvas, EVENT_DBLCLICK, this.onDblclick = this.dblclick.bind(this));
    }
  },
  unbind: function unbind() {
    var options = this.options, viewer = this.viewer, canvas = this.canvas;
    var document2 = this.element.ownerDocument;
    removeListener(viewer, EVENT_CLICK, this.onClick);
    removeListener(viewer, EVENT_DRAG_START, this.onDragStart);
    removeListener(canvas, EVENT_POINTER_DOWN, this.onPointerDown);
    removeListener(document2, EVENT_POINTER_MOVE, this.onPointerMove);
    removeListener(document2, EVENT_POINTER_UP, this.onPointerUp);
    removeListener(document2, EVENT_KEY_DOWN, this.onKeyDown);
    removeListener(window, EVENT_RESIZE, this.onResize);
    if (options.zoomable && options.zoomOnWheel) {
      removeListener(viewer, EVENT_WHEEL, this.onWheel, {
        passive: false,
        capture: true
      });
    }
    if (options.toggleOnDblclick) {
      removeListener(canvas, EVENT_DBLCLICK, this.onDblclick);
    }
  }
};
var handlers = {
  click: function click(event) {
    var options = this.options, imageData = this.imageData;
    var target = event.target;
    var action = getData(target, DATA_ACTION);
    if (!action && target.localName === "img" && target.parentElement.localName === "li") {
      target = target.parentElement;
      action = getData(target, DATA_ACTION);
    }
    if (IS_TOUCH_DEVICE && event.isTrusted && target === this.canvas) {
      clearTimeout(this.clickCanvasTimeout);
    }
    switch (action) {
      case "mix":
        if (this.played) {
          this.stop();
        } else if (options.inline) {
          if (this.fulled) {
            this.exit();
          } else {
            this.full();
          }
        } else {
          this.hide();
        }
        break;
      case "hide":
        if (!this.pointerMoved) {
          this.hide();
        }
        break;
      case "view":
        this.view(getData(target, "index"));
        break;
      case "zoom-in":
        this.zoom(0.1, true);
        break;
      case "zoom-out":
        this.zoom(-0.1, true);
        break;
      case "one-to-one":
        this.toggle();
        break;
      case "reset":
        this.reset();
        break;
      case "prev":
        this.prev(options.loop);
        break;
      case "play":
        this.play(options.fullscreen);
        break;
      case "next":
        this.next(options.loop);
        break;
      case "rotate-left":
        this.rotate(-90);
        break;
      case "rotate-right":
        this.rotate(90);
        break;
      case "flip-horizontal":
        this.scaleX(-imageData.scaleX || -1);
        break;
      case "flip-vertical":
        this.scaleY(-imageData.scaleY || -1);
        break;
      default:
        if (this.played) {
          this.stop();
        }
    }
  },
  dblclick: function dblclick(event) {
    event.preventDefault();
    if (this.viewed && event.target === this.image) {
      if (IS_TOUCH_DEVICE && event.isTrusted) {
        clearTimeout(this.doubleClickImageTimeout);
      }
      this.toggle(event.isTrusted ? event : event.detail && event.detail.originalEvent);
    }
  },
  load: function load() {
    var _this = this;
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = false;
    }
    var element = this.element, options = this.options, image = this.image, index = this.index, viewerData = this.viewerData;
    removeClass(image, CLASS_INVISIBLE);
    if (options.loading) {
      removeClass(this.canvas, CLASS_LOADING);
    }
    image.style.cssText = "height:0;" + "margin-left:".concat(viewerData.width / 2, "px;") + "margin-top:".concat(viewerData.height / 2, "px;") + "max-width:none!important;position:relative;width:0;";
    this.initImage(function() {
      toggleClass(image, CLASS_MOVE, options.movable);
      toggleClass(image, CLASS_TRANSITION, options.transition);
      _this.renderImage(function() {
        _this.viewed = true;
        _this.viewing = false;
        if (isFunction(options.viewed)) {
          addListener(element, EVENT_VIEWED, options.viewed, {
            once: true
          });
        }
        dispatchEvent(element, EVENT_VIEWED, {
          originalImage: _this.images[index],
          index,
          image
        }, {
          cancelable: false
        });
      });
    });
  },
  loadImage: function loadImage(event) {
    var image = event.target;
    var parent = image.parentNode;
    var parentWidth = parent.offsetWidth || 30;
    var parentHeight = parent.offsetHeight || 50;
    var filled = !!getData(image, "filled");
    getImageNaturalSizes(image, this.options, function(naturalWidth, naturalHeight) {
      var aspectRatio = naturalWidth / naturalHeight;
      var width = parentWidth;
      var height = parentHeight;
      if (parentHeight * aspectRatio > parentWidth) {
        if (filled) {
          width = parentHeight * aspectRatio;
        } else {
          height = parentWidth / aspectRatio;
        }
      } else if (filled) {
        height = parentWidth / aspectRatio;
      } else {
        width = parentHeight * aspectRatio;
      }
      setStyle(image, assign({
        width,
        height
      }, getTransforms({
        translateX: (parentWidth - width) / 2,
        translateY: (parentHeight - height) / 2
      })));
    });
  },
  keydown: function keydown(event) {
    var options = this.options;
    if (!options.keyboard) {
      return;
    }
    var keyCode = event.keyCode || event.which || event.charCode;
    switch (keyCode) {
      case 13:
        if (this.viewer.contains(event.target)) {
          this.click(event);
        }
        break;
    }
    if (!this.fulled) {
      return;
    }
    switch (keyCode) {
      case 27:
        if (this.played) {
          this.stop();
        } else if (options.inline) {
          if (this.fulled) {
            this.exit();
          }
        } else {
          this.hide();
        }
        break;
      case 32:
        if (this.played) {
          this.stop();
        }
        break;
      case 37:
        if (this.played && this.playing) {
          this.playing.prev();
        } else {
          this.prev(options.loop);
        }
        break;
      case 38:
        event.preventDefault();
        this.zoom(options.zoomRatio, true);
        break;
      case 39:
        if (this.played && this.playing) {
          this.playing.next();
        } else {
          this.next(options.loop);
        }
        break;
      case 40:
        event.preventDefault();
        this.zoom(-options.zoomRatio, true);
        break;
      case 48:
      case 49:
        if (event.ctrlKey) {
          event.preventDefault();
          this.toggle();
        }
        break;
    }
  },
  dragstart: function dragstart(event) {
    if (event.target.localName === "img") {
      event.preventDefault();
    }
  },
  pointerdown: function pointerdown(event) {
    var options = this.options, pointers = this.pointers;
    var buttons = event.buttons, button = event.button;
    this.pointerMoved = false;
    if (!this.viewed || this.showing || this.viewing || this.hiding || (event.type === "mousedown" || event.type === "pointerdown" && event.pointerType === "mouse") && // No primary button (Usually the left button)
    (isNumber(buttons) && buttons !== 1 || isNumber(button) && button !== 0 || event.ctrlKey)) {
      return;
    }
    event.preventDefault();
    if (event.changedTouches) {
      forEach(event.changedTouches, function(touch) {
        pointers[touch.identifier] = getPointer(touch);
      });
    } else {
      pointers[event.pointerId || 0] = getPointer(event);
    }
    var action = options.movable ? ACTION_MOVE : false;
    if (options.zoomOnTouch && options.zoomable && Object.keys(pointers).length > 1) {
      action = ACTION_ZOOM;
    } else if (options.slideOnTouch && (event.pointerType === "touch" || event.type === "touchstart") && this.isSwitchable()) {
      action = ACTION_SWITCH;
    }
    if (options.transition && (action === ACTION_MOVE || action === ACTION_ZOOM)) {
      removeClass(this.image, CLASS_TRANSITION);
    }
    this.action = action;
  },
  pointermove: function pointermove(event) {
    var pointers = this.pointers, action = this.action;
    if (!this.viewed || !action) {
      return;
    }
    event.preventDefault();
    if (event.changedTouches) {
      forEach(event.changedTouches, function(touch) {
        assign(pointers[touch.identifier] || {}, getPointer(touch, true));
      });
    } else {
      assign(pointers[event.pointerId || 0] || {}, getPointer(event, true));
    }
    this.change(event);
  },
  pointerup: function pointerup(event) {
    var _this2 = this;
    var options = this.options, action = this.action, pointers = this.pointers;
    var pointer;
    if (event.changedTouches) {
      forEach(event.changedTouches, function(touch) {
        pointer = pointers[touch.identifier];
        delete pointers[touch.identifier];
      });
    } else {
      pointer = pointers[event.pointerId || 0];
      delete pointers[event.pointerId || 0];
    }
    if (!action) {
      return;
    }
    event.preventDefault();
    if (options.transition && (action === ACTION_MOVE || action === ACTION_ZOOM)) {
      addClass(this.image, CLASS_TRANSITION);
    }
    this.action = false;
    if (IS_TOUCH_DEVICE && action !== ACTION_ZOOM && pointer && Date.now() - pointer.timeStamp < 500) {
      clearTimeout(this.clickCanvasTimeout);
      clearTimeout(this.doubleClickImageTimeout);
      if (options.toggleOnDblclick && this.viewed && event.target === this.image) {
        if (this.imageClicked) {
          this.imageClicked = false;
          this.doubleClickImageTimeout = setTimeout(function() {
            dispatchEvent(_this2.image, EVENT_DBLCLICK, {
              originalEvent: event
            });
          }, 50);
        } else {
          this.imageClicked = true;
          this.doubleClickImageTimeout = setTimeout(function() {
            _this2.imageClicked = false;
          }, 500);
        }
      } else {
        this.imageClicked = false;
        if (options.backdrop && options.backdrop !== "static" && event.target === this.canvas) {
          this.clickCanvasTimeout = setTimeout(function() {
            dispatchEvent(_this2.canvas, EVENT_CLICK, {
              originalEvent: event
            });
          }, 50);
        }
      }
    }
  },
  resize: function resize() {
    var _this3 = this;
    if (!this.isShown || this.hiding) {
      return;
    }
    if (this.fulled) {
      this.close();
      this.initBody();
      this.open();
    }
    this.initContainer();
    this.initViewer();
    this.renderViewer();
    this.renderList();
    if (this.viewed) {
      this.initImage(function() {
        _this3.renderImage();
      });
    }
    if (this.played) {
      if (this.options.fullscreen && this.fulled && !(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement)) {
        this.stop();
        return;
      }
      forEach(this.player.getElementsByTagName("img"), function(image) {
        addListener(image, EVENT_LOAD, _this3.loadImage.bind(_this3), {
          once: true
        });
        dispatchEvent(image, EVENT_LOAD);
      });
    }
  },
  wheel: function wheel(event) {
    var _this4 = this;
    if (!this.viewed) {
      return;
    }
    event.preventDefault();
    if (this.wheeling) {
      return;
    }
    this.wheeling = true;
    setTimeout(function() {
      _this4.wheeling = false;
    }, 50);
    var ratio = Number(this.options.zoomRatio) || 0.1;
    var delta = 1;
    if (event.deltaY) {
      delta = event.deltaY > 0 ? 1 : -1;
    } else if (event.wheelDelta) {
      delta = -event.wheelDelta / 120;
    } else if (event.detail) {
      delta = event.detail > 0 ? 1 : -1;
    }
    this.zoom(-delta * ratio, true, null, event);
  }
};
var methods = {
  /** Show the viewer (only available in modal mode)
   * @param {boolean} [immediate=false] - Indicates if show the viewer immediately or not.
   * @returns {Viewer} this
   */
  show: function show() {
    var immediate = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
    var element = this.element, options = this.options;
    if (options.inline || this.showing || this.isShown || this.showing) {
      return this;
    }
    if (!this.ready) {
      this.build();
      if (this.ready) {
        this.show(immediate);
      }
      return this;
    }
    if (isFunction(options.show)) {
      addListener(element, EVENT_SHOW, options.show, {
        once: true
      });
    }
    if (dispatchEvent(element, EVENT_SHOW) === false || !this.ready) {
      return this;
    }
    if (this.hiding) {
      this.transitioning.abort();
    }
    this.showing = true;
    this.open();
    var viewer = this.viewer;
    removeClass(viewer, CLASS_HIDE);
    viewer.setAttribute("role", "dialog");
    viewer.setAttribute("aria-labelledby", this.title.id);
    viewer.setAttribute("aria-modal", true);
    viewer.removeAttribute("aria-hidden");
    if (options.transition && !immediate) {
      var shown2 = this.shown.bind(this);
      this.transitioning = {
        abort: function abort() {
          removeListener(viewer, EVENT_TRANSITION_END, shown2);
          removeClass(viewer, CLASS_IN);
        }
      };
      addClass(viewer, CLASS_TRANSITION);
      viewer.initialOffsetWidth = viewer.offsetWidth;
      addListener(viewer, EVENT_TRANSITION_END, shown2, {
        once: true
      });
      addClass(viewer, CLASS_IN);
    } else {
      addClass(viewer, CLASS_IN);
      this.shown();
    }
    return this;
  },
  /**
   * Hide the viewer (only available in modal mode)
   * @param {boolean} [immediate=false] - Indicates if hide the viewer immediately or not.
   * @returns {Viewer} this
   */
  hide: function hide() {
    var _this = this;
    var immediate = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
    var element = this.element, options = this.options;
    if (options.inline || this.hiding || !(this.isShown || this.showing)) {
      return this;
    }
    if (isFunction(options.hide)) {
      addListener(element, EVENT_HIDE, options.hide, {
        once: true
      });
    }
    if (dispatchEvent(element, EVENT_HIDE) === false) {
      return this;
    }
    if (this.showing) {
      this.transitioning.abort();
    }
    this.hiding = true;
    if (this.played) {
      this.stop();
    } else if (this.viewing) {
      this.viewing.abort();
    }
    var viewer = this.viewer, image = this.image;
    var hideImmediately = function hideImmediately2() {
      removeClass(viewer, CLASS_IN);
      _this.hidden();
    };
    if (options.transition && !immediate) {
      var onViewerTransitionEnd = function onViewerTransitionEnd2(event) {
        if (event && event.target === viewer) {
          removeListener(viewer, EVENT_TRANSITION_END, onViewerTransitionEnd2);
          _this.hidden();
        }
      };
      var onImageTransitionEnd = function onImageTransitionEnd2() {
        if (hasClass(viewer, CLASS_TRANSITION)) {
          addListener(viewer, EVENT_TRANSITION_END, onViewerTransitionEnd);
          removeClass(viewer, CLASS_IN);
        } else {
          hideImmediately();
        }
      };
      this.transitioning = {
        abort: function abort() {
          if (_this.viewed && hasClass(image, CLASS_TRANSITION)) {
            removeListener(image, EVENT_TRANSITION_END, onImageTransitionEnd);
          } else if (hasClass(viewer, CLASS_TRANSITION)) {
            removeListener(viewer, EVENT_TRANSITION_END, onViewerTransitionEnd);
          }
        }
      };
      if (this.viewed && hasClass(image, CLASS_TRANSITION)) {
        addListener(image, EVENT_TRANSITION_END, onImageTransitionEnd, {
          once: true
        });
        this.zoomTo(0, false, null, null, true);
      } else {
        onImageTransitionEnd();
      }
    } else {
      hideImmediately();
    }
    return this;
  },
  /**
   * View one of the images with image's index
   * @param {number} index - The index of the image to view.
   * @returns {Viewer} this
   */
  view: function view() {
    var _this2 = this;
    var index = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.options.initialViewIndex;
    index = Number(index) || 0;
    if (this.hiding || this.played || index < 0 || index >= this.length || this.viewed && index === this.index) {
      return this;
    }
    if (!this.isShown) {
      this.index = index;
      return this.show();
    }
    if (this.viewing) {
      this.viewing.abort();
    }
    var element = this.element, options = this.options, title = this.title, canvas = this.canvas;
    var item = this.items[index];
    var img = item.querySelector("img");
    var url = getData(img, "originalUrl");
    var alt = img.getAttribute("alt");
    var image = document.createElement("img");
    forEach(options.inheritedAttributes, function(name) {
      var value = img.getAttribute(name);
      if (value !== null) {
        image.setAttribute(name, value);
      }
    });
    image.src = url;
    image.alt = alt;
    if (isFunction(options.view)) {
      addListener(element, EVENT_VIEW, options.view, {
        once: true
      });
    }
    if (dispatchEvent(element, EVENT_VIEW, {
      originalImage: this.images[index],
      index,
      image
    }) === false || !this.isShown || this.hiding || this.played) {
      return this;
    }
    var activeItem = this.items[this.index];
    if (activeItem) {
      removeClass(activeItem, CLASS_ACTIVE);
      activeItem.removeAttribute("aria-selected");
    }
    addClass(item, CLASS_ACTIVE);
    item.setAttribute("aria-selected", true);
    if (options.focus) {
      item.focus();
    }
    this.image = image;
    this.viewed = false;
    this.index = index;
    this.imageData = {};
    addClass(image, CLASS_INVISIBLE);
    if (options.loading) {
      addClass(canvas, CLASS_LOADING);
    }
    canvas.innerHTML = "";
    canvas.appendChild(image);
    this.renderList();
    title.innerHTML = "";
    var onViewed = function onViewed2() {
      var imageData = _this2.imageData;
      var render4 = Array.isArray(options.title) ? options.title[1] : options.title;
      title.innerHTML = escapeHTMLEntities(isFunction(render4) ? render4.call(_this2, image, imageData) : "".concat(alt, " (").concat(imageData.naturalWidth, " × ").concat(imageData.naturalHeight, ")"));
    };
    var onLoad;
    var onError;
    addListener(element, EVENT_VIEWED, onViewed, {
      once: true
    });
    this.viewing = {
      abort: function abort() {
        removeListener(element, EVENT_VIEWED, onViewed);
        if (image.complete) {
          if (_this2.imageRendering) {
            _this2.imageRendering.abort();
          } else if (_this2.imageInitializing) {
            _this2.imageInitializing.abort();
          }
        } else {
          image.src = "";
          removeListener(image, EVENT_LOAD, onLoad);
          if (_this2.timeout) {
            clearTimeout(_this2.timeout);
          }
        }
      }
    };
    if (image.complete) {
      this.load();
    } else {
      addListener(image, EVENT_LOAD, onLoad = function onLoad2() {
        removeListener(image, EVENT_ERROR, onError);
        _this2.load();
      }, {
        once: true
      });
      addListener(image, EVENT_ERROR, onError = function onError2() {
        removeListener(image, EVENT_LOAD, onLoad);
        if (_this2.timeout) {
          clearTimeout(_this2.timeout);
          _this2.timeout = false;
        }
        removeClass(image, CLASS_INVISIBLE);
        if (options.loading) {
          removeClass(_this2.canvas, CLASS_LOADING);
        }
      }, {
        once: true
      });
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      this.timeout = setTimeout(function() {
        removeClass(image, CLASS_INVISIBLE);
        _this2.timeout = false;
      }, 1e3);
    }
    return this;
  },
  /**
   * View the previous image
   * @param {boolean} [loop=false] - Indicate if view the last one
   * when it is the first one at present.
   * @returns {Viewer} this
   */
  prev: function prev() {
    var loop = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
    var index = this.index - 1;
    if (index < 0) {
      index = loop ? this.length - 1 : 0;
    }
    this.view(index);
    return this;
  },
  /**
   * View the next image
   * @param {boolean} [loop=false] - Indicate if view the first one
   * when it is the last one at present.
   * @returns {Viewer} this
   */
  next: function next() {
    var loop = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
    var maxIndex = this.length - 1;
    var index = this.index + 1;
    if (index > maxIndex) {
      index = loop ? 0 : maxIndex;
    }
    this.view(index);
    return this;
  },
  /**
   * Move the image with relative offsets.
   * @param {number} x - The moving distance in the horizontal direction.
   * @param {number} [y=x] The moving distance in the vertical direction.
   * @returns {Viewer} this
   */
  move: function move(x) {
    var y = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : x;
    var imageData = this.imageData;
    this.moveTo(isUndefined(x) ? x : imageData.x + Number(x), isUndefined(y) ? y : imageData.y + Number(y));
    return this;
  },
  /**
   * Move the image to an absolute point.
   * @param {number} x - The new position in the horizontal direction.
   * @param {number} [y=x] - The new position in the vertical direction.
   * @param {Event} [_originalEvent=null] - The original event if any.
   * @returns {Viewer} this
   */
  moveTo: function moveTo(x) {
    var _this3 = this;
    var y = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : x;
    var _originalEvent = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
    var element = this.element, options = this.options, imageData = this.imageData;
    x = Number(x);
    y = Number(y);
    if (this.viewed && !this.played && options.movable) {
      var oldX = imageData.x;
      var oldY = imageData.y;
      var changed = false;
      if (isNumber(x)) {
        changed = true;
      } else {
        x = oldX;
      }
      if (isNumber(y)) {
        changed = true;
      } else {
        y = oldY;
      }
      if (changed) {
        if (isFunction(options.move)) {
          addListener(element, EVENT_MOVE, options.move, {
            once: true
          });
        }
        if (dispatchEvent(element, EVENT_MOVE, {
          x,
          y,
          oldX,
          oldY,
          originalEvent: _originalEvent
        }) === false) {
          return this;
        }
        imageData.x = x;
        imageData.y = y;
        imageData.left = x;
        imageData.top = y;
        this.moving = true;
        this.renderImage(function() {
          _this3.moving = false;
          if (isFunction(options.moved)) {
            addListener(element, EVENT_MOVED, options.moved, {
              once: true
            });
          }
          dispatchEvent(element, EVENT_MOVED, {
            x,
            y,
            oldX,
            oldY,
            originalEvent: _originalEvent
          }, {
            cancelable: false
          });
        });
      }
    }
    return this;
  },
  /**
   * Rotate the image with a relative degree.
   * @param {number} degree - The rotate degree.
   * @returns {Viewer} this
   */
  rotate: function rotate(degree) {
    this.rotateTo((this.imageData.rotate || 0) + Number(degree));
    return this;
  },
  /**
   * Rotate the image to an absolute degree.
   * @param {number} degree - The rotate degree.
   * @returns {Viewer} this
   */
  rotateTo: function rotateTo(degree) {
    var _this4 = this;
    var element = this.element, options = this.options, imageData = this.imageData;
    degree = Number(degree);
    if (isNumber(degree) && this.viewed && !this.played && options.rotatable) {
      var oldDegree = imageData.rotate;
      if (isFunction(options.rotate)) {
        addListener(element, EVENT_ROTATE, options.rotate, {
          once: true
        });
      }
      if (dispatchEvent(element, EVENT_ROTATE, {
        degree,
        oldDegree
      }) === false) {
        return this;
      }
      imageData.rotate = degree;
      this.rotating = true;
      this.renderImage(function() {
        _this4.rotating = false;
        if (isFunction(options.rotated)) {
          addListener(element, EVENT_ROTATED, options.rotated, {
            once: true
          });
        }
        dispatchEvent(element, EVENT_ROTATED, {
          degree,
          oldDegree
        }, {
          cancelable: false
        });
      });
    }
    return this;
  },
  /**
   * Scale the image on the x-axis.
   * @param {number} scaleX - The scale ratio on the x-axis.
   * @returns {Viewer} this
   */
  scaleX: function scaleX(_scaleX) {
    this.scale(_scaleX, this.imageData.scaleY);
    return this;
  },
  /**
   * Scale the image on the y-axis.
   * @param {number} scaleY - The scale ratio on the y-axis.
   * @returns {Viewer} this
   */
  scaleY: function scaleY(_scaleY) {
    this.scale(this.imageData.scaleX, _scaleY);
    return this;
  },
  /**
   * Scale the image.
   * @param {number} scaleX - The scale ratio on the x-axis.
   * @param {number} [scaleY=scaleX] - The scale ratio on the y-axis.
   * @returns {Viewer} this
   */
  scale: function scale(scaleX2) {
    var _this5 = this;
    var scaleY2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : scaleX2;
    var element = this.element, options = this.options, imageData = this.imageData;
    scaleX2 = Number(scaleX2);
    scaleY2 = Number(scaleY2);
    if (this.viewed && !this.played && options.scalable) {
      var oldScaleX = imageData.scaleX;
      var oldScaleY = imageData.scaleY;
      var changed = false;
      if (isNumber(scaleX2)) {
        changed = true;
      } else {
        scaleX2 = oldScaleX;
      }
      if (isNumber(scaleY2)) {
        changed = true;
      } else {
        scaleY2 = oldScaleY;
      }
      if (changed) {
        if (isFunction(options.scale)) {
          addListener(element, EVENT_SCALE, options.scale, {
            once: true
          });
        }
        if (dispatchEvent(element, EVENT_SCALE, {
          scaleX: scaleX2,
          scaleY: scaleY2,
          oldScaleX,
          oldScaleY
        }) === false) {
          return this;
        }
        imageData.scaleX = scaleX2;
        imageData.scaleY = scaleY2;
        this.scaling = true;
        this.renderImage(function() {
          _this5.scaling = false;
          if (isFunction(options.scaled)) {
            addListener(element, EVENT_SCALED, options.scaled, {
              once: true
            });
          }
          dispatchEvent(element, EVENT_SCALED, {
            scaleX: scaleX2,
            scaleY: scaleY2,
            oldScaleX,
            oldScaleY
          }, {
            cancelable: false
          });
        });
      }
    }
    return this;
  },
  /**
   * Zoom the image with a relative ratio.
   * @param {number} ratio - The target ratio.
   * @param {boolean} [showTooltip=false] - Indicates whether to show the tooltip.
   * @param {Object} [pivot] - The pivot point coordinate for zooming.
   * @param {Event} [_originalEvent=null] - The original event if any.
   * @returns {Viewer} this
   */
  zoom: function zoom(ratio) {
    var showTooltip = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
    var pivot = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
    var _originalEvent = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
    var imageData = this.imageData;
    ratio = Number(ratio);
    if (ratio < 0) {
      ratio = 1 / (1 - ratio);
    } else {
      ratio = 1 + ratio;
    }
    this.zoomTo(imageData.width * ratio / imageData.naturalWidth, showTooltip, pivot, _originalEvent);
    return this;
  },
  /**
   * Zoom the image to an absolute ratio.
   * @param {number} ratio - The target ratio.
   * @param {boolean} [showTooltip] - Indicates whether to show the tooltip.
   * @param {Object} [pivot] - The pivot point coordinate for zooming.
   * @param {Event} [_originalEvent=null] - The original event if any.
   * @param {Event} [_zoomable=false] - Indicates if the current zoom is available or not.
   * @returns {Viewer} this
   */
  zoomTo: function zoomTo(ratio) {
    var _this6 = this;
    var showTooltip = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
    var pivot = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
    var _originalEvent = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
    var _zoomable = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : false;
    var element = this.element, options = this.options, pointers = this.pointers, imageData = this.imageData;
    var x = imageData.x, y = imageData.y, width = imageData.width, height = imageData.height, naturalWidth = imageData.naturalWidth, naturalHeight = imageData.naturalHeight;
    ratio = Math.max(0, ratio);
    if (isNumber(ratio) && this.viewed && !this.played && (_zoomable || options.zoomable)) {
      if (!_zoomable) {
        var minZoomRatio = Math.max(0.01, options.minZoomRatio);
        var maxZoomRatio = Math.min(100, options.maxZoomRatio);
        ratio = Math.min(Math.max(ratio, minZoomRatio), maxZoomRatio);
      }
      if (_originalEvent) {
        switch (_originalEvent.type) {
          case "wheel":
            if (options.zoomRatio >= 0.055 && ratio > 0.95 && ratio < 1.05) {
              ratio = 1;
            }
            break;
          case "pointermove":
          case "touchmove":
          case "mousemove":
            if (ratio > 0.99 && ratio < 1.01) {
              ratio = 1;
            }
            break;
        }
      }
      var newWidth = naturalWidth * ratio;
      var newHeight = naturalHeight * ratio;
      var offsetWidth = newWidth - width;
      var offsetHeight = newHeight - height;
      var oldRatio = imageData.ratio;
      if (isFunction(options.zoom)) {
        addListener(element, EVENT_ZOOM, options.zoom, {
          once: true
        });
      }
      if (dispatchEvent(element, EVENT_ZOOM, {
        ratio,
        oldRatio,
        originalEvent: _originalEvent
      }) === false) {
        return this;
      }
      this.zooming = true;
      if (_originalEvent) {
        var offset = getOffset(this.viewer);
        var center = pointers && Object.keys(pointers).length > 0 ? getPointersCenter(pointers) : {
          pageX: _originalEvent.pageX,
          pageY: _originalEvent.pageY
        };
        imageData.x -= offsetWidth * ((center.pageX - offset.left - x) / width);
        imageData.y -= offsetHeight * ((center.pageY - offset.top - y) / height);
      } else if (isPlainObject(pivot) && isNumber(pivot.x) && isNumber(pivot.y)) {
        imageData.x -= offsetWidth * ((pivot.x - x) / width);
        imageData.y -= offsetHeight * ((pivot.y - y) / height);
      } else {
        imageData.x -= offsetWidth / 2;
        imageData.y -= offsetHeight / 2;
      }
      imageData.left = imageData.x;
      imageData.top = imageData.y;
      imageData.width = newWidth;
      imageData.height = newHeight;
      imageData.oldRatio = oldRatio;
      imageData.ratio = ratio;
      this.renderImage(function() {
        _this6.zooming = false;
        if (isFunction(options.zoomed)) {
          addListener(element, EVENT_ZOOMED, options.zoomed, {
            once: true
          });
        }
        dispatchEvent(element, EVENT_ZOOMED, {
          ratio,
          oldRatio,
          originalEvent: _originalEvent
        }, {
          cancelable: false
        });
      });
      if (showTooltip) {
        this.tooltip();
      }
    }
    return this;
  },
  /**
   * Play the images
   * @param {boolean|FullscreenOptions} [fullscreen=false] - Indicate if request fullscreen or not.
   * @returns {Viewer} this
   */
  play: function play() {
    var _this7 = this;
    var fullscreen = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
    if (!this.isShown || this.played) {
      return this;
    }
    var element = this.element, options = this.options;
    if (isFunction(options.play)) {
      addListener(element, EVENT_PLAY, options.play, {
        once: true
      });
    }
    if (dispatchEvent(element, EVENT_PLAY) === false) {
      return this;
    }
    var player = this.player;
    var onLoad = this.loadImage.bind(this);
    var list = [];
    var total = 0;
    var index = 0;
    this.played = true;
    this.onLoadWhenPlay = onLoad;
    if (fullscreen) {
      this.requestFullscreen(fullscreen);
    }
    addClass(player, CLASS_SHOW);
    forEach(this.items, function(item, i) {
      var img = item.querySelector("img");
      var image = document.createElement("img");
      image.src = getData(img, "originalUrl");
      image.alt = img.getAttribute("alt");
      image.referrerPolicy = img.referrerPolicy;
      total += 1;
      addClass(image, CLASS_FADE);
      toggleClass(image, CLASS_TRANSITION, options.transition);
      if (hasClass(item, CLASS_ACTIVE)) {
        addClass(image, CLASS_IN);
        index = i;
      }
      list.push(image);
      addListener(image, EVENT_LOAD, onLoad, {
        once: true
      });
      player.appendChild(image);
    });
    if (isNumber(options.interval) && options.interval > 0) {
      var prev2 = function prev3() {
        clearTimeout(_this7.playing.timeout);
        removeClass(list[index], CLASS_IN);
        index -= 1;
        index = index >= 0 ? index : total - 1;
        addClass(list[index], CLASS_IN);
        _this7.playing.timeout = setTimeout(prev3, options.interval);
      };
      var next2 = function next3() {
        clearTimeout(_this7.playing.timeout);
        removeClass(list[index], CLASS_IN);
        index += 1;
        index = index < total ? index : 0;
        addClass(list[index], CLASS_IN);
        _this7.playing.timeout = setTimeout(next3, options.interval);
      };
      if (total > 1) {
        this.playing = {
          prev: prev2,
          next: next2,
          timeout: setTimeout(next2, options.interval)
        };
      }
    }
    return this;
  },
  // Stop play
  stop: function stop() {
    var _this8 = this;
    if (!this.played) {
      return this;
    }
    var element = this.element, options = this.options;
    if (isFunction(options.stop)) {
      addListener(element, EVENT_STOP, options.stop, {
        once: true
      });
    }
    if (dispatchEvent(element, EVENT_STOP) === false) {
      return this;
    }
    var player = this.player;
    clearTimeout(this.playing.timeout);
    this.playing = false;
    this.played = false;
    forEach(player.getElementsByTagName("img"), function(image) {
      removeListener(image, EVENT_LOAD, _this8.onLoadWhenPlay);
    });
    removeClass(player, CLASS_SHOW);
    player.innerHTML = "";
    this.exitFullscreen();
    return this;
  },
  // Enter modal mode (only available in inline mode)
  full: function full() {
    var _this9 = this;
    var options = this.options, viewer = this.viewer, image = this.image, list = this.list;
    if (!this.isShown || this.played || this.fulled || !options.inline) {
      return this;
    }
    this.fulled = true;
    this.open();
    addClass(this.button, CLASS_FULLSCREEN_EXIT);
    if (options.transition) {
      removeClass(list, CLASS_TRANSITION);
      if (this.viewed) {
        removeClass(image, CLASS_TRANSITION);
      }
    }
    addClass(viewer, CLASS_FIXED);
    viewer.setAttribute("role", "dialog");
    viewer.setAttribute("aria-labelledby", this.title.id);
    viewer.setAttribute("aria-modal", true);
    viewer.removeAttribute("style");
    setStyle(viewer, {
      zIndex: options.zIndex
    });
    if (options.focus) {
      this.enforceFocus();
    }
    this.initContainer();
    this.viewerData = assign({}, this.containerData);
    this.renderList();
    if (this.viewed) {
      this.initImage(function() {
        _this9.renderImage(function() {
          if (options.transition) {
            setTimeout(function() {
              addClass(image, CLASS_TRANSITION);
              addClass(list, CLASS_TRANSITION);
            }, 0);
          }
        });
      });
    }
    return this;
  },
  // Exit modal mode (only available in inline mode)
  exit: function exit() {
    var _this10 = this;
    var options = this.options, viewer = this.viewer, image = this.image, list = this.list;
    if (!this.isShown || this.played || !this.fulled || !options.inline) {
      return this;
    }
    this.fulled = false;
    this.close();
    removeClass(this.button, CLASS_FULLSCREEN_EXIT);
    if (options.transition) {
      removeClass(list, CLASS_TRANSITION);
      if (this.viewed) {
        removeClass(image, CLASS_TRANSITION);
      }
    }
    if (options.focus) {
      this.clearEnforceFocus();
    }
    viewer.removeAttribute("role");
    viewer.removeAttribute("aria-labelledby");
    viewer.removeAttribute("aria-modal");
    removeClass(viewer, CLASS_FIXED);
    setStyle(viewer, {
      zIndex: options.zIndexInline
    });
    this.viewerData = assign({}, this.parentData);
    this.renderViewer();
    this.renderList();
    if (this.viewed) {
      this.initImage(function() {
        _this10.renderImage(function() {
          if (options.transition) {
            setTimeout(function() {
              addClass(image, CLASS_TRANSITION);
              addClass(list, CLASS_TRANSITION);
            }, 0);
          }
        });
      });
    }
    return this;
  },
  // Show the current ratio of the image with percentage
  tooltip: function tooltip() {
    var _this11 = this;
    var options = this.options, tooltipBox = this.tooltipBox, imageData = this.imageData;
    if (!this.viewed || this.played || !options.tooltip) {
      return this;
    }
    tooltipBox.textContent = "".concat(Math.round(imageData.ratio * 100), "%");
    if (!this.tooltipping) {
      if (options.transition) {
        if (this.fading) {
          dispatchEvent(tooltipBox, EVENT_TRANSITION_END);
        }
        addClass(tooltipBox, CLASS_SHOW);
        addClass(tooltipBox, CLASS_FADE);
        addClass(tooltipBox, CLASS_TRANSITION);
        tooltipBox.removeAttribute("aria-hidden");
        tooltipBox.initialOffsetWidth = tooltipBox.offsetWidth;
        addClass(tooltipBox, CLASS_IN);
      } else {
        addClass(tooltipBox, CLASS_SHOW);
        tooltipBox.removeAttribute("aria-hidden");
      }
    } else {
      clearTimeout(this.tooltipping);
    }
    this.tooltipping = setTimeout(function() {
      if (options.transition) {
        addListener(tooltipBox, EVENT_TRANSITION_END, function() {
          removeClass(tooltipBox, CLASS_SHOW);
          removeClass(tooltipBox, CLASS_FADE);
          removeClass(tooltipBox, CLASS_TRANSITION);
          tooltipBox.setAttribute("aria-hidden", true);
          _this11.fading = false;
        }, {
          once: true
        });
        removeClass(tooltipBox, CLASS_IN);
        _this11.fading = true;
      } else {
        removeClass(tooltipBox, CLASS_SHOW);
        tooltipBox.setAttribute("aria-hidden", true);
      }
      _this11.tooltipping = false;
    }, 1e3);
    return this;
  },
  /**
   * Toggle the image size between its current size and natural size
   * @param {Event} [_originalEvent=null] - The original event if any.
   * @returns {Viewer} this
   */
  toggle: function toggle() {
    var _originalEvent = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;
    if (this.imageData.ratio === 1) {
      this.zoomTo(this.imageData.oldRatio, true, null, _originalEvent);
    } else {
      this.zoomTo(1, true, null, _originalEvent);
    }
    return this;
  },
  // Reset the image to its initial state
  reset: function reset() {
    if (this.viewed && !this.played) {
      this.imageData = assign({}, this.initialImageData);
      this.renderImage();
    }
    return this;
  },
  // Update viewer when images changed
  update: function update() {
    var _this12 = this;
    var element = this.element, options = this.options, isImg = this.isImg;
    if (isImg && !element.parentNode) {
      return this.destroy();
    }
    var images = [];
    forEach(isImg ? [element] : element.querySelectorAll("img"), function(image) {
      if (isFunction(options.filter)) {
        if (options.filter.call(_this12, image)) {
          images.push(image);
        }
      } else if (_this12.getImageURL(image)) {
        images.push(image);
      }
    });
    if (!images.length) {
      return this;
    }
    this.images = images;
    this.length = images.length;
    if (this.ready) {
      var changedIndexes = [];
      forEach(this.items, function(item, i) {
        var img = item.querySelector("img");
        var image = images[i];
        if (image && img) {
          if (image.src !== img.src || image.alt !== img.alt) {
            changedIndexes.push(i);
          }
        } else {
          changedIndexes.push(i);
        }
      });
      setStyle(this.list, {
        width: "auto"
      });
      this.initList();
      if (this.isShown) {
        if (this.length) {
          if (this.viewed) {
            var changedIndex = changedIndexes.indexOf(this.index);
            if (changedIndex >= 0) {
              this.viewed = false;
              this.view(Math.max(Math.min(this.index - changedIndex, this.length - 1), 0));
            } else {
              var activeItem = this.items[this.index];
              addClass(activeItem, CLASS_ACTIVE);
              activeItem.setAttribute("aria-selected", true);
            }
          }
        } else {
          this.image = null;
          this.viewed = false;
          this.index = 0;
          this.imageData = {};
          this.canvas.innerHTML = "";
          this.title.innerHTML = "";
        }
      }
    } else {
      this.build();
    }
    return this;
  },
  // Destroy the viewer
  destroy: function destroy() {
    var element = this.element, options = this.options;
    if (!element[NAMESPACE]) {
      return this;
    }
    this.destroyed = true;
    if (this.ready) {
      if (this.played) {
        this.stop();
      }
      if (options.inline) {
        if (this.fulled) {
          this.exit();
        }
        this.unbind();
      } else if (this.isShown) {
        if (this.viewing) {
          if (this.imageRendering) {
            this.imageRendering.abort();
          } else if (this.imageInitializing) {
            this.imageInitializing.abort();
          }
        }
        if (this.hiding) {
          this.transitioning.abort();
        }
        this.hidden();
      } else if (this.showing) {
        this.transitioning.abort();
        this.hidden();
      }
      this.ready = false;
      this.viewer.parentNode.removeChild(this.viewer);
    } else if (options.inline) {
      if (this.delaying) {
        this.delaying.abort();
      } else if (this.initializing) {
        this.initializing.abort();
      }
    }
    if (!options.inline) {
      removeListener(element, EVENT_CLICK, this.onStart);
    }
    element[NAMESPACE] = void 0;
    return this;
  }
};
var others = {
  getImageURL: function getImageURL(image) {
    var url = this.options.url;
    if (isString(url)) {
      url = image.getAttribute(url);
    } else if (isFunction(url)) {
      url = url.call(this, image);
    } else {
      url = "";
    }
    return url;
  },
  enforceFocus: function enforceFocus() {
    var _this = this;
    this.clearEnforceFocus();
    addListener(document, EVENT_FOCUSIN, this.onFocusin = function(event) {
      var viewer = _this.viewer;
      var target = event.target;
      if (target === document || target === viewer || viewer.contains(target)) {
        return;
      }
      while (target) {
        if (target.getAttribute("tabindex") !== null || target.getAttribute("aria-modal") === "true") {
          return;
        }
        target = target.parentElement;
      }
      viewer.focus();
    });
  },
  clearEnforceFocus: function clearEnforceFocus() {
    if (this.onFocusin) {
      removeListener(document, EVENT_FOCUSIN, this.onFocusin);
      this.onFocusin = null;
    }
  },
  open: function open() {
    var body = this.body;
    addClass(body, CLASS_OPEN);
    if (this.scrollbarWidth > 0) {
      body.style.paddingRight = "".concat(this.scrollbarWidth + (parseFloat(this.initialBodyComputedPaddingRight) || 0), "px");
    }
  },
  close: function close() {
    var body = this.body;
    removeClass(body, CLASS_OPEN);
    if (this.scrollbarWidth > 0) {
      body.style.paddingRight = this.initialBodyPaddingRight;
    }
  },
  shown: function shown() {
    var element = this.element, options = this.options, viewer = this.viewer;
    this.fulled = true;
    this.isShown = true;
    this.render();
    this.bind();
    this.showing = false;
    if (options.focus) {
      viewer.focus();
      this.enforceFocus();
    }
    if (isFunction(options.shown)) {
      addListener(element, EVENT_SHOWN, options.shown, {
        once: true
      });
    }
    if (dispatchEvent(element, EVENT_SHOWN) === false) {
      return;
    }
    if (this.ready && this.isShown && !this.hiding) {
      this.view(this.index);
    }
  },
  hidden: function hidden() {
    var element = this.element, options = this.options, viewer = this.viewer;
    if (options.fucus) {
      this.clearEnforceFocus();
    }
    this.close();
    this.unbind();
    addClass(viewer, CLASS_HIDE);
    viewer.removeAttribute("role");
    viewer.removeAttribute("aria-labelledby");
    viewer.removeAttribute("aria-modal");
    viewer.setAttribute("aria-hidden", true);
    this.resetList();
    this.resetImage();
    this.fulled = false;
    this.viewed = false;
    this.isShown = false;
    this.hiding = false;
    if (!this.destroyed) {
      if (isFunction(options.hidden)) {
        addListener(element, EVENT_HIDDEN, options.hidden, {
          once: true
        });
      }
      dispatchEvent(element, EVENT_HIDDEN, null, {
        cancelable: false
      });
    }
  },
  requestFullscreen: function requestFullscreen(options) {
    var document2 = this.element.ownerDocument;
    if (this.fulled && !(document2.fullscreenElement || document2.webkitFullscreenElement || document2.mozFullScreenElement || document2.msFullscreenElement)) {
      var documentElement = document2.documentElement;
      if (documentElement.requestFullscreen) {
        if (isPlainObject(options)) {
          documentElement.requestFullscreen(options);
        } else {
          documentElement.requestFullscreen();
        }
      } else if (documentElement.webkitRequestFullscreen) {
        documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      } else if (documentElement.mozRequestFullScreen) {
        documentElement.mozRequestFullScreen();
      } else if (documentElement.msRequestFullscreen) {
        documentElement.msRequestFullscreen();
      }
    }
  },
  exitFullscreen: function exitFullscreen() {
    var document2 = this.element.ownerDocument;
    if (this.fulled && (document2.fullscreenElement || document2.webkitFullscreenElement || document2.mozFullScreenElement || document2.msFullscreenElement)) {
      if (document2.exitFullscreen) {
        document2.exitFullscreen();
      } else if (document2.webkitExitFullscreen) {
        document2.webkitExitFullscreen();
      } else if (document2.mozCancelFullScreen) {
        document2.mozCancelFullScreen();
      } else if (document2.msExitFullscreen) {
        document2.msExitFullscreen();
      }
    }
  },
  change: function change(event) {
    var options = this.options, pointers = this.pointers;
    var pointer = pointers[Object.keys(pointers)[0]];
    if (!pointer) {
      return;
    }
    var offsetX = pointer.endX - pointer.startX;
    var offsetY = pointer.endY - pointer.startY;
    switch (this.action) {
      case ACTION_MOVE:
        if (offsetX !== 0 || offsetY !== 0) {
          this.pointerMoved = true;
          this.move(offsetX, offsetY, event);
        }
        break;
      case ACTION_ZOOM:
        this.zoom(getMaxZoomRatio(pointers), false, null, event);
        break;
      case ACTION_SWITCH: {
        this.action = "switched";
        var absoluteOffsetX = Math.abs(offsetX);
        if (absoluteOffsetX > 1 && absoluteOffsetX > Math.abs(offsetY)) {
          this.pointers = {};
          if (offsetX > 1) {
            this.prev(options.loop);
          } else if (offsetX < -1) {
            this.next(options.loop);
          }
        }
        break;
      }
    }
    forEach(pointers, function(p) {
      p.startX = p.endX;
      p.startY = p.endY;
    });
  },
  isSwitchable: function isSwitchable() {
    var imageData = this.imageData, viewerData = this.viewerData;
    return this.length > 1 && imageData.x >= 0 && imageData.y >= 0 && imageData.width <= viewerData.width && imageData.height <= viewerData.height;
  }
};
var AnotherViewer = WINDOW.Viewer;
var getUniqueID = /* @__PURE__ */ function(id) {
  return function() {
    id += 1;
    return id;
  };
}(-1);
var Viewer = function() {
  function Viewer2(element) {
    var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    _classCallCheck(this, Viewer2);
    if (!element || element.nodeType !== 1) {
      throw new Error("The first argument is required and must be an element.");
    }
    this.element = element;
    this.options = assign({}, DEFAULTS, isPlainObject(options) && options);
    this.action = false;
    this.fading = false;
    this.fulled = false;
    this.hiding = false;
    this.imageClicked = false;
    this.imageData = {};
    this.index = this.options.initialViewIndex;
    this.isImg = false;
    this.isShown = false;
    this.length = 0;
    this.moving = false;
    this.played = false;
    this.playing = false;
    this.pointers = {};
    this.ready = false;
    this.rotating = false;
    this.scaling = false;
    this.showing = false;
    this.timeout = false;
    this.tooltipping = false;
    this.viewed = false;
    this.viewing = false;
    this.wheeling = false;
    this.zooming = false;
    this.pointerMoved = false;
    this.id = getUniqueID();
    this.init();
  }
  _createClass(Viewer2, [{
    key: "init",
    value: function init() {
      var _this = this;
      var element = this.element, options = this.options;
      if (element[NAMESPACE]) {
        return;
      }
      element[NAMESPACE] = this;
      if (options.focus && !options.keyboard) {
        options.focus = false;
      }
      var isImg = element.localName === "img";
      var images = [];
      forEach(isImg ? [element] : element.querySelectorAll("img"), function(image) {
        if (isFunction(options.filter)) {
          if (options.filter.call(_this, image)) {
            images.push(image);
          }
        } else if (_this.getImageURL(image)) {
          images.push(image);
        }
      });
      this.isImg = isImg;
      this.length = images.length;
      this.images = images;
      this.initBody();
      if (isUndefined(document.createElement(NAMESPACE).style.transition)) {
        options.transition = false;
      }
      if (options.inline) {
        var count = 0;
        var progress = function progress2() {
          count += 1;
          if (count === _this.length) {
            var timeout;
            _this.initializing = false;
            _this.delaying = {
              abort: function abort() {
                clearTimeout(timeout);
              }
            };
            timeout = setTimeout(function() {
              _this.delaying = false;
              _this.build();
            }, 0);
          }
        };
        this.initializing = {
          abort: function abort() {
            forEach(images, function(image) {
              if (!image.complete) {
                removeListener(image, EVENT_LOAD, progress);
                removeListener(image, EVENT_ERROR, progress);
              }
            });
          }
        };
        forEach(images, function(image) {
          if (image.complete) {
            progress();
          } else {
            var onLoad;
            var onError;
            addListener(image, EVENT_LOAD, onLoad = function onLoad2() {
              removeListener(image, EVENT_ERROR, onError);
              progress();
            }, {
              once: true
            });
            addListener(image, EVENT_ERROR, onError = function onError2() {
              removeListener(image, EVENT_LOAD, onLoad);
              progress();
            }, {
              once: true
            });
          }
        });
      } else {
        addListener(element, EVENT_CLICK, this.onStart = function(_ref) {
          var target = _ref.target;
          if (target.localName === "img" && (!isFunction(options.filter) || options.filter.call(_this, target))) {
            _this.view(_this.images.indexOf(target));
          }
        });
      }
    }
  }, {
    key: "build",
    value: function build() {
      if (this.ready) {
        return;
      }
      var element = this.element, options = this.options;
      var parent = element.parentNode;
      var template = document.createElement("div");
      template.innerHTML = TEMPLATE;
      var viewer = template.querySelector(".".concat(NAMESPACE, "-container"));
      var title = viewer.querySelector(".".concat(NAMESPACE, "-title"));
      var toolbar = viewer.querySelector(".".concat(NAMESPACE, "-toolbar"));
      var navbar = viewer.querySelector(".".concat(NAMESPACE, "-navbar"));
      var button = viewer.querySelector(".".concat(NAMESPACE, "-button"));
      var canvas = viewer.querySelector(".".concat(NAMESPACE, "-canvas"));
      this.parent = parent;
      this.viewer = viewer;
      this.title = title;
      this.toolbar = toolbar;
      this.navbar = navbar;
      this.button = button;
      this.canvas = canvas;
      this.footer = viewer.querySelector(".".concat(NAMESPACE, "-footer"));
      this.tooltipBox = viewer.querySelector(".".concat(NAMESPACE, "-tooltip"));
      this.player = viewer.querySelector(".".concat(NAMESPACE, "-player"));
      this.list = viewer.querySelector(".".concat(NAMESPACE, "-list"));
      viewer.id = "".concat(NAMESPACE).concat(this.id);
      title.id = "".concat(NAMESPACE, "Title").concat(this.id);
      addClass(title, !options.title ? CLASS_HIDE : getResponsiveClass(Array.isArray(options.title) ? options.title[0] : options.title));
      addClass(navbar, !options.navbar ? CLASS_HIDE : getResponsiveClass(options.navbar));
      toggleClass(button, CLASS_HIDE, !options.button);
      if (options.keyboard) {
        button.setAttribute("tabindex", 0);
      }
      if (options.backdrop) {
        addClass(viewer, "".concat(NAMESPACE, "-backdrop"));
        if (!options.inline && options.backdrop !== "static") {
          setData(canvas, DATA_ACTION, "hide");
        }
      }
      if (isString(options.className) && options.className) {
        options.className.split(REGEXP_SPACES).forEach(function(className) {
          addClass(viewer, className);
        });
      }
      if (options.toolbar) {
        var list = document.createElement("ul");
        var custom = isPlainObject(options.toolbar);
        var zoomButtons = BUTTONS.slice(0, 3);
        var rotateButtons = BUTTONS.slice(7, 9);
        var scaleButtons = BUTTONS.slice(9);
        if (!custom) {
          addClass(toolbar, getResponsiveClass(options.toolbar));
        }
        forEach(custom ? options.toolbar : BUTTONS, function(value, index) {
          var deep = custom && isPlainObject(value);
          var name = custom ? hyphenate(index) : value;
          var show2 = deep && !isUndefined(value.show) ? value.show : value;
          if (!show2 || !options.zoomable && zoomButtons.indexOf(name) !== -1 || !options.rotatable && rotateButtons.indexOf(name) !== -1 || !options.scalable && scaleButtons.indexOf(name) !== -1) {
            return;
          }
          var size = deep && !isUndefined(value.size) ? value.size : value;
          var click2 = deep && !isUndefined(value.click) ? value.click : value;
          var item = document.createElement("li");
          if (options.keyboard) {
            item.setAttribute("tabindex", 0);
          }
          item.setAttribute("role", "button");
          addClass(item, "".concat(NAMESPACE, "-").concat(name));
          if (!isFunction(click2)) {
            setData(item, DATA_ACTION, name);
          }
          if (isNumber(show2)) {
            addClass(item, getResponsiveClass(show2));
          }
          if (["small", "large"].indexOf(size) !== -1) {
            addClass(item, "".concat(NAMESPACE, "-").concat(size));
          } else if (name === "play") {
            addClass(item, "".concat(NAMESPACE, "-large"));
          }
          if (isFunction(click2)) {
            addListener(item, EVENT_CLICK, click2);
          }
          list.appendChild(item);
        });
        toolbar.appendChild(list);
      } else {
        addClass(toolbar, CLASS_HIDE);
      }
      if (!options.rotatable) {
        var rotates = toolbar.querySelectorAll('li[class*="rotate"]');
        addClass(rotates, CLASS_INVISIBLE);
        forEach(rotates, function(rotate2) {
          toolbar.appendChild(rotate2);
        });
      }
      if (options.inline) {
        addClass(button, CLASS_FULLSCREEN);
        setStyle(viewer, {
          zIndex: options.zIndexInline
        });
        if (window.getComputedStyle(parent).position === "static") {
          setStyle(parent, {
            position: "relative"
          });
        }
        parent.insertBefore(viewer, element.nextSibling);
      } else {
        addClass(button, CLASS_CLOSE);
        addClass(viewer, CLASS_FIXED);
        addClass(viewer, CLASS_FADE);
        addClass(viewer, CLASS_HIDE);
        setStyle(viewer, {
          zIndex: options.zIndex
        });
        var container = options.container;
        if (isString(container)) {
          container = element.ownerDocument.querySelector(container);
        }
        if (!container) {
          container = this.body;
        }
        container.appendChild(viewer);
      }
      if (options.inline) {
        this.render();
        this.bind();
        this.isShown = true;
      }
      this.ready = true;
      if (isFunction(options.ready)) {
        addListener(element, EVENT_READY, options.ready, {
          once: true
        });
      }
      if (dispatchEvent(element, EVENT_READY) === false) {
        this.ready = false;
        return;
      }
      if (this.ready && options.inline) {
        this.view(this.index);
      }
    }
    /**
     * Get the no conflict viewer class.
     * @returns {Viewer} The viewer class.
     */
  }], [{
    key: "noConflict",
    value: function noConflict() {
      window.Viewer = AnotherViewer;
      return Viewer2;
    }
    /**
     * Change the default options.
     * @param {Object} options - The new default options.
     */
  }, {
    key: "setDefaults",
    value: function setDefaults(options) {
      assign(DEFAULTS, isPlainObject(options) && options);
    }
  }]);
  return Viewer2;
}();
assign(Viewer.prototype, render2, events, handlers, methods, others);

// node_modules/v-viewer/dist/index.mjs
var je = typeof global == "object" && global && global.Object === Object && global;
var re = je;
var _e = typeof self == "object" && self && self.Object === Object && self;
var Ae = re || _e || Function("return this")();
var E = Ae;
var xe = E.Symbol;
var S = xe;
var te = Object.prototype;
var Pe = te.hasOwnProperty;
var Se = te.toString;
var O = S ? S.toStringTag : void 0;
function Ie(e) {
  var r = Pe.call(e, O), t = e[O];
  try {
    e[O] = void 0;
    var n = true;
  } catch {
  }
  var i = Se.call(e);
  return n && (r ? e[O] = t : delete e[O]), i;
}
var Ee = Object.prototype;
var Me = Ee.toString;
function Ve(e) {
  return Me.call(e);
}
var Ce = "[object Null]";
var Be = "[object Undefined]";
var H = S ? S.toStringTag : void 0;
function M(e) {
  return e == null ? e === void 0 ? Be : Ce : H && H in Object(e) ? Ie(e) : Ve(e);
}
function V(e) {
  return e != null && typeof e == "object";
}
var Ue = "[object Symbol]";
function Fe(e) {
  return typeof e == "symbol" || V(e) && M(e) == Ue;
}
var Ne = Array.isArray;
var De = Ne;
var We = /\s/;
function Le(e) {
  for (var r = e.length; r-- && We.test(e.charAt(r)); )
    ;
  return r;
}
var Re = /^\s+/;
function Ke(e) {
  return e && e.slice(0, Le(e) + 1).replace(Re, "");
}
function b(e) {
  var r = typeof e;
  return e != null && (r == "object" || r == "function");
}
var q = 0 / 0;
var Ge = /^[-+]0x[0-9a-f]+$/i;
var He = /^0b[01]+$/i;
var qe = /^0o[0-7]+$/i;
var Je = parseInt;
function J(e) {
  if (typeof e == "number")
    return e;
  if (Fe(e))
    return q;
  if (b(e)) {
    var r = typeof e.valueOf == "function" ? e.valueOf() : e;
    e = b(r) ? r + "" : r;
  }
  if (typeof e != "string")
    return e === 0 ? e : +e;
  e = Ke(e);
  var t = He.test(e);
  return t || qe.test(e) ? Je(e.slice(2), t ? 2 : 8) : Ge.test(e) ? q : +e;
}
function ne(e) {
  return e;
}
var Xe = "[object AsyncFunction]";
var ze = "[object Function]";
var Qe = "[object GeneratorFunction]";
var Ye = "[object Proxy]";
function ie(e) {
  if (!b(e))
    return false;
  var r = M(e);
  return r == ze || r == Qe || r == Xe || r == Ye;
}
var Ze = E["__core-js_shared__"];
var F = Ze;
var X = function() {
  var e = /[^.]+$/.exec(F && F.keys && F.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function ke(e) {
  return !!X && X in e;
}
var er = Function.prototype;
var rr = er.toString;
function tr(e) {
  if (e != null) {
    try {
      return rr.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var nr = /[\\^$.*+?()[\]{}|]/g;
var ir = /^\[object .+?Constructor\]$/;
var or = Function.prototype;
var ar = Object.prototype;
var ur = or.toString;
var sr = ar.hasOwnProperty;
var cr = RegExp(
  "^" + ur.call(sr).replace(nr, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function fr(e) {
  if (!b(e) || ke(e))
    return false;
  var r = ie(e) ? cr : ir;
  return r.test(tr(e));
}
function dr(e, r) {
  return e == null ? void 0 : e[r];
}
function lr(e, r) {
  var t = dr(e, r);
  return fr(t) ? t : void 0;
}
function pr(e, r, t) {
  switch (t.length) {
    case 0:
      return e.call(r);
    case 1:
      return e.call(r, t[0]);
    case 2:
      return e.call(r, t[0], t[1]);
    case 3:
      return e.call(r, t[0], t[1], t[2]);
  }
  return e.apply(r, t);
}
var gr = 800;
var vr = 16;
var yr = Date.now;
function br(e) {
  var r = 0, t = 0;
  return function() {
    var n = yr(), i = vr - (n - t);
    if (t = n, i > 0) {
      if (++r >= gr)
        return arguments[0];
    } else
      r = 0;
    return e.apply(void 0, arguments);
  };
}
function mr(e) {
  return function() {
    return e;
  };
}
var hr = function() {
  try {
    var e = lr(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
}();
var I = hr;
var wr = I ? function(e, r) {
  return I(e, "toString", {
    configurable: true,
    enumerable: false,
    value: mr(r),
    writable: true
  });
} : ne;
var Tr = wr;
var $r = br(Tr);
var Or = $r;
var jr = 9007199254740991;
var _r = /^(?:0|[1-9]\d*)$/;
function oe(e, r) {
  var t = typeof e;
  return r = r == null ? jr : r, !!r && (t == "number" || t != "symbol" && _r.test(e)) && e > -1 && e % 1 == 0 && e < r;
}
function ae(e, r, t) {
  r == "__proto__" && I ? I(e, r, {
    configurable: true,
    enumerable: true,
    value: t,
    writable: true
  }) : e[r] = t;
}
function W(e, r) {
  return e === r || e !== e && r !== r;
}
var Ar = Object.prototype;
var xr = Ar.hasOwnProperty;
function ue(e, r, t) {
  var n = e[r];
  (!(xr.call(e, r) && W(n, t)) || t === void 0 && !(r in e)) && ae(e, r, t);
}
function Pr(e, r, t, n) {
  var i = !t;
  t || (t = {});
  for (var u = -1, c = r.length; ++u < c; ) {
    var a = r[u], d = n ? n(t[a], e[a], a, t, e) : void 0;
    d === void 0 && (d = e[a]), i ? ae(t, a, d) : ue(t, a, d);
  }
  return t;
}
var z = Math.max;
function Sr(e, r, t) {
  return r = z(r === void 0 ? e.length - 1 : r, 0), function() {
    for (var n = arguments, i = -1, u = z(n.length - r, 0), c = Array(u); ++i < u; )
      c[i] = n[r + i];
    i = -1;
    for (var a = Array(r + 1); ++i < r; )
      a[i] = n[i];
    return a[r] = t(c), pr(e, this, a);
  };
}
function se(e, r) {
  return Or(Sr(e, r, ne), e + "");
}
var Ir = 9007199254740991;
function ce(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= Ir;
}
function C(e) {
  return e != null && ce(e.length) && !ie(e);
}
function fe(e, r, t) {
  if (!b(t))
    return false;
  var n = typeof r;
  return (n == "number" ? C(t) && oe(r, t.length) : n == "string" && r in t) ? W(t[r], e) : false;
}
function Er(e) {
  return se(function(r, t) {
    var n = -1, i = t.length, u = i > 1 ? t[i - 1] : void 0, c = i > 2 ? t[2] : void 0;
    for (u = e.length > 3 && typeof u == "function" ? (i--, u) : void 0, c && fe(t[0], t[1], c) && (u = i < 3 ? void 0 : u, i = 1), r = Object(r); ++n < i; ) {
      var a = t[n];
      a && e(r, a, n, u);
    }
    return r;
  });
}
var Mr = Object.prototype;
function L(e) {
  var r = e && e.constructor, t = typeof r == "function" && r.prototype || Mr;
  return e === t;
}
function Vr(e, r) {
  for (var t = -1, n = Array(e); ++t < e; )
    n[t] = r(t);
  return n;
}
var Cr = "[object Arguments]";
function Q(e) {
  return V(e) && M(e) == Cr;
}
var de = Object.prototype;
var Br = de.hasOwnProperty;
var Ur = de.propertyIsEnumerable;
var Fr = Q(/* @__PURE__ */ function() {
  return arguments;
}()) ? Q : function(e) {
  return V(e) && Br.call(e, "callee") && !Ur.call(e, "callee");
};
var Nr = Fr;
function Dr() {
  return false;
}
var le = typeof exports == "object" && exports && !exports.nodeType && exports;
var Y = le && typeof module == "object" && module && !module.nodeType && module;
var Wr = Y && Y.exports === le;
var Z = Wr ? E.Buffer : void 0;
var Lr = Z ? Z.isBuffer : void 0;
var Rr = Lr || Dr;
var Kr = Rr;
var Gr = "[object Arguments]";
var Hr = "[object Array]";
var qr = "[object Boolean]";
var Jr = "[object Date]";
var Xr = "[object Error]";
var zr = "[object Function]";
var Qr = "[object Map]";
var Yr = "[object Number]";
var Zr = "[object Object]";
var kr = "[object RegExp]";
var et = "[object Set]";
var rt = "[object String]";
var tt = "[object WeakMap]";
var nt = "[object ArrayBuffer]";
var it = "[object DataView]";
var ot = "[object Float32Array]";
var at = "[object Float64Array]";
var ut = "[object Int8Array]";
var st = "[object Int16Array]";
var ct = "[object Int32Array]";
var ft = "[object Uint8Array]";
var dt = "[object Uint8ClampedArray]";
var lt = "[object Uint16Array]";
var pt = "[object Uint32Array]";
var f = {};
f[ot] = f[at] = f[ut] = f[st] = f[ct] = f[ft] = f[dt] = f[lt] = f[pt] = true;
f[Gr] = f[Hr] = f[nt] = f[qr] = f[it] = f[Jr] = f[Xr] = f[zr] = f[Qr] = f[Yr] = f[Zr] = f[kr] = f[et] = f[rt] = f[tt] = false;
function gt(e) {
  return V(e) && ce(e.length) && !!f[M(e)];
}
function vt(e) {
  return function(r) {
    return e(r);
  };
}
var pe = typeof exports == "object" && exports && !exports.nodeType && exports;
var j = pe && typeof module == "object" && module && !module.nodeType && module;
var yt = j && j.exports === pe;
var N = yt && re.process;
var bt = function() {
  try {
    var e = j && j.require && j.require("util").types;
    return e || N && N.binding && N.binding("util");
  } catch {
  }
}();
var k = bt;
var ee = k && k.isTypedArray;
var mt = ee ? vt(ee) : gt;
var ht = mt;
var wt = Object.prototype;
var Tt = wt.hasOwnProperty;
function ge(e, r) {
  var t = De(e), n = !t && Nr(e), i = !t && !n && Kr(e), u = !t && !n && !i && ht(e), c = t || n || i || u, a = c ? Vr(e.length, String) : [], d = a.length;
  for (var s in e)
    (r || Tt.call(e, s)) && !(c && (s == "length" || i && (s == "offset" || s == "parent") || u && (s == "buffer" || s == "byteLength" || s == "byteOffset") || oe(s, d))) && a.push(s);
  return a;
}
function $t(e, r) {
  return function(t) {
    return e(r(t));
  };
}
var Ot = $t(Object.keys, Object);
var jt = Ot;
var _t = Object.prototype;
var At = _t.hasOwnProperty;
function xt(e) {
  if (!L(e))
    return jt(e);
  var r = [];
  for (var t in Object(e))
    At.call(e, t) && t != "constructor" && r.push(t);
  return r;
}
function Pt(e) {
  return C(e) ? ge(e) : xt(e);
}
var St = Object.prototype;
var It = St.hasOwnProperty;
var Et = Er(function(e, r) {
  if (L(r) || C(r)) {
    Pr(r, Pt(r), e);
    return;
  }
  for (var t in r)
    It.call(r, t) && ue(e, t, r[t]);
});
var Mt = Et;
function Vt(e) {
  var r = [];
  if (e != null)
    for (var t in Object(e))
      r.push(t);
  return r;
}
var Ct = Object.prototype;
var Bt = Ct.hasOwnProperty;
function Ut(e) {
  if (!b(e))
    return Vt(e);
  var r = L(e), t = [];
  for (var n in e)
    n == "constructor" && (r || !Bt.call(e, n)) || t.push(n);
  return t;
}
function Ft(e) {
  return C(e) ? ge(e, true) : Ut(e);
}
var Nt = function() {
  return E.Date.now();
};
var D = Nt;
var Dt = "Expected a function";
var Wt = Math.max;
var Lt = Math.min;
function Rt(e, r, t) {
  var n, i, u, c, a, d, s = 0, m = false, o = false, l = true;
  if (typeof e != "function")
    throw new TypeError(Dt);
  r = J(r) || 0, b(t) && (m = !!t.leading, o = "maxWait" in t, u = o ? Wt(J(t.maxWait) || 0, r) : u, l = "trailing" in t ? !!t.trailing : l);
  function g(p) {
    var y = n, $ = i;
    return n = i = void 0, s = p, c = e.apply($, y), c;
  }
  function v(p) {
    return s = p, a = setTimeout(T, r), m ? g(p) : c;
  }
  function h2(p) {
    var y = p - d, $ = p - s, R = r - y;
    return o ? Lt(R, u - $) : R;
  }
  function w(p) {
    var y = p - d, $ = p - s;
    return d === void 0 || y >= r || y < 0 || o && $ >= u;
  }
  function T() {
    var p = D();
    if (w(p))
      return A(p);
    a = setTimeout(T, h2(p));
  }
  function A(p) {
    return a = void 0, l && n ? g(p) : (n = i = void 0, c);
  }
  function B() {
    a !== void 0 && clearTimeout(a), s = 0, n = d = i = a = void 0;
  }
  function ye() {
    return a === void 0 ? c : A(D());
  }
  function U() {
    var p = D(), y = w(p);
    if (n = arguments, i = this, d = p, y) {
      if (a === void 0)
        return v(d);
      if (o)
        return clearTimeout(a), a = setTimeout(T, r), g(d);
    }
    return a === void 0 && (a = setTimeout(T, r)), c;
  }
  return U.cancel = B, U.flush = ye, U;
}
var ve = Object.prototype;
var Kt = ve.hasOwnProperty;
var Gt = se(function(e, r) {
  e = Object(e);
  var t = -1, n = r.length, i = n > 2 ? r[2] : void 0;
  for (i && fe(r[0], r[1], i) && (n = 1); ++t < n; )
    for (var u = r[t], c = Ft(u), a = -1, d = c.length; ++a < d; ) {
      var s = c[a], m = e[s];
      (m === void 0 || W(m, ve[s]) && !Kt.call(e, s)) && (e[s] = u[s]);
    }
  return e;
});
var Ht = Gt;
var qt = ({ images: e = [], options: r }) => {
  r = Mt(r, {
    inline: false
  });
  const t = document.createElement("div"), n = h(
    "div",
    {
      style: {
        display: "none"
      },
      class: ["__viewer-token"]
    },
    e.map((a) => h(
      "img",
      typeof a == "string" ? { src: a } : a
    ))
  );
  render(n, t);
  const i = t.firstElementChild;
  document.body.appendChild(i);
  const u = new Viewer(i, r), c = u.destroy.bind(u);
  return u.destroy = function() {
    return c(), render(null, t), u;
  }, u.show(), i.addEventListener("hidden", function() {
    this.viewer === u && u.destroy();
  }), u;
};
var Jt = ({ name: e = "viewer", debug: r = false } = {}) => {
  async function t(o, l, g = false, v = false) {
    await nextTick(), !(v && !n(o)) && (g || !o[`$${e}`] ? (c(o), o[`$${e}`] = new Viewer(o, l), s("Viewer created")) : (o[`$${e}`].update(), s("Viewer updated")));
  }
  function n(o) {
    const l = o.innerHTML.match(/<img([\w\W]+?)[\\/]?>/g), g = l ? l.join("") : void 0;
    return o.__viewerImageDiffCache === g ? (s("Element change detected, but image(s) has not changed"), false) : (s("Image change detected"), o.__viewerImageDiffCache = g, true);
  }
  function i(o, l, g, v) {
    a(o);
    const h2 = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
    if (!h2) {
      s("Observer not supported");
      return;
    }
    const w = new h2((A) => {
      A.forEach((B) => {
        s(`Viewer mutation:${B.type}`), g(o, l, v, true);
      });
    }), T = { attributes: true, childList: true, characterData: true, subtree: true };
    w.observe(o, T), o.__viewerMutationObserver = w, s("Observer created");
  }
  function u(o, l, g, v) {
    o.__viewerUnwatch = watch(() => l.value, (h2, w) => {
      s("Change detected by watcher: ", l.value), v(o, h2, true, false);
    }, { deep: true }), s("Watcher created, expression: ", l.value);
  }
  function c(o) {
    !o[`$${e}`] || (o[`$${e}`].destroy(), delete o[`$${e}`], s("Viewer destroyed"));
  }
  function a(o) {
    !o.__viewerMutationObserver || (o.__viewerMutationObserver.disconnect(), delete o.__viewerMutationObserver, s("observer destroyed"));
  }
  function d(o) {
    !o.__viewerUnwatch || (o.__viewerUnwatch(), delete o.__viewerUnwatch, s("Watcher destroyed"));
  }
  function s(...o) {
    r && console.log(...o);
  }
  return {
    mounted(o, l, g) {
      s("Viewer bind");
      const v = Rt(t, 50);
      v(o, l.value), u(o, l, g, v), l.modifiers.static || i(o, l.value, v, l.modifiers.rebuild);
    },
    unmounted(o) {
      s("Viewer unbind"), a(o), d(o), c(o);
    }
  };
};
var Xt = defineComponent({
  name: "Viewer",
  props: {
    images: {
      type: Array,
      default: () => []
    },
    rebuild: {
      type: Boolean,
      default: false
    },
    trigger: {
      type: Object,
      default: null
    },
    options: {
      type: Object,
      default: () => null
    }
  },
  emits: ["inited"],
  setup(e, { emit: r }) {
    let t;
    const n = ref();
    function i() {
      t = new Viewer(n.value, e.options), r("inited", t);
    }
    function u() {
      t && t.destroy();
    }
    function c() {
      u(), i();
    }
    function a() {
      t ? (t.update(), r("inited", t)) : i();
    }
    function d() {
      e.rebuild ? c() : a();
    }
    const s = { deep: true };
    return watch(() => e.images, () => {
      nextTick(() => {
        d();
      });
    }, s), watch(() => e.trigger, () => {
      nextTick(() => {
        d();
      });
    }, s), watch(() => e.options, () => {
      nextTick(() => {
        c();
      });
    }, s), onMounted(() => i()), onUnmounted(() => u()), {
      root: n,
      createViewer: i,
      rebuildViewer: c,
      updateViewer: a,
      destroyViewer: u
    };
  }
});
var zt = (e, r) => {
  const t = e.__vccOpts || e;
  for (const [n, i] of r)
    t[n] = i;
  return t;
};
var Qt = { ref: "root" };
function Yt(e, r, t, n, i, u) {
  return openBlock(), createElementBlock("div", Qt, [
    renderSlot(e.$slots, "default", {
      images: e.images,
      options: e.options
    })
  ], 512);
}
var Zt = zt(Xt, [["render", Yt]]);
var rn = {
  install(e, { name: r = "viewer", debug: t = false, defaultOptions: n } = {}) {
    n && Viewer.setDefaults(n), e.config.globalProperties[`$${r}Api`] = qt, e.component(r, Ht(Zt, { name: r })), e.directive(r, Jt({ name: r, debug: t }));
  },
  setDefaults(e) {
    Viewer.setDefaults(e);
  }
};
export {
  Viewer,
  qt as api,
  Zt as component,
  rn as default,
  Jt as directive
};
/*! Bundled license information:

viewerjs/dist/viewer.esm.js:
  (*!
   * Viewer.js v1.11.6
   * https://fengyuanchen.github.io/viewerjs
   *
   * Copyright 2015-present Chen Fengyuan
   * Released under the MIT license
   *
   * Date: 2023-09-17T03:16:38.052Z
   *)
*/
//# sourceMappingURL=v-viewer.js.map
