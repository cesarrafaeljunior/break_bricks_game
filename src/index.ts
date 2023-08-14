import { Ball } from "./modules/ball.modules";
import { Canvas } from "./modules/canvas.modules";
import { Paddle } from "./modules/pad.modules";

export class Game extends Canvas {
  ctx: CanvasRenderingContext2D;
  paddle: Paddle;
  ball: Ball;
  static initGame: boolean = false;

  constructor() {
    super();
    this.ctx = this.getContext()!;
    this.paddle = new Paddle(this.ctx);
    this.ball = new Ball(this.ctx, this.paddle);
  }

  renderBg() {
    const bg = new Image();
    bg.src = "../public/assets/img/bgs/bg_space.png";
    this.ctx.drawImage(bg, 0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  renderObjects() {
    this.paddle.draw();
    this.ball.draw();
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
