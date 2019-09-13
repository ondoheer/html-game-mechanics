import { LEFT_DIRECTION, RIGHT_DIRECTION } from "../config/entities.js";

export class Entity {
  constructor(x, y, width, height, color, speed, direction) {
    this._state = {
      isJumping: false,
      isFalling: false,
      exists: false
    };
    this.x = x;
    this.y = y;
    this.yVelocity = 0;
    this.xVelocity = 0;
    this.height = height;
    this.width = width;
    this.color = color;
    this.speed = speed;
    this.direction = direction;
  }
  exists() {
    return this._state.exists;
  }
  recall() {
    this._state.exists = false;
  }

  /**
   * Returns the 4 points defining an entity area
   */
  getArea() {
    const area = {
      x1: this.x,
      x2: this.x + this.width,
      y1: this.y,
      y2: this.y + this.height
    };
    return area;
  }
  /**
   * Based on the direction of the entity it sets the traveling speed for the X axis (so far)
   */
  setTravelSpeed() {
    switch (this.direction) {
      case LEFT_DIRECTION:
        this.xVelocity = -this.speed;
        break;
      case RIGHT_DIRECTION:
        this.xVelocity = this.speed;
        break;
      default:
        break;
    }
  }
  /**
   * Changes x and y positions for the entity so it can be drawn in a new place
   */
  travel() {
    this.x += this.xVelocity;
    this.y += this.yVelocity;
  }
  /**
   * Determines if this is colliding with another Entity entity
   * (their areas overlap)
   * @param {Entity} entity
   */
  isColliding(entity) {
    const _thisArea = this.getArea();
    const entityArea = entity.getArea();
    if (
      _thisArea.x1 > entityArea.x1 &&
      _thisArea.x1 < entityArea.x2 &&
      _thisArea.x2 > entityArea.x1 &&
      _thisArea.x2 > entityArea.x1 &&
      _thisArea.y1 > entityArea.y1 &&
      _thisArea.y1 < entityArea.y2 &&
      _thisArea.y2 > entityArea.y1 &&
      _thisArea.y2 < entityArea.y2
    ) {
      //console.log("went through");
      return true;
    }
    return false;
  }
  /**
   * This updates the entity position and state so it can be drawn
   */
  update() {
    this.setTravelSpeed();
    this.travel();
  }
  /**
   * This draws the entity in the canvas context
   * @param {Canvas2dContext} ctx
   */
  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
