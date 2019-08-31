import { hero } from "./game.js";
import { state } from "./state.js";

function memoize(func) {
  var cache = {};
  return function() {
    var key = JSON.stringify(arguments);
    if (cache[key]) {
      return cache[key];
    } else {
      var val = func.apply(this, arguments);
      cache[key] = val;
      return val;
    }
  };
}

export const debug = memoize(function() {
  console.log(hero);
  console.log(state);
});
