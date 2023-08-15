import { IEnemies } from "../interfaces/enemies.interface";
import { Canvas } from "./canvas.modules";

export class Enemies extends Canvas implements IEnemies {
  sizes: { width: number; height: number };
  positions: { x: number; y: number }[] = [];
  maxEnemiesPerRow: number = 25;
  maxEnemies: number = 100;
  startY: number = 5;
  enemySpacingX: number = 40;
  enemySpacingY: number = 40;
  totalRender: number = 0;

  currentRow: number = 0;
  currentCol: number = 0;

  constructor(public ctx: CanvasRenderingContext2D) {
    super();
    this.sizes = { width: 15, height: 15 };
  }

  addEnemyPosition(x: number, y: number) {
    this.positions.push({ x, y });
  }

  render() {
    this.positions.forEach(({ x, y }) => {
      this.draw(x, y);
    });
  }

  draw(positionX: number, positionY: number) {
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
  }

  midPositions() {
    return this.widthCanvas() / 2 - 200;
  }

  initialPositions() {
    return this.widthCanvas() / this.widthCanvas() + 10;
  }

  finalPositions() {
    return this.widthCanvas() / 2;
  }
}
