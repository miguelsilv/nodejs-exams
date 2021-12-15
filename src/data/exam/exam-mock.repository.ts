import { Injectable } from "@nestjs/common";
import { Observable, of, throwError } from "rxjs";
import { Exam } from "src/core/domain/entities/exam/exam.entity";
import { GetExamDto } from "src/shared/dtos/exam/get-exam-dto";
import { ExamType } from "src/shared/enums/exam-type.enum";
import { ExamRepository } from "../../core/domain/repositories/exam/exam.repository";
import { CreateExamDto } from "../../shared/dtos/exam/create-exam.dto";
import { CreatedExamDto } from "../../shared/dtos/exam/created-exam.dto";

@Injectable()
export class ExamMockRepository extends ExamRepository {

    public db: Exam[] = [
        {
            id: 1,
            name: "Exame A",
            type: ExamType.clinicalAnalysis,
            isActive: true,
            laboratories: []
        },
        {
            id: 2,
            name: "Exame B",
            type: ExamType.image,
            isActive: true,
            laboratories: []
        },
        {
            id: 3,
            name: "Exame C",
            type: ExamType.image,
            isActive: false,
            laboratories: []
        }
    ];

    public create(exam: CreateExamDto): Observable<CreatedExamDto> {
        if (exam == null) {
            return throwError(() => new Error("Não foi possivel cadastrar o exame."));
        }

        const last = this.db.slice(-1);

        const created = new Exam({
            id: last.length > 0 ? last[0].id + 1 : 1,
            isActive: true,
            type: exam.type,
            name: exam.name
        });

        this.db.push(created);

        return of(new CreatedExamDto({
            id: created.id,
            name: created.name,
            type: created.type
        }));
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

    public getById(id: number): Observable<GetExamDto> {
        throw new Error("Method not implemented.");
    }

    public setLaboratory(id: number, laboratoryId: number): Observable<GetExamDto> {
        throw new Error("Method not implemented.");
    }

    private getIndexById(id: number) {
        return this.db.findIndex(exam => exam.id === id);
    }
}
