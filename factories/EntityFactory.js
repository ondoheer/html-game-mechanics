/**
 * An entity factory initializes entities without setting up their positions
 * the positions will be initiated once they leave the pool of entities to become active entities
 */
export class EntityFactory {
  constructor(numberOfEntities, entityTemplate) {
    this.numberOfEntities = numberOfEntities;
    this.entityTemplate = entityTemplate;
    this.entities = [];
  }

  produceEntities() {
    for (let index = 0; index < this.numberOfEntities; index++) {
      let b = new this.entityTemplate();
      this.entities.push(b);
    }
    return this.entities;
  }
}
