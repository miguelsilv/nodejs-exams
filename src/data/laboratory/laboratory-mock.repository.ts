import { Observable, of, throwError } from "rxjs";
import { LaboratoryRepository } from "src/core/domain/repositories/laboratory/laboratory.repository";
import { CreateLaboratoryDto } from "src/shared/dtos/laboratory/create-laboratory.dto";
import { CreatedLaboratoryDto } from "src/shared/dtos/laboratory/created-laboratory.dto";

export class LaboratoryMockRepository implements LaboratoryRepository {
    public db: CreatedLaboratoryDto[] = [
        {
            id: 1,
            name: "Lab A",
            adress: "Adress A",
            isActive: true,
        },
        {
            id: 2,
            name: "Lab B",
            adress: "Adress B",
            isActive: true,
        },
        {
            id: 3,
            name: "Lab C",
            adress: "Adress C",
            isActive: false,
        }
    ];

    public create(laboratory: CreateLaboratoryDto): Observable<CreatedLaboratoryDto> {
        if (laboratory == null) {
            return throwError(() => new Error("Não foi possivel cadastrar o laboratório."));
        }

        const last = this.db.slice(-1);

        const created: CreatedLaboratoryDto = {
            id: last.length > 0 ? last[0].id + 1 : 1,
            isActive: true,
            ...laboratory
        }

        this.db.push(created);

        return of(created);
    }

    public getAll(): Observable<CreatedLaboratoryDto[]> {
        return of(this.db.filter(laboratory => laboratory.isActive));
    }

    public update(id: number, laboratory: Partial<CreatedLaboratoryDto>): Observable<CreatedLaboratoryDto> {
        const index = this.getIndexById(id);

        if (index < 0) {
            return throwError(() => new Error("Laboratório não encontrado."));
        }

        for (const key in laboratory) {
            this.db[index][key] = laboratory[key];
        }

        return of(this.db[index]);
    }

    public delete(id: number): Observable<void> {
        const index = this.getIndexById(id);


        if (index < 0) {
            return throwError(() => new Error("Laboratório não encontrado."));
        }

        this.db[index].isActive = false;

        return of();
    }

    private getIndexById(id: number) {
        return this.db.findIndex(laboratory => laboratory.id === id);
    }
}
