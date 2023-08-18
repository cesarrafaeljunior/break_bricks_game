export interface IEnemies {
  sizes: {
    width: number;
    height: number;
  };
}

export interface IEnemyObject {
  positionX: number;
  positionY: number;
  destroyed: boolean;
}
