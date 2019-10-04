/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(7)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(3);
module.exports = __webpack_require__(16);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

Nova.booting(function (Vue, router, store) {
    router.addRoutes([{
        name: 'wizard',
        path: '/wizard',
        component: __webpack_require__(4)
    }]);
});

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(5)
  __webpack_require__(8)
}
var normalizeComponent = __webpack_require__(10)
/* script */
var __vue_script__ = __webpack_require__(11)
/* template */
var __vue_template__ = __webpack_require__(15)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-68ff5483"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/components/Tool.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-68ff5483", Component.options)
  } else {
    hotAPI.reload("data-v-68ff5483", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(6);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("58fc5390", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../css-loader/index.js!../../vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-68ff5483\",\"scoped\":true,\"hasInlineConfig\":true}!./vue-multiselect.min.css", function() {
     var newContent = require("!!../../css-loader/index.js!../../vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-68ff5483\",\"scoped\":true,\"hasInlineConfig\":true}!./vue-multiselect.min.css");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "\nfieldset[disabled] .multiselect[data-v-68ff5483]{pointer-events:none\n}\n.multiselect__spinner[data-v-68ff5483]{position:absolute;right:1px;top:1px;width:48px;height:35px;background:#fff;display:block\n}\n.multiselect__spinner[data-v-68ff5483]:after,.multiselect__spinner[data-v-68ff5483]:before{position:absolute;content:\"\";top:50%;left:50%;margin:-8px 0 0 -8px;width:16px;height:16px;border-radius:100%;border:2px solid transparent;border-top-color:#41b883;-webkit-box-shadow:0 0 0 1px transparent;box-shadow:0 0 0 1px transparent\n}\n.multiselect__spinner[data-v-68ff5483]:before{-webkit-animation:spinning-data-v-68ff5483 2.4s cubic-bezier(.41,.26,.2,.62);animation:spinning-data-v-68ff5483 2.4s cubic-bezier(.41,.26,.2,.62);-webkit-animation-iteration-count:infinite;animation-iteration-count:infinite\n}\n.multiselect__spinner[data-v-68ff5483]:after{-webkit-animation:spinning-data-v-68ff5483 2.4s cubic-bezier(.51,.09,.21,.8);animation:spinning-data-v-68ff5483 2.4s cubic-bezier(.51,.09,.21,.8);-webkit-animation-iteration-count:infinite;animation-iteration-count:infinite\n}\n.multiselect__loading-enter-active[data-v-68ff5483],.multiselect__loading-leave-active[data-v-68ff5483]{-webkit-transition:opacity .4s ease-in-out;transition:opacity .4s ease-in-out;opacity:1\n}\n.multiselect__loading-enter[data-v-68ff5483],.multiselect__loading-leave-active[data-v-68ff5483]{opacity:0\n}\n.multiselect[data-v-68ff5483],.multiselect__input[data-v-68ff5483],.multiselect__single[data-v-68ff5483]{font-family:inherit;font-size:16px;-ms-touch-action:manipulation;touch-action:manipulation\n}\n.multiselect[data-v-68ff5483]{-webkit-box-sizing:content-box;box-sizing:content-box;display:block;position:relative;width:100%;min-height:40px;text-align:left;color:#35495e\n}\n.multiselect *[data-v-68ff5483]{-webkit-box-sizing:border-box;box-sizing:border-box\n}\n.multiselect[data-v-68ff5483]:focus{outline:none\n}\n.multiselect--disabled[data-v-68ff5483]{background:#ededed;pointer-events:none;opacity:.6\n}\n.multiselect--active[data-v-68ff5483]{z-index:50\n}\n.multiselect--active:not(.multiselect--above) .multiselect__current[data-v-68ff5483],.multiselect--active:not(.multiselect--above) .multiselect__input[data-v-68ff5483],.multiselect--active:not(.multiselect--above) .multiselect__tags[data-v-68ff5483]{border-bottom-left-radius:0;border-bottom-right-radius:0\n}\n.multiselect--active .multiselect__select[data-v-68ff5483]{-webkit-transform:rotate(180deg);transform:rotate(180deg)\n}\n.multiselect--above.multiselect--active .multiselect__current[data-v-68ff5483],.multiselect--above.multiselect--active .multiselect__input[data-v-68ff5483],.multiselect--above.multiselect--active .multiselect__tags[data-v-68ff5483]{border-top-left-radius:0;border-top-right-radius:0\n}\n.multiselect__input[data-v-68ff5483],.multiselect__single[data-v-68ff5483]{position:relative;display:inline-block;min-height:20px;line-height:20px;border:none;border-radius:5px;background:#fff;padding:0 0 0 5px;width:100%;-webkit-transition:border .1s ease;transition:border .1s ease;-webkit-box-sizing:border-box;box-sizing:border-box;margin-bottom:8px;vertical-align:top\n}\n.multiselect__input[data-v-68ff5483]:-ms-input-placeholder{color:#35495e\n}\n.multiselect__input[data-v-68ff5483]::-webkit-input-placeholder{color:#35495e\n}\n.multiselect__input[data-v-68ff5483]::-moz-placeholder{color:#35495e\n}\n.multiselect__input[data-v-68ff5483]::-ms-input-placeholder{color:#35495e\n}\n.multiselect__input[data-v-68ff5483]::placeholder{color:#35495e\n}\n.multiselect__tag~.multiselect__input[data-v-68ff5483],.multiselect__tag~.multiselect__single[data-v-68ff5483]{width:auto\n}\n.multiselect__input[data-v-68ff5483]:hover,.multiselect__single[data-v-68ff5483]:hover{border-color:#cfcfcf\n}\n.multiselect__input[data-v-68ff5483]:focus,.multiselect__single[data-v-68ff5483]:focus{border-color:#a8a8a8;outline:none\n}\n.multiselect__single[data-v-68ff5483]{padding-left:5px;margin-bottom:8px\n}\n.multiselect__tags-wrap[data-v-68ff5483]{display:inline\n}\n.multiselect__tags[data-v-68ff5483]{min-height:40px;display:block;padding:8px 40px 0 8px;border-radius:5px;border:1px solid #e8e8e8;background:#fff;font-size:14px\n}\n.multiselect__tag[data-v-68ff5483]{position:relative;display:inline-block;padding:4px 26px 4px 10px;border-radius:5px;margin-right:10px;color:#fff;line-height:1;background:#41b883;margin-bottom:5px;white-space:nowrap;overflow:hidden;max-width:100%;text-overflow:ellipsis\n}\n.multiselect__tag-icon[data-v-68ff5483]{cursor:pointer;margin-left:7px;position:absolute;right:0;top:0;bottom:0;font-weight:700;font-style:normal;width:22px;text-align:center;line-height:22px;-webkit-transition:all .2s ease;transition:all .2s ease;border-radius:5px\n}\n.multiselect__tag-icon[data-v-68ff5483]:after{content:\"\\D7\";color:#266d4d;font-size:14px\n}\n.multiselect__tag-icon[data-v-68ff5483]:focus,.multiselect__tag-icon[data-v-68ff5483]:hover{background:#369a6e\n}\n.multiselect__tag-icon[data-v-68ff5483]:focus:after,.multiselect__tag-icon[data-v-68ff5483]:hover:after{color:#fff\n}\n.multiselect__current[data-v-68ff5483]{min-height:40px;overflow:hidden;padding:8px 30px 0 12px;white-space:nowrap;border-radius:5px;border:1px solid #e8e8e8\n}\n.multiselect__current[data-v-68ff5483],.multiselect__select[data-v-68ff5483]{line-height:16px;-webkit-box-sizing:border-box;box-sizing:border-box;display:block;margin:0;text-decoration:none;cursor:pointer\n}\n.multiselect__select[data-v-68ff5483]{position:absolute;width:40px;height:38px;right:1px;top:1px;padding:4px 8px;text-align:center;-webkit-transition:-webkit-transform .2s ease;transition:-webkit-transform .2s ease;transition:transform .2s ease;transition:transform .2s ease, -webkit-transform .2s ease\n}\n.multiselect__select[data-v-68ff5483]:before{position:relative;right:0;top:65%;color:#999;margin-top:4px;border-color:#999 transparent transparent;border-style:solid;border-width:5px 5px 0;content:\"\"\n}\n.multiselect__placeholder[data-v-68ff5483]{color:#adadad;display:inline-block;margin-bottom:10px;padding-top:2px\n}\n.multiselect--active .multiselect__placeholder[data-v-68ff5483]{display:none\n}\n.multiselect__content-wrapper[data-v-68ff5483]{position:absolute;display:block;background:#fff;width:100%;max-height:240px;overflow:auto;border:1px solid #e8e8e8;border-top:none;border-bottom-left-radius:5px;border-bottom-right-radius:5px;z-index:50;-webkit-overflow-scrolling:touch\n}\n.multiselect__content[data-v-68ff5483]{list-style:none;display:inline-block;padding:0;margin:0;min-width:100%;vertical-align:top\n}\n.multiselect--above .multiselect__content-wrapper[data-v-68ff5483]{bottom:100%;border-bottom-left-radius:0;border-bottom-right-radius:0;border-top-left-radius:5px;border-top-right-radius:5px;border-bottom:none;border-top:1px solid #e8e8e8\n}\n.multiselect__content[data-v-68ff5483]::webkit-scrollbar{display:none\n}\n.multiselect__element[data-v-68ff5483]{display:block\n}\n.multiselect__option[data-v-68ff5483]{display:block;padding:12px;min-height:40px;line-height:16px;text-decoration:none;text-transform:none;vertical-align:middle;position:relative;cursor:pointer;white-space:nowrap\n}\n.multiselect__option[data-v-68ff5483]:after{top:0;right:0;position:absolute;line-height:40px;padding-right:12px;padding-left:20px;font-size:13px\n}\n.multiselect__option--highlight[data-v-68ff5483]{background:#41b883;outline:none;color:#fff\n}\n.multiselect__option--highlight[data-v-68ff5483]:after{content:attr(data-select);background:#41b883;color:#fff\n}\n.multiselect__option--selected[data-v-68ff5483]{background:#f3f3f3;color:#35495e;font-weight:700\n}\n.multiselect__option--selected[data-v-68ff5483]:after{content:attr(data-selected);color:silver\n}\n.multiselect__option--selected.multiselect__option--highlight[data-v-68ff5483]{background:#ff6a6a;color:#fff\n}\n.multiselect__option--selected.multiselect__option--highlight[data-v-68ff5483]:after{background:#ff6a6a;content:attr(data-deselect);color:#fff\n}\n.multiselect--disabled .multiselect__current[data-v-68ff5483],.multiselect--disabled .multiselect__select[data-v-68ff5483]{background:#ededed;color:#a6a6a6\n}\n.multiselect__option--disabled[data-v-68ff5483]{background:#ededed!important;color:#a6a6a6!important;cursor:text;pointer-events:none\n}\n.multiselect__option--group[data-v-68ff5483]{background:#ededed;color:#35495e\n}\n.multiselect__option--group.multiselect__option--highlight[data-v-68ff5483]{background:#35495e;color:#fff\n}\n.multiselect__option--group.multiselect__option--highlight[data-v-68ff5483]:after{background:#35495e\n}\n.multiselect__option--disabled.multiselect__option--highlight[data-v-68ff5483]{background:#dedede\n}\n.multiselect__option--group-selected.multiselect__option--highlight[data-v-68ff5483]{background:#ff6a6a;color:#fff\n}\n.multiselect__option--group-selected.multiselect__option--highlight[data-v-68ff5483]:after{background:#ff6a6a;content:attr(data-deselect);color:#fff\n}\n.multiselect-enter-active[data-v-68ff5483],.multiselect-leave-active[data-v-68ff5483]{-webkit-transition:all .15s ease;transition:all .15s ease\n}\n.multiselect-enter[data-v-68ff5483],.multiselect-leave-active[data-v-68ff5483]{opacity:0\n}\n.multiselect__strong[data-v-68ff5483]{margin-bottom:8px;line-height:20px;display:inline-block;vertical-align:top\n}\n[dir=rtl] .multiselect[data-v-68ff5483]{text-align:right\n}\n[dir=rtl] .multiselect__select[data-v-68ff5483]{right:auto;left:1px\n}\n[dir=rtl] .multiselect__tags[data-v-68ff5483]{padding:8px 8px 0 40px\n}\n[dir=rtl] .multiselect__content[data-v-68ff5483]{text-align:right\n}\n[dir=rtl] .multiselect__option[data-v-68ff5483]:after{right:auto;left:0\n}\n[dir=rtl] .multiselect__clear[data-v-68ff5483]{right:auto;left:12px\n}\n[dir=rtl] .multiselect__spinner[data-v-68ff5483]{right:auto;left:1px\n}\n@-webkit-keyframes spinning-data-v-68ff5483{\n0%{-webkit-transform:rotate(0);transform:rotate(0)\n}\nto{-webkit-transform:rotate(2turn);transform:rotate(2turn)\n}\n}\n@keyframes spinning-data-v-68ff5483{\n0%{-webkit-transform:rotate(0);transform:rotate(0)\n}\nto{-webkit-transform:rotate(2turn);transform:rotate(2turn)\n}\n}", ""]);

// exports


/***/ }),
/* 7 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(9);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("08160a40", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-68ff5483\",\"scoped\":true,\"hasInlineConfig\":true}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=1!./Tool.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-68ff5483\",\"scoped\":true,\"hasInlineConfig\":true}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=1!./Tool.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* The container */\n.cont[data-v-68ff5483] {\n    display: block;\n    position: relative;\n    padding-left: 35px;\n    margin-bottom: 12px;\n    cursor: pointer;\n    /*font-size: small;*/\n    -webkit-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    user-select: none;\n}\n\n/* Hide the browser's default checkbox */\n.cont input[data-v-68ff5483] {\n    position: absolute;\n    opacity: 0;\n    cursor: pointer;\n    height: 0;\n    width: 0;\n}\n\n/* Create a custom checkbox */\n.checkmark[data-v-68ff5483] {\n    position: absolute;\n    top: 0;\n    left: 0;\n    height: 20px;\n    width: 20px;\n    background-color: #eee;\n}\n\n/* On mouse-over, add a grey background color */\n.cont:hover input ~ .checkmark[data-v-68ff5483] {\n    background-color: #ccc;\n}\n\n/* When the checkbox is checked, add a blue background */\n.cont input:checked ~ .checkmark[data-v-68ff5483] {\n    background-color: #2196F3;\n}\n\n/* Create the checkmark/indicator (hidden when not checked) */\n.checkmark[data-v-68ff5483]:after {\n    content: \"\";\n    position: absolute;\n    display: none;\n}\n\n/* Show the checkmark when checked */\n.cont input:checked ~ .checkmark[data-v-68ff5483]:after {\n    display: block;\n}\n\n/* Style the checkmark/indicator */\n.cont .checkmark[data-v-68ff5483]:after {\n    left: 9px;\n    top: 5px;\n    width: 5px;\n    height: 10px;\n    border: solid white;\n    border-width: 0 3px 3px 0;\n    -webkit-transform: rotate(45deg);\n    transform: rotate(45deg);\n}\n\n\n", ""]);

// exports


/***/ }),
/* 10 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_custom_range_slider__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_custom_range_slider___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue_custom_range_slider__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_multiselect__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_multiselect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_multiselect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vue_form_wizard__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vue_form_wizard___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_vue_form_wizard__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



// import the styling, css or scss
// import "vue-custom-range-slider/dist/vue-custom-range-slider.css";



// import 'vue-form-wizard/dist/vue-form-wizard.min.css';


/* harmony default export */ __webpack_exports__["default"] = ({
    components: {
        FormWizard: __WEBPACK_IMPORTED_MODULE_2_vue_form_wizard__["FormWizard"],
        TabContent: __WEBPACK_IMPORTED_MODULE_2_vue_form_wizard__["TabContent"],
        Multiselect: __WEBPACK_IMPORTED_MODULE_1_vue_multiselect___default.a,
        CustomSlider: __WEBPACK_IMPORTED_MODULE_0_vue_custom_range_slider___default.a
    },
    data: function data() {
        return {
            selected: null,
            options: [{ name: 'Web' }, { name: 'API' }, { name: 'Android' }, { name: 'IOS' }],
            project: {
                name: 'test',
                description: 'test project',
                domain: 'test.com',
                type: ''
            },
            mode: 'quick',
            emailSlider: "a",
            emailSliderValues: [{
                label: "",
                value: ""
            }],
            smsSlider: "a",
            smsSliderValues: [{
                label: "",
                value: ""
            }],
            droplets: [{ name: '', id: '', description: '' }],
            sslPacks: [{ name: '', id: '', description: '' }],
            backupPacks: [{ name: '', id: '', description: '' }],
            analyticsPacks: [{ name: '', id: '', description: '' }],
            selected_droplet: {},
            selected_ssl: {},
            selected_backup: {},
            selected_analytics: {}
        };
    },

    computed: {
        isQuick: function isQuick() {
            return this.mode === 'quick';
        }
    },
    mounted: function mounted() {
        this.fetchEmailSubscriptions();
        this.fetchData();
    },

    methods: {
        fetchData: function fetchData() {
            var _this = this;

            Nova.request().get('/nova-vendor/wizard/fetch').then(function (data) {
                var d = data.data;
                _this.droplets = d.Hosting;
                _this.sslPacks = d.SSL;
                _this.backupPacks = d.BackUp;
                _this.analyticsPacks = d.Analytics;
                _this.smsSliderValues = d.SMS;
            }).catch(function (d) {

                console.log("error ");
            });
        },
        fetchEmailSubscriptions: function fetchEmailSubscriptions() {
            var _this2 = this;

            Nova.request().get('/nova-vendor/wizard/email').then(function (data) {
                _this2.emailSliderValues = data.data;
                _this2.emailSlider = data.data[0].value;
                console.log(data.data);
            }).catch(function (d) {

                console.log("error ");
            });
        },
        handleProjectMode: function handleProjectMode(btn) {
            this.mode = btn;
            this.$refs['form-wizard'].changeTab(1, 2);
        },


        onComplete: function onComplete() {
            var _this3 = this;

            var data = {};
            console.log(this.emailSlider);
            data.project = this.project;
            data.products = {};
            data.products[0] = this.selected_analytics;
            data.products[1] = this.selected_backup;
            data.products[2] = this.selected_droplet;
            data.products[3] = this.selected_ssl;
            var i = 0;
            for (; i < this.emailSliderValues; i++) {
                if (this.emailSliderValues[i].value === this.emailSlider) {
                    break;
                }
            }
            data.products[4] = this.emailSliderValues[i].id;
            console.log(data.products);
            Nova.request().post('/nova-vendor/wizard/create-project', data).then(function (d) {
                _this3.$toasted.show('Congrats Your Project has been created!', { type: 'success' });
            }).catch(function (e) {
                _this3.$toasted.show('Something went wrong ,Try Again later', { type: 'error' });
            });
        },

        beforeTabSwitch: function beforeTabSwitch() {
            // alert("This is called before switching tabs")
            return true;
        }
    }
});

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
/******/ })
/************************************************************************/
/******/ ({

/***/ "01f9":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__("2d00");
var $export = __webpack_require__("5ca1");
var redefine = __webpack_require__("2aba");
var hide = __webpack_require__("32e9");
var Iterators = __webpack_require__("84f2");
var $iterCreate = __webpack_require__("41a0");
var setToStringTag = __webpack_require__("7f20");
var getPrototypeOf = __webpack_require__("38fd");
var ITERATOR = __webpack_require__("2b4c")('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),

/***/ "0d58":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__("ce10");
var enumBugKeys = __webpack_require__("e11e");

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),

/***/ "1495":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc");
var anObject = __webpack_require__("cb7c");
var getKeys = __webpack_require__("0d58");

module.exports = __webpack_require__("9e1e") ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),

/***/ "230e":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
var document = __webpack_require__("7726").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ "2aba":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var hide = __webpack_require__("32e9");
var has = __webpack_require__("69a8");
var SRC = __webpack_require__("ca5a")('src');
var $toString = __webpack_require__("fa5b");
var TO_STRING = 'toString';
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__("8378").inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),

/***/ "2aeb":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__("cb7c");
var dPs = __webpack_require__("1495");
var enumBugKeys = __webpack_require__("e11e");
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__("230e")('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__("fab2").appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),

/***/ "2b4c":
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__("5537")('wks');
var uid = __webpack_require__("ca5a");
var Symbol = __webpack_require__("7726").Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ "2d00":
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "2d95":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "32e9":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc");
var createDesc = __webpack_require__("4630");
module.exports = __webpack_require__("9e1e") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "38fd":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__("69a8");
var toObject = __webpack_require__("4bf8");
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),

/***/ "41a0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__("2aeb");
var descriptor = __webpack_require__("4630");
var setToStringTag = __webpack_require__("7f20");
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__("32e9")(IteratorPrototype, __webpack_require__("2b4c")('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),

/***/ "4588":
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ "4630":
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "4bf8":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__("be13");
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ "5537":
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__("8378");
var global = __webpack_require__("7726");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__("2d00") ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "5ca1":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var core = __webpack_require__("8378");
var hide = __webpack_require__("32e9");
var redefine = __webpack_require__("2aba");
var ctx = __webpack_require__("9b43");
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ "613b":
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__("5537")('keys');
var uid = __webpack_require__("ca5a");
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ "626a":
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__("2d95");
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ "6821":
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__("626a");
var defined = __webpack_require__("be13");
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ "69a8":
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "6a99":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__("d3f4");
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "7726":
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "77f1":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("4588");
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ "79e5":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "7f20":
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__("86cc").f;
var has = __webpack_require__("69a8");
var TAG = __webpack_require__("2b4c")('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),

/***/ "8378":
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.9' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "84f2":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "86cc":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("cb7c");
var IE8_DOM_DEFINE = __webpack_require__("c69a");
var toPrimitive = __webpack_require__("6a99");
var dP = Object.defineProperty;

exports.f = __webpack_require__("9e1e") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "9b43":
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__("d8e8");
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "9c6c":
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__("2b4c")('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__("32e9")(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ "9def":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__("4588");
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ "9e1e":
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__("79e5")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "9ee9":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomRangeSlider_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("f542");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomRangeSlider_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomRangeSlider_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomRangeSlider_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "ac6a":
/***/ (function(module, exports, __webpack_require__) {

var $iterators = __webpack_require__("cadf");
var getKeys = __webpack_require__("0d58");
var redefine = __webpack_require__("2aba");
var global = __webpack_require__("7726");
var hide = __webpack_require__("32e9");
var Iterators = __webpack_require__("84f2");
var wks = __webpack_require__("2b4c");
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}


/***/ }),

/***/ "be13":
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ "c366":
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__("6821");
var toLength = __webpack_require__("9def");
var toAbsoluteIndex = __webpack_require__("77f1");
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),

/***/ "c69a":
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__("9e1e") && !__webpack_require__("79e5")(function () {
  return Object.defineProperty(__webpack_require__("230e")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "ca5a":
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ "cadf":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__("9c6c");
var step = __webpack_require__("d53b");
var Iterators = __webpack_require__("84f2");
var toIObject = __webpack_require__("6821");

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__("01f9")(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ "cb7c":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "ce10":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("69a8");
var toIObject = __webpack_require__("6821");
var arrayIndexOf = __webpack_require__("c366")(false);
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "d3f4":
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "d53b":
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),

/***/ "d8e8":
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "e11e":
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),

/***/ "f542":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "f6fd":
/***/ (function(module, exports) {

// document.currentScript polyfill by Adam Miller

// MIT license

(function(document){
  var currentScript = "currentScript",
      scripts = document.getElementsByTagName('script'); // Live NodeList collection

  // If browser needs currentScript polyfill, add get currentScript() to the document object
  if (!(currentScript in document)) {
    Object.defineProperty(document, currentScript, {
      get: function(){

        // IE 6-10 supports script readyState
        // IE 10+ support stack trace
        try { throw new Error(); }
        catch (err) {

          // Find the second match for the "at" string to get file src url from stack.
          // Specifically works with the format of stack traces in IE.
          var i, res = ((/.*at [^\(]*\((.*):.+:.+\)$/ig).exec(err.stack) || [false])[1];

          // For all scripts on the page, if src matches or if ready state is interactive, return the script tag
          for(i in scripts){
            if(scripts[i].src == res || scripts[i].readyState == "interactive"){
              return scripts[i];
            }
          }

          // If no match, return null
          return null;
        }
      }
    });
  }
})(document);


/***/ }),

/***/ "fa5b":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("5537")('native-function-to-string', Function.toString);


/***/ }),

/***/ "fab2":
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__("7726").document;
module.exports = document && document.documentElement;


/***/ }),

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  if (true) {
    __webpack_require__("f6fd")
  }

  var i
  if ((i = window.document.currentScript) && (i = i.src.match(/(.+\/)[^/]+\.js(\?.*)?$/))) {
    __webpack_require__.p = i[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"20c5d302-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/CustomRangeSlider.vue?vue&type=template&id=2395a05c&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"slider"},[_c('div',{staticClass:"slider__wrapper"},[(!_vm.hideLabel)?_c('div',{staticClass:"slider__label",style:({ left: _vm.position })},[_vm._v(_vm._s(_vm.sliderLabel))]):_vm._e(),_c('div',{staticClass:"slider__track",class:{'slider__track--rectangular': !_vm.raising}},[(_vm.raising)?_c('div',{staticClass:"slider__track-top",style:({ 'border-left-width': _vm.sliderWidth + 'px' })}):_vm._e(),(_vm.raising)?_c('div',{staticClass:"slider__track-bottom",style:({ 'border-right-width': _vm.sliderWidth + 'px' })}):_vm._e()]),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.sliderValue),expression:"sliderValue"}],ref:"slider",staticClass:"slider__input",attrs:{"max":_vm.sliderMax,"type":"range","min":_vm.sliderMin,"step":_vm.step},domProps:{"value":(_vm.sliderValue)},on:{"input":_vm.update,"change":_vm.change,"__r":function($event){_vm.sliderValue=$event.target.value}}})])])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/CustomRangeSlider.vue?vue&type=template&id=2395a05c&

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom.iterable.js
var web_dom_iterable = __webpack_require__("ac6a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.iterator.js
var es6_array_iterator = __webpack_require__("cadf");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/CustomRangeSlider.vue?vue&type=script&lang=js&


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var CustomRangeSlidervue_type_script_lang_js_ = ({
  props: {
    value: {
      type: String,
      required: false,
      default: ""
    },
    values: {
      type: Array,
      required: false,
      default: function _default() {
        return [];
      }
    },
    min: {
      type: String,
      required: false,
      default: "0"
    },
    max: {
      type: String,
      required: false,
      default: "100"
    },
    step: {
      type: String,
      required: false,
      default: "1"
    },
    hideLabel: {
      type: Boolean,
      required: false,
      default: false
    },
    raising: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data: function data() {
    return {
      sliderWidth: 0,
      sliderValues: [],
      sliderValue: null,
      sliderMax: null,
      sliderMin: null
    };
  },
  computed: {
    sliderLabel: function sliderLabel() {
      // If using custom values, the custom label is returned, otherwise the value is also the label
      return this.sliderValues.length ? this.sliderValues[this.sliderValue - 1].label : this.sliderValue;
    },
    sliderOutputValue: function sliderOutputValue() {
      // If using custom values, the custom value is returned, otherwise just the default value
      return this.sliderValues.length ? this.sliderValues[this.sliderValue - 1].value : this.sliderValue;
    },
    position: function position() {
      var val = this.sliderValue; // Measure width of slider element. Adjust by 20 to account for thumbsize

      var width = this.sliderWidth - 20; // Calculate percentage between left and right of input

      var percent = (val - this.sliderMin) / (this.sliderMax - this.sliderMin); // Janky value to get pointer to line up better

      var offset = -2;
      var position = width * percent + offset;
      return "".concat(position, "px");
    }
  },
  created: function created() {
    var _this = this;

    // Set local values, depending on use of custom or default
    if (this.values.length) {
      this.sliderValues = this.values;
      this.sliderMin = "1";
      this.sliderMax = this.sliderValues.length; // Find the corresponding custom value, and set the local sliderValue

      var index = 0;
      this.values.map(function (item, i) {
        if (item.value === _this.value) {
          index = i;
        }

        return true;
      });
      this.sliderValue = index + 1;
    } else {
      // In case of using default slider methods
      this.sliderMin = this.min;
      this.sliderMax = this.max;
      this.sliderValue = this.value;
    }
  },
  mounted: function mounted() {
    var _this2 = this;

    this.$nextTick(function () {
      _this2.sliderWidth = _this2.$refs.slider.clientWidth;
    });
  },
  methods: {
    update: function update() {
      this.$emit("input", this.sliderOutputValue);
    },
    change: function change() {
      this.$emit("change", this.sliderOutputValue);
    }
  }
});
// CONCATENATED MODULE: ./src/components/CustomRangeSlider.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_CustomRangeSlidervue_type_script_lang_js_ = (CustomRangeSlidervue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/CustomRangeSlider.vue?vue&type=style&index=0&lang=scss&
var CustomRangeSlidervue_type_style_index_0_lang_scss_ = __webpack_require__("9ee9");

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

// CONCATENATED MODULE: ./src/components/CustomRangeSlider.vue






/* normalize component */

var component = normalizeComponent(
  components_CustomRangeSlidervue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var CustomRangeSlider = (component.exports);
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (CustomRangeSlider);



/***/ })

/******/ })["default"];
//# sourceMappingURL=vue-custom-range-slider.common.js.map

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

!function(t,e){ true?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.VueMultiselect=e():t.VueMultiselect=e()}(this,function(){return function(t){function e(i){if(n[i])return n[i].exports;var r=n[i]={i:i,l:!1,exports:{}};return t[i].call(r.exports,r,r.exports,e),r.l=!0,r.exports}var n={};return e.m=t,e.c=n,e.i=function(t){return t},e.d=function(t,n,i){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:i})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="/",e(e.s=60)}([function(t,e){var n=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},function(t,e,n){var i=n(49)("wks"),r=n(30),o=n(0).Symbol,s="function"==typeof o;(t.exports=function(t){return i[t]||(i[t]=s&&o[t]||(s?o:r)("Symbol."+t))}).store=i},function(t,e,n){var i=n(5);t.exports=function(t){if(!i(t))throw TypeError(t+" is not an object!");return t}},function(t,e,n){var i=n(0),r=n(10),o=n(8),s=n(6),u=n(11),a=function(t,e,n){var l,c,f,p,h=t&a.F,d=t&a.G,v=t&a.S,g=t&a.P,y=t&a.B,m=d?i:v?i[e]||(i[e]={}):(i[e]||{}).prototype,b=d?r:r[e]||(r[e]={}),_=b.prototype||(b.prototype={});d&&(n=e);for(l in n)c=!h&&m&&void 0!==m[l],f=(c?m:n)[l],p=y&&c?u(f,i):g&&"function"==typeof f?u(Function.call,f):f,m&&s(m,l,f,t&a.U),b[l]!=f&&o(b,l,p),g&&_[l]!=f&&(_[l]=f)};i.core=r,a.F=1,a.G=2,a.S=4,a.P=8,a.B=16,a.W=32,a.U=64,a.R=128,t.exports=a},function(t,e,n){t.exports=!n(7)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(t,e){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,e,n){var i=n(0),r=n(8),o=n(12),s=n(30)("src"),u=Function.toString,a=(""+u).split("toString");n(10).inspectSource=function(t){return u.call(t)},(t.exports=function(t,e,n,u){var l="function"==typeof n;l&&(o(n,"name")||r(n,"name",e)),t[e]!==n&&(l&&(o(n,s)||r(n,s,t[e]?""+t[e]:a.join(String(e)))),t===i?t[e]=n:u?t[e]?t[e]=n:r(t,e,n):(delete t[e],r(t,e,n)))})(Function.prototype,"toString",function(){return"function"==typeof this&&this[s]||u.call(this)})},function(t,e){t.exports=function(t){try{return!!t()}catch(t){return!0}}},function(t,e,n){var i=n(13),r=n(25);t.exports=n(4)?function(t,e,n){return i.f(t,e,r(1,n))}:function(t,e,n){return t[e]=n,t}},function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},function(t,e){var n=t.exports={version:"2.5.7"};"number"==typeof __e&&(__e=n)},function(t,e,n){var i=n(14);t.exports=function(t,e,n){if(i(t),void 0===e)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,i){return t.call(e,n,i)};case 3:return function(n,i,r){return t.call(e,n,i,r)}}return function(){return t.apply(e,arguments)}}},function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},function(t,e,n){var i=n(2),r=n(41),o=n(29),s=Object.defineProperty;e.f=n(4)?Object.defineProperty:function(t,e,n){if(i(t),e=o(e,!0),i(n),r)try{return s(t,e,n)}catch(t){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(t[e]=n.value),t}},function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,e){t.exports={}},function(t,e){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},function(t,e,n){"use strict";var i=n(7);t.exports=function(t,e){return!!t&&i(function(){e?t.call(null,function(){},1):t.call(null)})}},function(t,e,n){var i=n(23),r=n(16);t.exports=function(t){return i(r(t))}},function(t,e,n){var i=n(53),r=Math.min;t.exports=function(t){return t>0?r(i(t),9007199254740991):0}},function(t,e,n){var i=n(11),r=n(23),o=n(28),s=n(19),u=n(64);t.exports=function(t,e){var n=1==t,a=2==t,l=3==t,c=4==t,f=6==t,p=5==t||f,h=e||u;return function(e,u,d){for(var v,g,y=o(e),m=r(y),b=i(u,d,3),_=s(m.length),x=0,w=n?h(e,_):a?h(e,0):void 0;_>x;x++)if((p||x in m)&&(v=m[x],g=b(v,x,y),t))if(n)w[x]=g;else if(g)switch(t){case 3:return!0;case 5:return v;case 6:return x;case 2:w.push(v)}else if(c)return!1;return f?-1:l||c?c:w}}},function(t,e,n){var i=n(5),r=n(0).document,o=i(r)&&i(r.createElement);t.exports=function(t){return o?r.createElement(t):{}}},function(t,e){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(t,e,n){var i=n(9);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==i(t)?t.split(""):Object(t)}},function(t,e){t.exports=!1},function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},function(t,e,n){var i=n(13).f,r=n(12),o=n(1)("toStringTag");t.exports=function(t,e,n){t&&!r(t=n?t:t.prototype,o)&&i(t,o,{configurable:!0,value:e})}},function(t,e,n){var i=n(49)("keys"),r=n(30);t.exports=function(t){return i[t]||(i[t]=r(t))}},function(t,e,n){var i=n(16);t.exports=function(t){return Object(i(t))}},function(t,e,n){var i=n(5);t.exports=function(t,e){if(!i(t))return t;var n,r;if(e&&"function"==typeof(n=t.toString)&&!i(r=n.call(t)))return r;if("function"==typeof(n=t.valueOf)&&!i(r=n.call(t)))return r;if(!e&&"function"==typeof(n=t.toString)&&!i(r=n.call(t)))return r;throw TypeError("Can't convert object to primitive value")}},function(t,e){var n=0,i=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++n+i).toString(36))}},function(t,e,n){"use strict";var i=n(0),r=n(12),o=n(9),s=n(67),u=n(29),a=n(7),l=n(77).f,c=n(45).f,f=n(13).f,p=n(51).trim,h=i.Number,d=h,v=h.prototype,g="Number"==o(n(44)(v)),y="trim"in String.prototype,m=function(t){var e=u(t,!1);if("string"==typeof e&&e.length>2){e=y?e.trim():p(e,3);var n,i,r,o=e.charCodeAt(0);if(43===o||45===o){if(88===(n=e.charCodeAt(2))||120===n)return NaN}else if(48===o){switch(e.charCodeAt(1)){case 66:case 98:i=2,r=49;break;case 79:case 111:i=8,r=55;break;default:return+e}for(var s,a=e.slice(2),l=0,c=a.length;l<c;l++)if((s=a.charCodeAt(l))<48||s>r)return NaN;return parseInt(a,i)}}return+e};if(!h(" 0o1")||!h("0b1")||h("+0x1")){h=function(t){var e=arguments.length<1?0:t,n=this;return n instanceof h&&(g?a(function(){v.valueOf.call(n)}):"Number"!=o(n))?s(new d(m(e)),n,h):m(e)};for(var b,_=n(4)?l(d):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),x=0;_.length>x;x++)r(d,b=_[x])&&!r(h,b)&&f(h,b,c(d,b));h.prototype=v,v.constructor=h,n(6)(i,"Number",h)}},function(t,e,n){"use strict";function i(t){return 0!==t&&(!(!Array.isArray(t)||0!==t.length)||!t)}function r(t){return function(){return!t.apply(void 0,arguments)}}function o(t,e){return void 0===t&&(t="undefined"),null===t&&(t="null"),!1===t&&(t="false"),-1!==t.toString().toLowerCase().indexOf(e.trim())}function s(t,e,n,i){return t.filter(function(t){return o(i(t,n),e)})}function u(t){return t.filter(function(t){return!t.$isLabel})}function a(t,e){return function(n){return n.reduce(function(n,i){return i[t]&&i[t].length?(n.push({$groupLabel:i[e],$isLabel:!0}),n.concat(i[t])):n},[])}}function l(t,e,i,r,o){return function(u){return u.map(function(u){var a;if(!u[i])return console.warn("Options passed to vue-multiselect do not contain groups, despite the config."),[];var l=s(u[i],t,e,o);return l.length?(a={},n.i(d.a)(a,r,u[r]),n.i(d.a)(a,i,l),a):[]})}}var c=n(59),f=n(54),p=(n.n(f),n(95)),h=(n.n(p),n(31)),d=(n.n(h),n(58)),v=n(91),g=(n.n(v),n(98)),y=(n.n(g),n(92)),m=(n.n(y),n(88)),b=(n.n(m),n(97)),_=(n.n(b),n(89)),x=(n.n(_),n(96)),w=(n.n(x),n(93)),S=(n.n(w),n(90)),O=(n.n(S),function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return function(t){return e.reduce(function(t,e){return e(t)},t)}});e.a={data:function(){return{search:"",isOpen:!1,preferredOpenDirection:"below",optimizedHeight:this.maxHeight}},props:{internalSearch:{type:Boolean,default:!0},options:{type:Array,required:!0},multiple:{type:Boolean,default:!1},value:{type:null,default:function(){return[]}},trackBy:{type:String},label:{type:String},searchable:{type:Boolean,default:!0},clearOnSelect:{type:Boolean,default:!0},hideSelected:{type:Boolean,default:!1},placeholder:{type:String,default:"Select option"},allowEmpty:{type:Boolean,default:!0},resetAfter:{type:Boolean,default:!1},closeOnSelect:{type:Boolean,default:!0},customLabel:{type:Function,default:function(t,e){return i(t)?"":e?t[e]:t}},taggable:{type:Boolean,default:!1},tagPlaceholder:{type:String,default:"Press enter to create a tag"},tagPosition:{type:String,default:"top"},max:{type:[Number,Boolean],default:!1},id:{default:null},optionsLimit:{type:Number,default:1e3},groupValues:{type:String},groupLabel:{type:String},groupSelect:{type:Boolean,default:!1},blockKeys:{type:Array,default:function(){return[]}},preserveSearch:{type:Boolean,default:!1},preselectFirst:{type:Boolean,default:!1}},mounted:function(){!this.multiple&&this.max&&console.warn("[Vue-Multiselect warn]: Max prop should not be used when prop Multiple equals false."),this.preselectFirst&&!this.internalValue.length&&this.options.length&&this.select(this.filteredOptions[0])},computed:{internalValue:function(){return this.value||0===this.value?Array.isArray(this.value)?this.value:[this.value]:[]},filteredOptions:function(){var t=this.search||"",e=t.toLowerCase().trim(),n=this.options.concat();return n=this.internalSearch?this.groupValues?this.filterAndFlat(n,e,this.label):s(n,e,this.label,this.customLabel):this.groupValues?a(this.groupValues,this.groupLabel)(n):n,n=this.hideSelected?n.filter(r(this.isSelected)):n,this.taggable&&e.length&&!this.isExistingOption(e)&&("bottom"===this.tagPosition?n.push({isTag:!0,label:t}):n.unshift({isTag:!0,label:t})),n.slice(0,this.optionsLimit)},valueKeys:function(){var t=this;return this.trackBy?this.internalValue.map(function(e){return e[t.trackBy]}):this.internalValue},optionKeys:function(){var t=this;return(this.groupValues?this.flatAndStrip(this.options):this.options).map(function(e){return t.customLabel(e,t.label).toString().toLowerCase()})},currentOptionLabel:function(){return this.multiple?this.searchable?"":this.placeholder:this.internalValue.length?this.getOptionLabel(this.internalValue[0]):this.searchable?"":this.placeholder}},watch:{internalValue:function(){this.resetAfter&&this.internalValue.length&&(this.search="",this.$emit("input",this.multiple?[]:null))},search:function(){this.$emit("search-change",this.search,this.id)}},methods:{getValue:function(){return this.multiple?this.internalValue:0===this.internalValue.length?null:this.internalValue[0]},filterAndFlat:function(t,e,n){return O(l(e,n,this.groupValues,this.groupLabel,this.customLabel),a(this.groupValues,this.groupLabel))(t)},flatAndStrip:function(t){return O(a(this.groupValues,this.groupLabel),u)(t)},updateSearch:function(t){this.search=t},isExistingOption:function(t){return!!this.options&&this.optionKeys.indexOf(t)>-1},isSelected:function(t){var e=this.trackBy?t[this.trackBy]:t;return this.valueKeys.indexOf(e)>-1},isOptionDisabled:function(t){return!!t.$isDisabled},getOptionLabel:function(t){if(i(t))return"";if(t.isTag)return t.label;if(t.$isLabel)return t.$groupLabel;var e=this.customLabel(t,this.label);return i(e)?"":e},select:function(t,e){if(t.$isLabel&&this.groupSelect)return void this.selectGroup(t);if(!(-1!==this.blockKeys.indexOf(e)||this.disabled||t.$isDisabled||t.$isLabel)&&(!this.max||!this.multiple||this.internalValue.length!==this.max)&&("Tab"!==e||this.pointerDirty)){if(t.isTag)this.$emit("tag",t.label,this.id),this.search="",this.closeOnSelect&&!this.multiple&&this.deactivate();else{if(this.isSelected(t))return void("Tab"!==e&&this.removeElement(t));this.$emit("select",t,this.id),this.multiple?this.$emit("input",this.internalValue.concat([t]),this.id):this.$emit("input",t,this.id),this.clearOnSelect&&(this.search="")}this.closeOnSelect&&this.deactivate()}},selectGroup:function(t){var e=this,n=this.options.find(function(n){return n[e.groupLabel]===t.$groupLabel});if(n)if(this.wholeGroupSelected(n)){this.$emit("remove",n[this.groupValues],this.id);var i=this.internalValue.filter(function(t){return-1===n[e.groupValues].indexOf(t)});this.$emit("input",i,this.id)}else{var r=n[this.groupValues].filter(function(t){return!(e.isOptionDisabled(t)||e.isSelected(t))});this.$emit("select",r,this.id),this.$emit("input",this.internalValue.concat(r),this.id)}},wholeGroupSelected:function(t){var e=this;return t[this.groupValues].every(function(t){return e.isSelected(t)||e.isOptionDisabled(t)})},wholeGroupDisabled:function(t){return t[this.groupValues].every(this.isOptionDisabled)},removeElement:function(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];if(!this.disabled&&!t.$isDisabled){if(!this.allowEmpty&&this.internalValue.length<=1)return void this.deactivate();var i="object"===n.i(c.a)(t)?this.valueKeys.indexOf(t[this.trackBy]):this.valueKeys.indexOf(t);if(this.$emit("remove",t,this.id),this.multiple){var r=this.internalValue.slice(0,i).concat(this.internalValue.slice(i+1));this.$emit("input",r,this.id)}else this.$emit("input",null,this.id);this.closeOnSelect&&e&&this.deactivate()}},removeLastElement:function(){-1===this.blockKeys.indexOf("Delete")&&0===this.search.length&&Array.isArray(this.internalValue)&&this.internalValue.length&&this.removeElement(this.internalValue[this.internalValue.length-1],!1)},activate:function(){var t=this;this.isOpen||this.disabled||(this.adjustPosition(),this.groupValues&&0===this.pointer&&this.filteredOptions.length&&(this.pointer=1),this.isOpen=!0,this.searchable?(this.preserveSearch||(this.search=""),this.$nextTick(function(){return t.$refs.search.focus()})):this.$el.focus(),this.$emit("open",this.id))},deactivate:function(){this.isOpen&&(this.isOpen=!1,this.searchable?this.$refs.search.blur():this.$el.blur(),this.preserveSearch||(this.search=""),this.$emit("close",this.getValue(),this.id))},toggle:function(){this.isOpen?this.deactivate():this.activate()},adjustPosition:function(){if("undefined"!=typeof window){var t=this.$el.getBoundingClientRect().top,e=window.innerHeight-this.$el.getBoundingClientRect().bottom;e>this.maxHeight||e>t||"below"===this.openDirection||"bottom"===this.openDirection?(this.preferredOpenDirection="below",this.optimizedHeight=Math.min(e-40,this.maxHeight)):(this.preferredOpenDirection="above",this.optimizedHeight=Math.min(t-40,this.maxHeight))}}}}},function(t,e,n){"use strict";var i=n(54),r=(n.n(i),n(31));n.n(r);e.a={data:function(){return{pointer:0,pointerDirty:!1}},props:{showPointer:{type:Boolean,default:!0},optionHeight:{type:Number,default:40}},computed:{pointerPosition:function(){return this.pointer*this.optionHeight},visibleElements:function(){return this.optimizedHeight/this.optionHeight}},watch:{filteredOptions:function(){this.pointerAdjust()},isOpen:function(){this.pointerDirty=!1}},methods:{optionHighlight:function(t,e){return{"multiselect__option--highlight":t===this.pointer&&this.showPointer,"multiselect__option--selected":this.isSelected(e)}},groupHighlight:function(t,e){var n=this;if(!this.groupSelect)return["multiselect__option--group","multiselect__option--disabled"];var i=this.options.find(function(t){return t[n.groupLabel]===e.$groupLabel});return i&&!this.wholeGroupDisabled(i)?["multiselect__option--group",{"multiselect__option--highlight":t===this.pointer&&this.showPointer},{"multiselect__option--group-selected":this.wholeGroupSelected(i)}]:"multiselect__option--disabled"},addPointerElement:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"Enter",e=t.key;this.filteredOptions.length>0&&this.select(this.filteredOptions[this.pointer],e),this.pointerReset()},pointerForward:function(){this.pointer<this.filteredOptions.length-1&&(this.pointer++,this.$refs.list.scrollTop<=this.pointerPosition-(this.visibleElements-1)*this.optionHeight&&(this.$refs.list.scrollTop=this.pointerPosition-(this.visibleElements-1)*this.optionHeight),this.filteredOptions[this.pointer]&&this.filteredOptions[this.pointer].$isLabel&&!this.groupSelect&&this.pointerForward()),this.pointerDirty=!0},pointerBackward:function(){this.pointer>0?(this.pointer--,this.$refs.list.scrollTop>=this.pointerPosition&&(this.$refs.list.scrollTop=this.pointerPosition),this.filteredOptions[this.pointer]&&this.filteredOptions[this.pointer].$isLabel&&!this.groupSelect&&this.pointerBackward()):this.filteredOptions[this.pointer]&&this.filteredOptions[0].$isLabel&&!this.groupSelect&&this.pointerForward(),this.pointerDirty=!0},pointerReset:function(){this.closeOnSelect&&(this.pointer=0,this.$refs.list&&(this.$refs.list.scrollTop=0))},pointerAdjust:function(){this.pointer>=this.filteredOptions.length-1&&(this.pointer=this.filteredOptions.length?this.filteredOptions.length-1:0),this.filteredOptions.length>0&&this.filteredOptions[this.pointer].$isLabel&&!this.groupSelect&&this.pointerForward()},pointerSet:function(t){this.pointer=t,this.pointerDirty=!0}}}},function(t,e,n){"use strict";var i=n(36),r=n(74),o=n(15),s=n(18);t.exports=n(72)(Array,"Array",function(t,e){this._t=s(t),this._i=0,this._k=e},function(){var t=this._t,e=this._k,n=this._i++;return!t||n>=t.length?(this._t=void 0,r(1)):"keys"==e?r(0,n):"values"==e?r(0,t[n]):r(0,[n,t[n]])},"values"),o.Arguments=o.Array,i("keys"),i("values"),i("entries")},function(t,e,n){"use strict";var i=n(31),r=(n.n(i),n(32)),o=n(33);e.a={name:"vue-multiselect",mixins:[r.a,o.a],props:{name:{type:String,default:""},selectLabel:{type:String,default:"Press enter to select"},selectGroupLabel:{type:String,default:"Press enter to select group"},selectedLabel:{type:String,default:"Selected"},deselectLabel:{type:String,default:"Press enter to remove"},deselectGroupLabel:{type:String,default:"Press enter to deselect group"},showLabels:{type:Boolean,default:!0},limit:{type:Number,default:99999},maxHeight:{type:Number,default:300},limitText:{type:Function,default:function(t){return"and ".concat(t," more")}},loading:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},openDirection:{type:String,default:""},showNoOptions:{type:Boolean,default:!0},showNoResults:{type:Boolean,default:!0},tabindex:{type:Number,default:0}},computed:{isSingleLabelVisible:function(){return(this.singleValue||0===this.singleValue)&&(!this.isOpen||!this.searchable)&&!this.visibleValues.length},isPlaceholderVisible:function(){return!(this.internalValue.length||this.searchable&&this.isOpen)},visibleValues:function(){return this.multiple?this.internalValue.slice(0,this.limit):[]},singleValue:function(){return this.internalValue[0]},deselectLabelText:function(){return this.showLabels?this.deselectLabel:""},deselectGroupLabelText:function(){return this.showLabels?this.deselectGroupLabel:""},selectLabelText:function(){return this.showLabels?this.selectLabel:""},selectGroupLabelText:function(){return this.showLabels?this.selectGroupLabel:""},selectedLabelText:function(){return this.showLabels?this.selectedLabel:""},inputStyle:function(){if(this.searchable||this.multiple&&this.value&&this.value.length)return this.isOpen?{width:"100%"}:{width:"0",position:"absolute",padding:"0"}},contentStyle:function(){return this.options.length?{display:"inline-block"}:{display:"block"}},isAbove:function(){return"above"===this.openDirection||"top"===this.openDirection||"below"!==this.openDirection&&"bottom"!==this.openDirection&&"above"===this.preferredOpenDirection},showSearchInput:function(){return this.searchable&&(!this.hasSingleSelectedSlot||!this.visibleSingleValue&&0!==this.visibleSingleValue||this.isOpen)}}}},function(t,e,n){var i=n(1)("unscopables"),r=Array.prototype;void 0==r[i]&&n(8)(r,i,{}),t.exports=function(t){r[i][t]=!0}},function(t,e,n){var i=n(18),r=n(19),o=n(85);t.exports=function(t){return function(e,n,s){var u,a=i(e),l=r(a.length),c=o(s,l);if(t&&n!=n){for(;l>c;)if((u=a[c++])!=u)return!0}else for(;l>c;c++)if((t||c in a)&&a[c]===n)return t||c||0;return!t&&-1}}},function(t,e,n){var i=n(9),r=n(1)("toStringTag"),o="Arguments"==i(function(){return arguments}()),s=function(t,e){try{return t[e]}catch(t){}};t.exports=function(t){var e,n,u;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(n=s(e=Object(t),r))?n:o?i(e):"Object"==(u=i(e))&&"function"==typeof e.callee?"Arguments":u}},function(t,e,n){"use strict";var i=n(2);t.exports=function(){var t=i(this),e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.unicode&&(e+="u"),t.sticky&&(e+="y"),e}},function(t,e,n){var i=n(0).document;t.exports=i&&i.documentElement},function(t,e,n){t.exports=!n(4)&&!n(7)(function(){return 7!=Object.defineProperty(n(21)("div"),"a",{get:function(){return 7}}).a})},function(t,e,n){var i=n(9);t.exports=Array.isArray||function(t){return"Array"==i(t)}},function(t,e,n){"use strict";function i(t){var e,n;this.promise=new t(function(t,i){if(void 0!==e||void 0!==n)throw TypeError("Bad Promise constructor");e=t,n=i}),this.resolve=r(e),this.reject=r(n)}var r=n(14);t.exports.f=function(t){return new i(t)}},function(t,e,n){var i=n(2),r=n(76),o=n(22),s=n(27)("IE_PROTO"),u=function(){},a=function(){var t,e=n(21)("iframe"),i=o.length;for(e.style.display="none",n(40).appendChild(e),e.src="javascript:",t=e.contentWindow.document,t.open(),t.write("<script>document.F=Object<\/script>"),t.close(),a=t.F;i--;)delete a.prototype[o[i]];return a()};t.exports=Object.create||function(t,e){var n;return null!==t?(u.prototype=i(t),n=new u,u.prototype=null,n[s]=t):n=a(),void 0===e?n:r(n,e)}},function(t,e,n){var i=n(79),r=n(25),o=n(18),s=n(29),u=n(12),a=n(41),l=Object.getOwnPropertyDescriptor;e.f=n(4)?l:function(t,e){if(t=o(t),e=s(e,!0),a)try{return l(t,e)}catch(t){}if(u(t,e))return r(!i.f.call(t,e),t[e])}},function(t,e,n){var i=n(12),r=n(18),o=n(37)(!1),s=n(27)("IE_PROTO");t.exports=function(t,e){var n,u=r(t),a=0,l=[];for(n in u)n!=s&&i(u,n)&&l.push(n);for(;e.length>a;)i(u,n=e[a++])&&(~o(l,n)||l.push(n));return l}},function(t,e,n){var i=n(46),r=n(22);t.exports=Object.keys||function(t){return i(t,r)}},function(t,e,n){var i=n(2),r=n(5),o=n(43);t.exports=function(t,e){if(i(t),r(e)&&e.constructor===t)return e;var n=o.f(t);return(0,n.resolve)(e),n.promise}},function(t,e,n){var i=n(10),r=n(0),o=r["__core-js_shared__"]||(r["__core-js_shared__"]={});(t.exports=function(t,e){return o[t]||(o[t]=void 0!==e?e:{})})("versions",[]).push({version:i.version,mode:n(24)?"pure":"global",copyright:"© 2018 Denis Pushkarev (zloirock.ru)"})},function(t,e,n){var i=n(2),r=n(14),o=n(1)("species");t.exports=function(t,e){var n,s=i(t).constructor;return void 0===s||void 0==(n=i(s)[o])?e:r(n)}},function(t,e,n){var i=n(3),r=n(16),o=n(7),s=n(84),u="["+s+"]",a="​",l=RegExp("^"+u+u+"*"),c=RegExp(u+u+"*$"),f=function(t,e,n){var r={},u=o(function(){return!!s[t]()||a[t]()!=a}),l=r[t]=u?e(p):s[t];n&&(r[n]=l),i(i.P+i.F*u,"String",r)},p=f.trim=function(t,e){return t=String(r(t)),1&e&&(t=t.replace(l,"")),2&e&&(t=t.replace(c,"")),t};t.exports=f},function(t,e,n){var i,r,o,s=n(11),u=n(68),a=n(40),l=n(21),c=n(0),f=c.process,p=c.setImmediate,h=c.clearImmediate,d=c.MessageChannel,v=c.Dispatch,g=0,y={},m=function(){var t=+this;if(y.hasOwnProperty(t)){var e=y[t];delete y[t],e()}},b=function(t){m.call(t.data)};p&&h||(p=function(t){for(var e=[],n=1;arguments.length>n;)e.push(arguments[n++]);return y[++g]=function(){u("function"==typeof t?t:Function(t),e)},i(g),g},h=function(t){delete y[t]},"process"==n(9)(f)?i=function(t){f.nextTick(s(m,t,1))}:v&&v.now?i=function(t){v.now(s(m,t,1))}:d?(r=new d,o=r.port2,r.port1.onmessage=b,i=s(o.postMessage,o,1)):c.addEventListener&&"function"==typeof postMessage&&!c.importScripts?(i=function(t){c.postMessage(t+"","*")},c.addEventListener("message",b,!1)):i="onreadystatechange"in l("script")?function(t){a.appendChild(l("script")).onreadystatechange=function(){a.removeChild(this),m.call(t)}}:function(t){setTimeout(s(m,t,1),0)}),t.exports={set:p,clear:h}},function(t,e){var n=Math.ceil,i=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?i:n)(t)}},function(t,e,n){"use strict";var i=n(3),r=n(20)(5),o=!0;"find"in[]&&Array(1).find(function(){o=!1}),i(i.P+i.F*o,"Array",{find:function(t){return r(this,t,arguments.length>1?arguments[1]:void 0)}}),n(36)("find")},function(t,e,n){"use strict";var i,r,o,s,u=n(24),a=n(0),l=n(11),c=n(38),f=n(3),p=n(5),h=n(14),d=n(61),v=n(66),g=n(50),y=n(52).set,m=n(75)(),b=n(43),_=n(80),x=n(86),w=n(48),S=a.TypeError,O=a.process,L=O&&O.versions,k=L&&L.v8||"",P=a.Promise,T="process"==c(O),V=function(){},E=r=b.f,A=!!function(){try{var t=P.resolve(1),e=(t.constructor={})[n(1)("species")]=function(t){t(V,V)};return(T||"function"==typeof PromiseRejectionEvent)&&t.then(V)instanceof e&&0!==k.indexOf("6.6")&&-1===x.indexOf("Chrome/66")}catch(t){}}(),C=function(t){var e;return!(!p(t)||"function"!=typeof(e=t.then))&&e},D=function(t,e){if(!t._n){t._n=!0;var n=t._c;m(function(){for(var i=t._v,r=1==t._s,o=0;n.length>o;)!function(e){var n,o,s,u=r?e.ok:e.fail,a=e.resolve,l=e.reject,c=e.domain;try{u?(r||(2==t._h&&$(t),t._h=1),!0===u?n=i:(c&&c.enter(),n=u(i),c&&(c.exit(),s=!0)),n===e.promise?l(S("Promise-chain cycle")):(o=C(n))?o.call(n,a,l):a(n)):l(i)}catch(t){c&&!s&&c.exit(),l(t)}}(n[o++]);t._c=[],t._n=!1,e&&!t._h&&j(t)})}},j=function(t){y.call(a,function(){var e,n,i,r=t._v,o=N(t);if(o&&(e=_(function(){T?O.emit("unhandledRejection",r,t):(n=a.onunhandledrejection)?n({promise:t,reason:r}):(i=a.console)&&i.error&&i.error("Unhandled promise rejection",r)}),t._h=T||N(t)?2:1),t._a=void 0,o&&e.e)throw e.v})},N=function(t){return 1!==t._h&&0===(t._a||t._c).length},$=function(t){y.call(a,function(){var e;T?O.emit("rejectionHandled",t):(e=a.onrejectionhandled)&&e({promise:t,reason:t._v})})},F=function(t){var e=this;e._d||(e._d=!0,e=e._w||e,e._v=t,e._s=2,e._a||(e._a=e._c.slice()),D(e,!0))},M=function(t){var e,n=this;if(!n._d){n._d=!0,n=n._w||n;try{if(n===t)throw S("Promise can't be resolved itself");(e=C(t))?m(function(){var i={_w:n,_d:!1};try{e.call(t,l(M,i,1),l(F,i,1))}catch(t){F.call(i,t)}}):(n._v=t,n._s=1,D(n,!1))}catch(t){F.call({_w:n,_d:!1},t)}}};A||(P=function(t){d(this,P,"Promise","_h"),h(t),i.call(this);try{t(l(M,this,1),l(F,this,1))}catch(t){F.call(this,t)}},i=function(t){this._c=[],this._a=void 0,this._s=0,this._d=!1,this._v=void 0,this._h=0,this._n=!1},i.prototype=n(81)(P.prototype,{then:function(t,e){var n=E(g(this,P));return n.ok="function"!=typeof t||t,n.fail="function"==typeof e&&e,n.domain=T?O.domain:void 0,this._c.push(n),this._a&&this._a.push(n),this._s&&D(this,!1),n.promise},catch:function(t){return this.then(void 0,t)}}),o=function(){var t=new i;this.promise=t,this.resolve=l(M,t,1),this.reject=l(F,t,1)},b.f=E=function(t){return t===P||t===s?new o(t):r(t)}),f(f.G+f.W+f.F*!A,{Promise:P}),n(26)(P,"Promise"),n(83)("Promise"),s=n(10).Promise,f(f.S+f.F*!A,"Promise",{reject:function(t){var e=E(this);return(0,e.reject)(t),e.promise}}),f(f.S+f.F*(u||!A),"Promise",{resolve:function(t){return w(u&&this===s?P:this,t)}}),f(f.S+f.F*!(A&&n(73)(function(t){P.all(t).catch(V)})),"Promise",{all:function(t){var e=this,n=E(e),i=n.resolve,r=n.reject,o=_(function(){var n=[],o=0,s=1;v(t,!1,function(t){var u=o++,a=!1;n.push(void 0),s++,e.resolve(t).then(function(t){a||(a=!0,n[u]=t,--s||i(n))},r)}),--s||i(n)});return o.e&&r(o.v),n.promise},race:function(t){var e=this,n=E(e),i=n.reject,r=_(function(){v(t,!1,function(t){e.resolve(t).then(n.resolve,i)})});return r.e&&i(r.v),n.promise}})},function(t,e,n){"use strict";var i=n(3),r=n(10),o=n(0),s=n(50),u=n(48);i(i.P+i.R,"Promise",{finally:function(t){var e=s(this,r.Promise||o.Promise),n="function"==typeof t;return this.then(n?function(n){return u(e,t()).then(function(){return n})}:t,n?function(n){return u(e,t()).then(function(){throw n})}:t)}})},function(t,e,n){"use strict";function i(t){n(99)}var r=n(35),o=n(101),s=n(100),u=i,a=s(r.a,o.a,!1,u,null,null);e.a=a.exports},function(t,e,n){"use strict";function i(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}e.a=i},function(t,e,n){"use strict";function i(t){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function r(t){return(r="function"==typeof Symbol&&"symbol"===i(Symbol.iterator)?function(t){return i(t)}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":i(t)})(t)}e.a=r},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(34),r=(n.n(i),n(55)),o=(n.n(r),n(56)),s=(n.n(o),n(57)),u=n(32),a=n(33);n.d(e,"Multiselect",function(){return s.a}),n.d(e,"multiselectMixin",function(){return u.a}),n.d(e,"pointerMixin",function(){return a.a}),e.default=s.a},function(t,e){t.exports=function(t,e,n,i){if(!(t instanceof e)||void 0!==i&&i in t)throw TypeError(n+": incorrect invocation!");return t}},function(t,e,n){var i=n(14),r=n(28),o=n(23),s=n(19);t.exports=function(t,e,n,u,a){i(e);var l=r(t),c=o(l),f=s(l.length),p=a?f-1:0,h=a?-1:1;if(n<2)for(;;){if(p in c){u=c[p],p+=h;break}if(p+=h,a?p<0:f<=p)throw TypeError("Reduce of empty array with no initial value")}for(;a?p>=0:f>p;p+=h)p in c&&(u=e(u,c[p],p,l));return u}},function(t,e,n){var i=n(5),r=n(42),o=n(1)("species");t.exports=function(t){var e;return r(t)&&(e=t.constructor,"function"!=typeof e||e!==Array&&!r(e.prototype)||(e=void 0),i(e)&&null===(e=e[o])&&(e=void 0)),void 0===e?Array:e}},function(t,e,n){var i=n(63);t.exports=function(t,e){return new(i(t))(e)}},function(t,e,n){"use strict";var i=n(8),r=n(6),o=n(7),s=n(16),u=n(1);t.exports=function(t,e,n){var a=u(t),l=n(s,a,""[t]),c=l[0],f=l[1];o(function(){var e={};return e[a]=function(){return 7},7!=""[t](e)})&&(r(String.prototype,t,c),i(RegExp.prototype,a,2==e?function(t,e){return f.call(t,this,e)}:function(t){return f.call(t,this)}))}},function(t,e,n){var i=n(11),r=n(70),o=n(69),s=n(2),u=n(19),a=n(87),l={},c={},e=t.exports=function(t,e,n,f,p){var h,d,v,g,y=p?function(){return t}:a(t),m=i(n,f,e?2:1),b=0;if("function"!=typeof y)throw TypeError(t+" is not iterable!");if(o(y)){for(h=u(t.length);h>b;b++)if((g=e?m(s(d=t[b])[0],d[1]):m(t[b]))===l||g===c)return g}else for(v=y.call(t);!(d=v.next()).done;)if((g=r(v,m,d.value,e))===l||g===c)return g};e.BREAK=l,e.RETURN=c},function(t,e,n){var i=n(5),r=n(82).set;t.exports=function(t,e,n){var o,s=e.constructor;return s!==n&&"function"==typeof s&&(o=s.prototype)!==n.prototype&&i(o)&&r&&r(t,o),t}},function(t,e){t.exports=function(t,e,n){var i=void 0===n;switch(e.length){case 0:return i?t():t.call(n);case 1:return i?t(e[0]):t.call(n,e[0]);case 2:return i?t(e[0],e[1]):t.call(n,e[0],e[1]);case 3:return i?t(e[0],e[1],e[2]):t.call(n,e[0],e[1],e[2]);case 4:return i?t(e[0],e[1],e[2],e[3]):t.call(n,e[0],e[1],e[2],e[3])}return t.apply(n,e)}},function(t,e,n){var i=n(15),r=n(1)("iterator"),o=Array.prototype;t.exports=function(t){return void 0!==t&&(i.Array===t||o[r]===t)}},function(t,e,n){var i=n(2);t.exports=function(t,e,n,r){try{return r?e(i(n)[0],n[1]):e(n)}catch(e){var o=t.return;throw void 0!==o&&i(o.call(t)),e}}},function(t,e,n){"use strict";var i=n(44),r=n(25),o=n(26),s={};n(8)(s,n(1)("iterator"),function(){return this}),t.exports=function(t,e,n){t.prototype=i(s,{next:r(1,n)}),o(t,e+" Iterator")}},function(t,e,n){"use strict";var i=n(24),r=n(3),o=n(6),s=n(8),u=n(15),a=n(71),l=n(26),c=n(78),f=n(1)("iterator"),p=!([].keys&&"next"in[].keys()),h=function(){return this};t.exports=function(t,e,n,d,v,g,y){a(n,e,d);var m,b,_,x=function(t){if(!p&&t in L)return L[t];switch(t){case"keys":case"values":return function(){return new n(this,t)}}return function(){return new n(this,t)}},w=e+" Iterator",S="values"==v,O=!1,L=t.prototype,k=L[f]||L["@@iterator"]||v&&L[v],P=k||x(v),T=v?S?x("entries"):P:void 0,V="Array"==e?L.entries||k:k;if(V&&(_=c(V.call(new t)))!==Object.prototype&&_.next&&(l(_,w,!0),i||"function"==typeof _[f]||s(_,f,h)),S&&k&&"values"!==k.name&&(O=!0,P=function(){return k.call(this)}),i&&!y||!p&&!O&&L[f]||s(L,f,P),u[e]=P,u[w]=h,v)if(m={values:S?P:x("values"),keys:g?P:x("keys"),entries:T},y)for(b in m)b in L||o(L,b,m[b]);else r(r.P+r.F*(p||O),e,m);return m}},function(t,e,n){var i=n(1)("iterator"),r=!1;try{var o=[7][i]();o.return=function(){r=!0},Array.from(o,function(){throw 2})}catch(t){}t.exports=function(t,e){if(!e&&!r)return!1;var n=!1;try{var o=[7],s=o[i]();s.next=function(){return{done:n=!0}},o[i]=function(){return s},t(o)}catch(t){}return n}},function(t,e){t.exports=function(t,e){return{value:e,done:!!t}}},function(t,e,n){var i=n(0),r=n(52).set,o=i.MutationObserver||i.WebKitMutationObserver,s=i.process,u=i.Promise,a="process"==n(9)(s);t.exports=function(){var t,e,n,l=function(){var i,r;for(a&&(i=s.domain)&&i.exit();t;){r=t.fn,t=t.next;try{r()}catch(i){throw t?n():e=void 0,i}}e=void 0,i&&i.enter()};if(a)n=function(){s.nextTick(l)};else if(!o||i.navigator&&i.navigator.standalone)if(u&&u.resolve){var c=u.resolve(void 0);n=function(){c.then(l)}}else n=function(){r.call(i,l)};else{var f=!0,p=document.createTextNode("");new o(l).observe(p,{characterData:!0}),n=function(){p.data=f=!f}}return function(i){var r={fn:i,next:void 0};e&&(e.next=r),t||(t=r,n()),e=r}}},function(t,e,n){var i=n(13),r=n(2),o=n(47);t.exports=n(4)?Object.defineProperties:function(t,e){r(t);for(var n,s=o(e),u=s.length,a=0;u>a;)i.f(t,n=s[a++],e[n]);return t}},function(t,e,n){var i=n(46),r=n(22).concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return i(t,r)}},function(t,e,n){var i=n(12),r=n(28),o=n(27)("IE_PROTO"),s=Object.prototype;t.exports=Object.getPrototypeOf||function(t){return t=r(t),i(t,o)?t[o]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?s:null}},function(t,e){e.f={}.propertyIsEnumerable},function(t,e){t.exports=function(t){try{return{e:!1,v:t()}}catch(t){return{e:!0,v:t}}}},function(t,e,n){var i=n(6);t.exports=function(t,e,n){for(var r in e)i(t,r,e[r],n);return t}},function(t,e,n){var i=n(5),r=n(2),o=function(t,e){if(r(t),!i(e)&&null!==e)throw TypeError(e+": can't set as prototype!")};t.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(t,e,i){try{i=n(11)(Function.call,n(45).f(Object.prototype,"__proto__").set,2),i(t,[]),e=!(t instanceof Array)}catch(t){e=!0}return function(t,n){return o(t,n),e?t.__proto__=n:i(t,n),t}}({},!1):void 0),check:o}},function(t,e,n){"use strict";var i=n(0),r=n(13),o=n(4),s=n(1)("species");t.exports=function(t){var e=i[t];o&&e&&!e[s]&&r.f(e,s,{configurable:!0,get:function(){return this}})}},function(t,e){t.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"},function(t,e,n){var i=n(53),r=Math.max,o=Math.min;t.exports=function(t,e){return t=i(t),t<0?r(t+e,0):o(t,e)}},function(t,e,n){var i=n(0),r=i.navigator;t.exports=r&&r.userAgent||""},function(t,e,n){var i=n(38),r=n(1)("iterator"),o=n(15);t.exports=n(10).getIteratorMethod=function(t){if(void 0!=t)return t[r]||t["@@iterator"]||o[i(t)]}},function(t,e,n){"use strict";var i=n(3),r=n(20)(2);i(i.P+i.F*!n(17)([].filter,!0),"Array",{filter:function(t){return r(this,t,arguments[1])}})},function(t,e,n){"use strict";var i=n(3),r=n(37)(!1),o=[].indexOf,s=!!o&&1/[1].indexOf(1,-0)<0;i(i.P+i.F*(s||!n(17)(o)),"Array",{indexOf:function(t){return s?o.apply(this,arguments)||0:r(this,t,arguments[1])}})},function(t,e,n){var i=n(3);i(i.S,"Array",{isArray:n(42)})},function(t,e,n){"use strict";var i=n(3),r=n(20)(1);i(i.P+i.F*!n(17)([].map,!0),"Array",{map:function(t){return r(this,t,arguments[1])}})},function(t,e,n){"use strict";var i=n(3),r=n(62);i(i.P+i.F*!n(17)([].reduce,!0),"Array",{reduce:function(t){return r(this,t,arguments.length,arguments[1],!1)}})},function(t,e,n){var i=Date.prototype,r=i.toString,o=i.getTime;new Date(NaN)+""!="Invalid Date"&&n(6)(i,"toString",function(){var t=o.call(this);return t===t?r.call(this):"Invalid Date"})},function(t,e,n){n(4)&&"g"!=/./g.flags&&n(13).f(RegExp.prototype,"flags",{configurable:!0,get:n(39)})},function(t,e,n){n(65)("search",1,function(t,e,n){return[function(n){"use strict";var i=t(this),r=void 0==n?void 0:n[e];return void 0!==r?r.call(n,i):new RegExp(n)[e](String(i))},n]})},function(t,e,n){"use strict";n(94);var i=n(2),r=n(39),o=n(4),s=/./.toString,u=function(t){n(6)(RegExp.prototype,"toString",t,!0)};n(7)(function(){return"/a/b"!=s.call({source:"a",flags:"b"})})?u(function(){var t=i(this);return"/".concat(t.source,"/","flags"in t?t.flags:!o&&t instanceof RegExp?r.call(t):void 0)}):"toString"!=s.name&&u(function(){return s.call(this)})},function(t,e,n){"use strict";n(51)("trim",function(t){return function(){return t(this,3)}})},function(t,e,n){for(var i=n(34),r=n(47),o=n(6),s=n(0),u=n(8),a=n(15),l=n(1),c=l("iterator"),f=l("toStringTag"),p=a.Array,h={CSSRuleList:!0,CSSStyleDeclaration:!1,CSSValueList:!1,ClientRectList:!1,DOMRectList:!1,DOMStringList:!1,DOMTokenList:!0,DataTransferItemList:!1,FileList:!1,HTMLAllCollection:!1,HTMLCollection:!1,HTMLFormElement:!1,HTMLSelectElement:!1,MediaList:!0,MimeTypeArray:!1,NamedNodeMap:!1,NodeList:!0,PaintRequestList:!1,Plugin:!1,PluginArray:!1,SVGLengthList:!1,SVGNumberList:!1,SVGPathSegList:!1,SVGPointList:!1,SVGStringList:!1,SVGTransformList:!1,SourceBufferList:!1,StyleSheetList:!0,TextTrackCueList:!1,TextTrackList:!1,TouchList:!1},d=r(h),v=0;v<d.length;v++){var g,y=d[v],m=h[y],b=s[y],_=b&&b.prototype;if(_&&(_[c]||u(_,c,p),_[f]||u(_,f,y),a[y]=p,m))for(g in i)_[g]||o(_,g,i[g],!0)}},function(t,e){},function(t,e){t.exports=function(t,e,n,i,r,o){var s,u=t=t||{},a=typeof t.default;"object"!==a&&"function"!==a||(s=t,u=t.default);var l="function"==typeof u?u.options:u;e&&(l.render=e.render,l.staticRenderFns=e.staticRenderFns,l._compiled=!0),n&&(l.functional=!0),r&&(l._scopeId=r);var c;if(o?(c=function(t){t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,t||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),i&&i.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(o)},l._ssrRegister=c):i&&(c=i),c){var f=l.functional,p=f?l.render:l.beforeCreate;f?(l._injectStyles=c,l.render=function(t,e){return c.call(e),p(t,e)}):l.beforeCreate=p?[].concat(p,c):[c]}return{esModule:s,exports:u,options:l}}},function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"multiselect",class:{"multiselect--active":t.isOpen,"multiselect--disabled":t.disabled,"multiselect--above":t.isAbove},attrs:{tabindex:t.searchable?-1:t.tabindex},on:{focus:function(e){t.activate()},blur:function(e){!t.searchable&&t.deactivate()},keydown:[function(e){return"button"in e||!t._k(e.keyCode,"down",40,e.key,["Down","ArrowDown"])?e.target!==e.currentTarget?null:(e.preventDefault(),void t.pointerForward()):null},function(e){return"button"in e||!t._k(e.keyCode,"up",38,e.key,["Up","ArrowUp"])?e.target!==e.currentTarget?null:(e.preventDefault(),void t.pointerBackward()):null}],keypress:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")||!t._k(e.keyCode,"tab",9,e.key,"Tab")?(e.stopPropagation(),e.target!==e.currentTarget?null:void t.addPointerElement(e)):null},keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"esc",27,e.key,"Escape"))return null;t.deactivate()}}},[t._t("caret",[n("div",{staticClass:"multiselect__select",on:{mousedown:function(e){e.preventDefault(),e.stopPropagation(),t.toggle()}}})],{toggle:t.toggle}),t._v(" "),t._t("clear",null,{search:t.search}),t._v(" "),n("div",{ref:"tags",staticClass:"multiselect__tags"},[t._t("selection",[n("div",{directives:[{name:"show",rawName:"v-show",value:t.visibleValues.length>0,expression:"visibleValues.length > 0"}],staticClass:"multiselect__tags-wrap"},[t._l(t.visibleValues,function(e,i){return[t._t("tag",[n("span",{key:i,staticClass:"multiselect__tag"},[n("span",{domProps:{textContent:t._s(t.getOptionLabel(e))}}),t._v(" "),n("i",{staticClass:"multiselect__tag-icon",attrs:{"aria-hidden":"true",tabindex:"1"},on:{keypress:function(n){if(!("button"in n)&&t._k(n.keyCode,"enter",13,n.key,"Enter"))return null;n.preventDefault(),t.removeElement(e)},mousedown:function(n){n.preventDefault(),t.removeElement(e)}}})])],{option:e,search:t.search,remove:t.removeElement})]})],2),t._v(" "),t.internalValue&&t.internalValue.length>t.limit?[t._t("limit",[n("strong",{staticClass:"multiselect__strong",domProps:{textContent:t._s(t.limitText(t.internalValue.length-t.limit))}})])]:t._e()],{search:t.search,remove:t.removeElement,values:t.visibleValues,isOpen:t.isOpen}),t._v(" "),n("transition",{attrs:{name:"multiselect__loading"}},[t._t("loading",[n("div",{directives:[{name:"show",rawName:"v-show",value:t.loading,expression:"loading"}],staticClass:"multiselect__spinner"})])],2),t._v(" "),t.searchable?n("input",{ref:"search",staticClass:"multiselect__input",style:t.inputStyle,attrs:{name:t.name,id:t.id,type:"text",autocomplete:"nope",placeholder:t.placeholder,disabled:t.disabled,tabindex:t.tabindex},domProps:{value:t.search},on:{input:function(e){t.updateSearch(e.target.value)},focus:function(e){e.preventDefault(),t.activate()},blur:function(e){e.preventDefault(),t.deactivate()},keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"esc",27,e.key,"Escape"))return null;t.deactivate()},keydown:[function(e){if(!("button"in e)&&t._k(e.keyCode,"down",40,e.key,["Down","ArrowDown"]))return null;e.preventDefault(),t.pointerForward()},function(e){if(!("button"in e)&&t._k(e.keyCode,"up",38,e.key,["Up","ArrowUp"]))return null;e.preventDefault(),t.pointerBackward()},function(e){if(!("button"in e)&&t._k(e.keyCode,"delete",[8,46],e.key,["Backspace","Delete"]))return null;e.stopPropagation(),t.removeLastElement()}],keypress:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?(e.preventDefault(),e.stopPropagation(),e.target!==e.currentTarget?null:void t.addPointerElement(e)):null}}}):t._e(),t._v(" "),t.isSingleLabelVisible?n("span",{staticClass:"multiselect__single",on:{mousedown:function(e){return e.preventDefault(),t.toggle(e)}}},[t._t("singleLabel",[[t._v(t._s(t.currentOptionLabel))]],{option:t.singleValue})],2):t._e(),t._v(" "),t.isPlaceholderVisible?n("span",{staticClass:"multiselect__placeholder",on:{mousedown:function(e){return e.preventDefault(),t.toggle(e)}}},[t._t("placeholder",[t._v("\n          "+t._s(t.placeholder)+"\n        ")])],2):t._e()],2),t._v(" "),n("transition",{attrs:{name:"multiselect"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.isOpen,expression:"isOpen"}],ref:"list",staticClass:"multiselect__content-wrapper",style:{maxHeight:t.optimizedHeight+"px"},attrs:{tabindex:"-1"},on:{focus:t.activate,mousedown:function(t){t.preventDefault()}}},[n("ul",{staticClass:"multiselect__content",style:t.contentStyle},[t._t("beforeList"),t._v(" "),t.multiple&&t.max===t.internalValue.length?n("li",[n("span",{staticClass:"multiselect__option"},[t._t("maxElements",[t._v("Maximum of "+t._s(t.max)+" options selected. First remove a selected option to select another.")])],2)]):t._e(),t._v(" "),!t.max||t.internalValue.length<t.max?t._l(t.filteredOptions,function(e,i){return n("li",{key:i,staticClass:"multiselect__element"},[e&&(e.$isLabel||e.$isDisabled)?t._e():n("span",{staticClass:"multiselect__option",class:t.optionHighlight(i,e),attrs:{"data-select":e&&e.isTag?t.tagPlaceholder:t.selectLabelText,"data-selected":t.selectedLabelText,"data-deselect":t.deselectLabelText},on:{click:function(n){n.stopPropagation(),t.select(e)},mouseenter:function(e){if(e.target!==e.currentTarget)return null;t.pointerSet(i)}}},[t._t("option",[n("span",[t._v(t._s(t.getOptionLabel(e)))])],{option:e,search:t.search})],2),t._v(" "),e&&(e.$isLabel||e.$isDisabled)?n("span",{staticClass:"multiselect__option",class:t.groupHighlight(i,e),attrs:{"data-select":t.groupSelect&&t.selectGroupLabelText,"data-deselect":t.groupSelect&&t.deselectGroupLabelText},on:{mouseenter:function(e){if(e.target!==e.currentTarget)return null;t.groupSelect&&t.pointerSet(i)},mousedown:function(n){n.preventDefault(),t.selectGroup(e)}}},[t._t("option",[n("span",[t._v(t._s(t.getOptionLabel(e)))])],{option:e,search:t.search})],2):t._e()])}):t._e(),t._v(" "),n("li",{directives:[{name:"show",rawName:"v-show",value:t.showNoResults&&0===t.filteredOptions.length&&t.search&&!t.loading,expression:"showNoResults && (filteredOptions.length === 0 && search && !loading)"}]},[n("span",{staticClass:"multiselect__option"},[t._t("noResult",[t._v("No elements found. Consider changing the search query.")],{search:t.search})],2)]),t._v(" "),n("li",{directives:[{name:"show",rawName:"v-show",value:t.showNoOptions&&0===t.options.length&&!t.search&&!t.loading,expression:"showNoOptions && (options.length === 0 && !search && !loading)"}]},[n("span",{staticClass:"multiselect__option"},[t._t("noOptions",[t._v("List is empty.")])],2)]),t._v(" "),t._t("afterList")],2)])])],2)},r=[],o={render:i,staticRenderFns:r};e.a=o}])});

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

!function(t,e){ true?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.VueFormWizard=e():t.VueFormWizard=e()}("undefined"!=typeof self?self:this,function(){return function(t){function e(n){if(a[n])return a[n].exports;var i=a[n]={i:n,l:!1,exports:{}};return t[n].call(i.exports,i,i.exports,e),i.l=!0,i.exports}var a={};return e.m=t,e.c=a,e.d=function(t,a,n){e.o(t,a)||Object.defineProperty(t,a,{configurable:!1,enumerable:!0,get:n})},e.n=function(t){var a=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(a,"a",a),a},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=7)}([function(t,e){t.exports=function(t,e,a,n,i,r){var s,o=t=t||{},c=typeof t.default;"object"!==c&&"function"!==c||(s=t,o=t.default);var u="function"==typeof o?o.options:o;e&&(u.render=e.render,u.staticRenderFns=e.staticRenderFns,u._compiled=!0),a&&(u.functional=!0),i&&(u._scopeId=i);var l;if(r?(l=function(t){t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,t||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),n&&n.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(r)},u._ssrRegister=l):n&&(l=n),l){var d=u.functional,b=d?u.render:u.beforeCreate;d?(u._injectStyles=l,u.render=function(t,e){return l.call(e),b(t,e)}):u.beforeCreate=b?[].concat(b,l):[l]}return{esModule:s,exports:o,options:u}}},function(t,e,a){"use strict";var n=a(2),i=a(4),r=a(14);e.a={name:"form-wizard",components:{WizardButton:n.a,WizardStep:i.a},props:{title:{type:String,default:"Awesome Wizard"},subtitle:{type:String,default:"Split a complicated flow in multiple steps"},nextButtonText:{type:String,default:"Next"},backButtonText:{type:String,default:"Back"},finishButtonText:{type:String,default:"Finish"},hideButtons:{type:Boolean,default:!1},validateOnBack:Boolean,color:{type:String,default:"#e74c3c"},errorColor:{type:String,default:"#8b0000"},shape:{type:String,default:"circle"},layout:{type:String,default:"horizontal"},stepsClasses:{type:[String,Array],default:""},stepSize:{type:String,default:"md",validator:function(t){return-1!==["xs","sm","md","lg"].indexOf(t)}},transition:{type:String,default:""},startIndex:{type:Number,default:0,validator:function(t){return t>=0}}},provide:function(){return{addTab:this.addTab,removeTab:this.removeTab}},data:function(){return{activeTabIndex:0,currentPercentage:0,maxStep:0,loading:!1,tabs:[]}},computed:{slotProps:function(){return{nextTab:this.nextTab,prevTab:this.prevTab,activeTabIndex:this.activeTabIndex,isLastStep:this.isLastStep,fillButtonStyle:this.fillButtonStyle}},tabCount:function(){return this.tabs.length},isLastStep:function(){return this.activeTabIndex===this.tabCount-1},isVertical:function(){return"vertical"===this.layout},displayPrevButton:function(){return 0!==this.activeTabIndex},stepPercentage:function(){return 1/(2*this.tabCount)*100},progressBarStyle:function(){return{backgroundColor:this.color,width:this.progress+"%",color:this.color}},fillButtonStyle:function(){return{backgroundColor:this.color,borderColor:this.color,color:"white"}},progress:function(){return this.activeTabIndex>0?this.stepPercentage*(2*this.activeTabIndex+1):this.stepPercentage}},methods:{emitTabChange:function(t,e){this.$emit("on-change",t,e),this.$emit("update:startIndex",e)},addTab:function(t){var e=this.$slots.default.indexOf(t.$vnode);t.tabId=""+t.title.replace(/ /g,"")+e,this.tabs.splice(e,0,t),e<this.activeTabIndex+1&&(this.maxStep=e,this.changeTab(this.activeTabIndex+1,e))},removeTab:function(t){var e=this.tabs,a=e.indexOf(t);a>-1&&(a===this.activeTabIndex&&(this.maxStep=this.activeTabIndex-1,this.changeTab(this.activeTabIndex,this.activeTabIndex-1)),a<this.activeTabIndex&&(this.maxStep=this.activeTabIndex-1,this.activeTabIndex=this.activeTabIndex-1,this.emitTabChange(this.activeTabIndex+1,this.activeTabIndex)),e.splice(a,1))},reset:function(){this.maxStep=0,this.tabs.forEach(function(t){t.checked=!1}),this.navigateToTab(0)},activateAll:function(){this.maxStep=this.tabs.length-1,this.tabs.forEach(function(t){t.checked=!0})},navigateToTab:function(t){var e=this,a=t>this.activeTabIndex;if(t<=this.maxStep){var n=function n(){a&&t-e.activeTabIndex>1?(e.changeTab(e.activeTabIndex,e.activeTabIndex+1),e.beforeTabChange(e.activeTabIndex,n)):(e.changeTab(e.activeTabIndex,t),e.afterTabChange(e.activeTabIndex))};a?this.beforeTabChange(this.activeTabIndex,n):(this.setValidationError(null),n())}return t<=this.maxStep},nextTab:function(){var t=this,e=function(){t.activeTabIndex<t.tabCount-1?(t.changeTab(t.activeTabIndex,t.activeTabIndex+1),t.afterTabChange(t.activeTabIndex)):t.$emit("on-complete")};this.beforeTabChange(this.activeTabIndex,e)},prevTab:function(){var t=this,e=function(){t.activeTabIndex>0&&(t.setValidationError(null),t.changeTab(t.activeTabIndex,t.activeTabIndex-1))};this.validateOnBack?this.beforeTabChange(this.activeTabIndex,e):e()},focusNextTab:function(){var t=Object(r.b)(this.tabs);if(-1!==t&&t<this.tabs.length-1){var e=this.tabs[t+1];e.checked&&Object(r.a)(e.tabId)}},focusPrevTab:function(){var t=Object(r.b)(this.tabs);if(-1!==t&&t>0){var e=this.tabs[t-1].tabId;Object(r.a)(e)}},setLoading:function(t){this.loading=t,this.$emit("on-loading",t)},setValidationError:function(t){this.tabs[this.activeTabIndex].validationError=t,this.$emit("on-error",t)},validateBeforeChange:function(t,e){var a=this;if(this.setValidationError(null),Object(r.c)(t))this.setLoading(!0),t.then(function(t){a.setLoading(!1);var n=!0===t;a.executeBeforeChange(n,e)}).catch(function(t){a.setLoading(!1),a.setValidationError(t)});else{var n=!0===t;this.executeBeforeChange(n,e)}},executeBeforeChange:function(t,e){this.$emit("on-validate",t,this.activeTabIndex),t?e():this.tabs[this.activeTabIndex].validationError="error"},beforeTabChange:function(t,e){if(!this.loading){var a=this.tabs[t];if(a&&void 0!==a.beforeChange){var n=a.beforeChange();this.validateBeforeChange(n,e)}else e()}},afterTabChange:function(t){if(!this.loading){var e=this.tabs[t];e&&void 0!==e.afterChange&&e.afterChange()}},changeTab:function(t,e){var a=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],n=this.tabs[t],i=this.tabs[e];return n&&(n.active=!1),i&&(i.active=!0),a&&this.activeTabIndex!==e&&this.emitTabChange(t,e),this.activeTabIndex=e,this.activateTabAndCheckStep(this.activeTabIndex),!0},tryChangeRoute:function(t){this.$router&&t.route&&this.$router.push(t.route)},checkRouteChange:function(t){var e=-1,a=this.tabs.find(function(a,n){var i=a.route===t;return i&&(e=n),i});if(a&&!a.active){var n=e>this.activeTabIndex;this.navigateToTab(e,n)}},deactivateTabs:function(){this.tabs.forEach(function(t){t.active=!1})},activateTab:function(t){this.deactivateTabs();var e=this.tabs[t];e&&(e.active=!0,e.checked=!0,this.tryChangeRoute(e))},activateTabAndCheckStep:function(t){this.activateTab(t),t>this.maxStep&&(this.maxStep=t),this.activeTabIndex=t},initializeTabs:function(){this.tabs.length>0&&0===this.startIndex&&this.activateTab(this.activeTabIndex),this.startIndex<this.tabs.length?this.activateTabAndCheckStep(this.startIndex):window.console.warn("Prop startIndex set to "+this.startIndex+" is greater than the number of tabs - "+this.tabs.length+". Make sure that the starting index is less than the number of tabs registered")}},mounted:function(){this.initializeTabs()},watch:{"$route.path":function(t){this.checkRouteChange(t)}}}},function(t,e,a){"use strict";function n(t){a(10)}var i=a(3),r=a(11),s=a(0),o=n,c=s(i.a,r.a,!1,o,null,null);e.a=c.exports},function(t,e,a){"use strict";e.a={}},function(t,e,a){"use strict";function n(t){a(12)}var i=a(5),r=a(13),s=a(0),o=n,c=s(i.a,r.a,!1,o,null,null);e.a=c.exports},function(t,e,a){"use strict";e.a={name:"wizard-step",props:{tab:{type:Object,default:function(){}},transition:{type:String,default:""},index:{type:Number,default:0}},computed:{iconActiveStyle:function(){return{backgroundColor:this.tab.color}},stepCheckedStyle:function(){return{borderColor:this.tab.color}},errorStyle:function(){return{borderColor:this.tab.errorColor,backgroundColor:this.tab.errorColor}},stepTitleStyle:function(){return{color:this.tab.validationError?this.tab.errorColor:this.tab.color}},isStepSquare:function(){return"square"===this.tab.shape},isTabShape:function(){return"tab"===this.tab.shape}}}},function(t,e,a){"use strict";e.a={name:"tab-content",props:{title:{type:String,default:""},icon:{type:String,default:""},beforeChange:{type:Function},afterChange:{type:Function},route:{type:[String,Object]},additionalInfo:{type:Object,default:function(){}}},inject:["addTab","removeTab"],data:function(){return{active:!1,validationError:null,checked:!1,tabId:""}},computed:{shape:function(){return this.$parent.shape},color:function(){return this.$parent.color},errorColor:function(){return this.$parent.errorColor}},mounted:function(){this.addTab(this)},destroyed:function(){this.$el&&this.$el.parentNode&&this.$el.parentNode.removeChild(this.$el),this.removeTab(this)}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(8),i=a(16),r=a(2),s=a(4);a.d(e,"FormWizard",function(){return n.a}),a.d(e,"TabContent",function(){return i.a}),a.d(e,"WizardButton",function(){return r.a}),a.d(e,"WizardStep",function(){return s.a});var o={install:function(t){t.component("form-wizard",n.a),t.component("tab-content",i.a),t.component("wizard-button",r.a),t.component("wizard-step",s.a)}};"undefined"!=typeof window&&window.Vue&&window.Vue.use(o),e.default=o},function(t,e,a){"use strict";function n(t){a(9)}var i=a(1),r=a(15),s=a(0),o=n,c=s(i.a,r.a,!1,o,null,null);e.a=c.exports},function(t,e){},function(t,e){},function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement;return(t._self._c||e)("button",{staticClass:"wizard-btn",attrs:{tabindex:"-1",type:"button"}},[t._t("default")],2)},i=[],r={render:n,staticRenderFns:i};e.a=r},function(t,e){},function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("li",{class:{active:t.tab.active}},[a("a",{class:{disabled:!t.tab.checked},attrs:{href:"javascript:void(0)"}},[a("div",{staticClass:"wizard-icon-circle md",class:{checked:t.tab.checked,square_shape:t.isStepSquare,tab_shape:t.isTabShape},style:[t.tab.checked?t.stepCheckedStyle:{},t.tab.validationError?t.errorStyle:{}],attrs:{role:"tab",tabindex:t.tab.checked?0:"",id:"step-"+t.tab.tabId,"aria-controls":t.tab.tabId,"aria-disabled":t.tab.active,"aria-selected":t.tab.active}},[a("transition",{attrs:{name:t.transition,mode:"out-in"}},[t.tab.active?a("div",{staticClass:"wizard-icon-container",class:{square_shape:t.isStepSquare,tab_shape:t.isTabShape},style:[t.tab.active?t.iconActiveStyle:{},t.tab.validationError?t.errorStyle:{}]},[t._t("active-step",[t.tab.icon?a("i",{staticClass:"wizard-icon",class:t.tab.icon}):a("i",{staticClass:"wizard-icon"},[t._v(t._s(t.index+1))])])],2):t._e(),t._v(" "),t.tab.active?t._e():t._t("default",[!t.tab.active&&t.tab.icon?a("i",{staticClass:"wizard-icon",class:t.tab.icon}):t._e(),t._v(" "),t.tab.active||t.tab.icon?t._e():a("i",{staticClass:"wizard-icon"},[t._v(t._s(t.index+1))])])],2)],1),t._v(" "),t._t("title",[a("span",{staticClass:"stepTitle",class:{active:t.tab.active,has_error:t.tab.validationError},style:t.tab.active?t.stepTitleStyle:{}},[t._v("\n            "+t._s(t.tab.title)+"\n      ")])])],2)])},i=[],r={render:n,staticRenderFns:i};e.a=r},function(t,e,a){"use strict";function n(){return document.activeElement.id}function i(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],e=n();return t.findIndex(function(t){return t.tabId===e})}function r(t){document.getElementById(t).focus()}function s(t){return t.then&&"function"==typeof t.then}e.b=i,e.a=r,e.c=s},function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"vue-form-wizard",class:[t.stepSize,{vertical:t.isVertical}],on:{keyup:[function(e){return"button"in e||!t._k(e.keyCode,"right",39,e.key)?"button"in e&&2!==e.button?null:void t.focusNextTab(e):null},function(e){return"button"in e||!t._k(e.keyCode,"left",37,e.key)?"button"in e&&0!==e.button?null:void t.focusPrevTab(e):null}]}},[a("div",{staticClass:"wizard-header"},[t._t("title",[a("h4",{staticClass:"wizard-title"},[t._v(t._s(t.title))]),t._v(" "),a("p",{staticClass:"category"},[t._v(t._s(t.subtitle))])])],2),t._v(" "),a("div",{staticClass:"wizard-navigation"},[t.isVertical?t._e():a("div",{staticClass:"wizard-progress-with-circle"},[a("div",{staticClass:"wizard-progress-bar",style:t.progressBarStyle})]),t._v(" "),a("ul",{staticClass:"wizard-nav wizard-nav-pills",class:t.stepsClasses,attrs:{role:"tablist"}},[t._l(t.tabs,function(e,n){return t._t("step",[a("wizard-step",{attrs:{tab:e,"step-size":t.stepSize,transition:t.transition,index:n},nativeOn:{click:function(e){t.navigateToTab(n)},keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13,e.key))return null;t.navigateToTab(n)}}})],{tab:e,index:n,navigateToTab:t.navigateToTab,stepSize:t.stepSize,transition:t.transition})})],2),t._v(" "),a("div",{staticClass:"wizard-tab-content"},[t._t("default",null,null,t.slotProps)],2)]),t._v(" "),t.hideButtons?t._e():a("div",{staticClass:"wizard-card-footer clearfix"},[t._t("footer",[a("div",{staticClass:"wizard-footer-left"},[t.displayPrevButton?a("span",{attrs:{role:"button",tabindex:"0"},on:{click:t.prevTab,keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13,e.key))return null;t.prevTab(e)}}},[t._t("prev",[a("wizard-button",{style:t.fillButtonStyle,attrs:{disabled:t.loading}},[t._v("\n              "+t._s(t.backButtonText)+"\n            ")])],null,t.slotProps)],2):t._e(),t._v(" "),t._t("custom-buttons-left",null,null,t.slotProps)],2),t._v(" "),a("div",{staticClass:"wizard-footer-right"},[t._t("custom-buttons-right",null,null,t.slotProps),t._v(" "),t.isLastStep?a("span",{attrs:{role:"button",tabindex:"0"},on:{click:t.nextTab,keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13,e.key))return null;t.nextTab(e)}}},[t._t("finish",[a("wizard-button",{style:t.fillButtonStyle},[t._v("\n              "+t._s(t.finishButtonText)+"\n            ")])],null,t.slotProps)],2):a("span",{attrs:{role:"button",tabindex:"0"},on:{click:t.nextTab,keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13,e.key))return null;t.nextTab(e)}}},[t._t("next",[a("wizard-button",{style:t.fillButtonStyle,attrs:{disabled:t.loading}},[t._v("\n            "+t._s(t.nextButtonText)+"\n           ")])],null,t.slotProps)],2)],2)],null,t.slotProps)],2)])},i=[],r={render:n,staticRenderFns:i};e.a=r},function(t,e,a){"use strict";var n=a(6),i=a(17),r=a(0),s=r(n.a,i.a,!1,null,null,null);e.a=s.exports},function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{directives:[{name:"show",rawName:"v-show",value:t.active,expression:"active"}],staticClass:"wizard-tab-container",attrs:{role:"tabpanel",id:t.tabId,"aria-hidden":!t.active,"aria-labelledby":"step-"+t.tabId}},[t._t("default",null,{active:t.active})],2)},i=[],r={render:n,staticRenderFns:i};e.a=r}])});

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c(
        "card",
        {
          staticClass: "bg-white   items-center justify-center",
          staticStyle: { "min-height": "300px" }
        },
        [
          _c(
            "form-wizard",
            {
              ref: "form-wizard",
              staticClass: "p-3",
              attrs: { shape: "tab", color: "#9b59b6", subtitle: "" },
              on: { "on-complete": _vm.onComplete },
              scopedSlots: _vm._u(
                [
                  {
                    key: "footer",
                    fn: function(props) {
                      return props.activeTabIndex === 1
                        ? [
                            _c("div", { staticClass: "wizard-footer-left" }, [
                              _c(
                                "span",
                                { attrs: { role: "button", tabindex: "0" } },
                                [
                                  _c(
                                    "button",
                                    {
                                      staticClass: "wizard-btn",
                                      staticStyle: {
                                        "background-color": "rgb(155, 89, 182)",
                                        "border-color": "rgb(155, 89, 182)",
                                        color: "white"
                                      },
                                      attrs: { tabindex: "-1", type: "button" },
                                      on: {
                                        click: function($event) {
                                          $event.preventDefault()
                                          return props.prevTab($event)
                                        }
                                      }
                                    },
                                    [_vm._v("Back")]
                                  )
                                ]
                              )
                            ])
                          ]
                        : undefined
                    }
                  }
                ],
                null,
                true
              )
            },
            [
              _c("h2", { attrs: { slot: "title" }, slot: "title" }, [
                _vm._v("New Project Wizard")
              ]),
              _vm._v(" "),
              _c(
                "tab-content",
                {
                  attrs: {
                    icon: "fa fa-user",
                    "before-change": _vm.beforeTabSwitch
                  }
                },
                [
                  _c("div", { staticClass: "card" }, [
                    _c("div", { staticClass: "border-b border-40" }, [
                      _c(
                        "div",
                        { staticClass: "w-full flex border-b border-40" },
                        [
                          _c("div", { staticClass: "w-1/5 px-8 py-6" }, [
                            _c(
                              "label",
                              {
                                staticClass:
                                  "inline-block text-80 pt-2 leading-tight",
                                attrs: { for: "name" }
                              },
                              [
                                _vm._v(
                                  "\n                                        Project Name\n                                    "
                                )
                              ]
                            )
                          ]),
                          _vm._v(" "),
                          _c("div", { staticClass: "py-6 px-8 w-3/5" }, [
                            _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.project.name,
                                  expression: "project.name"
                                }
                              ],
                              staticClass:
                                "w-full form-control form-input form-input-bordered",
                              attrs: {
                                id: "name",
                                dusk: "name",
                                type: "text",
                                placeholder: "Name"
                              },
                              domProps: { value: _vm.project.name },
                              on: {
                                input: function($event) {
                                  if ($event.target.composing) {
                                    return
                                  }
                                  _vm.$set(
                                    _vm.project,
                                    "name",
                                    $event.target.value
                                  )
                                }
                              }
                            }),
                            _vm._v(" "),
                            _c("div", {
                              staticClass: "help-text help-text mt-2"
                            })
                          ])
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "w-full flex border-b border-40" },
                        [
                          _c("div", { staticClass: "w-1/5 px-8 py-6" }, [
                            _c(
                              "label",
                              {
                                staticClass:
                                  "inline-block text-80 pt-2 leading-tight",
                                attrs: { for: "description" }
                              },
                              [
                                _vm._v(
                                  "\n                                        Description\n                                    "
                                )
                              ]
                            )
                          ]),
                          _vm._v(" "),
                          _c("div", { staticClass: "py-6 px-8 w-3/5" }, [
                            _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.project.description,
                                  expression: "project.description"
                                }
                              ],
                              staticClass:
                                "w-full form-control form-input form-input-bordered",
                              attrs: {
                                id: "description",
                                dusk: "description",
                                type: "text",
                                placeholder: "Description"
                              },
                              domProps: { value: _vm.project.description },
                              on: {
                                input: function($event) {
                                  if ($event.target.composing) {
                                    return
                                  }
                                  _vm.$set(
                                    _vm.project,
                                    "description",
                                    $event.target.value
                                  )
                                }
                              }
                            }),
                            _vm._v(" "),
                            _c("div", {
                              staticClass: "help-text help-text mt-2"
                            })
                          ])
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "w-full flex border-b border-40" },
                        [
                          _c("div", { staticClass: "w-1/5 px-8 py-6" }, [
                            _c(
                              "label",
                              {
                                staticClass:
                                  "inline-block text-80 pt-2 leading-tight",
                                attrs: { for: "domain" }
                              },
                              [
                                _vm._v(
                                  "\n                                    Domain\n                                "
                                )
                              ]
                            )
                          ]),
                          _vm._v(" "),
                          _c("div", { staticClass: "py-6 px-8 w-3/5" }, [
                            _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.project.domain,
                                  expression: "project.domain"
                                }
                              ],
                              staticClass:
                                "w-full form-control form-input form-input-bordered",
                              attrs: {
                                id: "domain",
                                dusk: "domain",
                                type: "text",
                                placeholder: "Domain"
                              },
                              domProps: { value: _vm.project.domain },
                              on: {
                                input: function($event) {
                                  if ($event.target.composing) {
                                    return
                                  }
                                  _vm.$set(
                                    _vm.project,
                                    "domain",
                                    $event.target.value
                                  )
                                }
                              }
                            }),
                            _vm._v(" "),
                            _c("div", { staticClass: "pt-2" }, [
                              _c("label", { staticClass: "cont text-80 " }, [
                                _vm._v(
                                  "I own this domain\n                                            "
                                ),
                                _c("input", {
                                  attrs: {
                                    type: "checkbox",
                                    checked: "checked"
                                  }
                                }),
                                _vm._v(" "),
                                _c("span", { staticClass: "checkmark" })
                              ])
                            ]),
                            _vm._v(" "),
                            _c("div", {
                              staticClass: "help-text help-text mt-2"
                            })
                          ])
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "w-full flex border-b border-40" },
                        [
                          _c("div", { staticClass: "w-1/5 px-8 py-6" }, [
                            _c(
                              "label",
                              {
                                staticClass:
                                  "inline-block text-80 pt-2 leading-tight",
                                attrs: { for: "type" }
                              },
                              [
                                _vm._v(
                                  "\n                                    Type\n                                "
                                )
                              ]
                            )
                          ]),
                          _vm._v(" "),
                          _c(
                            "div",
                            { staticClass: "py-6 px-8 w-3/5" },
                            [
                              _c("multiselect", {
                                attrs: {
                                  id: "type",
                                  options: _vm.options,
                                  multiple: true,
                                  "close-on-select": true,
                                  placeholder: "Choose the project types",
                                  label: "name",
                                  "track-by": "name"
                                },
                                model: {
                                  value: _vm.project.type,
                                  callback: function($$v) {
                                    _vm.$set(_vm.project, "type", $$v)
                                  },
                                  expression: "project.type"
                                }
                              })
                            ],
                            1
                          )
                        ]
                      )
                    ])
                  ])
                ]
              ),
              _vm._v(" "),
              _c("tab-content", { attrs: { icon: "fa fa-cog" } }, [
                _c("div", { staticClass: "card" }, [
                  _c("div", { staticClass: "w-full flex border-b border-40" }, [
                    _c(
                      "div",
                      {
                        staticClass: "w-1/2 flex border-b border-40",
                        on: {
                          click: function($event) {
                            $event.preventDefault()
                            return _vm.handleProjectMode("quick")
                          }
                        }
                      },
                      [
                        _c(
                          "div",
                          { staticClass: "w-full p-4 bg-gray-200 p-8" },
                          [
                            _c(
                              "div",
                              {
                                staticClass:
                                  "group hover:bg-blue-500 p-4 cursor-pointer rounded max-w-xs w-full shadow-lg select-none overflow-hidden mx-auto hover:bg-primary-70% hover:text-white"
                              },
                              [
                                _c(
                                  "p",
                                  {
                                    staticClass:
                                      "font-semibold text-lg mb-1 text-gray-900 "
                                  },
                                  [
                                    _vm._v(
                                      "\n                                            Quick wizard"
                                    )
                                  ]
                                ),
                                _vm._v(" "),
                                _c("p", { staticClass: "text-gray-700 mb-2" }, [
                                  _vm._v(
                                    "Create a new project\n                                            from a provided plans."
                                  )
                                ])
                              ]
                            )
                          ]
                        )
                      ]
                    ),
                    _vm._v(" "),
                    _c(
                      "div",
                      {
                        staticClass: "w-1/2 flex border-b border-40",
                        on: {
                          click: function($event) {
                            $event.preventDefault()
                            return _vm.handleProjectMode("custom")
                          }
                        }
                      },
                      [
                        _c(
                          "div",
                          { staticClass: "w-full p-4 bg-gray-200 p-8" },
                          [
                            _c(
                              "div",
                              {
                                staticClass:
                                  "group hover:bg-blue-500 p-4 cursor-pointer rounded max-w-xs w-full shadow-lg select-none overflow-hidden mx-auto hover:bg-primary-50% hover:text-white"
                              },
                              [
                                _c(
                                  "p",
                                  {
                                    staticClass:
                                      "font-semibold text-lg mb-1 text-gray-900 "
                                  },
                                  [
                                    _vm._v(
                                      "\n                                            Custom Wizard"
                                    )
                                  ]
                                ),
                                _vm._v(" "),
                                _c("p", { staticClass: "text-gray-700 mb-2" }, [
                                  _vm._v(
                                    "Create a new project\n                                            from a variety of products and services."
                                  )
                                ])
                              ]
                            )
                          ]
                        )
                      ]
                    )
                  ])
                ])
              ]),
              _vm._v(" "),
              _c("tab-content", { attrs: { icon: "fa fa-check-circle" } }, [
                _vm.isQuick
                  ? _c("section", [
                      _c(
                        "div",
                        { staticClass: "flex w-full container mx-auto" },
                        [
                          _c("div", { staticClass: "w-full" }, [
                            _c(
                              "div",
                              {
                                staticClass:
                                  "bg-white items-center justify-center"
                              },
                              [
                                _c("h2", { staticClass: "text-center" }, [
                                  _vm._v("Pick a Plan")
                                ])
                              ]
                            ),
                            _vm._v(" "),
                            _c(
                              "div",
                              {
                                staticClass: "relative block flex items-center"
                              },
                              [
                                _c(
                                  "div",
                                  {
                                    staticClass:
                                      "w-1/3  sm:my-5 my-8 relative z-0 rounded-lg shadow-lg md:-mr-4"
                                  },
                                  [
                                    _c(
                                      "div",
                                      {
                                        staticClass:
                                          "bg-white text-black rounded-lg shadow-inner shadow-lg overflow-hidden"
                                      },
                                      [
                                        _c(
                                          "div",
                                          {
                                            staticClass:
                                              "block text-left text-sm sm:text-md max-w-sm mx-auto mt-2 text-black px-8 lg:px-6"
                                          },
                                          [
                                            _c(
                                              "h1",
                                              {
                                                staticClass:
                                                  "text-lg font-medium uppercase p-3 pb-0 text-center tracking-wide"
                                              },
                                              [
                                                _vm._v(
                                                  "\n                                                    Hobby\n                                                "
                                                )
                                              ]
                                            ),
                                            _vm._v(" "),
                                            _vm._v(
                                              "\n\n                                                Stripe offers everything needed to run an online business\n                                                at scale. Get in touch for details.\n                                            "
                                            )
                                          ]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "div",
                                          {
                                            staticClass:
                                              "flex flex-wrap mt-3 px-6"
                                          },
                                          [
                                            _c("ul", [
                                              _c(
                                                "li",
                                                {
                                                  staticClass:
                                                    "flex items-center"
                                                },
                                                [
                                                  _c(
                                                    "div",
                                                    {
                                                      staticClass:
                                                        " rounded-full p-2 fill-current text-green-700"
                                                    },
                                                    [
                                                      _c(
                                                        "svg",
                                                        {
                                                          staticClass:
                                                            "w-6 h-6 align-middle",
                                                          attrs: {
                                                            width: "24",
                                                            height: "24",
                                                            viewBox:
                                                              "0 0 24 24",
                                                            fill: "none",
                                                            stroke: "green",
                                                            "stroke-width": "2",
                                                            "stroke-linecap":
                                                              "round",
                                                            "stroke-linejoin":
                                                              "round"
                                                          }
                                                        },
                                                        [
                                                          _c("path", {
                                                            attrs: {
                                                              d:
                                                                "M22 11.08V12a10 10 0 1 1-5.93-9.14"
                                                            }
                                                          }),
                                                          _vm._v(" "),
                                                          _c("polyline", {
                                                            attrs: {
                                                              points:
                                                                "22 4 12 14.01 9 11.01"
                                                            }
                                                          })
                                                        ]
                                                      )
                                                    ]
                                                  ),
                                                  _vm._v(" "),
                                                  _c(
                                                    "span",
                                                    {
                                                      staticClass:
                                                        "text-gray-700 text-sm ml-3"
                                                    },
                                                    [
                                                      _vm._v(
                                                        "1GB / 1 CPU, 25GB SSD Disk, 1000GB Transfer"
                                                      )
                                                    ]
                                                  )
                                                ]
                                              ),
                                              _vm._v(" "),
                                              _c(
                                                "li",
                                                {
                                                  staticClass:
                                                    "flex items-center"
                                                },
                                                [
                                                  _c(
                                                    "div",
                                                    {
                                                      staticClass:
                                                        " rounded-full p-2 fill-current text-green-700"
                                                    },
                                                    [
                                                      _c(
                                                        "svg",
                                                        {
                                                          staticClass:
                                                            "w-6 h-6 align-middle",
                                                          attrs: {
                                                            width: "24",
                                                            height: "24",
                                                            viewBox:
                                                              "0 0 24 24",
                                                            fill: "none",
                                                            stroke: "green",
                                                            "stroke-width": "2",
                                                            "stroke-linecap":
                                                              "round",
                                                            "stroke-linejoin":
                                                              "round"
                                                          }
                                                        },
                                                        [
                                                          _c("path", {
                                                            attrs: {
                                                              d:
                                                                "M22 11.08V12a10 10 0 1 1-5.93-9.14"
                                                            }
                                                          }),
                                                          _vm._v(" "),
                                                          _c("polyline", {
                                                            attrs: {
                                                              points:
                                                                "22 4 12 14.01 9 11.01"
                                                            }
                                                          })
                                                        ]
                                                      )
                                                    ]
                                                  ),
                                                  _vm._v(" "),
                                                  _c(
                                                    "span",
                                                    {
                                                      staticClass:
                                                        "text-gray-700 text-sm ml-3"
                                                    },
                                                    [
                                                      _vm._v(
                                                        "1000 transaction Emails"
                                                      )
                                                    ]
                                                  )
                                                ]
                                              ),
                                              _vm._v(" "),
                                              _c(
                                                "li",
                                                {
                                                  staticClass:
                                                    "flex items-center"
                                                },
                                                [
                                                  _c(
                                                    "div",
                                                    {
                                                      staticClass:
                                                        " rounded-full p-2 fill-current text-green-700"
                                                    },
                                                    [
                                                      _c(
                                                        "svg",
                                                        {
                                                          staticClass:
                                                            "w-6 h-6 align-middle",
                                                          attrs: {
                                                            width: "24",
                                                            height: "24",
                                                            viewBox:
                                                              "0 0 24 24",
                                                            fill: "none",
                                                            stroke: "green",
                                                            "stroke-width": "2",
                                                            "stroke-linecap":
                                                              "round",
                                                            "stroke-linejoin":
                                                              "round"
                                                          }
                                                        },
                                                        [
                                                          _c("path", {
                                                            attrs: {
                                                              d:
                                                                "M22 11.08V12a10 10 0 1 1-5.93-9.14"
                                                            }
                                                          }),
                                                          _vm._v(" "),
                                                          _c("polyline", {
                                                            attrs: {
                                                              points:
                                                                "22 4 12 14.01 9 11.01"
                                                            }
                                                          })
                                                        ]
                                                      )
                                                    ]
                                                  ),
                                                  _vm._v(" "),
                                                  _c(
                                                    "span",
                                                    {
                                                      staticClass:
                                                        "text-gray-700 text-sm ml-3"
                                                    },
                                                    [_vm._v("SSL")]
                                                  )
                                                ]
                                              ),
                                              _vm._v(" "),
                                              _c(
                                                "li",
                                                {
                                                  staticClass:
                                                    "flex items-center"
                                                },
                                                [
                                                  _c(
                                                    "div",
                                                    {
                                                      staticClass:
                                                        " rounded-full p-2 fill-current text-green-700"
                                                    },
                                                    [
                                                      _c(
                                                        "svg",
                                                        {
                                                          staticClass:
                                                            "w-6 h-6 align-middle",
                                                          attrs: {
                                                            width: "24",
                                                            height: "24",
                                                            viewBox:
                                                              "0 0 24 24",
                                                            fill: "none",
                                                            stroke: "green",
                                                            "stroke-width": "2",
                                                            "stroke-linecap":
                                                              "round",
                                                            "stroke-linejoin":
                                                              "round"
                                                          }
                                                        },
                                                        [
                                                          _c("path", {
                                                            attrs: {
                                                              d:
                                                                "M22 11.08V12a10 10 0 1 1-5.93-9.14"
                                                            }
                                                          }),
                                                          _vm._v(" "),
                                                          _c("polyline", {
                                                            attrs: {
                                                              points:
                                                                "22 4 12 14.01 9 11.01"
                                                            }
                                                          })
                                                        ]
                                                      )
                                                    ]
                                                  ),
                                                  _vm._v(" "),
                                                  _c(
                                                    "span",
                                                    {
                                                      staticClass:
                                                        "text-gray-700 text-sm ml-3"
                                                    },
                                                    [_vm._v("Weekly Backup")]
                                                  )
                                                ]
                                              ),
                                              _vm._v(" "),
                                              _c(
                                                "li",
                                                {
                                                  staticClass:
                                                    "flex items-center"
                                                },
                                                [
                                                  _c(
                                                    "div",
                                                    {
                                                      staticClass:
                                                        " rounded-full p-2 fill-current text-green-700"
                                                    },
                                                    [
                                                      _c(
                                                        "svg",
                                                        {
                                                          staticClass:
                                                            "w-6 h-6 align-middle",
                                                          attrs: {
                                                            width: "24",
                                                            height: "24",
                                                            viewBox:
                                                              "0 0 24 24",
                                                            fill: "none",
                                                            stroke: "green",
                                                            "stroke-width": "2",
                                                            "stroke-linecap":
                                                              "round",
                                                            "stroke-linejoin":
                                                              "round"
                                                          }
                                                        },
                                                        [
                                                          _c("path", {
                                                            attrs: {
                                                              d:
                                                                "M22 11.08V12a10 10 0 1 1-5.93-9.14"
                                                            }
                                                          }),
                                                          _vm._v(" "),
                                                          _c("polyline", {
                                                            attrs: {
                                                              points:
                                                                "22 4 12 14.01 9 11.01"
                                                            }
                                                          })
                                                        ]
                                                      )
                                                    ]
                                                  ),
                                                  _vm._v(" "),
                                                  _c(
                                                    "span",
                                                    {
                                                      staticClass:
                                                        "text-gray-700 text-sm ml-3"
                                                    },
                                                    [_vm._v("Analytics")]
                                                  )
                                                ]
                                              ),
                                              _vm._v(" "),
                                              _c(
                                                "li",
                                                {
                                                  staticClass:
                                                    "flex items-center"
                                                },
                                                [
                                                  _c(
                                                    "div",
                                                    {
                                                      staticClass:
                                                        " rounded-full p-2 fill-current text-green-700"
                                                    },
                                                    [
                                                      _c(
                                                        "svg",
                                                        {
                                                          staticClass:
                                                            "w-6 h-6 align-middle",
                                                          attrs: {
                                                            width: "24",
                                                            height: "24",
                                                            viewBox:
                                                              "0 0 24 24",
                                                            fill: "none",
                                                            stroke: "green",
                                                            "stroke-width": "2",
                                                            "stroke-linecap":
                                                              "round",
                                                            "stroke-linejoin":
                                                              "round"
                                                          }
                                                        },
                                                        [
                                                          _c("path", {
                                                            attrs: {
                                                              d:
                                                                "M22 11.08V12a10 10 0 1 1-5.93-9.14"
                                                            }
                                                          }),
                                                          _vm._v(" "),
                                                          _c("polyline", {
                                                            attrs: {
                                                              points:
                                                                "22 4 12 14.01 9 11.01"
                                                            }
                                                          })
                                                        ]
                                                      )
                                                    ]
                                                  ),
                                                  _vm._v(" "),
                                                  _c(
                                                    "span",
                                                    {
                                                      staticClass:
                                                        "text-gray-700 text-sm ml-3"
                                                    },
                                                    [_vm._v("Domain")]
                                                  )
                                                ]
                                              ),
                                              _vm._v(" "),
                                              _c(
                                                "li",
                                                {
                                                  staticClass:
                                                    "flex items-center"
                                                },
                                                [
                                                  _c(
                                                    "div",
                                                    {
                                                      staticClass:
                                                        " rounded-full p-2 fill-current text-green-700"
                                                    },
                                                    [
                                                      _c(
                                                        "svg",
                                                        {
                                                          staticClass:
                                                            "w-6 h-6 align-middle",
                                                          attrs: {
                                                            width: "24",
                                                            height: "24",
                                                            viewBox:
                                                              "0 0 24 24",
                                                            fill: "none",
                                                            stroke: "green",
                                                            "stroke-width": "2",
                                                            "stroke-linecap":
                                                              "round",
                                                            "stroke-linejoin":
                                                              "round"
                                                          }
                                                        },
                                                        [
                                                          _c("path", {
                                                            attrs: {
                                                              d:
                                                                "M22 11.08V12a10 10 0 1 1-5.93-9.14"
                                                            }
                                                          }),
                                                          _vm._v(" "),
                                                          _c("polyline", {
                                                            attrs: {
                                                              points:
                                                                "22 4 12 14.01 9 11.01"
                                                            }
                                                          })
                                                        ]
                                                      )
                                                    ]
                                                  ),
                                                  _vm._v(" "),
                                                  _c(
                                                    "span",
                                                    {
                                                      staticClass:
                                                        "text-gray-700 text-sm ml-3"
                                                    },
                                                    [_vm._v("GSuite")]
                                                  )
                                                ]
                                              )
                                            ])
                                          ]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "div",
                                          {
                                            staticClass:
                                              "block flex items-center p-8  uppercase"
                                          },
                                          [
                                            _c(
                                              "button",
                                              {
                                                staticClass:
                                                  "mt-3 text-lg font-semibold bg-black w-full text-white rounded-lg px-6 py-3 block shadow-xl hover:bg-gray-700"
                                              },
                                              [
                                                _vm._v(
                                                  "\n                                                    Select\n                                                "
                                                )
                                              ]
                                            )
                                          ]
                                        )
                                      ]
                                    )
                                  ]
                                ),
                                _vm._v(" "),
                                _c(
                                  "div",
                                  {
                                    staticClass:
                                      "w-1/3  sm:my-5 my-8 relative z-10 bg-white rounded-lg shadow-lg"
                                  },
                                  [
                                    _c(
                                      "div",
                                      {
                                        staticClass:
                                          "text-sm leading-none rounded-t-lg bg-gray-200 text-black font-semibold uppercase py-4 text-center tracking-wide"
                                      },
                                      [
                                        _vm._v(
                                          "\n                                            Most Popular\n                                        "
                                        )
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "div",
                                      {
                                        staticClass:
                                          "block text-left text-sm sm:text-md max-w-sm mx-auto mt-2 text-black px-8 lg:px-6"
                                      },
                                      [
                                        _c(
                                          "h1",
                                          {
                                            staticClass:
                                              "text-lg font-medium uppercase p-3 pb-0 text-center tracking-wide"
                                          },
                                          [
                                            _vm._v(
                                              "\n                                                Growth\n                                            "
                                            )
                                          ]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "h2",
                                          {
                                            staticClass:
                                              "text-sm text-gray-500 text-center pb-6"
                                          },
                                          [
                                            _c(
                                              "span",
                                              { staticClass: "text-3xl" },
                                              [_vm._v("€19")]
                                            ),
                                            _vm._v(
                                              "\n                                                /mo"
                                            )
                                          ]
                                        ),
                                        _vm._v(
                                          "\n\n                                            Stripe offers everything needed to run an online business at\n                                            scale. Get in touch for details.\n                                        "
                                        )
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "div",
                                      {
                                        staticClass:
                                          "flex pl-12 justify-start sm:justify-start mt-3"
                                      },
                                      [
                                        _c("ul", [
                                          _c(
                                            "li",
                                            {
                                              staticClass: "flex items-center"
                                            },
                                            [
                                              _c(
                                                "div",
                                                {
                                                  staticClass:
                                                    " rounded-full p-2 fill-current text-green-700"
                                                },
                                                [
                                                  _c(
                                                    "svg",
                                                    {
                                                      staticClass:
                                                        "w-6 h-6 align-middle",
                                                      attrs: {
                                                        width: "24",
                                                        height: "24",
                                                        viewBox: "0 0 24 24",
                                                        fill: "none",
                                                        stroke: "green",
                                                        "stroke-width": "2",
                                                        "stroke-linecap":
                                                          "round",
                                                        "stroke-linejoin":
                                                          "round"
                                                      }
                                                    },
                                                    [
                                                      _c("path", {
                                                        attrs: {
                                                          d:
                                                            "M22 11.08V12a10 10 0 1 1-5.93-9.14"
                                                        }
                                                      }),
                                                      _vm._v(" "),
                                                      _c("polyline", {
                                                        attrs: {
                                                          points:
                                                            "22 4 12 14.01 9 11.01"
                                                        }
                                                      })
                                                    ]
                                                  )
                                                ]
                                              ),
                                              _vm._v(" "),
                                              _c(
                                                "span",
                                                {
                                                  staticClass:
                                                    "text-gray-700 text-sm ml-3"
                                                },
                                                [
                                                  _vm._v(
                                                    "2GB / 1 CPU, 50GB SSD Disk,   2TB Transfer"
                                                  )
                                                ]
                                              )
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "li",
                                            {
                                              staticClass: "flex items-center"
                                            },
                                            [
                                              _c(
                                                "div",
                                                {
                                                  staticClass:
                                                    " rounded-full p-2 fill-current text-green-700"
                                                },
                                                [
                                                  _c(
                                                    "svg",
                                                    {
                                                      staticClass:
                                                        "w-6 h-6 align-middle",
                                                      attrs: {
                                                        width: "24",
                                                        height: "24",
                                                        viewBox: "0 0 24 24",
                                                        fill: "none",
                                                        stroke: "green",
                                                        "stroke-width": "2",
                                                        "stroke-linecap":
                                                          "round",
                                                        "stroke-linejoin":
                                                          "round"
                                                      }
                                                    },
                                                    [
                                                      _c("path", {
                                                        attrs: {
                                                          d:
                                                            "M22 11.08V12a10 10 0 1 1-5.93-9.14"
                                                        }
                                                      }),
                                                      _vm._v(" "),
                                                      _c("polyline", {
                                                        attrs: {
                                                          points:
                                                            "22 4 12 14.01 9 11.01"
                                                        }
                                                      })
                                                    ]
                                                  )
                                                ]
                                              ),
                                              _vm._v(" "),
                                              _c(
                                                "span",
                                                {
                                                  staticClass:
                                                    "text-gray-700 text-sm ml-3"
                                                },
                                                [
                                                  _vm._v(
                                                    "2500 transaction Emails"
                                                  )
                                                ]
                                              )
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "li",
                                            {
                                              staticClass: "flex items-center"
                                            },
                                            [
                                              _c(
                                                "div",
                                                {
                                                  staticClass:
                                                    " rounded-full p-2 fill-current text-green-700"
                                                },
                                                [
                                                  _c(
                                                    "svg",
                                                    {
                                                      staticClass:
                                                        "w-6 h-6 align-middle",
                                                      attrs: {
                                                        width: "24",
                                                        height: "24",
                                                        viewBox: "0 0 24 24",
                                                        fill: "none",
                                                        stroke: "green",
                                                        "stroke-width": "2",
                                                        "stroke-linecap":
                                                          "round",
                                                        "stroke-linejoin":
                                                          "round"
                                                      }
                                                    },
                                                    [
                                                      _c("path", {
                                                        attrs: {
                                                          d:
                                                            "M22 11.08V12a10 10 0 1 1-5.93-9.14"
                                                        }
                                                      }),
                                                      _vm._v(" "),
                                                      _c("polyline", {
                                                        attrs: {
                                                          points:
                                                            "22 4 12 14.01 9 11.01"
                                                        }
                                                      })
                                                    ]
                                                  )
                                                ]
                                              ),
                                              _vm._v(" "),
                                              _c(
                                                "span",
                                                {
                                                  staticClass:
                                                    "text-gray-700 text-sm ml-3"
                                                },
                                                [_vm._v("SSL")]
                                              )
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "li",
                                            {
                                              staticClass: "flex items-center"
                                            },
                                            [
                                              _c(
                                                "div",
                                                {
                                                  staticClass:
                                                    " rounded-full p-2 fill-current text-green-700"
                                                },
                                                [
                                                  _c(
                                                    "svg",
                                                    {
                                                      staticClass:
                                                        "w-6 h-6 align-middle",
                                                      attrs: {
                                                        width: "24",
                                                        height: "24",
                                                        viewBox: "0 0 24 24",
                                                        fill: "none",
                                                        stroke: "green",
                                                        "stroke-width": "2",
                                                        "stroke-linecap":
                                                          "round",
                                                        "stroke-linejoin":
                                                          "round"
                                                      }
                                                    },
                                                    [
                                                      _c("path", {
                                                        attrs: {
                                                          d:
                                                            "M22 11.08V12a10 10 0 1 1-5.93-9.14"
                                                        }
                                                      }),
                                                      _vm._v(" "),
                                                      _c("polyline", {
                                                        attrs: {
                                                          points:
                                                            "22 4 12 14.01 9 11.01"
                                                        }
                                                      })
                                                    ]
                                                  )
                                                ]
                                              ),
                                              _vm._v(" "),
                                              _c(
                                                "span",
                                                {
                                                  staticClass:
                                                    "text-gray-700 text-sm ml-3"
                                                },
                                                [_vm._v("Daily Backup")]
                                              )
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "li",
                                            {
                                              staticClass: "flex items-center"
                                            },
                                            [
                                              _c(
                                                "div",
                                                {
                                                  staticClass:
                                                    " rounded-full p-2 fill-current text-green-700"
                                                },
                                                [
                                                  _c(
                                                    "svg",
                                                    {
                                                      staticClass:
                                                        "w-6 h-6 align-middle",
                                                      attrs: {
                                                        width: "24",
                                                        height: "24",
                                                        viewBox: "0 0 24 24",
                                                        fill: "none",
                                                        stroke: "green",
                                                        "stroke-width": "2",
                                                        "stroke-linecap":
                                                          "round",
                                                        "stroke-linejoin":
                                                          "round"
                                                      }
                                                    },
                                                    [
                                                      _c("path", {
                                                        attrs: {
                                                          d:
                                                            "M22 11.08V12a10 10 0 1 1-5.93-9.14"
                                                        }
                                                      }),
                                                      _vm._v(" "),
                                                      _c("polyline", {
                                                        attrs: {
                                                          points:
                                                            "22 4 12 14.01 9 11.01"
                                                        }
                                                      })
                                                    ]
                                                  )
                                                ]
                                              ),
                                              _vm._v(" "),
                                              _c(
                                                "span",
                                                {
                                                  staticClass:
                                                    "text-gray-700 text-sm ml-3"
                                                },
                                                [_vm._v("Analytics")]
                                              )
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "li",
                                            {
                                              staticClass: "flex items-center"
                                            },
                                            [
                                              _c(
                                                "div",
                                                {
                                                  staticClass:
                                                    " rounded-full p-2 fill-current text-green-700"
                                                },
                                                [
                                                  _c(
                                                    "svg",
                                                    {
                                                      staticClass:
                                                        "w-6 h-6 align-middle",
                                                      attrs: {
                                                        width: "24",
                                                        height: "24",
                                                        viewBox: "0 0 24 24",
                                                        fill: "none",
                                                        stroke: "green",
                                                        "stroke-width": "2",
                                                        "stroke-linecap":
                                                          "round",
                                                        "stroke-linejoin":
                                                          "round"
                                                      }
                                                    },
                                                    [
                                                      _c("path", {
                                                        attrs: {
                                                          d:
                                                            "M22 11.08V12a10 10 0 1 1-5.93-9.14"
                                                        }
                                                      }),
                                                      _vm._v(" "),
                                                      _c("polyline", {
                                                        attrs: {
                                                          points:
                                                            "22 4 12 14.01 9 11.01"
                                                        }
                                                      })
                                                    ]
                                                  )
                                                ]
                                              ),
                                              _vm._v(" "),
                                              _c(
                                                "span",
                                                {
                                                  staticClass:
                                                    "text-gray-700 text-sm ml-3"
                                                },
                                                [_vm._v("Domain")]
                                              )
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "li",
                                            {
                                              staticClass: "flex items-center"
                                            },
                                            [
                                              _c(
                                                "div",
                                                {
                                                  staticClass:
                                                    " rounded-full p-2 fill-current text-green-700"
                                                },
                                                [
                                                  _c(
                                                    "svg",
                                                    {
                                                      staticClass:
                                                        "w-6 h-6 align-middle",
                                                      attrs: {
                                                        width: "24",
                                                        height: "24",
                                                        viewBox: "0 0 24 24",
                                                        fill: "none",
                                                        stroke: "green",
                                                        "stroke-width": "2",
                                                        "stroke-linecap":
                                                          "round",
                                                        "stroke-linejoin":
                                                          "round"
                                                      }
                                                    },
                                                    [
                                                      _c("path", {
                                                        attrs: {
                                                          d:
                                                            "M22 11.08V12a10 10 0 1 1-5.93-9.14"
                                                        }
                                                      }),
                                                      _vm._v(" "),
                                                      _c("polyline", {
                                                        attrs: {
                                                          points:
                                                            "22 4 12 14.01 9 11.01"
                                                        }
                                                      })
                                                    ]
                                                  )
                                                ]
                                              ),
                                              _vm._v(" "),
                                              _c(
                                                "span",
                                                {
                                                  staticClass:
                                                    "text-gray-700 text-sm ml-3"
                                                },
                                                [_vm._v("GSuite")]
                                              )
                                            ]
                                          )
                                        ])
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "div",
                                      {
                                        staticClass:
                                          "block flex items-center p-8  uppercase"
                                      },
                                      [
                                        _c(
                                          "button",
                                          {
                                            staticClass:
                                              "mt-3 text-lg font-semibold bg-black w-full text-white rounded-lg px-6 py-3 block shadow-xl hover:bg-gray-700"
                                          },
                                          [
                                            _vm._v(
                                              "\n                                                Select\n                                            "
                                            )
                                          ]
                                        )
                                      ]
                                    )
                                  ]
                                ),
                                _vm._v(" "),
                                _c(
                                  "div",
                                  {
                                    staticClass:
                                      "w-1/3  sm:my-5 my-8 relative z-0 rounded-lg shadow-lg md:-ml-4"
                                  },
                                  [
                                    _c(
                                      "div",
                                      {
                                        staticClass:
                                          "bg-white text-black rounded-lg shadow-inner shadow-lg overflow-hidden"
                                      },
                                      [
                                        _c(
                                          "div",
                                          {
                                            staticClass:
                                              "block text-left text-sm sm:text-md max-w-sm mx-auto mt-2 text-black px-8 lg:px-6"
                                          },
                                          [
                                            _c(
                                              "h1",
                                              {
                                                staticClass:
                                                  "text-lg font-medium uppercase p-3 pb-0 text-center tracking-wide"
                                              },
                                              [
                                                _vm._v(
                                                  "\n                                                    Business\n                                                "
                                                )
                                              ]
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "h2",
                                              {
                                                staticClass:
                                                  "text-sm text-gray-500 text-center pb-6"
                                              },
                                              [_vm._v("€39 /mo")]
                                            ),
                                            _vm._v(
                                              "\n\n                                                Stripe offers everything needed to run an online business\n                                                at scale. Get in touch for details.\n                                            "
                                            )
                                          ]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "div",
                                          {
                                            staticClass:
                                              "flex flex-wrap mt-3 px-6"
                                          },
                                          [
                                            _c("ul", [
                                              _c(
                                                "li",
                                                {
                                                  staticClass:
                                                    "flex items-center"
                                                },
                                                [
                                                  _c(
                                                    "div",
                                                    {
                                                      staticClass:
                                                        " rounded-full p-2 fill-current text-green-700"
                                                    },
                                                    [
                                                      _c(
                                                        "svg",
                                                        {
                                                          staticClass:
                                                            "w-6 h-6 align-middle",
                                                          attrs: {
                                                            width: "24",
                                                            height: "24",
                                                            viewBox:
                                                              "0 0 24 24",
                                                            fill: "none",
                                                            stroke: "green",
                                                            "stroke-width": "2",
                                                            "stroke-linecap":
                                                              "round",
                                                            "stroke-linejoin":
                                                              "round"
                                                          }
                                                        },
                                                        [
                                                          _c("path", {
                                                            attrs: {
                                                              d:
                                                                "M22 11.08V12a10 10 0 1 1-5.93-9.14"
                                                            }
                                                          }),
                                                          _vm._v(" "),
                                                          _c("polyline", {
                                                            attrs: {
                                                              points:
                                                                "22 4 12 14.01 9 11.01"
                                                            }
                                                          })
                                                        ]
                                                      )
                                                    ]
                                                  ),
                                                  _vm._v(" "),
                                                  _c(
                                                    "span",
                                                    {
                                                      staticClass:
                                                        "text-gray-700 text-sm ml-3"
                                                    },
                                                    [
                                                      _vm._v(
                                                        "3GB / 1 CPU, 60GB SSD Disk, 3TB Transfer"
                                                      )
                                                    ]
                                                  )
                                                ]
                                              ),
                                              _vm._v(" "),
                                              _c(
                                                "li",
                                                {
                                                  staticClass:
                                                    "flex items-center"
                                                },
                                                [
                                                  _c(
                                                    "div",
                                                    {
                                                      staticClass:
                                                        " rounded-full p-2 fill-current text-green-700"
                                                    },
                                                    [
                                                      _c(
                                                        "svg",
                                                        {
                                                          staticClass:
                                                            "w-6 h-6 align-middle",
                                                          attrs: {
                                                            width: "24",
                                                            height: "24",
                                                            viewBox:
                                                              "0 0 24 24",
                                                            fill: "none",
                                                            stroke: "green",
                                                            "stroke-width": "2",
                                                            "stroke-linecap":
                                                              "round",
                                                            "stroke-linejoin":
                                                              "round"
                                                          }
                                                        },
                                                        [
                                                          _c("path", {
                                                            attrs: {
                                                              d:
                                                                "M22 11.08V12a10 10 0 1 1-5.93-9.14"
                                                            }
                                                          }),
                                                          _vm._v(" "),
                                                          _c("polyline", {
                                                            attrs: {
                                                              points:
                                                                "22 4 12 14.01 9 11.01"
                                                            }
                                                          })
                                                        ]
                                                      )
                                                    ]
                                                  ),
                                                  _vm._v(" "),
                                                  _c(
                                                    "span",
                                                    {
                                                      staticClass:
                                                        "text-gray-700 text-sm ml-3"
                                                    },
                                                    [
                                                      _vm._v(
                                                        "5000 transaction Emails"
                                                      )
                                                    ]
                                                  )
                                                ]
                                              ),
                                              _vm._v(" "),
                                              _c(
                                                "li",
                                                {
                                                  staticClass:
                                                    "flex items-center"
                                                },
                                                [
                                                  _c(
                                                    "div",
                                                    {
                                                      staticClass:
                                                        " rounded-full p-2 fill-current text-green-700"
                                                    },
                                                    [
                                                      _c(
                                                        "svg",
                                                        {
                                                          staticClass:
                                                            "w-6 h-6 align-middle",
                                                          attrs: {
                                                            width: "24",
                                                            height: "24",
                                                            viewBox:
                                                              "0 0 24 24",
                                                            fill: "none",
                                                            stroke: "green",
                                                            "stroke-width": "2",
                                                            "stroke-linecap":
                                                              "round",
                                                            "stroke-linejoin":
                                                              "round"
                                                          }
                                                        },
                                                        [
                                                          _c("path", {
                                                            attrs: {
                                                              d:
                                                                "M22 11.08V12a10 10 0 1 1-5.93-9.14"
                                                            }
                                                          }),
                                                          _vm._v(" "),
                                                          _c("polyline", {
                                                            attrs: {
                                                              points:
                                                                "22 4 12 14.01 9 11.01"
                                                            }
                                                          })
                                                        ]
                                                      )
                                                    ]
                                                  ),
                                                  _vm._v(" "),
                                                  _c(
                                                    "span",
                                                    {
                                                      staticClass:
                                                        "text-gray-700 text-sm ml-3"
                                                    },
                                                    [_vm._v("SSL")]
                                                  )
                                                ]
                                              ),
                                              _vm._v(" "),
                                              _c(
                                                "li",
                                                {
                                                  staticClass:
                                                    "flex items-center"
                                                },
                                                [
                                                  _c(
                                                    "div",
                                                    {
                                                      staticClass:
                                                        " rounded-full p-2 fill-current text-green-700"
                                                    },
                                                    [
                                                      _c(
                                                        "svg",
                                                        {
                                                          staticClass:
                                                            "w-6 h-6 align-middle",
                                                          attrs: {
                                                            width: "24",
                                                            height: "24",
                                                            viewBox:
                                                              "0 0 24 24",
                                                            fill: "none",
                                                            stroke: "green",
                                                            "stroke-width": "2",
                                                            "stroke-linecap":
                                                              "round",
                                                            "stroke-linejoin":
                                                              "round"
                                                          }
                                                        },
                                                        [
                                                          _c("path", {
                                                            attrs: {
                                                              d:
                                                                "M22 11.08V12a10 10 0 1 1-5.93-9.14"
                                                            }
                                                          }),
                                                          _vm._v(" "),
                                                          _c("polyline", {
                                                            attrs: {
                                                              points:
                                                                "22 4 12 14.01 9 11.01"
                                                            }
                                                          })
                                                        ]
                                                      )
                                                    ]
                                                  ),
                                                  _vm._v(" "),
                                                  _c(
                                                    "span",
                                                    {
                                                      staticClass:
                                                        "text-gray-700 text-sm ml-3"
                                                    },
                                                    [_vm._v("Daily Backup")]
                                                  )
                                                ]
                                              ),
                                              _vm._v(" "),
                                              _c(
                                                "li",
                                                {
                                                  staticClass:
                                                    "flex items-center"
                                                },
                                                [
                                                  _c(
                                                    "div",
                                                    {
                                                      staticClass:
                                                        " rounded-full p-2 fill-current text-green-700"
                                                    },
                                                    [
                                                      _c(
                                                        "svg",
                                                        {
                                                          staticClass:
                                                            "w-6 h-6 align-middle",
                                                          attrs: {
                                                            width: "24",
                                                            height: "24",
                                                            viewBox:
                                                              "0 0 24 24",
                                                            fill: "none",
                                                            stroke: "green",
                                                            "stroke-width": "2",
                                                            "stroke-linecap":
                                                              "round",
                                                            "stroke-linejoin":
                                                              "round"
                                                          }
                                                        },
                                                        [
                                                          _c("path", {
                                                            attrs: {
                                                              d:
                                                                "M22 11.08V12a10 10 0 1 1-5.93-9.14"
                                                            }
                                                          }),
                                                          _vm._v(" "),
                                                          _c("polyline", {
                                                            attrs: {
                                                              points:
                                                                "22 4 12 14.01 9 11.01"
                                                            }
                                                          })
                                                        ]
                                                      )
                                                    ]
                                                  ),
                                                  _vm._v(" "),
                                                  _c(
                                                    "span",
                                                    {
                                                      staticClass:
                                                        "text-gray-700 text-sm ml-3"
                                                    },
                                                    [
                                                      _vm._v(
                                                        "Push Notifications"
                                                      )
                                                    ]
                                                  )
                                                ]
                                              ),
                                              _vm._v(" "),
                                              _c(
                                                "li",
                                                {
                                                  staticClass:
                                                    "flex items-center"
                                                },
                                                [
                                                  _c(
                                                    "div",
                                                    {
                                                      staticClass:
                                                        " rounded-full p-2 fill-current text-green-700"
                                                    },
                                                    [
                                                      _c(
                                                        "svg",
                                                        {
                                                          staticClass:
                                                            "w-6 h-6 align-middle",
                                                          attrs: {
                                                            width: "24",
                                                            height: "24",
                                                            viewBox:
                                                              "0 0 24 24",
                                                            fill: "none",
                                                            stroke: "green",
                                                            "stroke-width": "2",
                                                            "stroke-linecap":
                                                              "round",
                                                            "stroke-linejoin":
                                                              "round"
                                                          }
                                                        },
                                                        [
                                                          _c("path", {
                                                            attrs: {
                                                              d:
                                                                "M22 11.08V12a10 10 0 1 1-5.93-9.14"
                                                            }
                                                          }),
                                                          _vm._v(" "),
                                                          _c("polyline", {
                                                            attrs: {
                                                              points:
                                                                "22 4 12 14.01 9 11.01"
                                                            }
                                                          })
                                                        ]
                                                      )
                                                    ]
                                                  ),
                                                  _vm._v(" "),
                                                  _c(
                                                    "span",
                                                    {
                                                      staticClass:
                                                        "text-gray-700 text-sm ml-3"
                                                    },
                                                    [_vm._v("Analytics")]
                                                  )
                                                ]
                                              ),
                                              _vm._v(" "),
                                              _c(
                                                "li",
                                                {
                                                  staticClass:
                                                    "flex items-center"
                                                },
                                                [
                                                  _c(
                                                    "div",
                                                    {
                                                      staticClass:
                                                        " rounded-full p-2 fill-current text-green-700"
                                                    },
                                                    [
                                                      _c(
                                                        "svg",
                                                        {
                                                          staticClass:
                                                            "w-6 h-6 align-middle",
                                                          attrs: {
                                                            width: "24",
                                                            height: "24",
                                                            viewBox:
                                                              "0 0 24 24",
                                                            fill: "none",
                                                            stroke: "green",
                                                            "stroke-width": "2",
                                                            "stroke-linecap":
                                                              "round",
                                                            "stroke-linejoin":
                                                              "round"
                                                          }
                                                        },
                                                        [
                                                          _c("path", {
                                                            attrs: {
                                                              d:
                                                                "M22 11.08V12a10 10 0 1 1-5.93-9.14"
                                                            }
                                                          }),
                                                          _vm._v(" "),
                                                          _c("polyline", {
                                                            attrs: {
                                                              points:
                                                                "22 4 12 14.01 9 11.01"
                                                            }
                                                          })
                                                        ]
                                                      )
                                                    ]
                                                  ),
                                                  _vm._v(" "),
                                                  _c(
                                                    "span",
                                                    {
                                                      staticClass:
                                                        "text-gray-700 text-sm ml-3"
                                                    },
                                                    [_vm._v("SMS")]
                                                  )
                                                ]
                                              ),
                                              _vm._v(" "),
                                              _c(
                                                "li",
                                                {
                                                  staticClass:
                                                    "flex items-center"
                                                },
                                                [
                                                  _c(
                                                    "div",
                                                    {
                                                      staticClass:
                                                        " rounded-full p-2 fill-current text-green-700"
                                                    },
                                                    [
                                                      _c(
                                                        "svg",
                                                        {
                                                          staticClass:
                                                            "w-6 h-6 align-middle",
                                                          attrs: {
                                                            width: "24",
                                                            height: "24",
                                                            viewBox:
                                                              "0 0 24 24",
                                                            fill: "none",
                                                            stroke: "green",
                                                            "stroke-width": "2",
                                                            "stroke-linecap":
                                                              "round",
                                                            "stroke-linejoin":
                                                              "round"
                                                          }
                                                        },
                                                        [
                                                          _c("path", {
                                                            attrs: {
                                                              d:
                                                                "M22 11.08V12a10 10 0 1 1-5.93-9.14"
                                                            }
                                                          }),
                                                          _vm._v(" "),
                                                          _c("polyline", {
                                                            attrs: {
                                                              points:
                                                                "22 4 12 14.01 9 11.01"
                                                            }
                                                          })
                                                        ]
                                                      )
                                                    ]
                                                  ),
                                                  _vm._v(" "),
                                                  _c(
                                                    "span",
                                                    {
                                                      staticClass:
                                                        "text-gray-700 text-sm ml-3"
                                                    },
                                                    [_vm._v("Bot Server")]
                                                  )
                                                ]
                                              ),
                                              _vm._v(" "),
                                              _c(
                                                "li",
                                                {
                                                  staticClass:
                                                    "flex items-center"
                                                },
                                                [
                                                  _c(
                                                    "div",
                                                    {
                                                      staticClass:
                                                        " rounded-full p-2 fill-current text-green-700"
                                                    },
                                                    [
                                                      _c(
                                                        "svg",
                                                        {
                                                          staticClass:
                                                            "w-6 h-6 align-middle",
                                                          attrs: {
                                                            width: "24",
                                                            height: "24",
                                                            viewBox:
                                                              "0 0 24 24",
                                                            fill: "none",
                                                            stroke: "green",
                                                            "stroke-width": "2",
                                                            "stroke-linecap":
                                                              "round",
                                                            "stroke-linejoin":
                                                              "round"
                                                          }
                                                        },
                                                        [
                                                          _c("path", {
                                                            attrs: {
                                                              d:
                                                                "M22 11.08V12a10 10 0 1 1-5.93-9.14"
                                                            }
                                                          }),
                                                          _vm._v(" "),
                                                          _c("polyline", {
                                                            attrs: {
                                                              points:
                                                                "22 4 12 14.01 9 11.01"
                                                            }
                                                          })
                                                        ]
                                                      )
                                                    ]
                                                  ),
                                                  _vm._v(" "),
                                                  _c(
                                                    "span",
                                                    {
                                                      staticClass:
                                                        "text-gray-700 text-sm ml-3"
                                                    },
                                                    [_vm._v("Domain")]
                                                  )
                                                ]
                                              ),
                                              _vm._v(" "),
                                              _c(
                                                "li",
                                                {
                                                  staticClass:
                                                    "flex items-center"
                                                },
                                                [
                                                  _c(
                                                    "div",
                                                    {
                                                      staticClass:
                                                        " rounded-full p-2 fill-current text-green-700"
                                                    },
                                                    [
                                                      _c(
                                                        "svg",
                                                        {
                                                          staticClass:
                                                            "w-6 h-6 align-middle",
                                                          attrs: {
                                                            width: "24",
                                                            height: "24",
                                                            viewBox:
                                                              "0 0 24 24",
                                                            fill: "none",
                                                            stroke: "green",
                                                            "stroke-width": "2",
                                                            "stroke-linecap":
                                                              "round",
                                                            "stroke-linejoin":
                                                              "round"
                                                          }
                                                        },
                                                        [
                                                          _c("path", {
                                                            attrs: {
                                                              d:
                                                                "M22 11.08V12a10 10 0 1 1-5.93-9.14"
                                                            }
                                                          }),
                                                          _vm._v(" "),
                                                          _c("polyline", {
                                                            attrs: {
                                                              points:
                                                                "22 4 12 14.01 9 11.01"
                                                            }
                                                          })
                                                        ]
                                                      )
                                                    ]
                                                  ),
                                                  _vm._v(" "),
                                                  _c(
                                                    "span",
                                                    {
                                                      staticClass:
                                                        "text-gray-700 text-sm ml-3"
                                                    },
                                                    [_vm._v("GSuite")]
                                                  )
                                                ]
                                              )
                                            ])
                                          ]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "div",
                                          {
                                            staticClass:
                                              "block flex items-center p-8  uppercase"
                                          },
                                          [
                                            _c(
                                              "button",
                                              {
                                                staticClass:
                                                  "mt-3 text-lg font-semibold\n\tbg-black w-full text-white rounded-lg\n\tpx-6 py-3 block shadow-xl hover:bg-gray-700"
                                              },
                                              [
                                                _vm._v(
                                                  "\n                                                    Select\n                                                "
                                                )
                                              ]
                                            )
                                          ]
                                        )
                                      ]
                                    )
                                  ]
                                )
                              ]
                            )
                          ])
                        ]
                      )
                    ])
                  : _c("section", [
                      _c("div", { staticClass: "card" }, [
                        _c("div", { staticClass: "border-b border-40" }, [
                          _c(
                            "div",
                            { staticClass: "w-full flex border-b border-40" },
                            [
                              _c(
                                "div",
                                { staticClass: "w-1/5 px-8 py-6 my-auto" },
                                [
                                  _c(
                                    "label",
                                    {
                                      staticClass:
                                        "inline-block text-80 pt-2 leading-tight"
                                    },
                                    [
                                      _vm._v(
                                        "\n                                            Email Subscriptions\n                                        "
                                      )
                                    ]
                                  )
                                ]
                              ),
                              _vm._v(" "),
                              _c("div", { staticClass: "py-6 px-8 w-4/5" }, [
                                _c(
                                  "div",
                                  [
                                    _c("custom-slider", {
                                      attrs: {
                                        values: _vm.emailSliderValues,
                                        raising: ""
                                      },
                                      model: {
                                        value: _vm.emailSlider,
                                        callback: function($$v) {
                                          _vm.emailSlider = $$v
                                        },
                                        expression: "emailSlider"
                                      }
                                    }),
                                    _vm._v(
                                      "\n                                            " +
                                        _vm._s(_vm.emailSlider) +
                                        "\n                                        "
                                    )
                                  ],
                                  1
                                ),
                                _vm._v(" "),
                                _c("div", {
                                  staticClass: "help-text help-text mt-2"
                                })
                              ])
                            ]
                          )
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "border-b border-40" }, [
                          _c(
                            "div",
                            {
                              staticClass:
                                "w-full flex border-b border-40 items-center"
                            },
                            [
                              _c(
                                "div",
                                { staticClass: "w-1/5 px-8 py-6 my-auto " },
                                [
                                  _c(
                                    "label",
                                    {
                                      staticClass:
                                        "inline-block text-80 pt-2 leading-tight"
                                    },
                                    [
                                      _vm._v(
                                        "\n                                            SMS Subscriptions\n                                        "
                                      )
                                    ]
                                  )
                                ]
                              ),
                              _vm._v(" "),
                              _c("div", { staticClass: "py-6 px-8 w-4/5" }, [
                                _c("div", [
                                  _vm._v(
                                    "\n                                            Pay As You Go\n                                        "
                                  )
                                ]),
                                _vm._v(" "),
                                _c("div", {
                                  staticClass: "help-text help-text mt-2"
                                })
                              ])
                            ]
                          )
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "border-b border-40 " }, [
                          _c(
                            "div",
                            {
                              staticClass:
                                "w-full flex border-b border-40 items-center"
                            },
                            [
                              _c(
                                "div",
                                { staticClass: "w-1/5 px-8 py-6 my-auto" },
                                [
                                  _c(
                                    "label",
                                    {
                                      staticClass:
                                        "inline-block text-80 pt-2 leading-tight"
                                    },
                                    [
                                      _vm._v(
                                        "\n                                            Hosting Droplets\n                                        "
                                      )
                                    ]
                                  )
                                ]
                              ),
                              _vm._v(" "),
                              _c("div", { staticClass: "py-6 px-8 w-4/5" }, [
                                _c(
                                  "div",
                                  { staticClass: "flex-col w-full" },
                                  _vm._l(_vm.droplets, function(droplet) {
                                    return _c(
                                      "div",
                                      {
                                        key: droplet.id,
                                        staticClass: "mr-3 mb-3"
                                      },
                                      [
                                        _c("input", {
                                          directives: [
                                            {
                                              name: "model",
                                              rawName: "v-model",
                                              value: _vm.selected_droplet,
                                              expression: "selected_droplet"
                                            }
                                          ],
                                          staticClass: "hidden",
                                          attrs: {
                                            id: "droplet" + droplet.id,
                                            name: "droplet" + droplet.id,
                                            type: "radio"
                                          },
                                          domProps: {
                                            value: droplet.id,
                                            checked: _vm._q(
                                              _vm.selected_droplet,
                                              droplet.id
                                            )
                                          },
                                          on: {
                                            change: function($event) {
                                              _vm.selected_droplet = droplet.id
                                            }
                                          }
                                        }),
                                        _vm._v(" "),
                                        _c(
                                          "label",
                                          {
                                            staticClass:
                                              "flex items-center cursor-pointer",
                                            attrs: {
                                              for: "droplet" + droplet.id
                                            }
                                          },
                                          [
                                            _c("span", {
                                              staticClass:
                                                "w-4 h-4 inline-block mr-1 rounded-full border border-grey"
                                            }),
                                            _vm._v(
                                              "\n                                                    " +
                                                _vm._s(droplet.description)
                                            )
                                          ]
                                        )
                                      ]
                                    )
                                  }),
                                  0
                                )
                              ])
                            ]
                          )
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "border-b border-40 " }, [
                          _c(
                            "div",
                            {
                              staticClass:
                                "w-full flex border-b border-40 items-center"
                            },
                            [
                              _c(
                                "div",
                                { staticClass: "w-1/5 px-8 py-6 my-auto" },
                                [
                                  _c(
                                    "label",
                                    {
                                      staticClass:
                                        "inline-block text-80 pt-2 leading-tight"
                                    },
                                    [
                                      _vm._v(
                                        "\n                                            SSL\n                                        "
                                      )
                                    ]
                                  )
                                ]
                              ),
                              _vm._v(" "),
                              _c("div", { staticClass: "py-6 px-8 w-4/5" }, [
                                _c(
                                  "div",
                                  { staticClass: "flex-col w-full" },
                                  _vm._l(_vm.sslPacks, function(item) {
                                    return _c(
                                      "div",
                                      {
                                        key: item.id,
                                        staticClass: "mr-3 mb-3"
                                      },
                                      [
                                        _c("input", {
                                          directives: [
                                            {
                                              name: "model",
                                              rawName: "v-model",
                                              value: _vm.selected_ssl,
                                              expression: "selected_ssl"
                                            }
                                          ],
                                          staticClass: "hidden",
                                          attrs: {
                                            id: "ssl" + item.id,
                                            name: "ssl" + item.id,
                                            type: "radio"
                                          },
                                          domProps: {
                                            value: item.id,
                                            checked: _vm._q(
                                              _vm.selected_ssl,
                                              item.id
                                            )
                                          },
                                          on: {
                                            change: function($event) {
                                              _vm.selected_ssl = item.id
                                            }
                                          }
                                        }),
                                        _vm._v(" "),
                                        _c(
                                          "label",
                                          {
                                            staticClass:
                                              "flex items-center cursor-pointer",
                                            attrs: { for: "ssl" + item.id }
                                          },
                                          [
                                            _c("span", {
                                              staticClass:
                                                "w-4 h-4 inline-block mr-1 rounded-full border border-grey"
                                            }),
                                            _vm._v(
                                              "\n                                                    " +
                                                _vm._s(item.description)
                                            )
                                          ]
                                        )
                                      ]
                                    )
                                  }),
                                  0
                                )
                              ])
                            ]
                          )
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "border-b border-40 " }, [
                          _c(
                            "div",
                            {
                              staticClass:
                                "w-full flex border-b border-40 items-center"
                            },
                            [
                              _c(
                                "div",
                                { staticClass: "w-1/5 px-8 py-6 my-auto" },
                                [
                                  _c(
                                    "label",
                                    {
                                      staticClass:
                                        "inline-block text-80 pt-2 leading-tight"
                                    },
                                    [
                                      _vm._v(
                                        "\n                                            BackUp Packs\n                                        "
                                      )
                                    ]
                                  )
                                ]
                              ),
                              _vm._v(" "),
                              _c("div", { staticClass: "py-6 px-8 w-4/5" }, [
                                _c(
                                  "div",
                                  { staticClass: "flex-col w-full" },
                                  _vm._l(_vm.backupPacks, function(item) {
                                    return _c(
                                      "div",
                                      {
                                        key: item.id,
                                        staticClass: "mr-3 mb-3"
                                      },
                                      [
                                        _c("input", {
                                          directives: [
                                            {
                                              name: "model",
                                              rawName: "v-model",
                                              value: _vm.selected_backup,
                                              expression: "selected_backup"
                                            }
                                          ],
                                          staticClass: "hidden",
                                          attrs: {
                                            id: "backup" + item.id,
                                            name: "backup" + item.id,
                                            type: "radio"
                                          },
                                          domProps: {
                                            value: item.id,
                                            checked: _vm._q(
                                              _vm.selected_backup,
                                              item.id
                                            )
                                          },
                                          on: {
                                            change: function($event) {
                                              _vm.selected_backup = item.id
                                            }
                                          }
                                        }),
                                        _vm._v(" "),
                                        _c(
                                          "label",
                                          {
                                            staticClass:
                                              "flex items-center cursor-pointer",
                                            attrs: { for: "backup" + item.id }
                                          },
                                          [
                                            _c("span", {
                                              staticClass:
                                                "w-4 h-4 inline-block mr-1 rounded-full border border-grey"
                                            }),
                                            _vm._v(
                                              "\n                                                    " +
                                                _vm._s(item.description)
                                            )
                                          ]
                                        )
                                      ]
                                    )
                                  }),
                                  0
                                )
                              ])
                            ]
                          )
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "border-b border-40 " }, [
                          _c(
                            "div",
                            {
                              staticClass:
                                "w-full flex border-b border-40 items-center"
                            },
                            [
                              _c(
                                "div",
                                { staticClass: "w-1/5 px-8 py-6 my-auto" },
                                [
                                  _c(
                                    "label",
                                    {
                                      staticClass:
                                        "inline-block text-80 pt-2 leading-tight"
                                    },
                                    [
                                      _vm._v(
                                        "\n                                            Analytics Packs\n                                        "
                                      )
                                    ]
                                  )
                                ]
                              ),
                              _vm._v(" "),
                              _c("div", { staticClass: "py-6 px-8 w-4/5" }, [
                                _c(
                                  "div",
                                  { staticClass: "flex-col w-full" },
                                  _vm._l(_vm.analyticsPacks, function(item) {
                                    return _c(
                                      "div",
                                      {
                                        key: item.id,
                                        staticClass: "mr-3 mb-3"
                                      },
                                      [
                                        _c("input", {
                                          directives: [
                                            {
                                              name: "model",
                                              rawName: "v-model",
                                              value: _vm.selected_analytics,
                                              expression: "selected_analytics"
                                            }
                                          ],
                                          staticClass: "hidden",
                                          attrs: {
                                            id: "analytics" + item.id,
                                            name: "analytics" + item.id,
                                            type: "radio"
                                          },
                                          domProps: {
                                            value: item.id,
                                            checked: _vm._q(
                                              _vm.selected_analytics,
                                              item.id
                                            )
                                          },
                                          on: {
                                            change: function($event) {
                                              _vm.selected_analytics = item.id
                                            }
                                          }
                                        }),
                                        _vm._v(" "),
                                        _c(
                                          "label",
                                          {
                                            staticClass:
                                              "flex items-center cursor-pointer",
                                            attrs: {
                                              for: "analytics" + item.id
                                            }
                                          },
                                          [
                                            _c("span", {
                                              staticClass:
                                                "w-4 h-4 inline-block mr-1 rounded-full border border-grey"
                                            }),
                                            _vm._v(
                                              "\n                                                    " +
                                                _vm._s(item.description)
                                            )
                                          ]
                                        )
                                      ]
                                    )
                                  }),
                                  0
                                )
                              ])
                            ]
                          )
                        ])
                      ])
                    ])
              ])
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-68ff5483", module.exports)
  }
}

/***/ }),
/* 16 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);