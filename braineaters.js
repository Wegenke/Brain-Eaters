var canvas;
var ctx;
var img;
var x = 50;
var y = 50;
function gameLoop() {
    requestAnimationFrame(gameLoop);
    keyInput.inputLoop();
    ctx.fillStyle = "#26034d";
    ctx.fillRect(0, 0, 900, 700);
    ctx.save();
    ctx.translate(x, y);
    ctx.drawImage(img, 0, 0, img.width, img.height);
    ctx.restore();
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
function marioUp() {
    y -= 2;
}
function marioDown() {
    y += 2;
}
function marioLeft() {
    x -= 2;
}
function marioRight() {
    x += 2;
}
window.onload = function () {
    img = document.getElementById("mario");
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");
    keyInput = new KeyboardInput();
    keyInput.addKeycodeCallback(37, marioLeft);
    keyInput.addKeycodeCallback(65, marioLeft);
    keyInput.addKeycodeCallback(38, marioUp);
    keyInput.addKeycodeCallback(87, marioUp);
    keyInput.addKeycodeCallback(39, marioRight);
    keyInput.addKeycodeCallback(68, marioRight);
    keyInput.addKeycodeCallback(40, marioDown);
    keyInput.addKeycodeCallback(83, marioDown);
    gameLoop();
};
