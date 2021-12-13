import { Observable, of, throwError } from "rxjs";
import { ExamRepository } from "src/core/domain/repositories/exam/exam.repository";
import { CreateExamDto } from "../../shared/dtos/exam/create-exam.dto";
import { CreatedExamDto } from "../../shared/dtos/exam/created-exam.dto";

export class ExamMockRepository implements ExamRepository {
    public db: CreatedExamDto[] = [
        {
            id: 1,
            name: "Exame A",
            type: "",
            isActive: true,
        },
        {
            id: 2,
            name: "Exame B",
            type: "",
            isActive: true,
        },
        {
            id: 3,
            name: "Exame C",
            type: "",
            isActive: false,
        }
    ];

    public create(exam: CreateExamDto): Observable<CreatedExamDto> {
        if (exam == null) {
            return throwError(() => new Error("Não foi possivel cadastrar o exame."));
        }

        const last = this.db.slice(-1);

        const created: CreatedExamDto = {
            id: last.length > 0 ? last[0].id + 1 : 1,
            isActive: true,
            ...exam
        }

        this.db.push(created);

        return of(created);
    }

    public getAll(): Observable<CreatedExamDto[]> {
        return of(this.db.filter(exam => exam.isActive));
    }

    public update(id: number, exam: Partial<CreatedExamDto>): Observable<CreatedExamDto> {
        const index = this.getIndexById(id);

        if (index < 0) {
            return throwError(() => new Error("Exame não encontrado."));
        }

        for (const key in exam) {
            this.db[index][key] = exam[key];
        }

        return of(this.db[index]);
    }

    public delete(id: number): Observable<void> {
        const index = this.getIndexById(id);


        if (index < 0) {
            return throwError(() => new Error("Exame não encontrado."));
        }

        this.db[index].isActive = false;

        return of();
    }

    private getIndexById(id: number) {
        return this.db.findIndex(exam => exam.id === id);
    }
}
