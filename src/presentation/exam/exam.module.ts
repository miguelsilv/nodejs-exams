import { Module } from '@nestjs/common';
import { ExamMockRepository } from 'src/data/exam/exam-mock.repository';
import { ExamRepository } from 'src/core/domain/repositories/exam/exam.repository';
import { ExamController } from './exam.controller';
import { CreateExamUseCase } from 'src/core/use-cases/exam/create-exam.usecase';
import { GetAllExamsUseCase } from 'src/core/use-cases/exam/get-all-exams.usecase';
import { UpdateExamUseCase } from 'src/core/use-cases/exam/update-exam.usecase';
import { DeleteExamUseCase } from 'src/core/use-cases/exam/delete-exam.usecase';
import { ExamDataRepository } from 'src/data/exam/exam-data.repository';

@Module({
    controllers: [
        ExamController
    ],
    providers: [
        CreateExamUseCase,
        GetAllExamsUseCase,
        UpdateExamUseCase,
        DeleteExamUseCase,
        { provide: ExamRepository, useClass: ExamDataRepository, }
    ]
})
export class ExamModule { }
