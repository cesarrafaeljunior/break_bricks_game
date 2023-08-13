import { Ball } from "./modules/ball.modules";
import { Canvas } from "./modules/canvas.modules";
import { Paddle } from "./modules/pad.modules";

class Game {
  paddle = new Paddle(Canvas.ctx);
  ball = new Ball(Canvas.ctx);

  static initGame: boolean = false;

  constructor() {
    this.windowSize();
  }

  windowSize() {
    if (window.innerWidth > 400) {
      this.widthCanvas = 800;
    } else {
      this.widthCanvas = window.innerWidth;
    }

    if (window.innerHeight > 400) {
      this.heigthCanvas = 600;
    } else {
      this.heigthCanvas = window.innerHeight;
    }

    this.canvas.width = this.widthCanvas;
    this.canvas.height = this.heigthCanvas;
  }

  renderBg() {
    const bg = new Image();
    bg.src = "../public/assets/img/bgs/bg_space.png";
    this.ctx.drawImage(bg, 0, 0, this.widthCanvas, this.heigthCanvas);
  }

  renderObjects() {
    this.paddle.draw();
    this.ball.draw();
  }

  gameLoop = () => {
    this.ctx.clearRect(0, 0, this.widthCanvas, this.heigthCanvas);
    this.renderBg();
    this.renderObjects();
    requestAnimationFrame(this.gameLoop);
  };
}

const game = new Game();
requestAnimationFrame(game.gameLoop);
