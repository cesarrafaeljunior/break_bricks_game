import { Ball } from "./modules/ball.modules";
import { Canvas } from "./modules/canvas.modules";
import { Paddle } from "./modules/pad.modules";

class Game extends Canvas {
  canvas = new Canvas();
  paddle = new Paddle(this.canvas.ctx);
  ball = new Ball(this.canvas.ctx);

  static initGame: boolean = false;

  constructor() {
    super();
    this.windowSize();
  }

  windowSize() {
    if (window.innerWidth > 400) {
      this.canvas.widthCanvas = 800;
    } else {
      this.canvas.widthCanvas = window.innerWidth;
    }

    if (window.innerHeight > 400) {
      this.canvas.heigthCanvas = 600;
    } else {
      this.canvas.heigthCanvas = window.innerHeight;
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
  }

  gameLoop = () => {
    this.ctx.clearRect(0, 0, this.canvas.widthCanvas, this.canvas.heigthCanvas);
    this.renderBg();
    this.renderObjects();
    requestAnimationFrame(this.gameLoop);
  };
}

const game = new Game();
requestAnimationFrame(game.gameLoop);
