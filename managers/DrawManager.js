export class DrawManager {
  constructor(canvas, bulletManager, enemiesManager, entities) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.canvasWidth = this.canvas.width;
    this.canvasHeight = this.canvas.height;
    this.bulletManager = bulletManager;
    this.enemiesManager = enemiesManager;
    this.hero = entities.hero;
  }
  clear() {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
  }

  drawExistingBullets() {
    const bullets = this.bulletManager.entitiesDisplayed;

    for (let index = 0; index < bullets.length; index++) {
      bullets[index].draw(this.ctx);
    }
  }
  drawExistingEnemies() {
    const enemies = this.enemiesManager.entitiesDisplayed;
    for (let index = 0; index < enemies.length; index++) {
      enemies[index].draw(this.ctx);
    }
  }
  drawExistingEntities() {
    this.drawExistingBullets();
    this.drawExistingEnemies();
    this.hero.draw(this.ctx);
  }

  isElementOutOfBounds(element) {
    return element.x > this.canvasWidth - element.width || element.x < 0;
  }

  disableBullets() {
    // method 1 is checking if they are out of the screen
    for (let i = 0; i < this.bulletManager.entitiesDisplayed.length; i++) {
      const bullet = this.bulletManager.entitiesDisplayed[i];
      if (this.isElementOutOfBounds(bullet)) {
        this.bulletManager.disableEntity(i);
      }
    }
    // method 2 is checking if they collisioned with something
  }
  disableEnemies() {
    for (let i = 0; i < this.enemiesManager.entitiesDisplayed.length; i++) {
      const enemy = this.enemiesManager.entitiesDisplayed[i];
      if (enemy.isDead()) {
        this.enemiesManager.disableEntity(i);
        // Será este el mejor sitio para ejecutar esto?
        enemy.destroy();
      }
    }
  }
  disableEntities() {
    this.disableBullets();
    this.disableEnemies();
  }
  blockHeroMovement() {
    if (this.isElementOutOfBounds(this.hero)) {
      this.hero.x = this.hero.x < 0 ? 0 : this.canvasWidth - this.hero.width;
      this.hero.stopMoving();
    }
  }

  draw() {
    this.drawExistingEntities();
    this.disableEntities();
    this.blockHeroMovement();
  }
}
