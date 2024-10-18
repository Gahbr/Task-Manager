import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { Task } from 'src/dto/task.dto';
import { TaskService } from './TaskService';

@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  async getTasks() {
    return this.taskService.getTasks();
  }

  @Post()
  async addTask(@Body() task: Task) {
    const addedTask = this.taskService.addTask(task);
    return addedTask;
  }

  @Get(':id')
  async listTaskById(@Param('id', ParseIntPipe) id: number) {
    if (id) {
      return this.taskService.getTaskById(id);
    }
    return 'Task not found!';
  }

  @Put()
  async updateTask(@Body() task: Task) {
    return this.taskService.updateTask(task);
  }
}
