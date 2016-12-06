let canvas = document.getElementById("myCanvas");
let context = canvas.getContext("2d");
let img = new Image();
img.src = "zombie.gif";
window.addEventListener("load", () => {
      context.drawImage(img, 0, 0);
  });

let mainLoop = function(){
  updateGame();
  drawGame();
};
setInterval(mainLoop, ONE_FRAME_TIME);
