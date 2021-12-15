import { Observable, of, throwError } from "rxjs";
import { GetLaboratoryDto } from "src/shared/dtos/laboratory/get-laboratory.dto";
import { Laboratory } from "../../core/domain/entities/laboratory/laboratory.entity";
import { LaboratoryRepository } from "../../core/domain/repositories/laboratory/laboratory.repository";
import { CreateLaboratoryDto } from "../../shared/dtos/laboratory/create-laboratory.dto";
import { CreatedLaboratoryDto } from "../../shared/dtos/laboratory/created-laboratory.dto";

export class LaboratoryMockRepository extends LaboratoryRepository {

    public db: Laboratory[] = [
        new Laboratory({
            id: 1,
            name: "Lab A",
            adress: "Adress A",
            isActive: true,
        }),
        new Laboratory({
            id: 2,
            name: "Lab B",
            adress: "Adress B",
            isActive: true,
        }),
        new Laboratory({
            id: 3,
            name: "Lab C",
            adress: "Adress C",
            isActive: false,
        })
    ];

    public create(laboratory: CreateLaboratoryDto): Observable<CreatedLaboratoryDto> {
        if (laboratory == null) {
            return throwError(() => new Error("Não foi possivel cadastrar o laboratório."));
        }

        const last = this.db.slice(-1);

        const created = new Laboratory({
            id: last.length > 0 ? last[0].id + 1 : 1,
            isActive: true,
            name: laboratory.name,
            adress: laboratory.adress
        })

        this.db.push(created);

        return of(new CreatedLaboratoryDto({
            id: created.id,
            adress: created.adress,
            name: created.name
        }));
    }

    public getAll(): Observable<CreatedLaboratoryDto[]> {
        const items = this.db.filter(laboratory => laboratory.isActive);
        return of(items.map(item => new CreatedLaboratoryDto({
            id: item.id,
            adress: item.adress,
            name: item.name
        })));
    }

    public getById(id: number): Observable<GetLaboratoryDto> {
        throw new Error("Method not implemented.");
    }

    public update(id: number, laboratory: Partial<CreatedLaboratoryDto>): Observable<CreatedLaboratoryDto> {
        const index = this.getIndexById(id);

        if (index < 0) {
            return throwError(() => new Error("Laboratório não encontrado."));
        }

        for (const key in laboratory) {
            this.db[index][key] = laboratory[key];
        }

        return of(new CreatedLaboratoryDto(this.db[index]));
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
