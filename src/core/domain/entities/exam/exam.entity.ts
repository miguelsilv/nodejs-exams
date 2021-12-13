export class Exam {
    public id: number;
    public name: string;
    public type: any;
    public isActive: boolean;
    constructor(partial: Partial<Exam>) {
        Object.assign(this, partial);
    }
}