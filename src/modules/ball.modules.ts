export class Ball {
  constructor(public ctx: CanvasRenderingContext2D) {}

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(300, 200, 10, 0, 2 * Math.PI);
    this.ctx.fill();
  }
}
