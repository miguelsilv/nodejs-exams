import { Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { UseCase } from "src/core/base/use-case.base";
import { Laboratory } from "src/core/domain/entities/laboratory/laboratory.entity";
import { ExamRepository } from "src/core/domain/repositories/exam/exam.repository";
import { LaboratoryRepository } from "src/core/domain/repositories/laboratory/laboratory.repository";

@Injectable()
export class DeleteExamUseCase implements UseCase<void>{
    constructor(private repository: ExamRepository) { }

    public execute(id: number): Observable<void> {
        return this.repository.delete(id);
    }
}