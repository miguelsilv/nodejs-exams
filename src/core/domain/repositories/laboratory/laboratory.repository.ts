import { CrudRepository } from "src/core/base/crud-repository.base";
import { Laboratory } from "../../entities/laboratory/laboratory.entity";

export abstract class LaboratoryRepository extends CrudRepository<Laboratory>{ } { }