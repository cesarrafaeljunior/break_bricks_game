import { Game } from "..";
import { IPaddle } from "../interfaces/paddle.interface";
import { Canvas } from "./canvas.modules";
import { Keyboard } from "./keyboard.modules";

export class Paddle extends Canvas implements IPaddle {
  sizes: { width: number; height: number };
  positions: { x: number; y: number };
  speed: number;
  keyboard: Keyboard = new Keyboard();

  constructor(public ctx: CanvasRenderingContext2D) {
    super();
    this.positions = { x: this.widthCanvas() / 2, y: this.heightCanvas() - 50 };
    this.sizes = { width: 100, height: 10 };
    this.speed = 20;
  }

  draw() {
    this.movePaddle();
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(
      this.positions.x,
      this.positions.y,
      this.sizes.width,
      this.sizes.height
    );
  }

  movePaddle() {
    this.keyboard.keyPressEvent();
    this.colisionPaddle();
    if (this.keyboard.right) {
      if (!Game.initGame) {
        Game.initGame = true;
      }
      this.positions.x += this.speed;
    }
    if (this.keyboard.left) {
      if (!Game.initGame) {
        Game.initGame = true;
      }
      this.positions.x -= this.speed;
    }
  }

  colisionPaddle() {
    if (this.positions.x + 100 >= this.widthCanvas()) {
      this.keyboard.right = false;
    }
    if (this.positions.x <= 0) {
      this.keyboard.left = false;
    }
  }
}
