import { Module } from '@nestjs/common';
import { ExamModule } from './presentation/exam/exam.module';
import { LaboratoryModule } from './presentation/laboratory/laboratory.module';

@Module({
  imports: [
    ExamModule,
    LaboratoryModule
  ],
})
export class AppModule { }
