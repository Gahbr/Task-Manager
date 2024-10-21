import { Task } from '../dto/task.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TaskModel } from './TaskModel';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(TaskModel)
    private readonly taskModel: typeof TaskModel,
  ) {}

  getTasks(): Promise<TaskModel[]> {
    return this.taskModel.findAll();
  }

  async addTask(taskData: Partial<Task>): Promise<TaskModel> {
    const taskToAdd: TaskModel = {
      ...taskData,
      id: uuidv4(),
      createdAt: new Date(),
      createdBy: 'Admin',
      updatedAt: null,
    } as TaskModel;

    return this.taskModel.create(taskToAdd);
  }

  async getTaskById(id: string): Promise<TaskModel> {
    return this.taskModel.findByPk(id);
  }

  async updateTask(taskData: Partial<Task>): Promise<TaskModel> {
    await this.taskModel.update(taskData, { where: { id: taskData.id } });
    return this.taskModel.findByPk(taskData.id) as Promise<TaskModel>;
  }

  async deleteTask(id: string): Promise<void> {
    await this.taskModel.destroy({ where: { id } });
  }
}
