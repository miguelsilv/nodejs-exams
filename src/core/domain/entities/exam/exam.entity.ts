import { IsEnum } from "class-validator";
import { ExamType } from "src/shared/enums/exam-type.enum";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Laboratory } from "../laboratory/laboratory.entity";

@Entity()
export class Exam {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;

    @Column({ enum: ExamType })
    public type: ExamType;

    @Column({ default: true })
    public isActive: boolean;

    @ManyToMany(() => Laboratory)
    @JoinTable()
    public laboratories: Laboratory[];
    constructor(partial?: Partial<Exam>) {
        Object.assign(this, partial);
    }

}