import { Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { UseCase } from "src/core/base/use-case.base";
import { Exam } from "src/core/domain/entities/exam/exam.entity";
import { ExamRepository } from "src/core/domain/repositories/exam/exam.repository";

@Injectable()
export class CreateExamUseCase implements UseCase<Exam>{
    constructor(private repository: ExamRepository) { }

    public execute(exam: Exam): Observable<Exam> {
        return this.repository.create(exam);
    }
}