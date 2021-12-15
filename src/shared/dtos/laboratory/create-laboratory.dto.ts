import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateLaboratoryDto {

    @ApiProperty()
    @IsNotEmpty()
    public name: string;

    @ApiProperty()
    @IsNotEmpty()
    public adress: string;

    constructor(partial?: Partial<CreateLaboratoryDto>) {
        Object.assign(this, partial);
    }
}