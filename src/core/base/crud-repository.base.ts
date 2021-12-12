import { Observable } from "rxjs";

export abstract class CrudRepository<Entity> {
    public abstract create(item: Entity): Observable<Entity>;
    public abstract getAll(): Observable<Entity[]>;
    public abstract update(id: number, item: Partial<Entity>): Observable<Entity>;
    public abstract delete(id: number): Observable<void>;
}