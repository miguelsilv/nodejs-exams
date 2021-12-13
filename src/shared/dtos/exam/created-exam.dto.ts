import { Exam } from "src/core/domain/entities/exam/exam.entity";
import { ExamType } from "src/shared/enums/exam-type.enum";

export class CreatedExamDto {
    public id: number;
    public name: string;
    public type: ExamType;

    constructor(partial?: Partial<CreatedExamDto>) {
        Object.assign(this, partial);
    }

}
