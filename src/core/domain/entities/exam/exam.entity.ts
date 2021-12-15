import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Laboratory } from "../laboratory/laboratory.entity";
import { ExamType } from "src/shared/enums/exam-type.enum";

@Entity()
export class Exam {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;

    @Column({ type: 'enum', enum: ExamType })
    public type: ExamType;

    @Column({ default: true })
    public isActive: boolean;

    @ManyToMany(() => Laboratory, lab => lab.id, { eager: true })
    @JoinTable({
        name: "exam_laboratory",
        joinColumn: {
            name: "laboratory",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "exam",
            referencedColumnName: "id"
        }
    })
    public laboratories: Laboratory[];

    constructor(partial?: Partial<Exam>) {
        Object.assign(this, partial);
    }

}