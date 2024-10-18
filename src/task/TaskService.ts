import { Task } from '../dto/task.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class TaskService {
  private tasks: Task[] = [];

  getTasks() {
    return this.tasks;
  }

  addTask(task: Task): Task {
    const taskToAdd: Task = {
      id: this.tasks.length + 1,
      title: task.title,
      description: task.description,
      createdAt: new Date(),
      status: 0,
      createdBy: '',
      updatedAt: undefined,
    };
    this.tasks.push(taskToAdd);
    return taskToAdd;
  }

  getTaskById(id: number): Task {
    const result = this.tasks.find((item) => item.id === id);
    if (result) {
      return result;
    } else {
      throw new HttpException('Task not found', HttpStatus.FORBIDDEN);
    }
  }

  updateTask(updatedTask: Task): Task {
    const result = this.tasks.find((item) => item.id === updatedTask.id);
    if (result) {
      result.description = updatedTask.description;
      result.id = result.id;
      (result.title = updatedTask.title), (result.updatedAt = new Date());
      console.log('Task updated');
      return result;
    } else {
      throw new HttpException('Task not found', HttpStatus.FORBIDDEN);
    }
  }

  deleteTask(id: number) {
    const result = this.tasks.find((item) => item.id === id);
    if (result) {
       result;
    } else {
      throw new HttpException('Task not found', HttpStatus.FORBIDDEN);
    }
  }
}
