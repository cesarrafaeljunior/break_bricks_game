import { Keyboard } from "./keyboard.modules";

export class Paddle {
  static widthPaddle = 100;
  static heightPaddle = 15;
  static positionX: number = 0;
  static positionY: number = 0;
  public speed: number = 20;
  static initGame: boolean = false;
  keyboard: Keyboard = new Keyboard();

  constructor(public ctx: CanvasRenderingContext2D) {
    Paddle.positionX = 100;
    Paddle.positionY = 500;
  }

  draw() {
    this.movePaddle();
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(
      Paddle.positionX,
      Paddle.positionY,
      Paddle.widthPaddle,
      Paddle.heightPaddle
    );
  }

  movePaddle() {
    this.keyboard.keyPressEvent();
    this.colisionPaddle();
    if (this.keyboard.right) {
      if (!Paddle.initGame) {
        Paddle.initGame = true;
      }
      Paddle.positionX += this.speed;
    }
    if (this.keyboard.left) {
      if (!Paddle.initGame) {
        Paddle.initGame = true;
      }
      Paddle.positionX -= this.speed;
    }
  }

  colisionPaddle() {
    if (Paddle.positionX + 100 >= this.ctx.canvas.width) {
      this.keyboard.right = false;
    }
    if (Paddle.positionX <= 0) {
      this.keyboard.left = false;
    }
  }
}
