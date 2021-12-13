import { Exclude } from "class-transformer";

export class CreatedLaboratoryDto {
    public id: number;
    public name: string;
    public adress: string;
    
    constructor(partial?: Partial<CreatedLaboratoryDto>) {
        Object.assign(this, partial);
    }
}


