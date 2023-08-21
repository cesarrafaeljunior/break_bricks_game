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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Game: () => (/* binding */ Game)\n/* harmony export */ });\n/* harmony import */ var _modules_ball_modules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/ball.modules */ \"./src/modules/ball.modules.ts\");\n/* harmony import */ var _modules_canvas_modules__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/canvas.modules */ \"./src/modules/canvas.modules.ts\");\n/* harmony import */ var _modules_enemies__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/enemies */ \"./src/modules/enemies.ts\");\n/* harmony import */ var _modules_keyboard_modules__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/keyboard.modules */ \"./src/modules/keyboard.modules.ts\");\n/* harmony import */ var _modules_pad_modules__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/pad.modules */ \"./src/modules/pad.modules.ts\");\n/* harmony import */ var _modules_texts_modules__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/texts.modules */ \"./src/modules/texts.modules.ts\");\n\n\n\n\n\n\nclass Game extends _modules_canvas_modules__WEBPACK_IMPORTED_MODULE_1__.Canvas {\n    ctx;\n    paddle;\n    ball;\n    texts;\n    enemy;\n    keyboard = new _modules_keyboard_modules__WEBPACK_IMPORTED_MODULE_3__.Keyboard();\n    static initGame = false;\n    static gameOver = false;\n    static pauseGame = false;\n    static winGame = false;\n    static restartGame = document.querySelector(\"#restart\");\n    static button = document.querySelector(\"#buttonGame\");\n    static score = document.querySelector(\"#score\");\n    static buttonDecreaseEnemies = document.querySelector(\"#decrease\");\n    static buttonAddEnemies = document.querySelector(\"#add\");\n    static buttonPause = document.querySelector(\"#pause\");\n    static buttonResume = document.querySelector(\"#play\");\n    static scoreValue = 0;\n    static lifes = document.querySelector(\"#life\");\n    static lifesValues = 3;\n    static quantityEnemies = document.querySelector(\"#enemies_quantity\");\n    static quantityEnemiesValues = 0;\n    static record = document.querySelector(\"#record\");\n    static recordValues = Game.scoreValue;\n    constructor() {\n        super();\n        this.ctx = this.getContext();\n        this.texts = new _modules_texts_modules__WEBPACK_IMPORTED_MODULE_5__.Texts(this.ctx);\n        this.paddle = new _modules_pad_modules__WEBPACK_IMPORTED_MODULE_4__.Paddle(this.ctx);\n        this.ball = new _modules_ball_modules__WEBPACK_IMPORTED_MODULE_0__.Ball(this.ctx, this.paddle);\n        this.enemy = new _modules_enemies__WEBPACK_IMPORTED_MODULE_2__.Enemies(this.ctx, this.ball);\n        Game.quantityEnemiesValues =\n            this.enemy.quantityColumn * this.enemy.quantityEnemyInRow;\n        Game.lifes.innerText = `${Game.lifesValues}`;\n        Game.quantityEnemies.innerText = `${Game.quantityEnemiesValues}`;\n        Game.score.innerText = `${Game.scoreValue}`;\n        Game.record.innerText = `${Game.recordValues}`;\n        this.initGame();\n    }\n    initGame() {\n        if (!Game.initGame) {\n            Game.button.addEventListener(\"click\", () => {\n                this.ball.directions.x = Math.random() < 0.5 ? 1 : -1;\n                Game.initGame = true;\n                Game.gameOver = false;\n                Game.button.classList.add(\"buttonHidden\");\n                Game.button.setAttribute(\"disabled\", \"true\");\n            });\n        }\n        Game.buttonDecreaseEnemies.addEventListener(\"click\", () => {\n            if (this.enemy.quantityColumn > 1) {\n                this.enemy.decreaseColumnEnemies();\n            }\n        });\n        Game.buttonAddEnemies.addEventListener(\"click\", () => {\n            if (this.enemy.quantityColumn < 16) {\n                this.enemy.addColumnEnemies();\n            }\n        });\n        Game.buttonPause.addEventListener(\"click\", () => {\n            if (Game.initGame) {\n                Game.pauseGame = true;\n            }\n        });\n        Game.buttonResume.addEventListener(\"click\", () => {\n            if (Game.pauseGame) {\n                Game.pauseGame = false;\n                Game.initGame = true;\n            }\n        });\n        Game.restartGame.addEventListener(\"click\", () => {\n            this.restartGame();\n        });\n    }\n    renderBg() {\n        const bg = new Image();\n        bg.src = \"../public/assets/img/bgs/bg_space.png\";\n        this.ctx.drawImage(bg, 0, 0, this.ctx.canvas.width, this.ctx.canvas.height);\n    }\n    renderObjects() {\n        this.paddle.draw();\n        this.ball.draw();\n        this.enemy.populateEnemies();\n        this.keyboard.keyPressEvent();\n        if (this.keyboard.space) {\n            Game.initGame = true;\n            Game.button.classList.add(\"buttonHidden\");\n            Game.button.setAttribute(\"disabled\", \"true\");\n        }\n        if (Game.pauseGame == true) {\n            this.texts.drawText(\"Pausa\");\n            Game.initGame = false;\n        }\n        if (Game.quantityEnemiesValues === 0) {\n            Game.winGame = true;\n        }\n        if (Game.gameOver) {\n            Game.enableButtonStart();\n            this.texts.drawText(\"Você perdeu!\");\n            this.restartGame();\n        }\n        else if (Game.winGame) {\n            Game.enableButtonStart();\n            this.texts.drawText(\"Você venceu!\");\n            this.restartGame();\n        }\n    }\n    static enableButtonStart() {\n        this.button.classList.remove(\"buttonHidden\");\n        this.button.removeAttribute(\"disabled\");\n    }\n    restartGame() {\n        Game.initGame = false;\n        Game.lifesValues = 3;\n        Game.lifes.innerText = `${Game.lifesValues}`;\n        Game.quantityEnemiesValues =\n            this.enemy.quantityEnemyInRow * this.enemy.quantityColumn;\n        Game.quantityEnemies.innerText = `${Game.quantityEnemiesValues}`;\n        this.enemy.restartPositionEnemies();\n        Game.enableButtonStart();\n        this.paddle.positionPaddle();\n        this.ball.positionBall();\n        if (Game.pauseGame) {\n            Game.pauseGame = false;\n        }\n    }\n    addColumnEnemy() { }\n    gameLoop = () => {\n        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);\n        this.renderBg();\n        this.renderObjects();\n        requestAnimationFrame(this.gameLoop);\n    };\n}\nconst game = new Game();\nrequestAnimationFrame(game.gameLoop);\n\n\n//# sourceURL=webpack://game_pong/./src/index.ts?");

/***/ }),

/***/ "./src/modules/ball.modules.ts":
/*!*************************************!*\
  !*** ./src/modules/ball.modules.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Ball: () => (/* binding */ Ball)\n/* harmony export */ });\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! .. */ \"./src/index.ts\");\n/* harmony import */ var _canvas_modules__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./canvas.modules */ \"./src/modules/canvas.modules.ts\");\n\n\nclass Ball extends _canvas_modules__WEBPACK_IMPORTED_MODULE_1__.Canvas {\n    ctx;\n    angles;\n    sizes;\n    positions;\n    directions;\n    speed;\n    paddle;\n    constructor(ctx, paddle) {\n        super();\n        this.ctx = ctx;\n        this.paddle = paddle;\n        this.positions = this.positionBall();\n        this.angles = { ray: 10, initialAngle: 0, finalAngle: 2 * Math.PI };\n        this.sizes = {\n            width: this.widthBall(),\n            height: this.heightBall(),\n        };\n        this.directions = { x: 1, y: 1 };\n        this.speed = 7;\n    }\n    draw() {\n        if (___WEBPACK_IMPORTED_MODULE_0__.Game.initGame) {\n            this.move();\n        }\n        this.ctx.beginPath();\n        this.ctx.arc(this.positions.x, this.positions.y, this.angles.ray, this.angles.initialAngle, this.angles.finalAngle);\n        this.ctx.fillStyle = \"white\";\n        this.ctx.fill();\n        this.ctx.closePath();\n    }\n    move() {\n        this.positions.y -= this.directions.y * this.speed;\n        this.positions.x += this.directions.x * this.speed;\n        this.colisionBall();\n    }\n    colisionBall() {\n        this.colisionWall();\n        this.colisionPaddle();\n    }\n    colisionWall() {\n        if (this.positions.y <= 0 + this.sizes.height) {\n            this.directions.y *= -1;\n        }\n        if (this.positions.x + this.sizes.width >= this.widthCanvas() ||\n            this.positions.x - this.sizes.width <= 0) {\n            this.directions.x *= -1;\n        }\n        if (this.positions.y + this.sizes.height >=\n            this.paddle.positions.y + this.paddle.sizes.height) {\n            if (___WEBPACK_IMPORTED_MODULE_0__.Game.scoreValue > ___WEBPACK_IMPORTED_MODULE_0__.Game.recordValues) {\n                ___WEBPACK_IMPORTED_MODULE_0__.Game.record.innerHTML = `${___WEBPACK_IMPORTED_MODULE_0__.Game.scoreValue}`;\n            }\n            ___WEBPACK_IMPORTED_MODULE_0__.Game.recordValues = ___WEBPACK_IMPORTED_MODULE_0__.Game.scoreValue;\n            ___WEBPACK_IMPORTED_MODULE_0__.Game.scoreValue = 0;\n            ___WEBPACK_IMPORTED_MODULE_0__.Game.score.innerHTML = `${___WEBPACK_IMPORTED_MODULE_0__.Game.scoreValue}`;\n            if (___WEBPACK_IMPORTED_MODULE_0__.Game.lifesValues == 0) {\n                ___WEBPACK_IMPORTED_MODULE_0__.Game.initGame = false;\n                ___WEBPACK_IMPORTED_MODULE_0__.Game.gameOver = true;\n                this.paddle.positionPaddle();\n            }\n            else {\n                ___WEBPACK_IMPORTED_MODULE_0__.Game.lifesValues--;\n                ___WEBPACK_IMPORTED_MODULE_0__.Game.lifes.innerHTML = `${___WEBPACK_IMPORTED_MODULE_0__.Game.lifesValues}`;\n                ___WEBPACK_IMPORTED_MODULE_0__.Game.initGame = false;\n                ___WEBPACK_IMPORTED_MODULE_0__.Game.enableButtonStart();\n            }\n            this.positionBall();\n        }\n    }\n    colisionPaddle() {\n        if (this.positions.x + this.sizes.width >= this.paddle.positions.x &&\n            this.positions.x - this.sizes.width <=\n                this.paddle.positions.x + this.paddle.sizes.width &&\n            this.positions.y + this.sizes.height >= this.paddle.positions.y) {\n            const paddleCenter = this.paddle.positions.x + this.paddle.sizes.width / 2;\n            const paddleSemiTipLeft = this.paddle.positions.x + this.paddle.sizes.width / 5;\n            if (this.positions.x + this.sizes.width < paddleSemiTipLeft &&\n                this.positions.x + this.sizes.width >= this.paddle.positions.x) {\n                this.directions.x = -2;\n                this.speed = 6.5;\n            }\n            else if (this.positions.x + this.sizes.width > paddleSemiTipLeft &&\n                this.positions.x + this.sizes.width < paddleCenter) {\n                this.directions.x = -1;\n                this.speed = 7;\n            }\n            else if (this.positions.x + this.sizes.width >= paddleCenter &&\n                this.positions.x < paddleCenter + paddleSemiTipLeft) {\n                this.directions.x = -0.5;\n                this.speed = 7.5;\n            }\n            if (this.positions.x > paddleCenter &&\n                this.positions.x <= paddleCenter + 30) {\n                this.directions.x = 0.5;\n                this.speed = 8;\n            }\n            else if (this.positions.x > paddleCenter &&\n                this.positions.x > paddleCenter + 30 &&\n                this.positions.x <\n                    this.paddle.positions.x + this.paddle.sizes.width - 10) {\n                this.directions.x = 1;\n                this.speed = 7;\n            }\n            else if (this.positions.x > paddleCenter + 30 &&\n                this.positions.x <= this.paddle.positions.x + this.paddle.sizes.width) {\n                this.directions.x = 2;\n                this.speed = 6;\n            }\n            this.directions.y *= -1;\n        }\n    }\n    positionBall() {\n        return (this.positions = {\n            x: this.paddle.positions.x + this.paddle.sizes.width / 2,\n            y: this.heightCanvas() - 30,\n        });\n    }\n    widthBall() {\n        return this.angles.ray;\n    }\n    heightBall() {\n        return this.angles.ray;\n    }\n    topBall() {\n        return this.positions.y;\n    }\n    bottomBall() {\n        return this.positions.y + this.sizes.height;\n    }\n    leftBall() {\n        return this.positions.x;\n    }\n    rightBall() {\n        return this.positions.x + this.sizes.width;\n    }\n}\n\n\n//# sourceURL=webpack://game_pong/./src/modules/ball.modules.ts?");

/***/ }),

/***/ "./src/modules/canvas.modules.ts":
/*!***************************************!*\
  !*** ./src/modules/canvas.modules.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Canvas: () => (/* binding */ Canvas)\n/* harmony export */ });\nclass Canvas {\n    canvasTag;\n    constructor() {\n        this.canvasTag = document.getElementById(\"canvas\");\n        this.resizeCanvas();\n    }\n    getContext() {\n        return this.canvasTag.getContext(\"2d\");\n    }\n    widthCanvas() {\n        return this.canvasTag.width;\n    }\n    heightCanvas() {\n        return this.canvasTag.height;\n    }\n    resizeCanvas() {\n        if (window.innerWidth > 400) {\n            this.canvasTag.width = 1000;\n        }\n        else {\n            this.canvasTag.width = window.innerWidth;\n        }\n        if (window.innerHeight > 600) {\n            this.canvasTag.height = 800;\n        }\n        else {\n            this.canvasTag.height = window.innerHeight;\n        }\n    }\n}\n\n\n//# sourceURL=webpack://game_pong/./src/modules/canvas.modules.ts?");

/***/ }),

/***/ "./src/modules/enemies.ts":
/*!********************************!*\
  !*** ./src/modules/enemies.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Enemies: () => (/* binding */ Enemies),\n/* harmony export */   enemies: () => (/* binding */ enemies)\n/* harmony export */ });\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! .. */ \"./src/index.ts\");\n/* harmony import */ var _canvas_modules__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./canvas.modules */ \"./src/modules/canvas.modules.ts\");\n\n\nconst enemies = [];\nclass Enemies extends _canvas_modules__WEBPACK_IMPORTED_MODULE_1__.Canvas {\n    ctx;\n    ball;\n    sizes;\n    positions;\n    spaceX;\n    spaceY;\n    quantityEnemyInRow;\n    quantityColumn;\n    currentRow;\n    currentColumn;\n    constructor(ctx, ball) {\n        super();\n        this.ctx = ctx;\n        this.ball = ball;\n        this.sizes = { width: 15, height: 15 };\n        this.positions = { x: 0, y: 0 };\n        this.spaceX = 50;\n        this.spaceY = 40;\n        this.quantityEnemyInRow = 20;\n        this.quantityColumn = 5;\n        this.currentRow = 0;\n        this.currentColumn = 0;\n    }\n    populateEnemies() {\n        if (enemies.length < this.quantityColumn) {\n            for (let col = 0; col < this.quantityColumn; col++) {\n                const columnEnemies = [];\n                for (let row = 0; row < this.quantityEnemyInRow; row++) {\n                    columnEnemies.push(\"*\");\n                }\n                enemies.push(columnEnemies);\n            }\n        }\n        this.percorrerArray();\n    }\n    percorrerArray() {\n        enemies.forEach((row, index) => {\n            row.forEach((enemy, j) => {\n                if (enemy === \"*\") {\n                    this.draw(15 + j * this.spaceX, 30 + index * this.spaceY, j, index);\n                }\n            });\n        });\n    }\n    draw(positionX, positionY, j, index) {\n        this.positions.x = positionX;\n        this.positions.y = positionY;\n        this.ctx.fillStyle = \"green\";\n        this.ctx.fillRect(positionX, positionY, this.sizes.width, this.sizes.height);\n        this.ctx.strokeStyle = \"black\";\n        this.ctx.strokeRect(positionX, positionY, this.sizes.width, this.sizes.height);\n        this.colisionWhitBall(j, index);\n    }\n    colisionWhitBall(j, index) {\n        const horizontalOverlap = this.ball.leftBall() < this.rightEnemy() &&\n            this.ball.rightBall() > this.leftEnemy();\n        const verticalOverlap = this.ball.topBall() < this.bottomEnemy() &&\n            this.ball.bottomBall() > this.topEnemy();\n        if (horizontalOverlap && verticalOverlap) {\n            let row = enemies[index];\n            row[j] = \"_\";\n            ___WEBPACK_IMPORTED_MODULE_0__.Game.scoreValue += 1;\n            ___WEBPACK_IMPORTED_MODULE_0__.Game.score.innerText = `${___WEBPACK_IMPORTED_MODULE_0__.Game.scoreValue}`;\n            ___WEBPACK_IMPORTED_MODULE_0__.Game.quantityEnemiesValues--;\n            ___WEBPACK_IMPORTED_MODULE_0__.Game.quantityEnemies.innerText = `${___WEBPACK_IMPORTED_MODULE_0__.Game.quantityEnemiesValues}`;\n            if (this.ball.topBall() <= this.bottomEnemy() &&\n                this.ball.bottomBall() > this.bottomEnemy()) {\n                this.ball.directions.y *= -1;\n            }\n            else if (this.ball.bottomBall() >= this.topEnemy() &&\n                this.ball.topBall() < this.topEnemy()) {\n                this.ball.directions.y *= -1;\n            }\n            else if (this.ball.rightBall() >= this.leftEnemy() &&\n                this.ball.leftBall() < this.leftEnemy()) {\n                this.ball.directions.x *= -1;\n            }\n            else if (this.ball.leftBall() <= this.rightEnemy() &&\n                this.ball.rightBall() > this.rightEnemy()) {\n                this.ball.directions.x *= -1;\n            }\n        }\n    }\n    restartPositionEnemies() {\n        for (let i = 0; i < enemies.length; i++) {\n            for (let j = 0; j < enemies[i].length; j++) {\n                enemies[i][j] = \"*\";\n            }\n        }\n    }\n    addColumnEnemies() {\n        let newColumn = [];\n        for (let row = 0; row < this.quantityEnemyInRow; row++) {\n            newColumn[row] = \"*\";\n        }\n        enemies.push(newColumn);\n        this.quantityColumn++;\n        ___WEBPACK_IMPORTED_MODULE_0__.Game.quantityEnemiesValues += this.quantityEnemyInRow;\n        ___WEBPACK_IMPORTED_MODULE_0__.Game.quantityEnemies.innerText = `${___WEBPACK_IMPORTED_MODULE_0__.Game.quantityEnemiesValues}`;\n    }\n    decreaseColumnEnemies() {\n        enemies.pop();\n        this.quantityColumn--;\n        ___WEBPACK_IMPORTED_MODULE_0__.Game.quantityEnemiesValues -= this.quantityEnemyInRow;\n        ___WEBPACK_IMPORTED_MODULE_0__.Game.quantityEnemies.innerText = `${___WEBPACK_IMPORTED_MODULE_0__.Game.quantityEnemiesValues}`;\n    }\n    widthEnemy() {\n        return this.sizes.width;\n    }\n    heightEnemy() {\n        return this.sizes.height;\n    }\n    topEnemy() {\n        return this.positions.y;\n    }\n    bottomEnemy() {\n        return this.positions.y + this.sizes.height;\n    }\n    leftEnemy() {\n        return this.positions.x;\n    }\n    rightEnemy() {\n        return this.positions.x + this.sizes.width;\n    }\n}\n\n\n//# sourceURL=webpack://game_pong/./src/modules/enemies.ts?");

/***/ }),

/***/ "./src/modules/keyboard.modules.ts":
/*!*****************************************!*\
  !*** ./src/modules/keyboard.modules.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Keyboard: () => (/* binding */ Keyboard)\n/* harmony export */ });\nclass Keyboard {\n    up = false;\n    down = false;\n    right = false;\n    left = false;\n    space = false;\n    keyPressEvent() {\n        window.addEventListener(\"keydown\", (e) => {\n            if (e.key == \"ArrowLeft\") {\n                this.left = true;\n            }\n            else if (e.key == \"ArrowRight\") {\n                this.right = true;\n            }\n            if (e.key === \" \") {\n                this.space = true;\n            }\n        });\n        window.addEventListener(\"keyup\", (e) => {\n            if (e.key == \"ArrowLeft\") {\n                this.left = false;\n            }\n            else if (e.key == \"ArrowRight\") {\n                this.right = false;\n            }\n            if (e.key === \" \") {\n                this.space = false;\n            }\n        });\n    }\n}\n\n\n//# sourceURL=webpack://game_pong/./src/modules/keyboard.modules.ts?");

/***/ }),

/***/ "./src/modules/pad.modules.ts":
/*!************************************!*\
  !*** ./src/modules/pad.modules.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Paddle: () => (/* binding */ Paddle)\n/* harmony export */ });\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! .. */ \"./src/index.ts\");\n/* harmony import */ var _canvas_modules__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./canvas.modules */ \"./src/modules/canvas.modules.ts\");\n/* harmony import */ var _keyboard_modules__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./keyboard.modules */ \"./src/modules/keyboard.modules.ts\");\n\n\n\nclass Paddle extends _canvas_modules__WEBPACK_IMPORTED_MODULE_1__.Canvas {\n    ctx;\n    sizes;\n    positions;\n    speed;\n    keyboard = new _keyboard_modules__WEBPACK_IMPORTED_MODULE_2__.Keyboard();\n    constructor(ctx) {\n        super();\n        this.ctx = ctx;\n        this.sizes = { width: 100, height: 10 };\n        this.positions = this.positionPaddle();\n        this.speed = 10;\n    }\n    draw() {\n        this.movePaddle();\n        this.ctx.fillStyle = \"white\";\n        this.ctx.fillRect(this.positions.x, this.positions.y, this.sizes.width, this.sizes.height);\n    }\n    movePaddle() {\n        this.keyboard.keyPressEvent();\n        this.colisionPaddle();\n        if (this.keyboard.right) {\n            if (___WEBPACK_IMPORTED_MODULE_0__.Game.initGame) {\n                this.positions.x += this.speed;\n            }\n        }\n        if (this.keyboard.left) {\n            if (___WEBPACK_IMPORTED_MODULE_0__.Game.initGame) {\n                this.positions.x -= this.speed;\n            }\n        }\n    }\n    positionPaddle() {\n        return (this.positions = {\n            x: this.widthCanvas() / 2 - this.sizes.width / 2,\n            y: this.heightCanvas() - 20,\n        });\n    }\n    colisionPaddle() {\n        if (this.positions.x + 100 >= this.widthCanvas()) {\n            this.keyboard.right = false;\n        }\n        if (this.positions.x <= 0) {\n            this.keyboard.left = false;\n        }\n    }\n}\n\n\n//# sourceURL=webpack://game_pong/./src/modules/pad.modules.ts?");

/***/ }),

/***/ "./src/modules/texts.modules.ts":
/*!**************************************!*\
  !*** ./src/modules/texts.modules.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Texts: () => (/* binding */ Texts)\n/* harmony export */ });\n/* harmony import */ var _canvas_modules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./canvas.modules */ \"./src/modules/canvas.modules.ts\");\n\nclass Texts extends _canvas_modules__WEBPACK_IMPORTED_MODULE_0__.Canvas {\n    ctx;\n    constructor(ctx) {\n        super();\n        this.ctx = ctx;\n    }\n    drawText(text) {\n        this.ctx.shadowColor = \"rgba(0,0,255,1)\";\n        (this.ctx.shadowOffsetX = 8), (this.ctx.shadowOffsetY = 8);\n        this.ctx.shadowBlur = 15;\n        this.ctx.font = \"8rem Inter\";\n        this.ctx.fillStyle = \"white\";\n        this.ctx.fillText(text, this.widthCanvas() / 2, this.heightCanvas() / 2);\n        this.ctx.textAlign = \"center\";\n        this.ctx.shadowColor = \"rgba(0,0,255,0)\";\n        (this.ctx.shadowOffsetX = 8), (this.ctx.shadowOffsetY = 8);\n        this.ctx.shadowBlur = 15;\n    }\n}\n\n\n//# sourceURL=webpack://game_pong/./src/modules/texts.modules.ts?");

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