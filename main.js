import { Game } from "./game/Game.js";

// export let hero = new Hero();
// let bullet = new NormalBullet(50, 125);
// let bullet2 = new NormalBullet(50, 125);
// let drawManager = new DrawManager(hero, [bullet, bullet2]);

const game = new Game("mundo");
export const canvasHeight = game.canvasHeight;
export const canvasWidth = game.canvasWidth;
game.init();
