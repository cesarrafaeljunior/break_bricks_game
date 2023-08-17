import { Ball } from "./modules/ball.modules";
import { Canvas } from "./modules/canvas.modules";
import { Enemies } from "./modules/enemies";
import { Paddle } from "./modules/pad.modules";
import { Texts } from "./modules/texts.modules";

const enemies: Enemies[] = [];

export class Game extends Canvas {
  ctx: CanvasRenderingContext2D;
  paddle: Paddle;
  ball: Ball;
  texts: Texts;
  enemy: any;
  static initGame: boolean = false;
  static gameOver: boolean = false;
  button: HTMLButtonElement = document.querySelector("#buttonGame")!;

  constructor() {
    super();
    this.ctx = this.getContext()!;
    this.texts = new Texts(this.ctx);
    this.paddle = new Paddle(this.ctx);
    this.enemy = this.enemiesContage();
    this.ball = new Ball(this.ctx, this.paddle);
    this.initGame();
  }

  initGame() {
    if (this.button) {
      if (!Game.initGame) {
        this.button.addEventListener("click", () => {
          this.ball.directions.x = Math.random() < 0.5 ? 1 : -1;
          Game.initGame = true;
          Game.gameOver = false;
          this.button.classList.add("buttonHidden");
          this.button.setAttribute("disabled", "true");
        });
      }
    }
  }

  renderBg() {
    const bg = new Image();
    bg.src = "../public/assets/img/bgs/bg_space.png";
    this.ctx.drawImage(bg, 0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  renderObjects() {
    this.paddle.draw();
    this.ball.draw();
    enemies.forEach((enemy) => {
      enemy.draw();
    });
    if (Game.gameOver) {
      this.button.classList.remove("buttonHidden");
      this.button.removeAttribute("disabled");
      this.texts.drawText();
    }
  }

  enemiesContage() {
    for (let i = 0; i < 20; i++) {
      enemies.push(new Enemies(50 * i, 30, this.ctx));
    }
  }

  gameLoop = () => {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.renderBg();
    this.renderObjects();
    requestAnimationFrame(this.gameLoop);
  };
}

const game = new Game();
requestAnimationFrame(game.gameLoop);
