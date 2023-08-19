import { Game } from "..";
import { IEnemies } from "../interfaces/enemies.interface";
import { Ball } from "./ball.modules";
import { Canvas } from "./canvas.modules";

export const enemies: string[][] = [];

export class Enemies extends Canvas implements IEnemies {
  sizes: { width: number; height: number };
  positions: { x: number; y: number };
  ctx: CanvasRenderingContext2D;
  ball: Ball;
  spaceX: number;
  spaceY: number;
  quantityEnemyInRow: number;
  quantityColumn: number;
  currentRow: number;
  currentColumn: number;

  constructor(ctx: CanvasRenderingContext2D, ball: Ball) {
    super();
    this.sizes = { width: 15, height: 15 };
    this.positions = { x: 0, y: 0 };
    this.ctx = ctx;
    this.ball = ball;
    this.spaceX = 50;
    this.spaceY = 40;
    this.quantityEnemyInRow = 20;
    this.quantityColumn = 10;
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
      Game.score.innerText = `${Game.scoreValue}`; // Atualiza o valor no array original
      console.log(Game.scoreValue);
      Game.quantityEnemiesValues--;
      Game.quantityEnemies.innerText = `${Game.quantityEnemiesValues}`; // Atualiza o valor no array original

      if (
        this.ball.topBall() <= this.bottomEnemy() &&
        this.ball.bottomBall() > this.bottomEnemy()
      ) {
        // Colisão com a parte de cima do inimigo
        this.ball.directions.y *= -1; // Faz a bola pular para cima após a colisão
      } else if (
        this.ball.bottomBall() >= this.topEnemy() &&
        this.ball.topBall() < this.topEnemy()
      ) {
        // Colisão com a parte de baixo do inimigo
        this.ball.directions.y *= -1; // Faz a bola pular para baixo após a colisão
      } else if (
        this.ball.rightBall() >= this.leftEnemy() &&
        this.ball.leftBall() < this.leftEnemy()
      ) {
        // Colisão com a lateral esquerda do inimigo
        this.ball.directions.x *= -1; // Inverte a direção horizontal da bola após a colisão
      } else if (
        this.ball.leftBall() <= this.rightEnemy() &&
        this.ball.rightBall() > this.rightEnemy()
      ) {
        // Colisão com a lateral direita do inimigo
        this.ball.directions.x *= -1; // Inverte a direção horizontal da bola após a colisão
      }
    }
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
