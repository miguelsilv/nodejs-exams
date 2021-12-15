import { ExamType } from "src/shared/enums/exam-type.enum";
import { CreatedLaboratoryDto } from "../laboratory/created-laboratory.dto";

export class GetExamDto {
    public id: number;
    public name: string;
    public type: ExamType;
    public laboratories: CreatedLaboratoryDto[];

    constructor(partial?: Partial<GetExamDto>) {
        Object.assign(this, partial);
    }

}
