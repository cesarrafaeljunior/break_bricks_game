import { IEnemies, IEnemyObject } from "../interfaces/enemies.interface";
import { Ball } from "./ball.modules";
import { Canvas } from "./canvas.modules";

const enemies: string[][] = [];

export class Enemies extends Canvas implements IEnemies {
  sizes: { width: number; height: number };
  ctx: CanvasRenderingContext2D;
  enemies: IEnemyObject[] = [];
  ball: Ball;
  spaceX: number;
  spaceY: number;
  quantityEnemyInRow: number;
  quantityColumn: number;
  quantityMax: number;
  quantityMaxPerRow: number;
  currentRow: number;
  currentColumn: number;

  constructor(ctx: CanvasRenderingContext2D, ball: Ball) {
    super();
    this.sizes = { width: 15, height: 15 };
    this.ctx = ctx;
    this.ball = ball;
    this.spaceX = 20;
    this.spaceY = 20;
    this.quantityEnemyInRow = 50;
    this.quantityColumn = 10;
    this.quantityMax = 400;
    this.quantityMaxPerRow = Math.floor(
      this.ctx.canvas.width / this.sizes.width
    );
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
          this.draw(j * this.spaceX, index * this.spaceY, j, index);
        }
      });
    });
  }

  draw(positionX: number, positionY: number, j: number, index: number) {
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

    this.colisionWhitBall(positionX, positionY, j, index);
  }

  colisionWhitBall(
    positionX: number,
    positionY: number,
    j: number,
    index: number
  ) {
    const ballTop = this.ball.positions.y;
    const ballBottom = this.ball.positions.y + this.ball.sizes.height;
    const ballLeft = this.ball.positions.x;
    const ballRight = this.ball.positions.x + this.ball.sizes.width;

    const enemyTop = positionY;
    const enemyBottom = positionY + this.sizes.height;
    const enemyLeft = positionX;
    const enemyRight = positionX + this.sizes.width;

    const horizontalOverlap = ballLeft < enemyRight && ballRight > enemyLeft;
    const verticalOverlap = ballTop < enemyBottom && ballBottom > enemyTop;

    if (horizontalOverlap && verticalOverlap) {
      let row = enemies[index];
      row[j] = "_"; // Atualiza o valor no array original

      if (ballTop <= enemyBottom && ballBottom > enemyBottom) {
        // Colisão com a parte de cima do inimigo
        this.ball.directions.y *= -1; // Faz a bola pular para cima após a colisão
      } else if (ballBottom >= enemyTop && ballTop < enemyTop) {
        // Colisão com a parte de baixo do inimigo
        this.ball.directions.y *= -1; // Faz a bola pular para baixo após a colisão
      } else if (ballRight >= enemyLeft && ballLeft < enemyLeft) {
        // Colisão com a lateral esquerda do inimigo
        this.ball.directions.x *= -1; // Inverte a direção horizontal da bola após a colisão
      } else if (ballLeft <= enemyRight && ballRight > enemyRight) {
        // Colisão com a lateral direita do inimigo
        this.ball.directions.x *= -1; // Inverte a direção horizontal da bola após a colisão
      }
    }
  }
}
