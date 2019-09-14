import { DrawManager } from "../managers/DrawManager.js";
import { InputManager } from "../managers/InputManager.js";
import { state } from "../state.js";
import { keydown, keyup, mouseclick } from "../controls.js";
import { BulletFactory } from "../factories/BulletFactory.js";
import { NormalBullet } from "../entities/gameItems/Bullet.js";
import { NUMBER_OF_BULLETS } from "../config/elements.js";
import { LargeSquareFactory } from "../factories/LargeSquareFactory.js";
import { LargeSquare } from "../entities/enemies/LargeSquare.js";
import { EntitiesOrchestrator } from "../managers/EntitiesOrchestrator.js";

import { Hero } from "../entities/Hero.js";
import { BulletManager } from "../managers/BulletManager.js";
import { EnemiesManager } from "../managers/EnemiesManager.js";
import { CollisionManager } from "../managers/CollisionManager.js";

export class Game {
  constructor(htmlElement) {
    this.state = state;
    this.canvas = document.getElementById(htmlElement);
    this.lastRender = 0;
    //This object will contain all drawable entities
    // maybe for code cleanness it could move to another file
    // like game setup
    this.entities = {
      hero: new Hero(0, 100, 50, 50, "brown", 5), // this should be in a hero factory
      enemies: {
        largeSquares: {
          largeSquarePool: new LargeSquareFactory(
            10,
            LargeSquare
          ).produceEntities()
        },

        enemiesDisplayed: []
      },
      bullets: {
        bulletsPool: new BulletFactory(
          NUMBER_OF_BULLETS,
          NormalBullet
        ).produceEntities(),
        bulletsDisplayed: []
      }
    };

    // managers

    this.bulletManager = new BulletManager(
      this.entities.bullets.bulletsPool,
      this.entities.bullets.bulletsDisplayed
    );
    // this is only working for large squares needs to be refactored
    this.enemiesManager = new EnemiesManager(
      this.entities.enemies.largeSquares.largeSquarePool,
      this.entities.enemies.enemiesDisplayed
    );
    this.inputManager = new InputManager(
      this.bulletManager,
      this.entities.hero
    );
    this.drawManager = new DrawManager(
      this.canvas,
      this.bulletManager,
      this.enemiesManager,
      this.entities
    );
    this.collisionManager = new CollisionManager(this.entities);
  }

  gameOver() {
    this.drawManager.gameOver();
    console.log("GAMEOVER");
  }
  init() {
    // controls
    window.addEventListener("keydown", keydown, false);
    window.addEventListener("keyup", keyup, false);
    window.addEventListener("click", mouseclick, false);

    // Create enemies
    this.enemiesManager.enableEntity(120, 70);

    // canvas drawing and updating
    this.gameDraw();
    window.requestAnimationFrame(this.loop.bind(this));
  }
  loop(timestamp) {
    let progress = timestamp - this.lastRender;

    this.update(progress);
    this.gameDraw();

    this.lastRender = timestamp;
    const requestId = window.requestAnimationFrame(this.loop.bind(this));
    /**
     * Stops the game if it has ended
     */
    if (this.state.gameOver) {
      this.gameOver();
      window.cancelAnimationFrame(requestId);
    }
  }

  gameDraw() {
    this.drawManager.clear();
    this.drawManager.draw();
  }

  update(progress) {
    //ctx.save();
    this.inputManager.handleInput();
    this.entities.hero.update();
    // Update all the bullets on screen
    for (
      let bullet = 0;
      bullet < this.entities.bullets.bulletsDisplayed.length;
      bullet++
    ) {
      this.entities.bullets.bulletsDisplayed[bullet].update();

      this.collisionManager.bulletCollision(
        this.entities.bullets.bulletsDisplayed[bullet]
      );
    }
    // check if hero has collided
    this.collisionManager.heroCollision();
    // check if game is over

    //ctx.restore();
  }
}
