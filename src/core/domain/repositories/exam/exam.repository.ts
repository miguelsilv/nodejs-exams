import { CrudRepository } from "src/core/base/crud-repository.base";
import { Exam } from "../../entities/exam/exam.entity";

export interface ExamRepository extends CrudRepository<Exam> { }