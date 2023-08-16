import { enemies } from "..";
import { IEnemies } from "../interfaces/enemies.interface";
import { Ball } from "./ball.modules";
import { Canvas } from "./canvas.modules";

export class Enemies extends Canvas implements IEnemies {
  sizes: { width: number; height: number };
  ball: Ball;

  constructor(public ctx: CanvasRenderingContext2D, ball: Ball) {
    super();
    this.ball = ball;
    this.sizes = { width: 15, height: 15 };
  }

  draw(positionX: number, positionY: number, enemy: any) {
    this.ctx.fillStyle = "#fff";
    this.ctx.fillRect(
      positionX,
      positionY,
      this.sizes.width,
      this.sizes.height
    );
    this.ctx.strokeStyle = "#000";
    this.ctx.strokeRect(
      positionX,
      positionY,
      this.sizes.width,
      this.sizes.height
    );
    this.collisionEnemy(positionX, positionY, enemy);
  }

  collisionEnemy(positionX: number, positionY: number, enemy: any) {
    if (
      this.ball.positions.x + this.ball.sizes.width == positionX &&
      this.ball.positions.y > positionY &&
      this.ball.positions.y <= positionY + this.sizes.height
    ) {
      this.ball.directions.x *= -1;
      this.ball.directions.y *= -1;
      enemy.lifes = 0;
    }

    if (
      this.ball.positions.x + this.ball.sizes.width ==
        positionX + this.sizes.width &&
      this.ball.positions.y + this.ball.sizes.height > positionY &&
      this.ball.positions.y <= positionY + this.sizes.height
    ) {
      enemy.lifes = 0;
      console.log("Colidi na direita");
      this.ball.directions.x *= -1;
      this.ball.directions.y *= -1;
    }

    if (
      this.ball.positions.y + this.ball.sizes.height == positionY &&
      this.ball.positions.x >= positionX &&
      this.ball.positions.x <= positionX + this.sizes.width
    ) {
      enemy.lifes = 0;
      this.ball.directions.y *= -1;
    } else if (
      this.ball.positions.y + this.ball.sizes.height ==
        positionY + this.sizes.height &&
      this.ball.positions.x >= positionX &&
      this.ball.positions.x <= positionX + this.sizes.width
    ) {
      enemy.lifes = 0;
      this.ball.directions.x *= -1;
      this.ball.directions.y *= -1;
    }
  }
}
