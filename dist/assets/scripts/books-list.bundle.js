(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["books-list"],{

/***/ "./src/web/components/banner/banner.js":
/*!*********************************************!*\
  !*** ./src/web/components/banner/banner.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ \"jquery\");\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);\n// import './banner.css';\n\nvar banner = {\n  init: function init() {\n    console.log(\"banner 🐯\");\n    console.log(jquery__WEBPACK_IMPORTED_MODULE_0___default.a);\n  }\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (banner);\n\n//# sourceURL=webpack:///./src/web/components/banner/banner.js?");

/***/ }),

/***/ "./src/web/components/list/list.js":
/*!*****************************************!*\
  !*** ./src/web/components/list/list.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ \"jquery\");\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);\n\nvar list = {\n  init: function init() {\n    console.log('list组件初始化完成');\n    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#h4-btn').click(function () {\n      console.log('SPA+MPA混用架构');\n    });\n  }\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (list);\n\n//# sourceURL=webpack:///./src/web/components/list/list.js?");

/***/ }),

/***/ "./src/web/views/books/books-list.entry.js":
/*!*************************************************!*\
  !*** ./src/web/views/books/books-list.entry.js ***!
  \*************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_banner_banner_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/components/banner/banner.js */ \"./src/web/components/banner/banner.js\");\n/* harmony import */ var _components_list_list_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/components/list/list.js */ \"./src/web/components/list/list.js\");\n//分析 poages js+css\n// /books/list -> view -> components -> 静态资源webpack\n\n\n_components_banner_banner_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].init();\n_components_list_list_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].init();\n\n//# sourceURL=webpack:///./src/web/views/books/books-list.entry.js?");

/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = jQuery;\n\n//# sourceURL=webpack:///external_%22jQuery%22?");

/***/ })

},[["./src/web/views/books/books-list.entry.js","runtime"]]]);