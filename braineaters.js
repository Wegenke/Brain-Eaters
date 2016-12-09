var canvas;
var ctx;
var hero = new Image();
var baddy = new Image();
var x = 50;
var y = 50;
function baddyBank() {
    // ctx.fillRect(0, 0, 700, 700);
    ctx.drawImage(baddy, 500, 500, baddy.width, baddy.height);
    ctx.save();
    // ctx.translate(x, y)
}
function gameLoop() {
    requestAnimationFrame(gameLoop);
    keyInput.inputLoop();
    ctx.fillStyle = "#26034d";
    ctx.fillRect(0, 0, 900, 700);
    ctx.save();
    ctx.translate(x, y);
    ctx.drawImage(hero, 0, 0, hero.width, hero.height);
    ctx.restore();
    baddyBank();
}
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
function ddplUp() {
    y -= 2;
}
function ddplDown() {
    y += 2;
}
function ddplLeft() {
    x -= 2;
}
function ddplRight() {
    x += 2;
}
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
