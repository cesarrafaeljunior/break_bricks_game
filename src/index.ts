import { Ball } from "./modules/ball.modules";
import { Keyboard } from "./modules/keyboard.modules";
import { Paddle } from "./modules/pad.modules";

const game = () => {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;

  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return;
  }

  const paddle = new Paddle(ctx);
  const ball = new Ball(ctx);

  const gameLoop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    paddle.draw();
    ball.draw();
    requestAnimationFrame(gameLoop);
  };
  requestAnimationFrame(gameLoop);
};

requestAnimationFrame(game);
