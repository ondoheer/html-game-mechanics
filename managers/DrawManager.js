import { state } from "../state.js";
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
  drawStar(cx, cy, spikes, outerRadius, innerRadius) {
    var rot = (Math.PI / 2) * 3;
    var x = cx;
    var y = cy;
    var step = Math.PI / spikes;

    this.ctx.beginPath();
    this.ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      this.ctx.lineTo(x, y);
      rot += step;

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      this.ctx.lineTo(x, y);
      rot += step;
    }
    this.ctx.lineTo(cx, cy - outerRadius);
    this.ctx.closePath();
    this.ctx.lineWidth = 5;
    this.ctx.strokeStyle = "gold";
    this.ctx.stroke();
    this.ctx.fillStyle = "yellow";
    this.ctx.fill();
  }
  /**
   * clears the canvas to draw the next iteration of it
   */
  clear() {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
  }
  /**
   * Draws a you beat the game text
   */
  gameWon() {
    this.clear();
    this.ctx.font = "50px sans";
    this.ctx.fillText("You Won!!!!", 250, 150);
    this.ctx.fillStyle = "yellow";
    this.drawStar(150, 120, 5, 50, 25);
  }
  /**
   * Draws a game over text
   */
  gameOver() {
    this.ctx.font = "50px serif";
    this.ctx.fillText("Game Over", 300, 90);
  }
  killedEnemiesCounter() {
    this.ctx.font = "20px sans";
    this.ctx.fillStyle = "#fff";
    this.ctx.fillText(
      `Enemies Killed: ${state.enemiesKilled}`,
      this.canvasWidth - 200,
      30
    );
  }
  /**
   * Calls the draw function individually for all existing bullets
   */
  drawExistingBullets() {
    const bullets = this.bulletManager.entitiesDisplayed;

    for (let index = 0; index < bullets.length; index++) {
      bullets[index].draw(this.ctx);
    }
  }
  /**
   * calls teh draw function for all existing enemies
   * its separated from the bullets one because it runs over a different
   * array of entities
   */
  drawExistingEnemies() {
    const enemies = this.enemiesManager.entitiesDisplayed;
    for (let index = 0; index < enemies.length; index++) {
      enemies[index].draw(this.ctx);
    }
  }
  /**
   * calls all the independent drawing functions
   */
  drawExistingEntities() {
    this.drawExistingBullets();
    this.drawExistingEnemies();
    this.hero.draw(this.ctx);
  }
  /**
   * checks if an entity is out of the canvas
   * @param {Entity} element
   */
  isElementOutOfBounds(element) {
    return element.x > this.canvasWidth - element.width || element.x < 0;
  }
  /**
   * removes the bullets that are either disabled because they hit an entity or
   * because they are out of the screen. It moves them back to the poolOfBullets
   */
  disableBullets() {
    for (let i = 0; i < this.bulletManager.entitiesDisplayed.length; i++) {
      const bullet = this.bulletManager.entitiesDisplayed[i];
      if (this.isElementOutOfBounds(bullet) || !bullet._state.exists) {
        this.bulletManager.disableEntity(i);
      }
    }
  }
  /**
   * Checks if an Enemy has dies and moves it from the existing enemies array to
   * it's respective pool (I THINK THIS DOESN?T WORK FOR DIFFERENTE TYPES OF ENTITIES ATM)
   */
  disableEnemies() {
    for (let i = 0; i < this.enemiesManager.entitiesDisplayed.length; i++) {
      const enemy = this.enemiesManager.entitiesDisplayed[i];
      if (enemy.isDead()) {
        this.enemiesManager.disableEntity(i);
        // Será este el mejor sitio para ejecutar esto?
        enemy.destroy();
        enemy.reset();
        state.enemiesKilled += 1;
      }
    }
  }
  /**
   * Manually disables all kind of entities
   */
  disableEntities() {
    this.disableBullets();
    this.disableEnemies();
  }
  /**
   * Stops the hero from jumping or moving out of the canvas
   */
  blockHeroMovement() {
    if (this.isElementOutOfBounds(this.hero)) {
      this.hero.x = this.hero.x < 0 ? 0 : this.canvasWidth - this.hero.width;
      this.hero.stopMoving();
    }
  }
  /**
   * Manually calls all the functions required to update the canvas
   */
  draw() {
    this.drawExistingEntities();
    this.disableEntities();
    this.blockHeroMovement();
    this.killedEnemiesCounter();
  }
}
