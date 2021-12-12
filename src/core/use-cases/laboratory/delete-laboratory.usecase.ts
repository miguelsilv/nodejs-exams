import { Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { UseCase } from "src/core/base/use-case.base";
import { Laboratory } from "src/core/domain/entities/laboratory/laboratory.entity";
import { LaboratoryRepository } from "src/core/domain/repositories/laboratory/laboratory.repository";

@Injectable()
export class DeleteLaboratoryUseCase implements UseCase<void>{
    constructor(private repository: LaboratoryRepository) { }

    public execute(id: number): Observable<void> {
        return this.repository.delete(id);
    }
}