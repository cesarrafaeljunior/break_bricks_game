import { Ball } from "./modules/ball.modules";
import { Canvas } from "./modules/canvas.modules";
import { Enemies, enemies } from "./modules/enemies";
import { Keyboard } from "./modules/keyboard.modules";
import { Paddle } from "./modules/pad.modules";
import { Texts } from "./modules/texts.modules";

export class Game extends Canvas {
  ctx: CanvasRenderingContext2D;
  paddle: Paddle;
  ball: Ball;
  texts: Texts;
  enemy: Enemies;
  keyboard: Keyboard = new Keyboard();
  static initGame: boolean = false;
  static gameOver: boolean = false;
  static pauseGame: boolean = false;
  static winGame: boolean = false;
  static restartGame: HTMLButtonElement = document.querySelector("#restart")!;
  static button: HTMLButtonElement = document.querySelector("#buttonGame")!;
  static score: HTMLParagraphElement = document.querySelector("#score")!;
  static buttonDecreaseEnemies: HTMLButtonElement =
    document.querySelector("#decrease")!;
  static buttonAddEnemies: HTMLButtonElement = document.querySelector("#add")!;
  static buttonPause: HTMLButtonElement = document.querySelector("#pause")!;
  static buttonResume: HTMLButtonElement = document.querySelector("#play")!;
  static scoreValue = 0;
  static lifes: HTMLParagraphElement = document.querySelector("#life")!;
  static lifesValues = 3;
  static quantityEnemies: HTMLParagraphElement =
    document.querySelector("#enemies_quantity")!;
  static quantityEnemiesValues = 0;
  static record: HTMLParagraphElement = document.querySelector("#record")!;
  static recordValues = Game.scoreValue;

  constructor() {
    super();
    this.ctx = this.getContext()!;
    this.texts = new Texts(this.ctx);
    this.paddle = new Paddle(this.ctx);
    this.ball = new Ball(this.ctx, this.paddle);
    this.enemy = new Enemies(this.ctx, this.ball);
    Game.quantityEnemiesValues =
      this.enemy.quantityColumn * this.enemy.quantityEnemyInRow;
    Game.lifes.innerText = `${Game.lifesValues}`;
    Game.quantityEnemies.innerText = `${Game.quantityEnemiesValues}`;
    Game.score.innerText = `${Game.scoreValue}`;
    Game.record.innerText = `${Game.recordValues}`;
    this.initGame();
  }

  initGame() {
    if (!Game.initGame) {
      Game.button.addEventListener("click", () => {
        this.ball.directions.x = Math.random() < 0.5 ? 1 : -1;
        Game.initGame = true;
        Game.gameOver = false;
        Game.button.classList.add("buttonHidden");
        Game.button.setAttribute("disabled", "true");
      });
    }

    Game.buttonDecreaseEnemies.addEventListener("click", () => {
      if (this.enemy.quantityColumn > 1) {
        this.enemy.decreaseColumnEnemies();
      }
    });

    Game.buttonAddEnemies.addEventListener("click", () => {
      if (this.enemy.quantityColumn < 16) {
        this.enemy.addColumnEnemies();
      }
    });

    Game.buttonPause.addEventListener("click", () => {
      if (Game.initGame) {
        Game.pauseGame = true;
      }
    });

    Game.buttonResume.addEventListener("click", () => {
      if (Game.pauseGame) {
        Game.pauseGame = false;
        Game.initGame = true;
      }
    });

    Game.restartGame.addEventListener("click", () => {
      this.restartGame();
    });
  }

  renderBg() {
    const bg = new Image();
    bg.src = "../public/assets/img/bgs/bg_space.png";
    this.ctx.drawImage(bg, 0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  renderObjects() {
    this.paddle.draw();
    this.ball.draw();
    this.enemy.populateEnemies();
    this.keyboard.keyPressEvent();

    if (this.keyboard.space) {
      Game.initGame = true;
    }

    if (Game.pauseGame == true) {
      this.texts.drawText("Pausa");
      Game.initGame = false;
    }

    if (Game.quantityEnemiesValues === 0) {
      Game.winGame = true;
    }
    if (Game.gameOver) {
      Game.enableButtonStart();
      this.texts.drawText("Você perdeu!");
      this.restartGame();
    } else if (Game.winGame) {
      Game.enableButtonStart();
      this.texts.drawText("Você venceu!");
      this.restartGame();
    }
  }

  static enableButtonStart() {
    this.button.classList.remove("buttonHidden");
    this.button.removeAttribute("disabled");
  }

  restartGame() {
    Game.initGame = false;
    Game.lifesValues = 3;
    Game.lifes.innerText = `${Game.lifesValues}`;
    Game.quantityEnemiesValues =
      this.enemy.quantityEnemyInRow * this.enemy.quantityColumn;
    Game.quantityEnemies.innerText = `${Game.quantityEnemiesValues}`;
    this.enemy.restartPositionEnemies();
    Game.enableButtonStart();
    this.paddle.positionPaddle();
    this.ball.positionBall();

    if (Game.pauseGame) {
      Game.pauseGame = false;
    }
  }

  addColumnEnemy() {}

  gameLoop = () => {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.renderBg();
    this.renderObjects();
    requestAnimationFrame(this.gameLoop);
  };
}

const game = new Game();
requestAnimationFrame(game.gameLoop);
