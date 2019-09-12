import { EntityFactory } from "./EntityFactory.js";

export class BulletFactory extends EntityFactory {
  constructor(numberOfEntities, entityTemplate) {
    super(numberOfEntities, entityTemplate);
  }
}
