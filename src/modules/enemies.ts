import { IEnemies } from "../interfaces/enemies.interface";
import { Canvas } from "./canvas.modules";

export class Enemies extends Canvas implements IEnemies {
  positions: { x: number; y: number };
  sizes: { width: number; height: number };
  ctx: CanvasRenderingContext2D;

  constructor(
    positionX: number,
    positonY: number,
    ctx: CanvasRenderingContext2D
  ) {
    super();
    this.positions = { x: positionX, y: positonY };
    this.sizes = { width: 15, height: 15 };
    this.ctx = ctx;
    this.draw();
  }

  draw() {
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(
      this.positions.x,
      this.positions.y,
      this.sizes.width,
      this.sizes.height
    );
  }
}
