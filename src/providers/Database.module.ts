import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TaskModel } from 'src/task/TaskModel'; // Adjust the path if necessary

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useFactory: () => ({
        dialect: 'postgres',
        host: process.env.DATABASE_HOST,
        port: +process.env.DATABASE_PORT,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        models: [TaskModel],
        synchronize: true,
        autoLoadModels: true,
      }),
    }),
  ],
  exports: [SequelizeModule],
})
export class DatabaseModule {}
