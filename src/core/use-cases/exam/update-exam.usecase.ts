import { Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { UseCase } from "src/core/base/use-case.base";
import { Exam } from "src/core/domain/entities/exam/exam.entity";
import { ExamRepository } from "src/core/domain/repositories/exam/exam.repository";
import { CreatedExamDto } from "src/shared/dtos/exam/created-exam.dto";

@Injectable()
export class UpdateExamUseCase implements UseCase<CreatedExamDto>{
    constructor(private repository: ExamRepository) { }

    public execute(id: number, exam: Partial<CreatedExamDto>): Observable<CreatedExamDto> {
        return this.repository.update(id, exam);
    }
}