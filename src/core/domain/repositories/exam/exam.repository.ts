import { Observable } from "rxjs";
import { CreateExamDto } from "src/shared/dtos/exam/create-exam.dto";
import { CreatedExamDto } from "src/shared/dtos/exam/created-exam.dto";
import { GetExamDto } from "src/shared/dtos/exam/get-exam-dto";

export abstract class ExamRepository {

    public abstract create(exam: CreateExamDto): Observable<CreatedExamDto>;
    public abstract getById(id: number): Observable<GetExamDto>;
    public abstract getAll(): Observable<CreatedExamDto[]>;
    public abstract update(id: number, exam: Partial<CreatedExamDto>): Observable<CreatedExamDto>;
    public abstract delete(id: number): Observable<void>;
    public abstract setLaboratory(id: number, laboratoryId: number): Observable<GetExamDto>;
}