export interface iKeyboard {
  up: boolean;
  down: boolean;
  right: boolean;
  left: boolean;
  space: boolean;
}

export class Keyboard implements iKeyboard {
  up: boolean = false;
  down: boolean = false;
  right: boolean = false;
  left: boolean = false;
  space: boolean = false;

  public keyPressEvent() {
    window.addEventListener("keydown", (e) => {
      if (e.key == "ArrowLeft") {
        this.left = true;
      } else if (e.key == "ArrowRight") {
        this.right = true;
      }
      if (e.key === " ") {
        this.space = true;
      }
    });

    window.addEventListener("keyup", (e) => {
      if (e.key == "ArrowLeft") {
        this.left = false;
      } else if (e.key == "ArrowRight") {
        this.right = false;
      }
      if (e.key === " ") {
        this.space = false;
      }
    });
  }
}
