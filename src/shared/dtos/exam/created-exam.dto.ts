import { IsNotEmpty } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { ExamType } from "src/shared/enums/exam-type.enum";

export class CreatedExamDto {
    @ApiProperty()
    public id: number;

    @ApiProperty()
    public name: string;

    @ApiProperty({
        enum: ExamType,
        enumName: "ExamType",
        description: "Tipos de exames."
    })
    public type: ExamType;

    constructor(partial?: Partial<CreatedExamDto>) {
        Object.assign(this, partial);
    }

}
