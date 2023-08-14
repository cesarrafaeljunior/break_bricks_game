export interface IBall {
  angles: {
    ray: number;
    initialAngle: number;
    finalAngle: number;
  };
  sizes: {
    width: number;
    height: number;
  };
  positions: {
    x: number;
    y: number;
  };
  directions: {
    x: number;
    y: number;
  };
  speed: number;
}
