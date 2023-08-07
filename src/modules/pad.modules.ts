import { Keyboard, iKeyboard } from "./keyboard.modules";

export class Paddle {
  public totalWidthCanvas: number = 0;
  public positionX: number = 400;
  public positionY: number = 750;
  public speed: number = 20;
  keyboard: Keyboard = new Keyboard();

  constructor(public ctx: CanvasRenderingContext2D) {
    this.totalWidthCanvas = ctx.canvas.width;
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
      this.positionX += this.speed;
    }
    if (this.keyboard.left) {
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
