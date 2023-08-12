import { Ball } from "./modules/ball.modules";
import { Paddle } from "./modules/pad.modules";

const game = () => {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;

  if (window.innerWidth > 400) {
    canvas.width = 800;
  } else {
    canvas.width = window.innerWidth;
  }

  if (window.innerHeight > 400) {
    canvas.height = 600;
  } else {
    canvas.height = window.innerHeight;
  }

  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return;
  }

  const paddle = new Paddle(ctx);
  const ball = new Ball(ctx);

  const bg = new Image();
  bg.src = "../public/assets/img/bgs/bg_space.png";
  bg.style.objectFit = "cover";

  const gameLoop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
    paddle.draw();
    ball.draw();
    requestAnimationFrame(gameLoop);
  };
  requestAnimationFrame(gameLoop);
};

requestAnimationFrame(game);
