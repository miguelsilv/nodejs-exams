import { Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { UseCase } from "src/core/base/use-case.base";
import { Laboratory } from "src/core/domain/entities/laboratory/laboratory.entity";
import { LaboratoryRepository } from "src/core/domain/repositories/laboratory/laboratory.repository";
import { CreatedLaboratoryDto } from "src/shared/dtos/laboratory/created-laboratory.dto";

@Injectable()
export class GetAllLaboratoriesUseCase implements UseCase<CreatedLaboratoryDto[]>{
    constructor(private repository: LaboratoryRepository) { }

    public execute(): Observable<CreatedLaboratoryDto[]> {
        return this.repository.getAll();
    }
}