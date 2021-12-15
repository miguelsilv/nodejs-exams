import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Exam } from "../exam/exam.entity";

@Entity()
export class Laboratory {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;

    @Column()
    public adress: string;

    @Column({ default: true })
    public isActive: boolean;

    @ManyToMany(() => Exam, exam => exam.laboratories)
    public exams: Exam[];

    constructor(partial?: Partial<Laboratory>) {
        Object.assign(this, partial);
    }

}