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
    this.positions = this.positionBall();
    this.angles = { ray: 10, initialAngle: 0, finalAngle: 2 * Math.PI };
    this.sizes = {
      width: this.widthBall(),
      height: this.heightBall(),
    };
    this.directions = { x: 1, y: 1 };
    this.speed = 7;
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
    this.ctx.closePath();
  }

  move() {
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

    if (
      this.positions.y + this.sizes.height >=
      this.paddle.positions.y + this.paddle.sizes.height
    ) {
      if (Game.scoreValue > Game.recordValues) {
        Game.record.innerHTML = `${Game.scoreValue}`;
      }
      Game.recordValues = Game.scoreValue;
      Game.scoreValue = 0;
      Game.score.innerHTML = `${Game.scoreValue}`;

      if (Game.lifesValues == 0) {
        Game.initGame = false;
        Game.gameOver = true;
        this.paddle.positionPaddle();
      } else {
        Game.lifesValues--;
        Game.lifes.innerHTML = `${Game.lifesValues}`;
        Game.initGame = false;
        Game.enableButtonStart();
      }

      this.positionBall();
    }
  }

  colisionPaddle() {
    if (
      this.positions.x + this.sizes.width >= this.paddle.positions.x &&
      this.positions.x - this.sizes.width <=
        this.paddle.positions.x + this.paddle.sizes.width &&
      this.positions.y + this.sizes.height >= this.paddle.positions.y
    ) {
      const paddleCenter =
        this.paddle.positions.x + this.paddle.sizes.width / 2;
      const paddleSemiTipLeft =
        this.paddle.positions.x + this.paddle.sizes.width / 5;
      if (
        this.positions.x + this.sizes.width < paddleSemiTipLeft &&
        this.positions.x + this.sizes.width >= this.paddle.positions.x
      ) {
        this.directions.x = -2;
        this.speed = 6.5;
      } else if (
        this.positions.x + this.sizes.width > paddleSemiTipLeft &&
        this.positions.x + this.sizes.width < paddleCenter
      ) {
        this.directions.x = -1;
        this.speed = 7;
      } else if (
        this.positions.x + this.sizes.width >= paddleCenter &&
        this.positions.x < paddleCenter + paddleSemiTipLeft
      ) {
        this.directions.x = -0.5;
        this.speed = 7.5;
      }

      if (
        this.positions.x > paddleCenter &&
        this.positions.x <= paddleCenter + 30
      ) {
        console.log("Bati do lado direito do centro");
        this.directions.x = 0.5;
        this.speed = 8;
      } else if (
        this.positions.x > paddleCenter &&
        this.positions.x > paddleCenter + 30 &&
        this.positions.x <
          this.paddle.positions.x + this.paddle.sizes.width - 10
      ) {
        this.directions.x = 1;
        this.speed = 7;
      } else if (
        this.positions.x > paddleCenter + 30 &&
        this.positions.x <= this.paddle.positions.x + this.paddle.sizes.width
      ) {
        this.directions.x = 2;
        this.speed = 6;
      }

      this.directions.y *= -1;
    }
  }

  positionBall() {
    return (this.positions = {
      x: this.paddle.positions.x + this.paddle.sizes.width / 2,
      y: this.heightCanvas() - 30,
    });
  }

  widthBall() {
    return this.angles.ray;
  }

  heightBall() {
    return this.angles.ray;
  }

  topBall() {
    return this.positions.y;
  }

  bottomBall() {
    return this.positions.y + this.sizes.height;
  }

  leftBall() {
    return this.positions.x;
  }

  rightBall() {
    return this.positions.x + this.sizes.width;
  }
}
