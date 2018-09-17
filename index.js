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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/constants/index.js":
/*!********************************!*\
  !*** ./src/constants/index.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _staticValidator = __webpack_require__(/*! ./static-validator */ \"./src/constants/static-validator.js\");\n\nObject.keys(_staticValidator).forEach(function (key) {\n  if (key === \"default\" || key === \"__esModule\") return;\n  Object.defineProperty(exports, key, {\n    enumerable: true,\n    get: function get() {\n      return _staticValidator[key];\n    }\n  });\n});\n\nvar _invalid = __webpack_require__(/*! ./invalid */ \"./src/constants/invalid.js\");\n\nObject.keys(_invalid).forEach(function (key) {\n  if (key === \"default\" || key === \"__esModule\") return;\n  Object.defineProperty(exports, key, {\n    enumerable: true,\n    get: function get() {\n      return _invalid[key];\n    }\n  });\n});\n\n//# sourceURL=webpack:///./src/constants/index.js?");

/***/ }),

/***/ "./src/constants/invalid.js":
/*!**********************************!*\
  !*** ./src/constants/invalid.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nvar INVALID = exports.INVALID = \"x2iTBD4Q4\";\n\n//# sourceURL=webpack:///./src/constants/invalid.js?");

/***/ }),

/***/ "./src/constants/static-validator.js":
/*!*******************************************!*\
  !*** ./src/constants/static-validator.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; };\n\nvar STATIC_VALIDATOR = exports.STATIC_VALIDATOR = {\n  \"any\": function any(data, key, rootData) {\n    return !Array.isArray(rootData) && (typeof rootData === \"undefined\" ? \"undefined\" : _typeof(rootData)) === \"object\" ? rootData.hasOwnProperty(key) : true;\n  },\n\n  \"string\": function string(data) {\n    return typeof data === \"string\";\n  },\n\n  \"number\": function number(data) {\n    return typeof data === \"number\";\n  },\n\n  \"numberString\": function numberString(data) {\n    // \"1\" is a number\n    // 1 is a number\n    return typeof data === \"string\" && !isNaN(Number(data));\n  },\n\n  \"null\": function _null(data) {\n    return data == null;\n  },\n\n  \"undefined\": function undefined(data) {\n    return typeof data === \"undefined\";\n  },\n\n  \"boolean\": function boolean(data) {\n    return typeof data === \"boolean\";\n  },\n\n  \"function\": function _function(data) {\n    return typeof data === \"function\";\n  },\n\n  \"object\": function object(data) {\n    return (typeof data === \"undefined\" ? \"undefined\" : _typeof(data)) === \"object\" && !Array.isArray(data);\n  }\n};\n\n//# sourceURL=webpack:///./src/constants/static-validator.js?");

/***/ }),

/***/ "./src/get/get-array-type.js":
/*!***********************************!*\
  !*** ./src/get/get-array-type.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.getArrayType = getArrayType;\nfunction getArrayType(type) {\n  if (type.substring(0, 6) === \"Array<\") {\n    return type.substring(6, type.length - 1);\n  }\n  return type.substring(0, type.length - 2);\n}\n\n//# sourceURL=webpack:///./src/get/get-array-type.js?");

/***/ }),

/***/ "./src/get/get-type-interface.js":
/*!***************************************!*\
  !*** ./src/get/get-type-interface.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; };\n\nexports.getTypeInterface = getTypeInterface;\n\nvar _tools = __webpack_require__(/*! @tools */ \"./src/tools/index.js\");\n\nvar _constants = __webpack_require__(/*! @constants */ \"./src/constants/index.js\");\n\nvar _getArrayType = __webpack_require__(/*! ./get-array-type */ \"./src/get/get-array-type.js\");\n\nvar _validate = __webpack_require__(/*! @validate */ \"./src/validate/index.js\");\n\nvar _predicates = __webpack_require__(/*! @predicates */ \"./src/predicates/index.js\");\n\nfunction getObjectTypeInterface(props) {\n  var pathname = props.pathname;\n\n\n  var type = props.type;\n  var data = (0, _tools.get)(props.data, pathname);\n\n  var dataKeys = (0, _tools.keys)(data);\n  var typedKeys = (0, _tools.keys)(type, _predicates.isTypedKey);\n  var typedKeysStripped = typedKeys.map(function (a) {\n    return a.substring(1, a.length - 1);\n  });\n  var optionalKeys = (0, _tools.keys)(type, _predicates.isOptionalKey);\n  var optionalKeysStripped = optionalKeys.map(function (a) {\n    return a.substring(0, a.length - 1);\n  });\n  var optionalTypedKeys = (0, _tools.keys)(type, _predicates.isOptionalTypedKey);\n  var optionalTypedKeysStripped = optionalTypedKeys.map(function (a) {\n    return a.substring(1, a.length - 2);\n  });\n  var staticKeys = (0, _tools.keys)(type, _predicates.isStaticKey);\n  var keysList = [];\n  var dictionaryInterface = {};\n\n  // Typed\n  var i = -1;\n  var n = typedKeys.length;\n  while (++i < n) {\n    var x = -1;\n    var y = dataKeys.length;\n    while (++x < y) {\n      if (staticKeys.indexOf(dataKeys[x]) === -1 && optionalKeysStripped.indexOf(dataKeys[x]) === -1) {\n        var isValid = (0, _validate.validateInterface)({\n          type: typedKeysStripped[i],\n          data: dataKeys[x],\n          validators: props.validators,\n          pathname: []\n        }).isValid;\n        if (isValid) {\n          keysList.push(dataKeys[x]);\n          dictionaryInterface[dataKeys[x]] = type[typedKeys[i]];\n        }\n      }\n    }\n  }\n\n  // Optional\n  i = -1;\n  n = optionalKeys.length;\n  while (++i < n) {\n    if (dataKeys.indexOf(optionalKeysStripped[i]) > -1) {\n      keysList.push(optionalKeysStripped[i]);\n      dictionaryInterface[optionalKeysStripped[i]] = type[optionalKeys[i]];\n    }\n  }\n\n  // Optional typed\n  i = -1;\n  n = optionalTypedKeys.length;\n  while (++i < n) {\n    var _x = -1;\n    var _y = dataKeys.length;\n    while (++_x < _y) {\n      if (keysList.indexOf(dataKeys[_x]) === -1) {\n        var _isValid = (0, _validate.validateInterface)({\n          type: optionalTypedKeysStripped[i],\n          data: dataKeys[_x],\n          validators: props.validators,\n          pathname: []\n        }).isValid;\n        if (_isValid) {\n          keysList.push(dataKeys[_x]);\n          dictionaryInterface[dataKeys[_x]] = type[optionalTypedKeys[i]];\n        }\n      }\n    }\n  }\n  // Static\n  i = -1;\n  n = staticKeys.length;\n  while (++i < n) {\n    keysList.push(staticKeys[i]);\n    dictionaryInterface[staticKeys[i]] = type[staticKeys[i]];\n  }\n\n  i = -1;\n  n = dataKeys.length;\n  while (++i < n) {\n    if (keysList.indexOf(dataKeys[i]) === -1) {\n      keysList.push(dataKeys[i]);\n      dictionaryInterface[dataKeys[i]] = _constants.INVALID;\n    }\n  }\n\n  return dictionaryInterface;\n}\n\nfunction getArrayTypeInterface(props) {\n  var arrayType = (0, _getArrayType.getArrayType)(props.type);\n  var data = (0, _tools.get)(props.data, props.pathname);\n  return Array.isArray(data) && data.length ? data.map(function () {\n    return arrayType;\n  }) : [arrayType];\n}\n\n/**\n * @param {object} props\n * @param {any} props.data\n * @param {any} props.type\n * @param {array} props.pathname\n * @param {object} props.validators\n*/\nfunction getTypeInterface(props) {\n  var type = props.type;\n\n  if ((0, _predicates.isTypedArray)(type)) {\n    return getArrayTypeInterface(props);\n  } else if ((typeof type === \"undefined\" ? \"undefined\" : _typeof(type)) === \"object\") {\n    return getObjectTypeInterface(props);\n  }\n  return type;\n}\n\n//# sourceURL=webpack:///./src/get/get-type-interface.js?");

/***/ }),

/***/ "./src/get/get-type-list.js":
/*!**********************************!*\
  !*** ./src/get/get-type-list.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.getTypeList = getTypeList;\nfunction getTypeList(type) {\n  var typeList = [];\n  var i = -1;\n  var n = type.length;\n\n  if (!n) {\n    typeList.push(type);\n  }\n\n  while (++i < n) {\n    if (type.substring(i, i + 6) === \"Array<\") {\n      var start = i;\n      var o = 1;\n      i += 6;\n      while (++i < n && o) {\n        if (type[i] === \"<\") {\n          o += 1;\n        } else if (type[i] === \">\") {\n          o -= 1;\n        }\n      }\n      typeList.push(type.substring(start, i));\n    } else {\n      var _start = i;\n      var t = void 0;\n      while (i < n && type[i] !== \"|\") {\n        i += 1;\n      }\n      t = type.substring(_start, i).trim();\n      if (t) {\n        typeList.push(t);\n      }\n    }\n  }\n  return typeList;\n}\n\n//# sourceURL=webpack:///./src/get/get-type-list.js?");

/***/ }),

/***/ "./src/get/index.js":
/*!**************************!*\
  !*** ./src/get/index.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _getArrayType = __webpack_require__(/*! ./get-array-type */ \"./src/get/get-array-type.js\");\n\nObject.keys(_getArrayType).forEach(function (key) {\n  if (key === \"default\" || key === \"__esModule\") return;\n  Object.defineProperty(exports, key, {\n    enumerable: true,\n    get: function get() {\n      return _getArrayType[key];\n    }\n  });\n});\n\nvar _getTypeInterface = __webpack_require__(/*! ./get-type-interface */ \"./src/get/get-type-interface.js\");\n\nObject.keys(_getTypeInterface).forEach(function (key) {\n  if (key === \"default\" || key === \"__esModule\") return;\n  Object.defineProperty(exports, key, {\n    enumerable: true,\n    get: function get() {\n      return _getTypeInterface[key];\n    }\n  });\n});\n\nvar _getTypeList = __webpack_require__(/*! ./get-type-list */ \"./src/get/get-type-list.js\");\n\nObject.keys(_getTypeList).forEach(function (key) {\n  if (key === \"default\" || key === \"__esModule\") return;\n  Object.defineProperty(exports, key, {\n    enumerable: true,\n    get: function get() {\n      return _getTypeList[key];\n    }\n  });\n});\n\n//# sourceURL=webpack:///./src/get/index.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; };\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _constants = __webpack_require__(/*! @constants */ \"./src/constants/index.js\");\n\nvar _validate = __webpack_require__(/*! @validate */ \"./src/validate/index.js\");\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction validatorToFunction(type, validators) {\n  return function (value) {\n    return new Validator(type, validators).validate(value);\n  };\n}\n\nfunction createValidators(validators) {\n  var formatted = {};\n\n  for (var k in validators) {\n    if (typeof validators[k] !== \"function\") {\n      formatted[k] = validatorToFunction(validators[k], formatted);\n    } else {\n      formatted[k] = validators[k];\n    }\n  }\n\n  return formatted;\n}\n\nvar Validator = function () {\n  _createClass(Validator, null, [{\n    key: \"create\",\n    value: function create(object) {\n      var validators = createValidators(object);\n      for (var name in validators) {\n        _constants.STATIC_VALIDATOR[name] = validators[name];\n      }\n    }\n\n    /**\n     * @param {any} type The data to validate\n     * @param {object=} validators The instance validators\n     */\n\n  }]);\n\n  function Validator(type, validators) {\n    _classCallCheck(this, Validator);\n\n    this.validators = Object.assign({}, _constants.STATIC_VALIDATOR, createValidators(validators));\n    this.type = type;\n  }\n\n  _createClass(Validator, [{\n    key: \"extend\",\n    value: function extend(extendedType) {\n      var extendedTypeResult = (0, _validate.validateByType)({\n        validators: this.validators,\n        type: extendedType,\n        pathname: [],\n        data: {}\n      });\n\n      var typeResult = (0, _validate.validateByType)({\n        validators: this.validators,\n        type: this.type,\n        pathname: [],\n        data: {}\n      });\n\n      if (_typeof(typeResult.type) === \"object\" && _typeof(extendedTypeResult.type) === \"object\") {\n        this.type = Object.assign(typeResult.type, extendedTypeResult.type);\n      } else if (_typeof(this.type) === \"object\") {\n        throw new Error(\"Cannot extend 'type' with current argument, an extended type must be an object.\");\n      } else if (_typeof(extendedTypeResult.type) === \"object\") {\n        throw new Error(\"Cannot extend 'type', your validator type is not an object.\");\n      } else {\n        throw new Error(\"Cannot extend 'type', both the validator type and extended type are not objects.\");\n      }\n\n      return this;\n    }\n  }, {\n    key: \"validate\",\n    value: function validate(data) {\n      return (0, _validate.validateByType)({\n        validators: this.validators,\n        type: this.type,\n        pathname: [],\n        data: data\n      });\n    }\n  }]);\n\n  return Validator;\n}();\n\nexports.default = Validator;\n\n\nValidator.INVALID = _constants.INVALID;\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/predicates/index.js":
/*!*********************************!*\
  !*** ./src/predicates/index.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _isTypedArray = __webpack_require__(/*! ./is-typed-array */ \"./src/predicates/is-typed-array.js\");\n\nObject.keys(_isTypedArray).forEach(function (key) {\n  if (key === \"default\" || key === \"__esModule\") return;\n  Object.defineProperty(exports, key, {\n    enumerable: true,\n    get: function get() {\n      return _isTypedArray[key];\n    }\n  });\n});\n\nvar _isStaticKey = __webpack_require__(/*! ./is-static-key */ \"./src/predicates/is-static-key.js\");\n\nObject.keys(_isStaticKey).forEach(function (key) {\n  if (key === \"default\" || key === \"__esModule\") return;\n  Object.defineProperty(exports, key, {\n    enumerable: true,\n    get: function get() {\n      return _isStaticKey[key];\n    }\n  });\n});\n\nvar _isOptionalKey = __webpack_require__(/*! ./is-optional-key */ \"./src/predicates/is-optional-key.js\");\n\nObject.keys(_isOptionalKey).forEach(function (key) {\n  if (key === \"default\" || key === \"__esModule\") return;\n  Object.defineProperty(exports, key, {\n    enumerable: true,\n    get: function get() {\n      return _isOptionalKey[key];\n    }\n  });\n});\n\nvar _isOptionalTypedKey = __webpack_require__(/*! ./is-optional-typed-key */ \"./src/predicates/is-optional-typed-key.js\");\n\nObject.keys(_isOptionalTypedKey).forEach(function (key) {\n  if (key === \"default\" || key === \"__esModule\") return;\n  Object.defineProperty(exports, key, {\n    enumerable: true,\n    get: function get() {\n      return _isOptionalTypedKey[key];\n    }\n  });\n});\n\nvar _isTypedKey = __webpack_require__(/*! ./is-typed-key */ \"./src/predicates/is-typed-key.js\");\n\nObject.keys(_isTypedKey).forEach(function (key) {\n  if (key === \"default\" || key === \"__esModule\") return;\n  Object.defineProperty(exports, key, {\n    enumerable: true,\n    get: function get() {\n      return _isTypedKey[key];\n    }\n  });\n});\n\nvar _isValidationResponse = __webpack_require__(/*! ./is-validation-response */ \"./src/predicates/is-validation-response.js\");\n\nObject.keys(_isValidationResponse).forEach(function (key) {\n  if (key === \"default\" || key === \"__esModule\") return;\n  Object.defineProperty(exports, key, {\n    enumerable: true,\n    get: function get() {\n      return _isValidationResponse[key];\n    }\n  });\n});\n\n//# sourceURL=webpack:///./src/predicates/index.js?");

/***/ }),

/***/ "./src/predicates/is-optional-key.js":
/*!*******************************************!*\
  !*** ./src/predicates/is-optional-key.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.isOptionalKey = isOptionalKey;\nfunction isOptionalKey(value, key) {\n  key = key.toString();\n  return key.slice(-1) === \"?\" && key.slice(-2) !== \"]\" && key[0] !== \"[\";\n}\n\n//# sourceURL=webpack:///./src/predicates/is-optional-key.js?");

/***/ }),

/***/ "./src/predicates/is-optional-typed-key.js":
/*!*************************************************!*\
  !*** ./src/predicates/is-optional-typed-key.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.isOptionalTypedKey = isOptionalTypedKey;\nfunction isOptionalTypedKey(value, key) {\n  key = key.toString();\n  return key[0] === \"[\" && key.slice(-2)[0] === \"]\" && key.slice(-1) === \"?\";\n}\n\n//# sourceURL=webpack:///./src/predicates/is-optional-typed-key.js?");

/***/ }),

/***/ "./src/predicates/is-static-key.js":
/*!*****************************************!*\
  !*** ./src/predicates/is-static-key.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.isStaticKey = isStaticKey;\nfunction isStaticKey(value, key) {\n  key = key.toString();\n  return key.slice(-1) !== \"?\" && key[0] !== \"[\" && key.slice(-1) !== \"]\";\n}\n\n//# sourceURL=webpack:///./src/predicates/is-static-key.js?");

/***/ }),

/***/ "./src/predicates/is-typed-array.js":
/*!******************************************!*\
  !*** ./src/predicates/is-typed-array.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.isTypedArray = isTypedArray;\nfunction isTypedArray(type) {\n  return typeof type === \"string\" && (type.substring(0, 6) === \"Array<\" || type.slice(-2) === \"[]\");\n}\n\n//# sourceURL=webpack:///./src/predicates/is-typed-array.js?");

/***/ }),

/***/ "./src/predicates/is-typed-key.js":
/*!****************************************!*\
  !*** ./src/predicates/is-typed-key.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.isTypedKey = isTypedKey;\nfunction isTypedKey(value, key) {\n  key = key.toString();\n  return key[0] === \"[\" && key.slice(-1) === \"]\";\n}\n\n//# sourceURL=webpack:///./src/predicates/is-typed-key.js?");

/***/ }),

/***/ "./src/predicates/is-validation-response.js":
/*!**************************************************!*\
  !*** ./src/predicates/is-validation-response.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; };\n\nexports.isValidationResponse = isValidationResponse;\nfunction isValidationResponse(res) {\n  return (typeof res === \"undefined\" ? \"undefined\" : _typeof(res)) === \"object\" && res.hasOwnProperty(\"value\") && res.hasOwnProperty(\"isValid\") && res.hasOwnProperty(\"invalid\") && res.hasOwnProperty(\"data\");\n}\n\n//# sourceURL=webpack:///./src/predicates/is-validation-response.js?");

/***/ }),

/***/ "./src/tools/get.js":
/*!**************************!*\
  !*** ./src/tools/get.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.get = get;\n/**\n * A function which gets nested object properties\n * @param {Object} object The object to query\n * @param {array|string} path The object path\n * @return {any}\n */\nfunction get(object, path) {\n  var normalizedPath = [].concat(path).join(\".\").split(\".\");\n  var i = -1;\n  var ref = object;\n  var n = normalizedPath.length - 1;\n\n  if (!path.length || !object) {\n    return object;\n  }\n\n  while (++i < n) {\n    if (ref[normalizedPath[i]]) {\n      ref = ref[normalizedPath[i]];\n    } else {\n      return ref[normalizedPath[i]];\n    }\n  }\n  return ref[normalizedPath[n]];\n}\n\n//# sourceURL=webpack:///./src/tools/get.js?");

/***/ }),

/***/ "./src/tools/index.js":
/*!****************************!*\
  !*** ./src/tools/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _get = __webpack_require__(/*! ./get */ \"./src/tools/get.js\");\n\nObject.keys(_get).forEach(function (key) {\n  if (key === \"default\" || key === \"__esModule\") return;\n  Object.defineProperty(exports, key, {\n    enumerable: true,\n    get: function get() {\n      return _get[key];\n    }\n  });\n});\n\nvar _keys = __webpack_require__(/*! ./keys */ \"./src/tools/keys.js\");\n\nObject.keys(_keys).forEach(function (key) {\n  if (key === \"default\" || key === \"__esModule\") return;\n  Object.defineProperty(exports, key, {\n    enumerable: true,\n    get: function get() {\n      return _keys[key];\n    }\n  });\n});\n\n//# sourceURL=webpack:///./src/tools/index.js?");

/***/ }),

/***/ "./src/tools/keys.js":
/*!***************************!*\
  !*** ./src/tools/keys.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.keys = keys;\nfunction keys(object, predicate) {\n  var list = [];\n  for (var k in object) {\n    k = isNaN(Number(k)) ? k : Number(k);\n    if (object.hasOwnProperty(k)) {\n      if (predicate) {\n        if (predicate(object[k], k)) {\n          list.push(k);\n        }\n      } else {\n        list.push(k);\n      }\n    }\n  }\n  return list;\n}\n\n//# sourceURL=webpack:///./src/tools/keys.js?");

/***/ }),

/***/ "./src/validate/index.js":
/*!*******************************!*\
  !*** ./src/validate/index.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _validateArray = __webpack_require__(/*! ./validate-array */ \"./src/validate/validate-array.js\");\n\nObject.keys(_validateArray).forEach(function (key) {\n  if (key === \"default\" || key === \"__esModule\") return;\n  Object.defineProperty(exports, key, {\n    enumerable: true,\n    get: function get() {\n      return _validateArray[key];\n    }\n  });\n});\n\nvar _validateByType = __webpack_require__(/*! ./validate-by-type */ \"./src/validate/validate-by-type.js\");\n\nObject.keys(_validateByType).forEach(function (key) {\n  if (key === \"default\" || key === \"__esModule\") return;\n  Object.defineProperty(exports, key, {\n    enumerable: true,\n    get: function get() {\n      return _validateByType[key];\n    }\n  });\n});\n\nvar _validateInterface = __webpack_require__(/*! ./validate-interface */ \"./src/validate/validate-interface.js\");\n\nObject.keys(_validateInterface).forEach(function (key) {\n  if (key === \"default\" || key === \"__esModule\") return;\n  Object.defineProperty(exports, key, {\n    enumerable: true,\n    get: function get() {\n      return _validateInterface[key];\n    }\n  });\n});\n\nvar _validateObject = __webpack_require__(/*! ./validate-object */ \"./src/validate/validate-object.js\");\n\nObject.keys(_validateObject).forEach(function (key) {\n  if (key === \"default\" || key === \"__esModule\") return;\n  Object.defineProperty(exports, key, {\n    enumerable: true,\n    get: function get() {\n      return _validateObject[key];\n    }\n  });\n});\n\n//# sourceURL=webpack:///./src/validate/index.js?");

/***/ }),

/***/ "./src/validate/validate-array.js":
/*!****************************************!*\
  !*** ./src/validate/validate-array.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; };\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nexports.validateArray = validateArray;\n\nvar _validateByType = __webpack_require__(/*! ./validate-by-type */ \"./src/validate/validate-by-type.js\");\n\nvar _get = __webpack_require__(/*! @get */ \"./src/get/index.js\");\n\nvar _tools = __webpack_require__(/*! @tools */ \"./src/tools/index.js\");\n\n/**\n * @param {object} props\n * @param {any} props.data\n * @param {any} props.type\n * @param {array} props.pathname\n * @param {object} props.validators\n*/\nfunction validateArray(props) {\n  var typeInterface = (0, _get.getTypeInterface)(props);\n  var data = (0, _tools.get)(props.data, props.pathname);\n\n  var i = -1;\n  var n = typeInterface.length;\n\n  var response = {\n    value: [],\n    data: data,\n    type: props.type,\n    isValid: true,\n    invalid: []\n  };\n\n  if (!Array.isArray(data)) {\n    response.isValid = false;\n    response.value = false;\n  } else {\n    while (++i < n) {\n      var pathname = props.pathname.concat(i);\n\n      var temp = (0, _validateByType.validateByType)(_extends({}, props, {\n        pathname: pathname,\n        type: typeInterface[i]\n      }));\n\n      if (i < data.length) {\n        response.value[i] = temp.value;\n      }\n\n      if (!temp.isValid) {\n        response.isValid = false;\n        response.invalid.push({\n          pathname: pathname.join(\".\"),\n          value: data[i],\n          expected: _typeof(temp.type) === \"object\" ? temp.type : typeInterface[i]\n        });\n      }\n    }\n  }\n\n  return response;\n}\n\n//# sourceURL=webpack:///./src/validate/validate-array.js?");

/***/ }),

/***/ "./src/validate/validate-by-type.js":
/*!******************************************!*\
  !*** ./src/validate/validate-by-type.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; };\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nexports.validateByType = validateByType;\n\nvar _constants = __webpack_require__(/*! @constants */ \"./src/constants/index.js\");\n\nvar _validateObject = __webpack_require__(/*! ./validate-object */ \"./src/validate/validate-object.js\");\n\nvar _validateArray = __webpack_require__(/*! ./validate-array */ \"./src/validate/validate-array.js\");\n\nvar _validateInterface = __webpack_require__(/*! ./validate-interface */ \"./src/validate/validate-interface.js\");\n\nvar _predicates = __webpack_require__(/*! @predicates */ \"./src/predicates/index.js\");\n\nvar _get = __webpack_require__(/*! @get */ \"./src/get/index.js\");\n\nvar _tools = __webpack_require__(/*! @tools */ \"./src/tools/index.js\");\n\nfunction validateByTypeString(props) {\n  var typeList = (0, _get.getTypeList)(props.type);\n  var i = -1;\n  var temp = void 0;\n  var n = typeList.length;\n\n  while (++i < n) {\n    if ((0, _predicates.isTypedArray)(typeList[i])) {\n      temp = (0, _validateArray.validateArray)(_extends({}, props, {\n        type: typeList[i]\n      }));\n      if (temp.isValid) {\n        temp.type = _typeof(temp.type) === \"object\" ? temp.type : props.type;\n        return temp;\n      }\n    } else {\n      temp = (0, _validateInterface.validateInterface)(_extends({}, props, {\n        type: typeList[i]\n      }));\n      if (temp.isValid) {\n        temp.type = _typeof(temp.type) === \"object\" ? temp.type : props.type;\n        return temp;\n      }\n    }\n  }\n  return temp;\n}\n\nfunction validateByTypeBoolean(props) {\n  var type = (0, _tools.get)(props.type, props.pathname);\n  var data = (0, _tools.get)(props.data, props.pathname);\n  return {\n    type: type,\n    value: type === data,\n    data: props.data,\n    isValid: type === data,\n    invalid: []\n  };\n}\n\n/**\n * @param {object} props\n * @param {any} props.data\n * @param {any} props.props.type\n * @param {array} props.pathname\n * @param {object} props.validators\n*/\nfunction validateByType(props) {\n  var data = props.data;\n\n  if (props.type === _constants.INVALID) {\n    return {\n      data: data,\n      value: false,\n      isValid: false,\n      invalid: []\n    };\n  } else if (typeof props.type === \"string\") {\n    props.type = props.type.replace(/(\\s+|)\\|(\\s+|)/g, \"|\");\n    return validateByTypeString(props);\n  } else if (typeof props.type === \"boolean\") {\n    return validateByTypeBoolean(props);\n  }\n  return (0, _validateObject.validateObject)(props);\n}\n\n//# sourceURL=webpack:///./src/validate/validate-by-type.js?");

/***/ }),

/***/ "./src/validate/validate-interface.js":
/*!********************************************!*\
  !*** ./src/validate/validate-interface.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.validateInterface = validateInterface;\n\nvar _predicates = __webpack_require__(/*! @predicates */ \"./src/predicates/index.js\");\n\nvar _tools = __webpack_require__(/*! @tools */ \"./src/tools/index.js\");\n\nfunction validateInterfaceType(props) {\n  var data = props.data,\n      pathname = props.pathname,\n      type = props.type,\n      validators = props.validators;\n\n  var value = (0, _tools.get)(data, pathname);\n  var key = pathname.slice(-1)[0];\n  var parent = (0, _tools.get)(data, pathname.slice(0, -1));\n  var response = validators[type].call(props, value, key, parent);\n\n  return (0, _predicates.isValidationResponse)(response) ? {\n    type: response.type,\n    data: data,\n    value: response.value,\n    isValid: response.isValid,\n    invalid: response.invalid\n  } : {\n    type: type,\n    data: data,\n    value: response,\n    isValid: response,\n    invalid: []\n  };\n}\n\n/**\n * @param {object} props\n * @param {any} props.data\n * @param {any} props.type\n * @param {array} props.pathname\n * @param {object} props.validators\n*/\nfunction validateInterface(props) {\n  var type = props.type,\n      validators = props.validators,\n      pathname = props.pathname;\n\n  var data = (0, _tools.get)(props.data, pathname);\n  var isValid = type === data;\n  if (validators[type]) {\n    return validateInterfaceType(props);\n  }\n  return {\n    type: type,\n    data: data,\n    isValid: isValid,\n    value: isValid,\n    invalid: []\n  };\n}\n\n//# sourceURL=webpack:///./src/validate/validate-interface.js?");

/***/ }),

/***/ "./src/validate/validate-object.js":
/*!*****************************************!*\
  !*** ./src/validate/validate-object.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nexports.validateObject = validateObject;\n\nvar _validateByType = __webpack_require__(/*! ./validate-by-type */ \"./src/validate/validate-by-type.js\");\n\nvar _get = __webpack_require__(/*! @get */ \"./src/get/index.js\");\n\nvar _tools = __webpack_require__(/*! @tools */ \"./src/tools/index.js\");\n\nvar _constants = __webpack_require__(/*! @constants */ \"./src/constants/index.js\");\n\n/**\n * @param {object} props\n * @param {any} props.data\n * @param {any} props.type\n * @param {array} props.pathname\n * @param {object} props.validators\n*/\nfunction validateObject(props) {\n  var type = (0, _get.getTypeInterface)(props);\n\n  var response = {\n    value: {},\n    data: props.data || {},\n    type: props.type,\n    isValid: true,\n    invalid: []\n  };\n\n  var _loop = function _loop() {\n    var pathname = props.pathname.concat(k);\n    var pathString = pathname.join(\".\");\n\n    var temp = (0, _validateByType.validateByType)(_extends({}, props, {\n      type: type[k],\n      pathname: pathname\n    }));\n    response.value[k] = temp.value;\n\n    if (!temp.isValid) {\n      response.isValid = false;\n      if (temp.invalid.length) {\n        Array.prototype.push.apply(response.invalid, temp.invalid.map(function (invalid) {\n          if (invalid.pathname.substring(0, pathString.length) !== pathString) {\n            invalid.pathname = [pathString, invalid.pathname].join(\".\");\n          }\n          return invalid;\n        }));\n      } else {\n        response.invalid.push({\n          pathname: pathString,\n          value: (0, _tools.get)(props.data, pathname),\n          expected: type[k] === _constants.INVALID ? undefined : type[k]\n        });\n      }\n    }\n  };\n\n  for (var k in type) {\n    _loop();\n  }\n\n  return response;\n}\n\n//# sourceURL=webpack:///./src/validate/validate-object.js?");

/***/ })

/******/ })["default"];