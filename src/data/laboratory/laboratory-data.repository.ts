import { InjectRepository } from "@nestjs/typeorm";
import { from, map, Observable, of, switchMap, throwError } from "rxjs";
import { Repository } from "typeorm";
import { Laboratory } from "../../core/domain/entities/laboratory/laboratory.entity";
import { LaboratoryRepository } from "../../core/domain/repositories/laboratory/laboratory.repository";
import { CreateLaboratoryDto } from "../../shared/dtos/laboratory/create-laboratory.dto";
import { CreatedLaboratoryDto } from "../../shared/dtos/laboratory/created-laboratory.dto";

export class LaboratoryDataRepository extends LaboratoryRepository {

    constructor(
        @InjectRepository(Laboratory) private database: Repository<Laboratory>,
    ) {
        super();
    }

    public create(laboratory: CreateLaboratoryDto): Observable<CreatedLaboratoryDto> {

        const create = new Laboratory({
            name: laboratory.name,
            adress: laboratory.adress,
        });

        const created = from(this.database.save(create));

        return created.pipe(map(lab => this.mapToDto(lab)));
    }

    public getAll(): Observable<CreatedLaboratoryDto[]> {
        const laboratories = this.database.find({ where: { isActive: true } });

        return from(laboratories)
            .pipe(map(labs => labs.map(lab => this.mapToDto(lab))));
    }

    public getById(id: number): Observable<CreatedLaboratoryDto> {
        const laboratory = from(this.database.findOne({ id }));

        return laboratory.pipe(map(lab => this.mapToDto(lab)));
    }

    public update(id: number, laboratory: Partial<CreatedLaboratoryDto>): Observable<CreatedLaboratoryDto> {
        const update = new Laboratory({
            name: laboratory.name,
            adress: laboratory.adress,
        });

        const partial: Partial<Laboratory> = new Laboratory();

        for (const key in update) {
            if (update[key]) {
                partial[key] = update[key];
            }
        }

        const updated = from(this.database.update({ id: id }, partial));

        return updated.pipe(
            switchMap(() => this.getById(id))
        );
    }
    public delete(id: number): Observable<void> {
        const deleted = from(this.database.delete({ id: id }));

        return deleted.pipe(map(() => void (0)));
    }

    private mapToDto(lab: Laboratory): CreatedLaboratoryDto {
        return new CreatedLaboratoryDto({
            id: lab.id,
            adress: lab.adress,
            name: lab.name
        });
    }
}
