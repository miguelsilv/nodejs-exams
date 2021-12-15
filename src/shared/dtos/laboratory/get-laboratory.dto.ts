import { CreatedExamDto } from "../exam/created-exam.dto";

export class GetLaboratoryDto {
    public id: number;
    public name: string;
    public adress: string;
    public exams: CreatedExamDto[];

    constructor(partial?: Partial<GetLaboratoryDto>) {
        Object.assign(this, partial);
    }
}


