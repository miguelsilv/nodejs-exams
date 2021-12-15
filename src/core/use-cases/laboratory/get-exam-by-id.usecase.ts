import { Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { UseCase } from "src/core/base/use-case.base";
import { LaboratoryRepository } from "src/core/domain/repositories/laboratory/laboratory.repository";
import { GetLaboratoryDto } from "src/shared/dtos/laboratory/get-laboratory.dto";

@Injectable()
export class GetLaboratoryByIdUseCase implements UseCase<GetLaboratoryDto>{
    constructor(private repository: LaboratoryRepository) { }

    public execute(id: number): Observable<GetLaboratoryDto> {
        return this.repository.getById(id);
    }
}