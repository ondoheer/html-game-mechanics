import { state } from "./state.js";
import { NormalBullet } from "./gameItems/Bullet.js";
export const KEY_MAP = {
  KeyD: "MOVE_RIGHT",
  KeyA: "MOVE_LEFT",
  Space: "JUMP"
};

export const MOVE_LEFT_PRESSED = "MOVE_LEFT_PRESSED";
export const MOVE_RIGHT_PRESSED = "MOVE_RIGHT_PRESSED";
export const JUMP_PRESSED = "JUMP_PRESSED";

export const MOVE_LEFT_RELEASED = "MOVE_LEFT_RELEASED";
export const MOVE_RIGHT_RELEASED = "MOVE_RIGHT_RELEASED";
export const JUMP_RELEASED = "JUMP_RELEASED";
export const MOUSE_CLICKED = "MOUSE_CLICKED";

export function keydown(event) {
  state.input = `${KEY_MAP[event.code]}_PRESSED`;
}
export function keyup(event) {
  state.input = `${KEY_MAP[event.code]}_RELEASED`;
}

export function mouseclick(event) {
  // decidir si necesito que entre al state machine
  state.input = MOUSE_CLICKED;

  shoot();
}

export const shoot = () => {
  console.log("shoot");
};
