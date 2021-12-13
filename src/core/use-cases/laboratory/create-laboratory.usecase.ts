import { Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { UseCase } from "src/core/base/use-case.base";
import { LaboratoryRepository } from "src/core/domain/repositories/laboratory/laboratory.repository";
import { CreateLaboratoryDto } from "src/shared/dtos/laboratory/create-laboratory.dto";
import { CreatedLaboratoryDto } from "src/shared/dtos/laboratory/created-laboratory.dto";

@Injectable()
export class CreateLaboratoryUseCase implements UseCase<CreatedLaboratoryDto>{
    constructor(private repository: LaboratoryRepository) { }

    public execute(laboratory: CreateLaboratoryDto): Observable<CreatedLaboratoryDto> {
        return this.repository.create(laboratory);
    }
}