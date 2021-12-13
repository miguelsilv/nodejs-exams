import { Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { UseCase } from "src/core/base/use-case.base";
import { ExamRepository } from "src/core/domain/repositories/exam/exam.repository";
import { CreateExamDto } from "src/shared/dtos/exam/create-exam.dto";
import { CreatedExamDto } from "src/shared/dtos/exam/created-exam.dto";

@Injectable()
export class CreateExamUseCase implements UseCase<CreatedExamDto>{
    constructor(private repository: ExamRepository) { }

    public execute(exam: CreateExamDto): Observable<CreatedExamDto> {
        return this.repository.create(exam);
    }
}