export interface IEnemies {
  positions: {
    x: number;
    y: number;
  };
  sizes: {
    width: number;
    height: number;
  };
  ctx: CanvasRenderingContext2D;
}
