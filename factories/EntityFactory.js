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
