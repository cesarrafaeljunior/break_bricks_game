import { IEnemies, IEnemyObject } from "../interfaces/enemies.interface";
import { Ball } from "./ball.modules";
import { Canvas } from "./canvas.modules";

const enemies = [
  [
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
  ],
  [
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
  ],
  [
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
  ],
  [
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
  ],
  [
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
    "*",
  ],
];

export class Enemies extends Canvas implements IEnemies {
  sizes: { width: number; height: number };
  ctx: CanvasRenderingContext2D;
  enemies: IEnemyObject[] = [];
  ball: Ball;
  spaceX: number;
  spaceY: number;
  quantityMax: number;
  quantityMaxPerRow: number;
  currentRow: number;
  currentColumn: number;

  constructor(ctx: CanvasRenderingContext2D, ball: Ball) {
    super();
    this.sizes = { width: 15, height: 15 };
    this.ctx = ctx;
    this.ball = ball;
    this.spaceX = 1;
    this.spaceY = 1;
    this.quantityMax = 400;
    this.quantityMaxPerRow = Math.floor(
      this.ctx.canvas.width / this.sizes.width
    );
    this.currentRow = 0;
    this.currentColumn = 0;
  }

  populateEnemies() {
    enemies.forEach((row, index) => {
      row.forEach((enemy, j) => {
        if (enemy == "*") {
          this.draw(j * this.sizes.width, index * this.sizes.height, enemy);
        }
      });
    });
  }

  draw(positionX: number, positionY: number, enemy: string) {
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(
      positionX,
      positionY,
      this.sizes.width,
      this.sizes.height
    );
    this.ctx.strokeStyle = "black";
    this.ctx.strokeRect(
      positionX,
      positionY,
      this.sizes.width,
      this.sizes.height
    );

    this.colisionWhitBall(positionX, positionY, enemy);
  }

  colisionWhitBall(positionX: number, positionY: number, enemy: string) {
    if (
      this.ball.positions.y - this.ball.sizes.height <=
        positionY + this.sizes.height &&
      this.ball.positions.x >= positionX &&
      this.ball.positions.x <= positionX + this.sizes.width
    ) {
      console.log(enemy.replace("*", " "));
      this.ball.directions.y = -1;
    }
  }
}
