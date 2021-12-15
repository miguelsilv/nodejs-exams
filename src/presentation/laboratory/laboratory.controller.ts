import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from "@nestjs/common";
import { defaultIfEmpty, Observable } from "rxjs";
import { CreateLaboratoryUseCase } from "src/core/use-cases/laboratory/create-laboratory.usecase";
import { DeleteLaboratoryUseCase } from "src/core/use-cases/laboratory/delete-laboratory.usecase";
import { GetAllLaboratoriesUseCase } from "src/core/use-cases/laboratory/get-all-laboratories.usecase";
import { GetLaboratoryByIdUseCase } from "src/core/use-cases/laboratory/get-exam-by-id.usecase";
import { UpdateLaboratoryUseCase } from "src/core/use-cases/laboratory/update-laboratory.usecase";
import { CreateLaboratoryDto } from "src/shared/dtos/laboratory/create-laboratory.dto";
import { CreatedLaboratoryDto } from "src/shared/dtos/laboratory/created-laboratory.dto";
import { GetLaboratoryDto } from "src/shared/dtos/laboratory/get-laboratory.dto";

@Controller("/laboratory")
export class LaboratoryController {
    constructor(
        private readonly createLaboratoryUseCase: CreateLaboratoryUseCase,
        private readonly getAllLaboratoriesUseCase: GetAllLaboratoriesUseCase,
        private readonly getLaboratoryByIdUseCase: GetLaboratoryByIdUseCase,
        private readonly updateLaboratoryUseCase: UpdateLaboratoryUseCase,
        private readonly deleteLaboratoryUseCase: DeleteLaboratoryUseCase

    ) { }

    @Post()
    public create(@Body() laboratory: CreateLaboratoryDto): Observable<CreatedLaboratoryDto> {
        return this.createLaboratoryUseCase.execute(laboratory);
    }

    @Get()
    public getAll(): Observable<CreatedLaboratoryDto[]> {
        return this.getAllLaboratoriesUseCase.execute();
    }

    @Get(':id')
    public getById(@Param('id') id: number): Observable<GetLaboratoryDto> {
        return this.getLaboratoryByIdUseCase.execute(id);
    }

    @Patch(':id')
    public update(@Param('id') id: number, @Body() laboratory: Partial<CreatedLaboratoryDto>) {
        return this.updateLaboratoryUseCase.execute(+id, laboratory);
    }

    @Delete(':id')
    public remove(@Param('id') id: number): Observable<void> {
        return this.deleteLaboratoryUseCase.execute(+id)
            .pipe(defaultIfEmpty(null))
    }
}