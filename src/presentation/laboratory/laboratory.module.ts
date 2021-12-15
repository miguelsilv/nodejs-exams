import { Module } from '@nestjs/common';
import { LaboratoryRepository } from 'src/core/domain/repositories/laboratory/laboratory.repository';
import { LaboratoryController } from './laboratory.controller';
import { CreateLaboratoryUseCase } from 'src/core/use-cases/laboratory/create-laboratory.usecase';
import { UpdateLaboratoryUseCase } from 'src/core/use-cases/laboratory/update-laboratory.usecase';
import { DeleteLaboratoryUseCase } from 'src/core/use-cases/laboratory/delete-laboratory.usecase';
import { GetAllLaboratoriesUseCase } from 'src/core/use-cases/laboratory/get-all-laboratories.usecase';
import { LaboratoryDataRepository } from 'src/data/laboratory/laboratory-data.repository';

@Module({
    controllers: [
        LaboratoryController
    ],
    providers: [
        CreateLaboratoryUseCase,
        GetAllLaboratoriesUseCase,
        UpdateLaboratoryUseCase,
        DeleteLaboratoryUseCase,
        { provide: LaboratoryRepository, useClass: LaboratoryDataRepository, }
    ]
})
export class LaboratoryModule { }
