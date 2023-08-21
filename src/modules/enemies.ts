import { Game } from "..";
import { IEnemies } from "../interfaces/enemies.interface";
import { Ball } from "./ball.modules";
import { Canvas } from "./canvas.modules";

export const enemies: string[][] = [];

export class Enemies extends Canvas implements IEnemies {
  sizes: { width: number; height: number };
  positions: { x: number; y: number };
  spaceX: number;
  spaceY: number;
  quantityEnemyInRow: number;
  quantityColumn: number;
  currentRow: number;
  currentColumn: number;

  constructor(public ctx: CanvasRenderingContext2D, public ball: Ball) {
    super();
    this.sizes = { width: 15, height: 15 };
    this.positions = { x: 0, y: 0 };
    this.spaceX = 50;
    this.spaceY = 40;
    this.quantityEnemyInRow = 20;
    this.quantityColumn = 5;
    this.currentRow = 0;
    this.currentColumn = 0;
  }

  populateEnemies() {
    if (enemies.length < this.quantityColumn) {
      for (let col = 0; col < this.quantityColumn; col++) {
        const columnEnemies: string[] = [];

        for (let row = 0; row < this.quantityEnemyInRow; row++) {
          columnEnemies.push("*");
        }

        enemies.push(columnEnemies);
      }
    }
    this.percorrerArray();
  }

  percorrerArray() {
    enemies.forEach((row, index) => {
      row.forEach((enemy, j) => {
        if (enemy === "*") {
          this.draw(15 + j * this.spaceX, 30 + index * this.spaceY, j, index);
        }
      });
    });
  }

  draw(positionX: number, positionY: number, j: number, index: number) {
    this.positions.x = positionX;
    this.positions.y = positionY;
    this.ctx.fillStyle = "green";
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

    this.colisionWhitBall(j, index);
  }

  colisionWhitBall(j: number, index: number) {
    const horizontalOverlap =
      this.ball.leftBall() < this.rightEnemy() &&
      this.ball.rightBall() > this.leftEnemy();
    const verticalOverlap =
      this.ball.topBall() < this.bottomEnemy() &&
      this.ball.bottomBall() > this.topEnemy();

    if (horizontalOverlap && verticalOverlap) {
      let row = enemies[index];
      row[j] = "_";
      Game.scoreValue += 1;
      Game.score.innerText = `${Game.scoreValue}`;
      Game.quantityEnemiesValues--;
      Game.quantityEnemies.innerText = `${Game.quantityEnemiesValues}`;

      if (
        this.ball.topBall() <= this.bottomEnemy() &&
        this.ball.bottomBall() > this.bottomEnemy()
      ) {
        this.ball.directions.y *= -1;
      } else if (
        this.ball.bottomBall() >= this.topEnemy() &&
        this.ball.topBall() < this.topEnemy()
      ) {
        this.ball.directions.y *= -1;
      } else if (
        this.ball.rightBall() >= this.leftEnemy() &&
        this.ball.leftBall() < this.leftEnemy()
      ) {
        this.ball.directions.x *= -1;
      } else if (
        this.ball.leftBall() <= this.rightEnemy() &&
        this.ball.rightBall() > this.rightEnemy()
      ) {
        this.ball.directions.x *= -1;
      }
    }
  }

  restartPositionEnemies() {
    for (let i = 0; i < enemies.length; i++) {
      for (let j = 0; j < enemies[i].length; j++) {
        enemies[i][j] = "*";
      }
    }
  }

  addColumnEnemies() {
    let newColumn = [];
    for (let row = 0; row < this.quantityEnemyInRow; row++) {
      newColumn[row] = "*";
    }
    enemies.push(newColumn);
    this.quantityColumn++;
    Game.quantityEnemiesValues += this.quantityEnemyInRow;
    Game.quantityEnemies.innerText = `${Game.quantityEnemiesValues}`;
  }

  decreaseColumnEnemies() {
    enemies.pop();
    this.quantityColumn--;
    Game.quantityEnemiesValues -= this.quantityEnemyInRow;
    Game.quantityEnemies.innerText = `${Game.quantityEnemiesValues}`;
  }

  widthEnemy() {
    return this.sizes.width;
  }

  heightEnemy() {
    return this.sizes.height;
  }

  topEnemy() {
    return this.positions.y;
  }

  bottomEnemy() {
    return this.positions.y + this.sizes.height;
  }

  leftEnemy() {
    return this.positions.x;
  }

  rightEnemy() {
    return this.positions.x + this.sizes.width;
  }
}
