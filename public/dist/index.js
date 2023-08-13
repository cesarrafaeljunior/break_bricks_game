/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_ball_modules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/ball.modules */ \"./src/modules/ball.modules.ts\");\n/* harmony import */ var _modules_canvas_modules__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/canvas.modules */ \"./src/modules/canvas.modules.ts\");\n/* harmony import */ var _modules_pad_modules__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/pad.modules */ \"./src/modules/pad.modules.ts\");\n\n\n\nclass Game extends _modules_canvas_modules__WEBPACK_IMPORTED_MODULE_1__.Canvas {\n    canvas = new _modules_canvas_modules__WEBPACK_IMPORTED_MODULE_1__.Canvas();\n    paddle = new _modules_pad_modules__WEBPACK_IMPORTED_MODULE_2__.Paddle(this.canvas.ctx);\n    ball = new _modules_ball_modules__WEBPACK_IMPORTED_MODULE_0__.Ball(this.canvas.ctx);\n    static initGame = false;\n    constructor() {\n        super();\n        this.windowSize();\n    }\n    windowSize() {\n        if (window.innerWidth > 400) {\n            this.canvas.widthCanvas = 800;\n        }\n        else {\n            this.canvas.widthCanvas = window.innerWidth;\n        }\n        if (window.innerHeight > 400) {\n            this.canvas.heigthCanvas = 600;\n        }\n        else {\n            this.canvas.heigthCanvas = window.innerHeight;\n        }\n    }\n    renderBg() {\n        const bg = new Image();\n        bg.src = \"../public/assets/img/bgs/bg_space.png\";\n        this.ctx.drawImage(bg, 0, 0, this.ctx.canvas.width, this.ctx.canvas.height);\n    }\n    renderObjects() {\n        this.paddle.draw();\n        this.ball.draw();\n    }\n    gameLoop = () => {\n        this.ctx.clearRect(0, 0, this.canvas.widthCanvas, this.canvas.heigthCanvas);\n        this.renderBg();\n        this.renderObjects();\n        requestAnimationFrame(this.gameLoop);\n    };\n}\nconst game = new Game();\nrequestAnimationFrame(game.gameLoop);\n\n\n//# sourceURL=webpack://game_pong/./src/index.ts?");

/***/ }),

/***/ "./src/modules/ball.modules.ts":
/*!*************************************!*\
  !*** ./src/modules/ball.modules.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Ball: () => (/* binding */ Ball)\n/* harmony export */ });\n/* harmony import */ var _pad_modules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pad.modules */ \"./src/modules/pad.modules.ts\");\n\nclass Ball {\n    ctx;\n    positionBallX = 0;\n    positionBallY = 0;\n    speed = 5;\n    directionX = Math.random() * 10 > 5 ? -1 : 1;\n    directionY = 1;\n    constructor(ctx) {\n        this.ctx = ctx;\n        this.positionBallX = this.ctx.canvas.width / 2;\n        this.positionBallY = this.ctx.canvas.height - 60;\n    }\n    draw() {\n        if (_pad_modules__WEBPACK_IMPORTED_MODULE_0__.Paddle.initGame) {\n            this.move();\n        }\n        this.ctx.beginPath();\n        this.ctx.arc(this.positionBallX, this.positionBallY, 10, 0, 2 * Math.PI);\n        this.ctx.fillStyle = \"white\";\n        this.ctx.fill();\n    }\n    move() {\n        this.positionBallY -= this.directionY * this.speed;\n        this.positionBallX += this.directionX * this.speed;\n        this.colisionBall();\n    }\n    colisionBall() {\n        if (this.positionBallY <= 0) {\n            this.directionY = -1;\n        }\n        if (this.positionBallX >= this.ctx.canvas.width ||\n            this.positionBallX <= 0) {\n            this.directionX *= -1;\n        }\n        if (this.positionBallX >= _pad_modules__WEBPACK_IMPORTED_MODULE_0__.Paddle.positionX && // Verifica colisão à direita do paddle\n            this.positionBallX <= _pad_modules__WEBPACK_IMPORTED_MODULE_0__.Paddle.positionX + _pad_modules__WEBPACK_IMPORTED_MODULE_0__.Paddle.widthPaddle && // Verifica colisão à esquerda do paddle\n            this.positionBallY >= _pad_modules__WEBPACK_IMPORTED_MODULE_0__.Paddle.positionY) {\n            this.directionY *= -1;\n        }\n    }\n}\n\n\n//# sourceURL=webpack://game_pong/./src/modules/ball.modules.ts?");

/***/ }),

/***/ "./src/modules/canvas.modules.ts":
/*!***************************************!*\
  !*** ./src/modules/canvas.modules.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Canvas: () => (/* binding */ Canvas)\n/* harmony export */ });\nclass Canvas {\n    static canvas;\n    ctx;\n    widthCanvas;\n    heigthCanvas;\n    constructor() {\n        Canvas.canvas = document.getElementById(\"canvas\");\n        this.ctx = Canvas.canvas.getContext(\"2d\");\n        this.widthCanvas = window.innerWidth;\n        this.heigthCanvas = window.innerHeight;\n        this.ctx.canvas.width = this.widthCanvas;\n        this.ctx.canvas.height = this.heigthCanvas;\n    }\n}\n\n\n//# sourceURL=webpack://game_pong/./src/modules/canvas.modules.ts?");

/***/ }),

/***/ "./src/modules/keyboard.modules.ts":
/*!*****************************************!*\
  !*** ./src/modules/keyboard.modules.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Keyboard: () => (/* binding */ Keyboard)\n/* harmony export */ });\nclass Keyboard {\n    up = false;\n    down = false;\n    right = false;\n    left = false;\n    keyPressEvent() {\n        window.addEventListener(\"keydown\", (e) => {\n            if (e.key == \"ArrowLeft\") {\n                this.left = true;\n            }\n            else if (e.key == \"ArrowRight\") {\n                this.right = true;\n            }\n        });\n        window.addEventListener(\"keyup\", (e) => {\n            if (e.key == \"ArrowLeft\") {\n                this.left = false;\n            }\n            else if (e.key == \"ArrowRight\") {\n                this.right = false;\n            }\n        });\n    }\n}\n\n\n//# sourceURL=webpack://game_pong/./src/modules/keyboard.modules.ts?");

/***/ }),

/***/ "./src/modules/pad.modules.ts":
/*!************************************!*\
  !*** ./src/modules/pad.modules.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Paddle: () => (/* binding */ Paddle)\n/* harmony export */ });\n/* harmony import */ var _canvas_modules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./canvas.modules */ \"./src/modules/canvas.modules.ts\");\n/* harmony import */ var _keyboard_modules__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./keyboard.modules */ \"./src/modules/keyboard.modules.ts\");\n\n\nclass Paddle extends _canvas_modules__WEBPACK_IMPORTED_MODULE_0__.Canvas {\n    ctx;\n    static widthPaddle = 100;\n    static heightPaddle = 15;\n    static positionX = 0;\n    static positionY = 0;\n    speed = 20;\n    static initGame = false;\n    keyboard = new _keyboard_modules__WEBPACK_IMPORTED_MODULE_1__.Keyboard();\n    canvas = new _canvas_modules__WEBPACK_IMPORTED_MODULE_0__.Canvas();\n    constructor(ctx) {\n        super();\n        this.ctx = ctx;\n        Paddle.positionX = this.canvas.widthCanvas / 2;\n        Paddle.positionY = this.canvas.heigthCanvas - 50;\n    }\n    draw() {\n        this.movePaddle();\n        this.ctx.fillStyle = \"black\";\n        this.ctx.fillRect(Paddle.positionX, Paddle.positionY, Paddle.widthPaddle, Paddle.heightPaddle);\n    }\n    movePaddle() {\n        this.keyboard.keyPressEvent();\n        this.colisionPaddle();\n        if (this.keyboard.right) {\n            if (!Paddle.initGame) {\n                Paddle.initGame = true;\n            }\n            Paddle.positionX += this.speed;\n        }\n        if (this.keyboard.left) {\n            if (!Paddle.initGame) {\n                Paddle.initGame = true;\n            }\n            Paddle.positionX -= this.speed;\n        }\n    }\n    colisionPaddle() {\n        if (Paddle.positionX + 100 >= this.ctx.canvas.width) {\n            this.keyboard.right = false;\n        }\n        if (Paddle.positionX <= 0) {\n            this.keyboard.left = false;\n        }\n    }\n}\n\n\n//# sourceURL=webpack://game_pong/./src/modules/pad.modules.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;