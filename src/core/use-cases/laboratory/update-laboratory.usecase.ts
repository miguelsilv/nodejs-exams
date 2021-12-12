import { Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { UseCase } from "src/core/base/use-case.base";
import { Laboratory } from "src/core/domain/entities/laboratory/laboratory.entity";
import { LaboratoryRepository } from "src/core/domain/repositories/laboratory/laboratory.repository";

@Injectable()
export class UpdateLaboratoryUseCase implements UseCase<Laboratory>{
    constructor(private repository: LaboratoryRepository) { }

    public execute(id: number, laboratory: Laboratory): Observable<Laboratory> {
        return this.repository.update(id, laboratory);
    }
}