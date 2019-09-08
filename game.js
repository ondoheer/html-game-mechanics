import { Hero } from "./characters/Hero.js";
import { DrawManager } from "./managers/DrawManager.js";
import { keydown, keyup, mouseclick } from "./controls.js";
import { NormalBullet } from "./gameItems/Bullet.js";
import { debug } from "./debugger.js";

export const canvas = document.getElementById("mundo");
export const ctx = canvas.getContext("2d");
export const canvasWidth = canvas.width;
export const canvasHeight = canvas.height;

export let hero = new Hero();
let bullet = new NormalBullet(50, 125);
let bullet2 = new NormalBullet(50, 125);
let drawManager = new DrawManager(hero, [bullet, bullet2]);

// General Game draw
function gameDraw() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  drawManager.draw(ctx);
}
// General Game update
function update(progress) {
  //ctx.save();
  hero.update();
  bullet.update();
  //ctx.restore();
}

// General game loop
function loop(timestamp) {
  var progress = timestamp - lastRender;

  update(progress);
  gameDraw();

  lastRender = timestamp;

  window.requestAnimationFrame(loop);
  //debug();
}
// this is only used the first time
var lastRender = 0;
gameDraw();
window.requestAnimationFrame(loop);

window.addEventListener("keydown", keydown, false);
window.addEventListener("keyup", keyup, false);
window.addEventListener("click", mouseclick, false);
