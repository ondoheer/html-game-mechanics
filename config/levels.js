import { LargeSquare } from "../entities/enemies/LargeSquare.js";

/**
 * Definition for every level to be used by the Entities Orchestrator
 */
export const LEVEL_STRUCTURE = {
  level1: {
    enemies: [
      {
        type: LargeSquare,
        number: 3
      },
      {
        type: LargeSquare,
        number: 5
      }
    ]
  },
  level2: {
    enemies: [
      {
        type: LargeSquare,
        number: 5
      }
    ]
  }
};
