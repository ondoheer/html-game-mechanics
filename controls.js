import { state } from "./state.js";

export const KEY_MAP = {
  KeyD: "right",
  KeyA: "left",
  Space: "jump"
};

export function keydown(event) {
  var key = KEY_MAP[event.code];
  //console.log(`keydown: ${key}`);
  state.pressedKeys[key] = true;
}
export function keyup(event) {
  var key = KEY_MAP[event.code];
  //console.log(`keyup: ${key}`);
  state.pressedKeys[key] = false;
}
