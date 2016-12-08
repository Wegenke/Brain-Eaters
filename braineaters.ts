let canvas = <HTMLCanvasElement>document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let img = new Image(35, 35);
img.src = "mario.jpg";

let keyInput = new KeyboardInput();
let x: number = 50;
let y: number = 50;

function gameLoop(): void {
  requestAnimationFrame(gameLoop);
  keyInput.inputLoop();

  ctx.fillStyle = "#26034d";
  ctx.fillRect(0, 0, 900, 700);

  ctx.save();
  ctx.translate(x, y);
  ctx.drawImage(img, 0, 0, img.width, img.height);
  ctx.restore();
}

class KeyboardInput {
   public keyCallback: { [keycode: number]: () => void; } = {};
   public keyDown: { [keycode: number]: boolean; } = {};

   constructor() {
      document.addEventListener("keydown", this.keyboardDown);
      document.addEventListener("keyup", this.keyboardUp);
   }

    public addKeycodeCallback = (keycode: number, f: () => void): void => {
      this.keyCallback[keycode] = f;
      this.keyDown[keycode] = false;
    }

   public keyboardDown = (event: KeyboardEvent): void => {
      event.preventDefault();
      this.keyDown[event.keyCode] = true;
   }
   public keyboardUp = (event: KeyboardEvent): void => {
      this.keyDown[event.keyCode] = false;
   }
   public inputLoop = (): void => {
      for (let key in this.keyDown) {
          let is_down: boolean = this.keyDown[key];

          if (is_down) {
              let callback: () => void = this.keyCallback[key];
              if (callback != null) {
                  callback();
              }
          }
      }
  }
}

function marioUp(): void {
  y -= 2;
}

function marioDown(): void {
  y += 2;
}

function marioLeft(): void {
  x -= 2;
}

function marioRight(): void {
  x += 2;
}

window.onload = () => {
   // PRESS LEFT ARROW OR 'A' KEY
   keyInput.addKeycodeCallback(37, marioLeft);
   keyInput.addKeycodeCallback(65, marioLeft);

   // PRESS UP ARROW OR 'W' KEY
   keyInput.addKeycodeCallback(38, marioUp);
   keyInput.addKeycodeCallback(87, marioUp);

   // PRESS RIGHT ARROW OR 'D' KEY
   keyInput.addKeycodeCallback(39, marioRight);
   keyInput.addKeycodeCallback(68, marioRight);

   // PRESS DOWN ARROW OR 'S' KEY
   keyInput.addKeycodeCallback(40, marioDown);
   keyInput.addKeycodeCallback(83, marioDown);

   gameLoop();
};
