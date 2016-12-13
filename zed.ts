namespace zed {
let canvas;
let ctx;
let zed = new Image();
let x: number = 10;
let y: number = 0;

function gameLoop1(): void {
//   requestAnimationFrame(gameLoop1)
//   ctx.fillStyle = "#26034d";
//   ctx.fillRect(0, 0, 900, 700)
//   ctx.save();
//   ctx.translate(x, y);
  ctx.restore(); 
  ctx.drawImage(zed, 500, 500, zed.width, zed.height);
  ctx.save();
   
}
window.onload = () => {
    zed = <HTMLImageElement>document.getElementById("zed");
    canvas = <HTMLCanvasElement>document.getElementById("myCanvas");
    ctx  = canvas.getContext("2d");
    gameLoop1();
}}