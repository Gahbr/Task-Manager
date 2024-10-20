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
      status: task.status,
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
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }
  }

  updateTask(updatedTask: Task): Task {
    const taskIndex = this.tasks.findIndex(
      (item) => item.id === updatedTask.id,
    );

    if (taskIndex !== -1) {
      const taskToUpdate = this.tasks[taskIndex];

      taskToUpdate.description = updatedTask.description;
      taskToUpdate.title = updatedTask.title;
      taskToUpdate.status = updatedTask.status;
      taskToUpdate.updatedAt = new Date();

      console.log('Task updated');
      return taskToUpdate;
    } else {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }
  }

  deleteTask(id: number): string {
    const deleteTask = this.tasks.find((item) => item.id === id);
    if (deleteTask) {
      this.tasks = this.tasks.filter((task) => task.id !== id);
      return 'User deleted';
    }
    return 'Could not delete user';
  }
}
