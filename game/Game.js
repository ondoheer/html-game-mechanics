import { DrawManager } from "../managers/DrawManager.js";
import { InputManager } from "../managers/InputManager.js";
import { keydown, keyup, mouseclick } from "../controls.js";
import { BulletFactory } from "../factories/BulletFactory.js";

// testing

import { Hero } from "../entities/Hero.js";
import { BulletManager } from "../managers/BulletManager.js";

export class Game {
  constructor(htmlElement) {
    this.canvas = document.getElementById(htmlElement);
    this.lastRender = 0;

    // characters
    this.hero = new Hero(0, 100, 50, 50, "brown", 5);
    console.log(this.hero);
    // bullets
    this.bulletFactory = new BulletFactory();
    this.bulletsPool = this.bulletFactory.produceBullets();
    this.bulletsDisplayed = [];
    // managers

    this.bulletManager = new BulletManager(
      this.bulletsPool,
      this.bulletsDisplayed
    );
    this.inputManager = new InputManager(this.bulletManager, this.hero);
    this.drawManager = new DrawManager(
      this.canvas,
      this.bulletManager,
      this.hero
    );
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
    this.drawManager.clear();
    this.drawManager.draw();
  }

  update(progress) {
    //ctx.save();
    this.inputManager.handleInput();
    this.hero.update();
    // Update all the bullets on screen
    for (let bullet = 0; bullet < this.bulletsDisplayed.length; bullet++) {
      this.bulletsDisplayed[bullet].update();
    }

    //ctx.restore();
  }
}
