import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamModule } from './presentation/exam/exam.module';
import { LaboratoryModule } from './presentation/laboratory/laboratory.module';

@Module({
  imports: [
    ExamModule,
    LaboratoryModule,

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: +process.env.MYSQL_PORT,
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_USER_PASS,
      database: process.env.MYSQL_DB_NAME,
      entities: ['./src/core/domain/entities/**/*.entity.ts'],
      synchronize: true,
    }),
  ],
})
export class AppModule { }
