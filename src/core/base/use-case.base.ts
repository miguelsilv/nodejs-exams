import { Observable } from 'rxjs';

export interface UseCase<T> {
    execute(...args: any[]): Observable<T>;
}