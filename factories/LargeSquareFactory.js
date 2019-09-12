import { EntityFactory } from "./EntityFactory.js";

export class LargeSquareFactory extends EntityFactory {
  constructor(numberOfEntities, entityTemplate) {
    super(numberOfEntities, entityTemplate);
  }
}
