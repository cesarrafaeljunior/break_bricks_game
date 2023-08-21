import { Canvas } from "./canvas.modules";

export class Texts extends Canvas {
  constructor(public ctx: CanvasRenderingContext2D) {
    super();
  }

  drawText(text: string) {
    this.ctx.shadowColor = "rgba(0,0,255,1)";
    (this.ctx.shadowOffsetX = 8), (this.ctx.shadowOffsetY = 8);
    this.ctx.shadowBlur = 15;

    this.ctx.font = "8rem Inter";
    this.ctx.fillStyle = "white";
    this.ctx.fillText(text, this.widthCanvas() / 2, this.heightCanvas() / 2);
    this.ctx.textAlign = "center";

    this.ctx.shadowColor = "rgba(0,0,255,0)";
    (this.ctx.shadowOffsetX = 8), (this.ctx.shadowOffsetY = 8);
    this.ctx.shadowBlur = 15;
  }
}
