import { CrudRepository } from "src/core/base/crud-repository.base";
import { Exam } from "../../entities/exam/exam.entity";

export abstract class ExamRepository extends CrudRepository<Exam>{ }