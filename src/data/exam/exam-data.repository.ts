import { NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { from, map, Observable, of, switchMap, tap, throwError } from "rxjs";
import { Laboratory } from "src/core/domain/entities/laboratory/laboratory.entity";
import { LaboratoryRepository } from "src/core/domain/repositories/laboratory/laboratory.repository";
import { GetExamDto } from "src/shared/dtos/exam/get-exam-dto";
import { CreatedLaboratoryDto } from "src/shared/dtos/laboratory/created-laboratory.dto";
import { Repository } from "typeorm";
import { isNullOrUndefined } from "util";
import { Exam } from "../../core/domain/entities/exam/exam.entity";
import { ExamRepository } from "../../core/domain/repositories/exam/exam.repository";
import { CreateExamDto } from "../../shared/dtos/exam/create-exam.dto";
import { CreatedExamDto } from "../../shared/dtos/exam/created-exam.dto";

export class ExamDataRepository extends ExamRepository {

    constructor(
        @InjectRepository(Exam) private examDb: Repository<Exam>,
        @InjectRepository(Laboratory) private laboratoryDb: Repository<Laboratory>,
    ) {
        super();
    }

    public create(exam: CreateExamDto): Observable<CreatedExamDto> {

        const create = new Exam({
            name: exam.name,
            type: exam.type
        });

        const created = from(this.examDb.save(create));

        return created.pipe(map(exam => this.mapToCreateExamDto(exam)));
    }

    public getAll(): Observable<CreatedExamDto[]> {
        const examoratories = this.examDb.find({ where: { isActive: true } });

        return from(examoratories)
            .pipe(map(exams => exams.map(exam => this.mapToCreateExamDto(exam))));
    }

    public getById(id: number): Observable<GetExamDto> {
        const exam = from(this.examDb.findOne(id));

        return exam.pipe(
            switchMap(exam => {
                if (exam) return of(exam);

                return throwError(() => new NotFoundException("Exame não encontrado."))
            }),
            map(exam => new GetExamDto({
                id: exam.id,
                name: exam.name,
                laboratories: (exam.laboratories || [])
                    .map(lab => new CreatedLaboratoryDto({
                        id: lab.id,
                        name: lab.name,
                        adress: lab.adress
                    })),
                type: exam.type

            }))
        );
    }

    public update(id: number, exam: Partial<CreatedExamDto>): Observable<CreatedExamDto> {
        const update = new Exam({
            name: exam.name,
            type: exam.type,
        });

        const partial: Partial<Exam> = new Exam();

        for (const key in update) {
            if (update[key] != undefined || update[key] != null) {
                partial[key] = update[key];
            }
        }

        const updated = from(this.examDb.update({ id: id }, partial));

        return updated.pipe(
            switchMap(() => this.getById(id)),
            map(exam => this.mapToCreateExamDto(exam))
        );
    }
    public delete(id: number): Observable<void> {
        const deleted = from(this.examDb.update({ id: id }, { isActive: false }));

        return deleted.pipe(map(() => void (0)));
    }

    public setLaboratory(id: number, laboratoryId: number): Observable<GetExamDto> {

        return from(this.examDb.findOne({ id: id, isActive: true }))
            .pipe(
                switchMap(exam => {
                    console.log(exam);
                    if (exam) {
                        return from(this.examDb.save({
                            ...exam,
                            laboratories: [...(exam.laboratories || []), { id: laboratoryId }]
                        }));
                    }

                    return throwError(() => new NotFoundException("Exame não encontrado!"))
                }),
                switchMap(() => this.getById(id))
            );

    }

    private mapToCreateExamDto(exam: Exam | GetExamDto): CreatedExamDto {
        return new CreatedExamDto({
            id: exam.id,
            type: exam.type,
            name: exam.name
        });
    }
}
