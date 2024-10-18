import { Module } from '@nestjs/common';
import { TaskService } from './TaskService';
import { TaskController } from './TaskController';

@Module({
  controllers: [TaskController],
  providers: [TaskService],
  imports: [],
})
export class TaskModule {}
