import { IsNotEmpty } from "class-validator";
import { ExamType } from "src/shared/enums/exam-type.enum";

export class CreateExamDto {
    @IsNotEmpty()
    public name: string;

    @IsNotEmpty()
    public type: ExamType;

    constructor(partial?: Partial<CreateExamDto>) {
        Object.assign(this, partial);
    }
}