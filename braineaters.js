var canvas = document.getElementById("myCanvas");
;
var ctx = canvas.getContext("2d");
var x = 10;
var y = 10;
var gameOver = false;
var Zombie = (function () {
    function Zombie(xpos, ypos) {
        this.zombieMovingLeft = false;
        this.zombieXPixels = 50;
        this.zombieYPixels = 50;
        this.speed = (Math.random() * 10) * 2;
        this.zombieXPosition = xpos;
        this.zombieYPosition = ypos;
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
    Hero.prototype.contact = function () {
    };
    Hero.prototype.build = function () {
        ctx.translate(x, y);
        ctx.drawImage(this.heroImage, this.heroXPosition, this.heroYPosition, this.heroXPixels, this.heroYPixels);
    };
    return Hero;
}());
var zed1 = new Zombie(400, 150);
var zed2 = new Zombie(400, 300);
zed2.zombieMovingLeft = true;
var zed3 = new Zombie(400, 450);
var zed4 = new Zombie(400, 600);
zed4.zombieMovingLeft = true;
var zed5 = new Zombie(400, 750);
var ddpl = new Hero();
function gameLoop() {
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
}
;
var KeyboardInput = (function () {
    function KeyboardInput() {
        var _this = this;
        this.keyCallback = {};
        this.keyDown = {};
        this.addKeycodeCallback = function (keycode, f) {
            _this.keyCallback[keycode] = f;
            _this.keyDown[keycode] = false;
        };
        this.keyboardDown = function (event) {
            event.preventDefault();
            _this.keyDown[event.keyCode] = true;
        };
        this.keyboardUp = function (event) {
            _this.keyDown[event.keyCode] = false;
        };
        this.inputLoop = function () {
            for (var key in _this.keyDown) {
                var is_down = _this.keyDown[key];
                if (is_down) {
                    var callback = _this.keyCallback[key];
                    if (callback != null) {
                        callback();
                    }
                }
            }
        };
        document.addEventListener("keydown", this.keyboardDown);
        document.addEventListener("keyup", this.keyboardUp);
    }
    return KeyboardInput;
}());
;
function ddplUp() {
    y -= 3;
}
;
function ddplDown() {
    y += 3;
}
;
function ddplLeft() {
    x -= 3;
}
;
function ddplRight() {
    x += 3;
}
;
window.onload = function () {
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
