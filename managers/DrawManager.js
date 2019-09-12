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
  drawHero() {
    this.ctx.fillStyle = this.hero.color;
    this.ctx.fillRect(
      this.hero.x,
      this.hero.y,
      this.hero.width,
      this.hero.height
    );
  }
  drawBullet(bullet) {
    this.ctx.fillStyle = bullet.color;
    this.ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
  }
  drawExistingBullets() {
    const bullets = this.bulletManager.entitiesDisplayed;

    for (let index = 0; index < bullets.length; index++) {
      this.drawBullet(bullets[index]);
    }
  }
  drawExistingEnemies() {
    const enemies = this.enemiesManager.entitiesDisplayed;
    for (let index = 0; index < enemies.length; index++) {
      this.drawBullet(enemies[index]);
    }
  }
  drawExistingEntities() {
    this.drawExistingBullets();
    this.drawExistingEnemies();
    this.drawHero();
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
