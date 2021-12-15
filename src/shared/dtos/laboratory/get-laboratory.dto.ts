import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { CreatedExamDto } from "../exam/created-exam.dto";

export class GetLaboratoryDto {

    @ApiProperty()
    public id: number;

    @ApiProperty()
    public name: string;

    @ApiProperty()
    public adress: string;

    @ApiProperty()
    public exams: CreatedExamDto[];

    constructor(partial?: Partial<GetLaboratoryDto>) {
        Object.assign(this, partial);
    }
}


