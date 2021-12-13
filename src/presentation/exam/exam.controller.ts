import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from "@nestjs/common";
import { Observable } from "rxjs";
import { CreateExamUseCase } from "src/core/use-cases/exam/create-exam.usecase";
import { DeleteExamUseCase } from "src/core/use-cases/exam/delete-exam.usecase";
import { GetAllExamsUseCase } from "src/core/use-cases/exam/get-all-exams.usecase";
import { UpdateExamUseCase } from "src/core/use-cases/exam/update-exam.usecase";
import { CreateExamDto } from "src/shared/dtos/exam/create-exam.dto";
import { CreatedExamDto } from "src/shared/dtos/exam/created-exam.dto";

@Controller("/exam")
export class ExamController {
    constructor(
        private readonly createExamUseCase: CreateExamUseCase,
        private readonly getAllExamsUseCase: GetAllExamsUseCase,
        private readonly updateExamUseCase: UpdateExamUseCase,
        private readonly deleteExamUseCase: DeleteExamUseCase

    ) { }

    @Post()
    public create(@Body() exam: CreateExamDto): Observable<CreatedExamDto> {
        return this.createExamUseCase.execute(exam);
    }

    @Get()
    public getAll(): Observable<CreatedExamDto[]> {
        return this.getAllExamsUseCase.execute();
    }

    @Patch(':id')
    public update(@Param('id') id: number, @Body() exam: Partial<CreatedExamDto>) {
        return this.updateExamUseCase.execute(id, exam);
    }

    @Delete(':id')
    public remove(@Param('id') id: number) {
        return this.deleteExamUseCase.execute(id);
    }
}
