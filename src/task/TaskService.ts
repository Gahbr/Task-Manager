import { Task } from './dto/task.dto';
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
    try {
      const taskToAdd: TaskModel = {
        ...taskData,
        id: uuidv4(),
        createdAt: new Date(),
        createdBy: 'Admin',
      } as TaskModel;

      return this.taskModel.create(taskToAdd);
    } catch (error) {
      throw new Error('Error creating task: ' + error.message);
    }
  }

  async getTaskById(id: string): Promise<TaskModel> {
    try {
      const task = await this.taskModel.findByPk(id);
      if (!task) {
        throw new Error(`Task with id ${id} not found`);
      }
      return task;
    } catch (error) {
      throw new Error(`Error retrieving task: ${error.message}`);
    }
  }

  async updateTask(taskData: Partial<Task>): Promise<TaskModel> {
    try {
      const [updated] = await this.taskModel.update(taskData, {
        where: { id: taskData.id },
      });
      if (!updated) {
        throw new Error(`Task with id ${taskData.id} not found or not updated`);
      }
      return await this.taskModel.findByPk(taskData.id);
    } catch (error) {
      throw new Error(`Error updating task: ${error.message}`);
    }
  }

  async deleteTask(id: string): Promise<void> {
    try {
      const deleted = await this.taskModel.destroy({ where: { id } });
      if (!deleted) {
        throw new Error(`Task with id ${id} not found`);
      }
    } catch (error) {
      throw new Error(`Error deleting task: ${error.message}`);
    }
  }
}
