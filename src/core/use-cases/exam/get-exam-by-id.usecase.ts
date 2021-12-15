import { Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { UseCase } from "src/core/base/use-case.base";
import { ExamRepository } from "src/core/domain/repositories/exam/exam.repository";
import { GetExamDto } from "src/shared/dtos/exam/get-exam-dto";

@Injectable()
export class GetExamByIdUseCase implements UseCase<GetExamDto>{
    constructor(private repository: ExamRepository) { }

    public execute(id: number): Observable<GetExamDto> {
        return this.repository.getById(id);
    }
}