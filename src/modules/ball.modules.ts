import { Game } from "..";
import { IBall } from "../interfaces/ball.interface";
import { Canvas } from "./canvas.modules";
import { Paddle } from "./pad.modules";

export class Ball extends Canvas implements IBall {
  angles: {
    ray: number;
    initialAngle: number;
    finalAngle: number;
  };
  sizes: { width: number; height: number };
  positions: { x: number; y: number };
  directions: { x: number; y: number };
  speed: number;
  paddle: Paddle;

  constructor(public ctx: CanvasRenderingContext2D, paddle: Paddle) {
    super();
    this.paddle = paddle;
    this.positions = {
      x: this.widthCanvas() / 2 + this.paddle.sizes.width / 2,
      y: this.heightCanvas() - 60,
    };
    this.angles = { ray: 10, initialAngle: 0, finalAngle: 2 * Math.PI };
    this.sizes = {
      width: this.widthBall(),
      height: this.heightBall(),
    };
    this.directions = { x: 1, y: 1 };
    this.speed = 5;
  }

  draw() {
    if (Game.initGame) {
      this.move();
    }
    this.ctx.beginPath();
    this.ctx.arc(
      this.positions.x,
      this.positions.y,
      this.angles.ray,
      this.angles.initialAngle,
      this.angles.finalAngle
    );
    this.ctx.fillStyle = "white";
    this.ctx.fill();
  }

  public move() {
    this.positions.y -= this.directions.y * this.speed;
    this.positions.x += this.directions.x * this.speed;
    this.colisionBall();
  }

  colisionBall() {
    this.colisionWall();
    this.colisionPaddle();
  }

  colisionWall() {
    if (this.positions.y <= 0 + this.sizes.height) {
      this.directions.y *= -1;
    }

    if (
      this.positions.x + this.sizes.width >= this.widthCanvas() ||
      this.positions.x - this.sizes.width <= 0
    ) {
      this.directions.x *= -1;
    }
  }

  colisionPaddle() {
    if (
      this.positions.x + this.sizes.width >= this.paddle.positions.x &&
      this.positions.x + this.sizes.width <=
        this.paddle.positions.x + this.paddle.sizes.width &&
      this.positions.y + this.sizes.height >= this.paddle.positions.y
    ) {
      let paddleCenter = this.paddle.positions.x + this.paddle.sizes.width / 2;

      if (this.positions.x < paddleCenter) {
        this.directions.x = -1;
        console.log("Bati na esquerda");
      }
      if (this.positions.x == paddleCenter) {
        this.directions.x = 0;
        console.log("Bati na meio");
      }
      if (this.positions.x > paddleCenter) {
        this.directions.x = 1;
        console.log("Bati na direita");
      }

      this.directions.y *= -1;
    }
  }

  widthBall() {
    return this.angles.ray;
  }

  heightBall() {
    return this.angles.ray;
  }
}
