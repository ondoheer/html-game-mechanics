import { DrawManager } from "../managers/DrawManager.js";
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

    this.bulletFactory = new BulletFactory();
    this.hero = new Hero();
    this.bulletsPool = this.bulletFactory.produceBullets();
    this.bulletsDisplayed = [];
    this.drawManager = new DrawManager();
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
  handleInput() {
    switch (state.input) {
      case MOUSE_CLICKED:
        console.log("clicked");

      default:
        break;
    }
  }
  update(progress) {
    //ctx.save();
    this.handleInput();
    this.hero.update();
    for (let bullet = 0; bullet < this.bulletsDisplayed.length; bullet++) {
      this.bulletsDisplayed[bullet].update();
    }

    //ctx.restore();
  }
}
