import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: async () => ({
                type: 'mysql',
                host: process.env.MYSQL_HOST,
                port: +process.env.MYSQL_PORT,
                username: process.env.MYSQL_USER,
                password: process.env.MYSQL_USER_PASS,
                database: process.env.MYSQL_DB_NAME,
                entities: ["dist/**/*.entity.{ts,js}"],
                synchronize: true,
                logging: true,
            }),
        }),
    ],
})
export class MysqlInfraModule { }
