/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Worker"] = factory();
	else
		root["Worker"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/test.worker.js":
/*!****************************!*\
  !*** ./src/test.worker.js ***!
  \****************************/
/***/ (() => {

eval("onmessage = function (e) {\n  console.log(\n    \"Worker: Message received from main script: \" + JSON.stringify(e.data)\n  );\n  postMessage(\"Worker response: \" + Math.random());\n};\n\n\n//# sourceURL=webpack://remotereactcomponent/./src/test.worker.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/test.worker.js"]();
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});