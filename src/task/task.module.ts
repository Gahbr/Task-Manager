import { Module } from '@nestjs/common';
import { TaskService } from './TaskService';
import { TaskController } from './TaskController';
import { SequelizeModule } from '@nestjs/sequelize';
import { TaskModel } from './TaskModel';

@Module({
  imports: [SequelizeModule.forFeature([TaskModel])],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
