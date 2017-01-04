let canvas = <HTMLCanvasElement>document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let x: number = 10;
let y: number = 10;
let gameOver: boolean = false;
let path = <HTMLImageElement>document.getElementById("path");
let pathPattern = ctx.createPattern(path , "repeat");

class Zombie {
  public zombieMovingLeft: boolean;
  public zombieImage;
  public zombieXPosition: number;
  public zombieYPosition: number;
  public zombieXPixels: number = 50;
  public zombieYPixels: number = 50;  
  public speed:number = 3;
  constructor(xpos:number,ypos:number,zombiemove:boolean) {
    this.zombieXPosition = xpos;
    this.zombieYPosition = ypos;
    this.zombieMovingLeft = zombiemove;
    if (this.speed === 3){
      let spd = (Math.random()*10)+1;
      if (4 <= spd && spd <= 12){
        this.speed = spd;
      }
    }
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
 
  build(){
     ctx.translate(x, y);
     ctx.drawImage(this.heroImage, this.heroXPosition, this.heroYPosition, this.heroXPixels, this.heroYPixels);
    
  }
   

}

class Wall{
  public startXPoint:number;
  public startYPoint:number;
  public width:number;
  public height:number;
  private pit = <HTMLImageElement>document.getElementById("lava");
  private pitPattern = ctx.createPattern(this.pit , "repeat");
  constructor(x,y,w,h){
    this.startXPoint = x;
    this.startYPoint = y;
    this.width = w;
    this.height = h;
      }
  build(){
   ctx.fillStyle = this.pitPattern; 
   ctx.fillRect(this.startXPoint, this.startYPoint, this.width, this.height);
  }
}

class Bridge{
  public theBridge = <HTMLImageElement>document.getElementById('bridge');
  public XCorner:number;
  public YCorner:number;
 
  constructor(ycorner){
    this.YCorner = ycorner;
    if (this.XCorner == undefined){
     let xc:number = Math.random()*1000;
      if (xc >= 1 && xc <= 800){
        this.XCorner = xc;
      }

  }
  
  }
  build(){
  ctx.drawImage(this.theBridge, this.XCorner, this.YCorner)
  }
  
  
}


let ddpl = new Hero();
let wall1 = new Wall(0, 70, 845, 70);
let wall2 = new Wall(0, 200, 845, 85);
let wall3 = new Wall(0, 350, 845, 85);
let wall4 = new Wall(0, 500, 845, 85);
let wall5 = new Wall(0, 650, 845, 85);
let wall6 = new Wall(0, 800, 845, 15);
let brdg1 = new Bridge(55);
let brdg2 = new Bridge(195);
let brdg21 = new Bridge(195);
let brdg3 = new Bridge(345);
let brdg31 = new Bridge(345);
let brdg4 = new Bridge(495);
let brdg41 = new Bridge(495);
let brdg5 = new Bridge(645);
let brdg51 = new Bridge(645);
let brdg52 = new Bridge(645);
let zed1 = new Zombie(400,150,true);
let zed2 = new Zombie(400,300,false);
let zed3 = new Zombie(400,450,true);
let zed4 = new Zombie(400,600,false);
let zed5 = new Zombie(400,750,true);

function initialize(){
  ctx.fillStyle = pathPattern;
  ctx.fillRect(0, 0, 845, 875);
  wall1.build();
  wall2.build();
  wall3.build();
  wall4.build();
  wall5.build();
  wall6.build();
  brdg1.build();
  brdg2.build();
  brdg21.build();
  brdg3.build();
  brdg31.build();
  brdg4.build();
  brdg41.build();
  brdg5.build();
  brdg51.build();
  brdg52.build();
  ctx.save();
}


function gameLoop(): void {
  requestAnimationFrame(gameLoop);
  keyInput.inputLoop();
  initialize();
  ctx.save(); 
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

