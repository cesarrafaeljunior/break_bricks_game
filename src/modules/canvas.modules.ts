export class Canvas {
  static canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  widthCanvas: number;
  heigthCanvas: number;

  constructor() {
    Canvas.canvas = document.getElementById("canvas") as HTMLCanvasElement;
    this.ctx = Canvas.canvas.getContext("2d")!;

    this.widthCanvas = window.innerWidth;
    this.heigthCanvas = window.innerHeight;

    this.ctx.canvas.width = this.widthCanvas;
    this.ctx.canvas.height = this.heigthCanvas;
  }
}
