import { IsEnum } from "class-validator";
import { ExamType } from "src/shared/enums/exam-type.enum";

export class Exam {
    public id: number;
    public name: string;
    public type: ExamType;
    public isActive: boolean;
    constructor(partial?: Partial<Exam>) {
        Object.assign(this, partial);
    }

}