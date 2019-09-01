import { state } from "./state.js";

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

export function keydown(event) {
  state.input = `${KEY_MAP[event.code]}_PRESSED`;
}
export function keyup(event) {
  state.input = `${KEY_MAP[event.code]}_RELEASED`;
}
