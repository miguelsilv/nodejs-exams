import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { IsNotEmpty } from "class-validator";

export class CreatedLaboratoryDto {
    @ApiProperty()
    public id: number;

    @ApiProperty()
    public name: string;

    @ApiProperty()
    public adress: string;

    constructor(partial?: Partial<CreatedLaboratoryDto>) {
        Object.assign(this, partial);
    }
}


