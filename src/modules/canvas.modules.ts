export class Canvas {
  canvasTag: HTMLCanvasElement;

  constructor() {
    this.canvasTag = document.getElementById("canvas") as HTMLCanvasElement;
    this.resizeCanvas();
  }

  getContext() {
    return this.canvasTag.getContext("2d");
  }

  widthCanvas() {
    return this.canvasTag.width;
  }

  heightCanvas() {
    return this.canvasTag.height;
  }

  resizeCanvas() {
    if (window.innerWidth > 400) {
      this.canvasTag.width = 800;
    } else {
      this.canvasTag.width = window.innerWidth;
    }

    if (window.innerHeight > 600) {
      this.canvasTag.height = 600;
    } else {
      this.canvasTag.height = window.innerHeight;
    }
  }
}
