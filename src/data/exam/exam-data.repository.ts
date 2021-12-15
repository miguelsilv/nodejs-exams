import { InjectRepository } from "@nestjs/typeorm";
import { from, map, Observable, of, switchMap, throwError } from "rxjs";
import { Repository } from "typeorm";
import { Exam } from "../../core/domain/entities/exam/exam.entity";
import { ExamRepository } from "../../core/domain/repositories/exam/exam.repository";
import { CreateExamDto } from "../../shared/dtos/exam/create-exam.dto";
import { CreatedExamDto } from "../../shared/dtos/exam/created-exam.dto";

export class ExamDataRepository extends ExamRepository {

    constructor(
        @InjectRepository(Exam) private database: Repository<Exam>,
    ) {
        super();
    }

    public create(exam: CreateExamDto): Observable<CreatedExamDto> {

        const create = new Exam({
            name: exam.name,
            type: exam.type
        });

        const created = from(this.database.save(create));

        return created.pipe(map(exam => this.mapToDto(exam)));
    }

    public getAll(): Observable<CreatedExamDto[]> {
        const examoratories = this.database.find({ where: { isActive: true } });

        return from(examoratories)
            .pipe(map(exams => exams.map(exam => this.mapToDto(exam))));
    }

    public getById(id: number): Observable<CreatedExamDto> {
        const exam = from(this.database.findOne({ id }));

        return exam.pipe(map(exam => this.mapToDto(exam)));
    }

    public update(id: number, exam: Partial<CreatedExamDto>): Observable<CreatedExamDto> {
        const update = new Exam({
            name: exam.name,
            type: exam.type,
        });

        const partial: Partial<Exam> = new Exam();

        for (const key in update) {
            if (update[key]) {
                partial[key] = update[key];
            }
        }

        const updated = from(this.database.update({ id: id }, partial));

        return updated.pipe(
            switchMap(() => this.getById(id))
        );
    }
    public delete(id: number): Observable<void> {
        const deleted = from(this.database.delete({ id: id }));

        return deleted.pipe(map(() => void (0)));
    }

    private mapToDto(exam: Exam): CreatedExamDto {
        return new CreatedExamDto({
            id: exam.id,
            type: exam.type,
            name: exam.name
        });
    }
}
