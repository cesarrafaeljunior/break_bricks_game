import { Paddle } from "./pad.modules";

export class Ball {
  public positionBallX: number = 400;
  public positionBallY: number = 540;
  public speed: number = 5;
  public directionX: number = Math.random() * 10 > 5 ? -1 : 1;
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
    this.positionBallY -= this.directionY * this.speed;
    this.positionBallX += this.directionX * this.speed;
    this.colisionBall();
  }

  colisionBall() {
    if (this.positionBallY <= 0) {
      this.directionY = -1;
    }

    if (
      this.positionBallX >= this.ctx.canvas.width ||
      this.positionBallX <= 0
    ) {
      this.directionX *= -1;
    }

    if (
      this.positionBallX >= Paddle.positionX && // Verifica colisão à direita do paddle
      this.positionBallX <= Paddle.positionX + Paddle.widthPaddle && // Verifica colisão à esquerda do paddle
      this.positionBallY >= Paddle.positionY
    ) {
      this.directionY *= -1;
    }
  }
}
