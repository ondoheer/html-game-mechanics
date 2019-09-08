import { DrawManager } from "../managers/DrawManager.js";
import { InputManager } from "../managers/InputManager.js";
import { keydown, keyup, mouseclick, MOUSE_CLICKED } from "../controls.js";
import { BulletFactory } from "../factories/BulletFactory.js";
import { state } from "../state.js";

// testing

import { Hero } from "../characters/Hero.js";

export class Game {
  constructor(htmlElement) {
    this.canvas = document.getElementById(htmlElement);
    this.ctx = this.canvas.getContext("2d");
    this.canvasWidth = this.canvas.width;
    this.canvasHeight = this.canvas.height;
    this.lastRender = 0;

    // characters
    this.hero = new Hero();
    // bullets
    this.bulletFactory = new BulletFactory();
    this.bulletsPool = this.bulletFactory.produceBullets();
    this.bulletsDisplayed = [];
    // managers

    this.drawManager = new DrawManager();
    this.inputManager = new InputManager(this.hero);
  }

  init() {
    // controls
    window.addEventListener("keydown", keydown, false);
    window.addEventListener("keyup", keyup, false);
    window.addEventListener("click", mouseclick, false);

    // canvas drawing and updating

    this.gameDraw();
    window.requestAnimationFrame(this.loop.bind(this));
  }
  loop(timestamp) {
    let progress = timestamp - this.lastRender;

    this.update(progress);
    this.gameDraw();

    this.lastRender = timestamp;

    window.requestAnimationFrame(this.loop.bind(this));
  }

  gameDraw() {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.drawManager.draw(this.ctx, this.hero, this.bulletsDisplayed);
  }

  update(progress) {
    //ctx.save();
    this.inputManager.handleInput();
    this.hero.update();
    for (let bullet = 0; bullet < this.bulletsDisplayed.length; bullet++) {
      this.bulletsDisplayed[bullet].update();
    }

    //ctx.restore();
  }
}
