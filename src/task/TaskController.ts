import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { Task } from 'src/dto/task.dto';
import { TaskService } from './TaskService';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('tasks')
@ApiTags('Tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  @ApiOperation({ summary: 'Get all the tasks.' })
  async getTasks() {
    return this.taskService.getTasks();
  }

  @ApiOperation({ summary: 'Add a new task' })
  @Post()
  async addTask(@Body() task: Task) {
    const addedTask = this.taskService.addTask(task);
    return addedTask;
  }

  @ApiOperation({ summary: 'List task by ID' })
  @Get(':id')
  async listTaskById(@Param('id') id: string) {
    const task = await this.taskService.getTaskById(id);
    if (task) {
      return task;
    }
    return { message: 'Task not found!' };
  }

  @ApiOperation({ summary: 'Update a task' })
  @Put()
  async updateTask(@Body() task: Partial<Task>) {
    return this.taskService.updateTask(task);
  }

  @ApiOperation({ summary: 'Delete a task' })
  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    return this.taskService.deleteTask(id);
  }
}
