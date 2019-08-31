import { Hero } from "./characters/Hero.js";

import { keydown, keyup } from "./controls.js";

export const canvas = document.getElementById("mundo");
export const ctx = canvas.getContext("2d");
export const canvasWidth = canvas.width;
export const canvasHeight = canvas.height;

let hero = new Hero();

// General Game draw
function gameDraw() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  hero.draw(ctx);
}
// General Game update
function update(progress) {
  //ctx.save();
  hero.update(progress);
  //ctx.restore();
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

window.addEventListener("keydown", keydown, false);
window.addEventListener("keyup", keyup, false);
