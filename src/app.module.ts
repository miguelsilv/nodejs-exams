import { Module } from '@nestjs/common';
import { MysqlInfraModule } from './infra/db/mysql/mysql-infra.module';
import { ExamModule } from './presentation/exam/exam.module';
import { LaboratoryModule } from './presentation/laboratory/laboratory.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MysqlInfraModule,
    ExamModule,
    LaboratoryModule,
  ],
})
export class AppModule { }
