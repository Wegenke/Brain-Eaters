var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var gameOver = false;
var path = document.getElementById("path");
var pathPattern = ctx.createPattern(path, "repeat");
var zeds = [];
var tacos = [];
var alive;
var gameover = document.getElementById('boom');
var winner = document.getElementById('win');
var score = 0;
var scoreCard = document.getElementById('score');
var exit = document.getElementById("exit");
var roundEnd;
function heroMove() {
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
}
var Zombie = (function () {
    function Zombie(xpos, ypos, zombiemove) {
        this.zombieXPixels = 50;
        this.zombieYPixels = 50;
        this.speed = 3;
        zeds.push(this);
        this.zombieXPosition = xpos;
        this.zombieYPosition = ypos;
        this.zombieMovingLeft = zombiemove;
        if (this.speed === 3) {
            var spd = (Math.random() * 10) + 1;
            if (4 <= spd && spd <= 7.5) {
                this.speed = spd;
            }
        }
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
var Taco = (function () {
    function Taco(Ypos) {
        this.taco = document.getElementById("taco");
        this.xpos = 400;
        this.xpix = 70;
        this.ypix = 70;
        tacos.push(this);
        this.ypos = Ypos;
        if (this.xpos === 400) {
            var xp = Math.random() * 1000;
            if (xp >= 50 && xp <= 750) {
                this.xpos = xp;
            }
        }
    }
    Taco.prototype.build = function () {
        ctx.drawImage(this.taco, this.xpos, this.ypos, this.xpix, this.ypix);
    };
    return Taco;
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
            if (xc >= 10 && xc <= 780) {
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
var brdg6 = new Bridge(765);
brdg6.XCorner = 400;
var zed1 = new Zombie(400, 150, true);
var zed2 = new Zombie(400, 300, false);
var zed3 = new Zombie(400, 450, true);
var zed4 = new Zombie(400, 600, false);
var zed5 = new Zombie(400, 750, true);
var taco1 = new Taco(140);
var taco2 = new Taco(290);
var taco3 = new Taco(440);
var taco4 = new Taco(590);
var taco5 = new Taco(740);
var taco6 = new Taco(820);
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
function tacoDrop() {
    taco1.build();
    taco2.build();
    taco3.build();
    taco4.build();
    taco5.build();
    taco6.build();
    ctx.save();
}
function grabbedTaco() {
    for (var i = 0; i < tacos.length; i++) {
        var xdif = Math.abs(tacos[i].xpos - ddpl.heroXPosition);
        var ydif = Math.abs(tacos[i].ypos - ddpl.heroYPosition);
        if (xdif <= 25 && ydif <= 25) {
            tacos[i].xpos += 1000;
            score++;
        }
    }
}
function colided() {
    alive = true;
    for (var i = 0; i < zeds.length; i++) {
        var xdiff = Math.abs(zeds[i].zombieXPosition - ddpl.heroXPosition);
        var ydiff = Math.abs(zeds[i].zombieYPosition - ddpl.heroYPosition);
        if (xdiff <= 30 && ydiff <= 30) {
            alive = false;
        }
    }
}
function beatRound() {
    roundEnd = false;
    if (score === 6) {
        if (ddpl.heroXPosition >= 755 && ddpl.heroYPosition >= 800) {
            roundEnd = true;
        }
    }
}
function gameLoop() {
    scoreCard.innerHTML = score;
    heroMove();
    grabbedTaco();
    colided();
    beatRound();
    if (alive && !roundEnd) {
        requestAnimationFrame(gameLoop);
        initialize();
        tacoDrop();
        ctx.save();
        zed1.move();
        zed2.move();
        zed3.move();
        zed4.move();
        zed5.move();
        ctx.drawImage(exit, 750, 795, 100, 100);
        ctx.save();
        ddpl.build();
        ctx.restore();
    }
    else if (!alive) {
        ctx.drawImage(gameover, 0, 0, 845, 875);
    }
    else if (roundEnd) {
        ctx.drawImage(winner, 0, 0, 845, 875);
    }
}
;
window.onload = function () {
    gameLoop();
};
