import { DrawManager } from "../managers/DrawManager.js";
import { InputManager } from "../managers/InputManager.js";
import { state } from "../state.js";
import { keydown, keyup, mouseclick } from "../controls.js";
import { BulletFactory } from "../factories/BulletFactory.js";
import { NormalBullet } from "../entities/gameItems/Bullet.js";
import { NUMBER_OF_BULLETS } from "../config/elements.js";
import { EntityFactory } from "../factories/EntityFactory.js";
import { LargeSquare } from "../entities/enemies/LargeSquare.js";
import { SmallBall } from "../entities/enemies/SmallBall.js";
import { EnemiesOrchestrator } from "../managers/EnemiesOrchestrator.js";

import { Hero } from "../entities/Hero.js";
import { BulletManager } from "../managers/BulletManager.js";
import { EnemiesManager } from "../managers/EnemiesManager.js";
import { CollisionManager } from "../managers/CollisionManager.js";
import { getRandomNumberBetween } from "../utils.js";

export class Game {
  constructor(htmlElement) {
    this.state = state;
    this.canvas = document.getElementById(htmlElement);
    this.lastRender = 0;
    //This object will contain all drawable entities
    // maybe for code cleanness it could move to another file
    // like game setup
    this.entities = {
      hero: new Hero(20, 100, 50, 50, "brown", 5), // this should be in a hero factory
      enemies: {
        largeSquares: {
          largeSquarePool: new EntityFactory(4, LargeSquare).produceEntities()
        },
        smallBalls: {
          smallBallPool: new EntityFactory(10, SmallBall).produceEntities()
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

    /**
     * managers and Orchestrators
     */

    // Bullets
    this.bulletManager = new BulletManager(
      this.entities.bullets.bulletsPool,
      this.entities.bullets.bulletsDisplayed
    );
    // this is only working for large squares needs to be refactored
    this.enemiesManager = new EnemiesManager(
      this.entities.enemies.smallBalls.smallBallPool,
      this.entities.enemies.enemiesDisplayed
    );
    // Input
    this.inputManager = new InputManager(
      this.bulletManager,
      this.entities.hero
    );
    // Drawing
    this.drawManager = new DrawManager(
      this.canvas,
      this.bulletManager,
      this.enemiesManager,
      this.entities
    );
    // Collisions
    this.collisionManager = new CollisionManager(this.entities);
    // Enemies orchestrator
    this.enemiesOrchestrator = new EnemiesOrchestrator(
      this.entities,
      this.enemiesManager
    );
  }

  gameOver() {
    this.drawManager.gameOver();
    console.log("GAMEOVER");
  }
  gameWon() {
    this.drawManager.gameWon();
    console.log("YOU WON");
  }
  winCondition() {
    return this.state.enemiesKilled == this.state.winCondition;
  }

  init() {
    // controls
    window.addEventListener("keydown", keydown, false);
    window.addEventListener("keyup", keyup, false);
    window.addEventListener("click", mouseclick, false);

    // Create enemies randomly
    const interval = getRandomNumberBetween(600, 1000);
    setInterval(() => {
      try {
        this.enemiesManager.enableEnemy(this.canvas);
      } catch (error) {}
    }, interval);

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
    } else if (this.winCondition()) {
      this.gameWon();
      window.cancelAnimationFrame(requestId);
    }
  }

  gameDraw() {
    this.drawManager.clear();
    this.drawManager.draw();
  }

  update(progress) {
    //ctx.save();
    // manage hero on the screen
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
    // Orchestrate enemies appearance
    //this.enemiesOrchestrator.orchestrate();
    // Manage enemies movement
    for (let i = 0; i < this.entities.enemies.enemiesDisplayed.length; i++) {
      const enemy = this.entities.enemies.enemiesDisplayed[i];
      enemy.travel();
    }
    //ctx.restore();
  }
}
