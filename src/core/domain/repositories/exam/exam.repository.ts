import { Observable } from "rxjs";
import { CreateExamDto } from "src/shared/dtos/exam/create-exam.dto";
import { CreatedExamDto } from "src/shared/dtos/exam/created-exam.dto";

export interface ExamRepository { 

    create(exam: CreateExamDto): Observable<CreatedExamDto>;
    getAll(): Observable<CreatedExamDto[]>;
    update(id: number, exam: Partial<CreatedExamDto>): Observable<CreatedExamDto>;
    delete(id: number): Observable<void>;
}