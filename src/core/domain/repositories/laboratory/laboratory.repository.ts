import { Observable } from "rxjs";
import { CreateLaboratoryDto } from "src/shared/dtos/laboratory/create-laboratory.dto";
import { CreatedLaboratoryDto } from "src/shared/dtos/laboratory/created-laboratory.dto";

export abstract class LaboratoryRepository {
    public abstract create(laboratory: CreateLaboratoryDto): Observable<CreatedLaboratoryDto>;
    public abstract getAll(): Observable<CreatedLaboratoryDto[]>;
    public abstract update(id: number, laboratory: Partial<CreatedLaboratoryDto>): Observable<CreatedLaboratoryDto>;
    public abstract delete(id: number): Observable<void>;
}