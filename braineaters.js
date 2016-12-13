var canvas;
var ctx;
var hero = new Image();
var x = 50;
var y = 50;
var baddyXPosition = 10;
var baddyMovingLeft = false;
// let zx1: boolean = false;
// let zx2: boolean = false;
// let zx3: boolean = false;
// let zx4: boolean = false;
var Zombie = (function () {
    function Zombie(xpos, ypos) {
        this.zombieXPixels = 45;
        this.zombieYPixels = 45;
        this.zombieImage = document.getElementById("zed");
        this.zombieXPosition = xpos;
        this.zombieYPosition = ypos;
    }
    Zombie.prototype.buildZombie = function () {
        ctx.drawImage(this.zombieImage, this.zombieXPosition, this.zombieYPosition, this.zombieXPixels, this.zombieYPixels);
    };
    return Zombie;
}());
;
var zed1 = new Zombie(200, 200);
var zed2 = new Zombie(300, 300);
var zed3 = new Zombie(400, 400);
var zed4 = new Zombie(500, 500);
var zed5 = new Zombie(600, 600);
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
function gameLoop() {
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
    ctx.drawImage(hero, 0, 0, 45, 45);
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
    y -= 2;
}
;
function ddplDown() {
    y += 2;
}
;
function ddplLeft() {
    x -= 2;
}
;
function ddplRight() {
    x += 2;
}
;
window.onload = function () {
    hero = document.getElementById("ddpl");
    baddy = document.getElementById("zed");
    canvas = document.getElementById("myCanvas");
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
