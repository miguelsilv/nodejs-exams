import { IsNotEmpty } from "class-validator";

export class CreateLaboratoryDto {

    @IsNotEmpty()
    public name: string;

    @IsNotEmpty()
    public adress: string;

    constructor(partial?: Partial<CreateLaboratoryDto>) {
        Object.assign(this, partial);
    }
}