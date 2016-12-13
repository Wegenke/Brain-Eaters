var zed;
(function (zed_1) {
    var canvas;
    var ctx;
    var zed = new Image();
    var x = 10;
    var y = 0;
    function gameLoop1() {
        //   requestAnimationFrame(gameLoop1)
        //   ctx.fillStyle = "#26034d";
        //   ctx.fillRect(0, 0, 900, 700)
        //   ctx.save();
        //   ctx.translate(x, y);
        ctx.restore();
        ctx.drawImage(zed, 500, 500, zed.width, zed.height);
        ctx.save();
    }
    window.onload = function () {
        zed = document.getElementById("zed");
        canvas = document.getElementById("myCanvas");
        ctx = canvas.getContext("2d");
        gameLoop1();
    };
})(zed || (zed = {}));
