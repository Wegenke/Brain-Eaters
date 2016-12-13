let canvas;
let ctx;
let hero = new Image();
let x: number = 50;
let y: number = 50;
let baddyXPosition: number = 10;
let baddyMovingLeft: boolean = false;
// let zx1: boolean = false;
// let zx2: boolean = false;
// let zx3: boolean = false;
// let zx4: boolean = false;

class Zombie {
  public zombieMovingLeft: boolean;
  public zombieXPosition: number;
  public zombieYPosition: number;
  public zombieXPixels: number = 45;
  public zombieYPixels: number = 45;
  public zombieImage = <HTMLImageElement>document.getElementById("zed");
  constructor(xpos:number,ypos:number) {
    this.zombieXPosition = xpos;
    this.zombieYPosition = ypos;
  }
  buildZombie() {
    ctx.drawImage(this.zombieImage, this.zombieXPosition, this.zombieYPosition, this.zombieXPixels, this.zombieYPixels);
  }
};

let zed1 = new Zombie(200,200);
let zed2 = new Zombie(300,300);
let zed3 = new Zombie(400,400);
let zed4 = new Zombie(500,500);
let zed5 = new Zombie(600,600);

// function moveBaddyRight (){
//       ctx.drawImage(baddy, baddyXPosition, 500, 45, 45);
//       baddyXPosition += 5;
//       ctx.save();
//     }

// function moveBaddyLeft (){
//       ctx.drawImage(baddy,baddyXPosition, 500, 45, 45);
//       baddyXPosition -= 5;
//       ctx.save();
//       }

// function baddyMoves(){
//   if (baddyMovingLeft){
//     moveBaddyLeft();
//     if (baddyXPosition <= 0)
//         return baddyMovingLeft = false;
//   }else if(!baddyMovingLeft){
//     moveBaddyRight();
//     if (baddyXPosition >= 800){
//        return baddyMovingLeft = true;
//     }
// }};


function gameLoop(): void {
  requestAnimationFrame(gameLoop);
  keyInput.inputLoop();
  ctx.fillStyle = "gray";
  ctx.fillRect(0, 0, 845, 800);
  zed1.buildZombie();
  zed2.buildZombie();
  zed3.buildZombie();
  zed4.buildZombie();
  zed5.buildZombie();
  ctx.save();
  ctx.translate(x, y);
  ctx.drawImage(hero, 0, 0, 45,45); 
  ctx.restore(); 
  };



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
};

function ddplUp(): void {
  y -= 2;
};

function ddplDown(): void {
  y += 2;
};

function ddplLeft(): void {
  x -= 2;
};

function ddplRight(): void {
  x += 2;
};

window.onload = () => {
  hero = <HTMLImageElement>document.getElementById("ddpl");
  baddy = <HTMLImageElement>document.getElementById("zed");
  canvas = <HTMLCanvasElement>document.getElementById("myCanvas");
  ctx = canvas.getContext("2d");

  keyInput = new KeyboardInput(); 
   // PRESS LEFT ARROW OR 'A' KEY
   keyInput.addKeycodeCallback(37, ddplLeft);
   keyInput.addKeycodeCallback(65, ddplLeft);

   // PRESS UP ARROW OR 'W' KEY
   keyInput.addKeycodeCallback(38, ddplUp);
   keyInput.addKeycodeCallback(87, ddplUp);

   // PRESS RIGHT ARROW OR 'D' KEY
   keyInput.addKeycodeCallback(39, ddplRight);
   keyInput.addKeycodeCallback(68, ddplRight);

   // PRESS DOWN ARROW OR 'S' KEY
   keyInput.addKeycodeCallback(40, ddplDown);
   keyInput.addKeycodeCallback(83, ddplDown);

   gameLoop();
};

