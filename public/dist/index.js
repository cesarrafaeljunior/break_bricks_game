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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Game: () => (/* binding */ Game)\n/* harmony export */ });\n/* harmony import */ var _modules_ball_modules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/ball.modules */ \"./src/modules/ball.modules.ts\");\n/* harmony import */ var _modules_canvas_modules__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/canvas.modules */ \"./src/modules/canvas.modules.ts\");\n/* harmony import */ var _modules_enemies__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/enemies */ \"./src/modules/enemies.ts\");\n/* harmony import */ var _modules_pad_modules__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/pad.modules */ \"./src/modules/pad.modules.ts\");\n/* harmony import */ var _modules_texts_modules__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/texts.modules */ \"./src/modules/texts.modules.ts\");\n\n\n\n\n\nconst enemies = [];\nclass Game extends _modules_canvas_modules__WEBPACK_IMPORTED_MODULE_1__.Canvas {\n    ctx;\n    paddle;\n    ball;\n    texts;\n    enemy;\n    static initGame = false;\n    static gameOver = false;\n    button = document.querySelector(\"#buttonGame\");\n    constructor() {\n        super();\n        this.ctx = this.getContext();\n        this.texts = new _modules_texts_modules__WEBPACK_IMPORTED_MODULE_4__.Texts(this.ctx);\n        this.paddle = new _modules_pad_modules__WEBPACK_IMPORTED_MODULE_3__.Paddle(this.ctx);\n        this.enemy = this.enemiesContage();\n        this.ball = new _modules_ball_modules__WEBPACK_IMPORTED_MODULE_0__.Ball(this.ctx, this.paddle);\n        this.initGame();\n    }\n    initGame() {\n        if (this.button) {\n            if (!Game.initGame) {\n                this.button.addEventListener(\"click\", () => {\n                    this.ball.directions.x = Math.random() < 0.5 ? 1 : -1;\n                    Game.initGame = true;\n                    Game.gameOver = false;\n                    this.button.classList.add(\"buttonHidden\");\n                    this.button.setAttribute(\"disabled\", \"true\");\n                });\n            }\n        }\n    }\n    renderBg() {\n        const bg = new Image();\n        bg.src = \"../public/assets/img/bgs/bg_space.png\";\n        this.ctx.drawImage(bg, 0, 0, this.ctx.canvas.width, this.ctx.canvas.height);\n    }\n    renderObjects() {\n        this.paddle.draw();\n        this.ball.draw();\n        enemies.forEach((enemy) => {\n            enemy.draw();\n        });\n        if (Game.gameOver) {\n            this.button.classList.remove(\"buttonHidden\");\n            this.button.removeAttribute(\"disabled\");\n            this.texts.drawText();\n        }\n    }\n    enemiesContage() {\n        for (let i = 0; i < 20; i++) {\n            enemies.push(new _modules_enemies__WEBPACK_IMPORTED_MODULE_2__.Enemies(50 * i, 30, this.ctx));\n        }\n    }\n    gameLoop = () => {\n        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);\n        this.renderBg();\n        this.renderObjects();\n        requestAnimationFrame(this.gameLoop);\n    };\n}\nconst game = new Game();\nrequestAnimationFrame(game.gameLoop);\n\n\n//# sourceURL=webpack://game_pong/./src/index.ts?");

/***/ }),

/***/ "./src/modules/ball.modules.ts":
/*!*************************************!*\
  !*** ./src/modules/ball.modules.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Ball: () => (/* binding */ Ball)\n/* harmony export */ });\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! .. */ \"./src/index.ts\");\n/* harmony import */ var _canvas_modules__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./canvas.modules */ \"./src/modules/canvas.modules.ts\");\n\n\nclass Ball extends _canvas_modules__WEBPACK_IMPORTED_MODULE_1__.Canvas {\n    ctx;\n    angles;\n    sizes;\n    positions;\n    directions;\n    speed;\n    paddle;\n    constructor(ctx, paddle) {\n        super();\n        this.ctx = ctx;\n        this.paddle = paddle;\n        this.positions = this.positionBall();\n        this.angles = { ray: 10, initialAngle: 0, finalAngle: 2 * Math.PI };\n        this.sizes = {\n            width: this.widthBall(),\n            height: this.heightBall(),\n        };\n        this.directions = { x: 1, y: 1 };\n        this.speed = 5;\n    }\n    draw() {\n        if (___WEBPACK_IMPORTED_MODULE_0__.Game.initGame) {\n            this.move();\n        }\n        this.ctx.beginPath();\n        this.ctx.arc(this.positions.x, this.positions.y, this.angles.ray, this.angles.initialAngle, this.angles.finalAngle);\n        this.ctx.fillStyle = \"white\";\n        this.ctx.fill();\n    }\n    move() {\n        this.positions.y -= this.directions.y * this.speed;\n        this.positions.x += this.directions.x * this.speed;\n        this.colisionBall();\n    }\n    colisionBall() {\n        this.colisionWall();\n        this.colisionPaddle();\n    }\n    colisionWall() {\n        if (this.positions.y <= 0 + this.sizes.height) {\n            this.directions.y *= -1;\n        }\n        if (this.positions.x + this.sizes.width >= this.widthCanvas() ||\n            this.positions.x - this.sizes.width <= 0) {\n            this.directions.x *= -1;\n        }\n        if (this.positions.y + this.sizes.height >=\n            this.paddle.positions.y + this.paddle.sizes.height) {\n            ___WEBPACK_IMPORTED_MODULE_0__.Game.initGame = false;\n            ___WEBPACK_IMPORTED_MODULE_0__.Game.gameOver = true;\n            this.paddle.positionPaddle();\n            this.positionBall();\n        }\n    }\n    colisionPaddle() {\n        if (this.positions.x + this.sizes.width >= this.paddle.positions.x &&\n            this.positions.x + this.sizes.width <=\n                this.paddle.positions.x + this.paddle.sizes.width &&\n            this.positions.y + this.sizes.height >= this.paddle.positions.y) {\n            let paddleCenter = this.paddle.positions.x + this.paddle.sizes.width / 2;\n            if (this.positions.x < paddleCenter) {\n                this.directions.x = -1;\n            }\n            if (this.positions.x == paddleCenter) {\n                this.directions.x = 0;\n            }\n            if (this.positions.x > paddleCenter) {\n                this.directions.x = 1;\n            }\n            this.directions.y *= -1;\n        }\n    }\n    positionBall() {\n        return (this.positions = {\n            x: this.paddle.positions.x + this.paddle.sizes.width / 2,\n            y: this.heightCanvas() - 20,\n        });\n    }\n    widthBall() {\n        return this.angles.ray;\n    }\n    heightBall() {\n        return this.angles.ray;\n    }\n}\n\n\n//# sourceURL=webpack://game_pong/./src/modules/ball.modules.ts?");

/***/ }),

/***/ "./src/modules/canvas.modules.ts":
/*!***************************************!*\
  !*** ./src/modules/canvas.modules.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Canvas: () => (/* binding */ Canvas)\n/* harmony export */ });\nclass Canvas {\n    canvasTag;\n    constructor() {\n        this.canvasTag = document.getElementById(\"canvas\");\n        this.resizeCanvas();\n    }\n    getContext() {\n        return this.canvasTag.getContext(\"2d\");\n    }\n    widthCanvas() {\n        return this.canvasTag.width;\n    }\n    heightCanvas() {\n        return this.canvasTag.height;\n    }\n    resizeCanvas() {\n        if (window.innerWidth > 400) {\n            this.canvasTag.width = 800;\n        }\n        else {\n            this.canvasTag.width = window.innerWidth;\n        }\n        if (window.innerHeight > 600) {\n            this.canvasTag.height = 600;\n        }\n        else {\n            this.canvasTag.height = window.innerHeight;\n        }\n    }\n}\n\n\n//# sourceURL=webpack://game_pong/./src/modules/canvas.modules.ts?");

/***/ }),

/***/ "./src/modules/enemies.ts":
/*!********************************!*\
  !*** ./src/modules/enemies.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Enemies: () => (/* binding */ Enemies)\n/* harmony export */ });\n/* harmony import */ var _canvas_modules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./canvas.modules */ \"./src/modules/canvas.modules.ts\");\n\nclass Enemies extends _canvas_modules__WEBPACK_IMPORTED_MODULE_0__.Canvas {\n    positions;\n    sizes;\n    ctx;\n    constructor(positionX, positonY, ctx) {\n        super();\n        this.positions = { x: positionX, y: positonY };\n        this.sizes = { width: 15, height: 15 };\n        this.ctx = ctx;\n        this.draw();\n    }\n    draw() {\n        this.ctx.fillStyle = \"white\";\n        this.ctx.fillRect(this.positions.x, this.positions.y, this.sizes.width, this.sizes.height);\n    }\n}\n\n\n//# sourceURL=webpack://game_pong/./src/modules/enemies.ts?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Paddle: () => (/* binding */ Paddle)\n/* harmony export */ });\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! .. */ \"./src/index.ts\");\n/* harmony import */ var _canvas_modules__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./canvas.modules */ \"./src/modules/canvas.modules.ts\");\n/* harmony import */ var _keyboard_modules__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./keyboard.modules */ \"./src/modules/keyboard.modules.ts\");\n\n\n\nclass Paddle extends _canvas_modules__WEBPACK_IMPORTED_MODULE_1__.Canvas {\n    ctx;\n    sizes;\n    positions;\n    speed;\n    keyboard = new _keyboard_modules__WEBPACK_IMPORTED_MODULE_2__.Keyboard();\n    constructor(ctx) {\n        super();\n        this.ctx = ctx;\n        this.positions = this.positionPaddle();\n        this.sizes = { width: 100, height: 10 };\n        this.speed = 20;\n    }\n    draw() {\n        this.movePaddle();\n        this.ctx.fillStyle = \"white\";\n        this.ctx.fillRect(this.positions.x, this.positions.y, this.sizes.width, this.sizes.height);\n    }\n    movePaddle() {\n        this.keyboard.keyPressEvent();\n        this.colisionPaddle();\n        if (this.keyboard.right) {\n            if (___WEBPACK_IMPORTED_MODULE_0__.Game.initGame) {\n                this.positions.x += this.speed;\n            }\n        }\n        if (this.keyboard.left) {\n            if (___WEBPACK_IMPORTED_MODULE_0__.Game.initGame) {\n                this.positions.x -= this.speed;\n            }\n        }\n    }\n    positionPaddle() {\n        return (this.positions = {\n            x: this.widthCanvas() / 2,\n            y: this.heightCanvas() - 10,\n        });\n    }\n    colisionPaddle() {\n        if (this.positions.x + 100 >= this.widthCanvas()) {\n            this.keyboard.right = false;\n        }\n        if (this.positions.x <= 0) {\n            this.keyboard.left = false;\n        }\n    }\n}\n\n\n//# sourceURL=webpack://game_pong/./src/modules/pad.modules.ts?");

/***/ }),

/***/ "./src/modules/texts.modules.ts":
/*!**************************************!*\
  !*** ./src/modules/texts.modules.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Texts: () => (/* binding */ Texts)\n/* harmony export */ });\n/* harmony import */ var _canvas_modules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./canvas.modules */ \"./src/modules/canvas.modules.ts\");\n\nclass Texts extends _canvas_modules__WEBPACK_IMPORTED_MODULE_0__.Canvas {\n    ctx;\n    constructor(ctx) {\n        super();\n        this.ctx = ctx;\n    }\n    drawText() {\n        this.ctx.shadowColor = \"rgba(0,0,255,1)\";\n        (this.ctx.shadowOffsetX = 8), (this.ctx.shadowOffsetY = 8);\n        this.ctx.shadowBlur = 15;\n        this.ctx.font = \"8rem Inter\";\n        this.ctx.fillStyle = \"white\";\n        this.ctx.fillText(\"Game Over\", this.widthCanvas() / 2, this.heightCanvas() / 2);\n        this.ctx.textAlign = \"center\";\n        this.ctx.shadowColor = \"rgba(0,0,255,0)\";\n        (this.ctx.shadowOffsetX = 8), (this.ctx.shadowOffsetY = 8);\n        this.ctx.shadowBlur = 15;\n    }\n}\n\n\n//# sourceURL=webpack://game_pong/./src/modules/texts.modules.ts?");

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
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;