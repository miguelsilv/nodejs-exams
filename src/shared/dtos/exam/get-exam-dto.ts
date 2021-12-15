import { ExamType } from "src/shared/enums/exam-type.enum";
import { CreatedLaboratoryDto } from "../laboratory/created-laboratory.dto";
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from "class-validator";

export class GetExamDto {

    @ApiProperty()
    @IsNotEmpty()
    public id: number;

    @ApiProperty()
    @IsNotEmpty()
    public name: string;

    @ApiProperty({
        enum: ExamType
    })
    @IsNotEmpty()
    public type: ExamType;

    @ApiProperty({
        type: [CreatedLaboratoryDto]
    })
    public laboratories: CreatedLaboratoryDto[];

    constructor(partial?: Partial<GetExamDto>) {
        Object.assign(this, partial);
    }

}
