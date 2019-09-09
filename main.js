import { Game } from "./game/Game.js";

const game = new Game("mundo");
// Hacks x q necesito estos valores para el Hero hasta que
// haya generado un world manager
export const canvasHeight = game.canvas.height;
export const canvasWidth = game.canvas.width;
game.init();
