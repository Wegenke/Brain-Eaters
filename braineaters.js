var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
var img = new Image();
img.src = "zombie.gif";
window.addEventListener("load", function () {
    context.drawImage(img, 0, 0);
});
var mainLoop = function () {
    updateGame();
    drawGame();
};
setInterval(mainLoop, ONE_FRAME_TIME);
