let canvas = <HTMLCanvasElement>document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let gameOver: boolean = false;
let path = <HTMLImageElement>document.getElementById("path");
let pathPattern = ctx.createPattern(path , "repeat");
let zeds = [];
let alive:boolean = true;

document.onkeydown = function myFunction() {
switch (event.keyCode) {
case 38:
    ddpl.heroYPosition -= 25;
    break;
case 40:
    ddpl.heroYPosition += 25;
    break;
case 37:
    ddpl.heroXPosition -= 25;
    break;
case 39:
    ddpl.heroXPosition += 25;
    break;
}} 

class Zombie {
  public zombieMovingLeft: boolean;
  public zombieImage;
  public zombieXPosition: number;
  public zombieYPosition: number;
  public zombieXPixels: number = 50;
  public zombieYPixels: number = 50;  
  public speed:number = 3;
  constructor(xpos:number,ypos:number,zombiemove:boolean) {
    zeds.push(this);
    this.zombieXPosition = xpos;
    this.zombieYPosition = ypos;
    this.zombieMovingLeft = zombiemove;
    // if (this.speed === 3){
    //   let spd = (Math.random()*10)+1;
    //   if (4 <= spd && spd <= 12){
    //     this.speed = spd;
    //   }
    // }
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
let brdg11 = new Bridge(55);
brdg11.XCorner = 785;
let brdg2 = new Bridge(195);
let brdg21 = new Bridge(195);
brdg21.XCorner = 15;
let brdg3 = new Bridge(345);
let brdg31 = new Bridge(345);
brdg31.XCorner = 785;
let brdg4 = new Bridge(495);
let brdg41 = new Bridge(495);
brdg41.XCorner = 15;
let brdg5 = new Bridge(645);
let brdg51 = new Bridge(645);
brdg51.XCorner = 785;
let brdg6 = new Bridge(645);
brdg6.XCorner = 400;
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
  brdg11.build();
  brdg2.build();
  brdg21.build();
  brdg3.build();
  brdg31.build();
  brdg4.build();
  brdg41.build();
  brdg5.build();
  brdg51.build();
  brdg6.build();
  ctx.save();
}

function colided(){
  for (let i = 0; i<zeds.length; i++){
   let diff = zeds[i].zombieYPosition - ddpl.heroXPosition
    if (diff <= 50){
     !alive;
    }
  }
}


function gameLoop(): void {
  requestAnimationFrame(gameLoop);
  ctx.save(); 
  colided(); 
  zed1.move();
  zed2.move();
  zed3.move();
  zed4.move();
  zed5.move(); 
  ctx.save(); 
  ddpl.build();
  ctx.restore(); 
  };

initialize();
while(alive){gameLoop()};

