import { IsEnum, IsNotEmpty } from "class-validator";
import { ExamType } from "src/shared/enums/exam-type.enum";
import { ApiProperty } from '@nestjs/swagger';

export class CreateExamDto {

    @ApiProperty()
    @IsNotEmpty({ message: "O nome é obrigatório" })
    public name: string;

    @ApiProperty({
        type: Number,
        enum: ExamType,
    })
    @IsNotEmpty()
    @IsEnum(ExamType)
    public type: ExamType;

    constructor(partial?: Partial<CreateExamDto>) {
        Object.assign(this, partial);
    }
}