export class Laboratory {
    public id: number;
    public name: string;
    public adress: string;
    public isActive: boolean;

    constructor(partial?: Partial<Laboratory>) {
        Object.assign(this, partial);
    }

}