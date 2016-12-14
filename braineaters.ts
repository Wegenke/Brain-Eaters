let canvas = <HTMLCanvasElement>document.getElementById("myCanvas");;
let ctx = canvas.getContext("2d");
let x: number = 10;
let y: number = 10;
let gameOver: boolean = false;

class Zombie {
  public zombieMovingLeft: boolean = false;
  public zombieImage;
  public zombieXPosition: number;
  public zombieYPosition: number;
  public zombieXPixels: number = 50;
  public zombieYPixels: number = 50;  
  public speed = (Math.random()*10)*2;
  constructor(xpos:number,ypos:number) {
    this.zombieXPosition = xpos;
    this.zombieYPosition = ypos;
  }

  moveRight(){
    this.zombieImage = <HTMLImageElement>document.getElementById("dez");
    ctx.drawImage(this.zombieImage, this.zombieXPosition, this.zombieYPosition, this.zombieXPixels, this.zombieYPixels);
    this.zombieXPosition += this.speed;
    if (this.zombieXPosition >= 800 ){
      this.zombieMovingLeft = true
    } 
    ctx.save(); 
  } 
  moveLeft (){
    this.zombieImage = <HTMLImageElement>document.getElementById("zed");
    ctx.drawImage(this.zombieImage, this.zombieXPosition, this.zombieYPosition, this.zombieXPixels, this.zombieYPixels);
    this.zombieXPosition -= this.speed;
    if (this.zombieXPosition <= 0){
      this.zombieMovingLeft = false;
    }
    ctx.save();
  }

  move(){
    if(this.zombieMovingLeft){
      this.moveLeft();
    }else if(!this.zombieMovingLeft){
      this.moveRight();
    }
  }

};

class Hero{
  public touchedAZombie: boolean = false;
  public heroImage = <HTMLImageElement>document.getElementById("ddpl");
  public heroXPosition: number = 0;
  public heroYPosition: number = 0;
  public heroXPixels: number = 50;
  public heroYPixels: number = 50;
 
  contact(){

  }
  build(){
     ctx.translate(x, y);
     ctx.drawImage(this.heroImage, this.heroXPosition, this.heroYPosition, this.heroXPixels, this.heroYPixels);
    
  }
   

}

let zed1 = new Zombie(400,150);
let zed2 = new Zombie(400,300);
zed2.zombieMovingLeft = true;
let zed3 = new Zombie(400,450);
let zed4 = new Zombie(400,600);
zed4.zombieMovingLeft = true;
let zed5 = new Zombie(400,750);
let ddpl = new Hero();

function gameLoop(): void {
  requestAnimationFrame(gameLoop);
  keyInput.inputLoop();
  ctx.fillStyle = "gray";
  ctx.fillRect(0, 0, 845, 875);
  zed1.move();
  zed2.move();
  zed3.move();
  zed4.move();
  zed5.move();
  ctx.save();  
  ddpl.build(); 
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
  y -= 3;
};

function ddplDown(): void {
  y += 3;
};

function ddplLeft(): void {
  x -= 3;
};

function ddplRight(): void {
  x += 3;
};

window.onload = () => {
  keyInput = new KeyboardInput(); 
  keyInput.addKeycodeCallback(37, ddplLeft);
  keyInput.addKeycodeCallback(65, ddplLeft);
  keyInput.addKeycodeCallback(38, ddplUp);
  keyInput.addKeycodeCallback(87, ddplUp);
  keyInput.addKeycodeCallback(39, ddplRight);
  keyInput.addKeycodeCallback(68, ddplRight);
  keyInput.addKeycodeCallback(40, ddplDown);
  keyInput.addKeycodeCallback(83, ddplDown);
  gameLoop();
};

