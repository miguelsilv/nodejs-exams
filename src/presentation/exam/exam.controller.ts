import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from "@nestjs/common";
import { Observable } from "rxjs";
import { CreateExamUseCase } from "src/core/use-cases/exam/create-exam.usecase";
import { DeleteExamUseCase } from "src/core/use-cases/exam/delete-exam.usecase";
import { GetAllExamsUseCase } from "src/core/use-cases/exam/get-all-exams.usecase";
import { GetExamByIdUseCase } from "src/core/use-cases/exam/get-exam-by-id.usecase";
import { SetLaboratoryExamUseCase } from "src/core/use-cases/exam/set-laboratory-exam.usecase";
import { UpdateExamUseCase } from "src/core/use-cases/exam/update-exam.usecase";
import { CreateExamDto } from "src/shared/dtos/exam/create-exam.dto";
import { CreatedExamDto } from "src/shared/dtos/exam/created-exam.dto";
import { GetExamDto } from "src/shared/dtos/exam/get-exam-dto";

@Controller("/exam")
export class ExamController {
    constructor(
        private readonly createExamUseCase: CreateExamUseCase,
        private readonly getAllExamsUseCase: GetAllExamsUseCase,
        private readonly getExamByIdUseCase: GetExamByIdUseCase,
        private readonly updateExamUseCase: UpdateExamUseCase,
        private readonly deleteExamUseCase: DeleteExamUseCase,
        private readonly setLaboratoryExamUseCase: SetLaboratoryExamUseCase

    ) { }

    @Post()
    public create(@Body() exam: CreateExamDto): Observable<CreatedExamDto> {
        return this.createExamUseCase.execute(exam);
    }

    @Get()
    public getAll(): Observable<CreatedExamDto[]> {
        return this.getAllExamsUseCase.execute();
    }

    @Get(":id")
    public getById(@Param('id') id: number): Observable<GetExamDto> {
        return this.getExamByIdUseCase.execute(id);
    }

    @Patch(':id')
    public update(@Param('id') id: number, @Body() exam: Partial<CreatedExamDto>) {
        return this.updateExamUseCase.execute(id, exam);
    }

    @Delete(':id')
    public remove(@Param('id') id: number) {
        return this.deleteExamUseCase.execute(id);
    }

    @Post(':id/laboratory/:laboratoryId')
    public setLaboratory(@Param('id') id: number, @Param('laboratoryId') laboratoryId: number): Observable<GetExamDto> {
        return this.setLaboratoryExamUseCase.execute(id, laboratoryId);
    }
}
