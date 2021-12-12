export abstract class CrudRepository<Entity> {
    public abstract create(exam: Entity): Entity;
    public abstract getAll(): Entity;
    public abstract update(id: number, exam: Partial<Entity>): Entity;
    public abstract delete(id: number): void;
}