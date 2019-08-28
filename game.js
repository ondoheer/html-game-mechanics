import { Personaje } from "./characters/personaje.js";

const canvas = document.getElementById("mundo");
const ctx = canvas.getContext("2d");
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

let p = new Personaje();
let p2 = new Personaje(50, 50, 50, "blue");

// General Game draw
function gameDraw() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  p.draw(ctx);
  p2.draw(ctx);
}
// General Game update
function update(progress) {
  ctx.save();
  p.x += 50;
  ctx.restore();
}

// General game loop
function loop(timestamp) {
  var progress = timestamp - lastRender;

  update(progress);
  gameDraw();

  lastRender = timestamp;
  window.requestAnimationFrame(loop);
}
// this is only used the first time
var lastRender = 0;
gameDraw();
window.requestAnimationFrame(loop);
