import { Paddle } from "./pad.modules";

export class Ball {
  public positionBallX: number = 400;
  public positionBallY: number = 540;
  public speed: number = 5;
  public directionX: number = 1;
  public directionY: number = 1;

  constructor(public ctx: CanvasRenderingContext2D) {}

  draw() {
    if (Paddle.initGame) {
      this.move();
    }
    this.ctx.beginPath();
    this.ctx.arc(this.positionBallX, this.positionBallY, 10, 0, 2 * Math.PI);
    this.ctx.fillStyle = "green";
    this.ctx.fill();
  }

  public move() {
    if (this.positionBallY >= 0) {
      if (this.positionBallY == 0) {
        this.directionY = -1;
      }
      this.positionBallY -= this.directionY * this.speed;
    }
  }

  colisionBallWhitPaddle() {
    if (this.positionBallY == 0) {
      console.log("Bati");
    }
  }
}
