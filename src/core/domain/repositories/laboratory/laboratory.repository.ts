import { CrudRepository } from "src/core/base/crud-repository.base";
import { Laboratory } from "../../entities/laboratory/laboratory.entity";

export interface LaboratoryRepository extends CrudRepository<Laboratory> { } { }