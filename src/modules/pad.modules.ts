import { Keyboard } from "./keyboard.modules";

export class Paddle {
  public totalWidthCanvas: number = 0;
  public positionX: number = 0;
  public positionY: number = 0;
  public speed: number = 20;
  static initGame: boolean = false;
  keyboard: Keyboard = new Keyboard();

  constructor(public ctx: CanvasRenderingContext2D) {
    this.totalWidthCanvas = ctx.canvas.width;
    this.positionX = (ctx.canvas.width - 100) / 2;
    this.positionY = ctx.canvas.height - 50;
  }

  draw() {
    this.movePaddle();
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(this.positionX, this.positionY, 100, 15);
  }

  movePaddle() {
    this.keyboard.keyPressEvent();
    this.colisionPaddle();
    if (this.keyboard.right) {
      if (!Paddle.initGame) {
        Paddle.initGame = true;
      }
      this.positionX += this.speed;
    }
    if (this.keyboard.left) {
      if (!Paddle.initGame) {
        Paddle.initGame = true;
      }
      this.positionX -= this.speed;
    }
  }

  colisionPaddle() {
    if (this.positionX + 100 >= this.totalWidthCanvas) {
      this.keyboard.right = false;
    }
    if (this.positionX <= 0) {
      this.keyboard.left = false;
    }
  }
}
