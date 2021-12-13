import { Observable } from "rxjs";
import { CreateLaboratoryDto } from "src/shared/dtos/laboratory/create-laboratory.dto";
import { CreatedLaboratoryDto } from "src/shared/dtos/laboratory/created-laboratory.dto";

export interface LaboratoryRepository {
    create(item: CreateLaboratoryDto): Observable<CreatedLaboratoryDto>;
    getAll(): Observable<CreatedLaboratoryDto[]>;
    update(id: number, item: Partial<CreatedLaboratoryDto>): Observable<CreatedLaboratoryDto>;
    delete(id: number): Observable<void>;
}