var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var gameOver = false;
var path = document.getElementById("path");
var pathPattern = ctx.createPattern(path, "repeat");
var zeds = [];
var alive = true;
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
    }
};
var Zombie = (function () {
    function Zombie(xpos, ypos, zombiemove) {
        this.zombieXPixels = 50;
        this.zombieYPixels = 50;
        this.speed = 3;
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
    Zombie.prototype.moveRight = function () {
        this.zombieImage = document.getElementById("dez");
        ctx.drawImage(this.zombieImage, this.zombieXPosition, this.zombieYPosition, this.zombieXPixels, this.zombieYPixels);
        this.zombieXPosition += this.speed;
        if (this.zombieXPosition >= 800) {
            this.zombieMovingLeft = true;
        }
        ctx.save();
    };
    Zombie.prototype.moveLeft = function () {
        this.zombieImage = document.getElementById("zed");
        ctx.drawImage(this.zombieImage, this.zombieXPosition, this.zombieYPosition, this.zombieXPixels, this.zombieYPixels);
        this.zombieXPosition -= this.speed;
        if (this.zombieXPosition <= 0) {
            this.zombieMovingLeft = false;
        }
        ctx.save();
    };
    Zombie.prototype.move = function () {
        if (this.zombieMovingLeft) {
            this.moveLeft();
        }
        else if (!this.zombieMovingLeft) {
            this.moveRight();
        }
    };
    return Zombie;
}());
;
var Hero = (function () {
    function Hero() {
        this.touchedAZombie = false;
        this.heroImage = document.getElementById("ddpl");
        this.heroXPosition = 0;
        this.heroYPosition = 0;
        this.heroXPixels = 50;
        this.heroYPixels = 50;
    }
    Hero.prototype.build = function () {
        ctx.drawImage(this.heroImage, this.heroXPosition, this.heroYPosition, this.heroXPixels, this.heroYPixels);
    };
    return Hero;
}());
var Wall = (function () {
    function Wall(x, y, w, h) {
        this.pit = document.getElementById("lava");
        this.pitPattern = ctx.createPattern(this.pit, "repeat");
        this.startXPoint = x;
        this.startYPoint = y;
        this.width = w;
        this.height = h;
    }
    Wall.prototype.build = function () {
        ctx.fillStyle = this.pitPattern;
        ctx.fillRect(this.startXPoint, this.startYPoint, this.width, this.height);
    };
    return Wall;
}());
var Bridge = (function () {
    function Bridge(ycorner) {
        this.theBridge = document.getElementById('bridge');
        this.YCorner = ycorner;
        if (this.XCorner == undefined) {
            var xc = Math.random() * 1000;
            if (xc >= 1 && xc <= 800) {
                this.XCorner = xc;
            }
        }
    }
    Bridge.prototype.build = function () {
        ctx.drawImage(this.theBridge, this.XCorner, this.YCorner);
    };
    return Bridge;
}());
var ddpl = new Hero();
var wall1 = new Wall(0, 70, 845, 70);
var wall2 = new Wall(0, 200, 845, 85);
var wall3 = new Wall(0, 350, 845, 85);
var wall4 = new Wall(0, 500, 845, 85);
var wall5 = new Wall(0, 650, 845, 85);
var wall6 = new Wall(0, 800, 845, 15);
var brdg1 = new Bridge(55);
var brdg11 = new Bridge(55);
brdg11.XCorner = 785;
var brdg2 = new Bridge(195);
var brdg21 = new Bridge(195);
brdg21.XCorner = 15;
var brdg3 = new Bridge(345);
var brdg31 = new Bridge(345);
brdg31.XCorner = 785;
var brdg4 = new Bridge(495);
var brdg41 = new Bridge(495);
brdg41.XCorner = 15;
var brdg5 = new Bridge(645);
var brdg51 = new Bridge(645);
brdg51.XCorner = 785;
var brdg6 = new Bridge(645);
brdg6.XCorner = 400;
var zed1 = new Zombie(400, 150, true);
var zed2 = new Zombie(400, 300, false);
var zed3 = new Zombie(400, 450, true);
var zed4 = new Zombie(400, 600, false);
var zed5 = new Zombie(400, 750, true);
function initialize() {
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
function colided() {
    for (var i = 0; i < zeds.length; i++) {
        var diff = zeds[i].zombieYPosition - ddpl.heroXPosition;
        if (diff <= 50) {
            !alive;
        }
    }
}
function gameLoop() {
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
}
;
initialize();
while (alive) {
    gameLoop();
}
;
