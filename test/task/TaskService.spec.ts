import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { v4 as uuidv4 } from 'uuid';
import { ModelStatic } from 'sequelize-typescript';
import { TaskModel } from '../../src/task/TaskModel';
import { TaskService } from '../../src/task/TaskService';

interface TaskModelStatic extends ModelStatic<TaskModel> {
  findAll: jest.Mock;
  create: jest.Mock;
}

const mockTestData = { title: 'New Task', status: 1 }; 
describe('TaskService', () => {
  let service: TaskService;
  let taskModel: TaskModelStatic;

  const mockTaskModel: TaskModelStatic = {
    findAll: jest.fn(),
    create: jest.fn(),
  } as any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        {
          provide: getModelToken(TaskModel),
          useValue: mockTaskModel,
        },
      ],
    }).compile();

    service = module.get<TaskService>(TaskService);
    taskModel = module.get<TaskModelStatic>(getModelToken(TaskModel));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getTasks', () => {
    it('should return an array of tasks', async () => {
      const mockTasks = [mockTestData, mockTestData] as TaskModel[];
      (taskModel.findAll as jest.Mock).mockResolvedValue(mockTasks);

      const tasks = await service.getTasks();
      expect(tasks).toEqual(mockTasks);
      expect(taskModel.findAll).toHaveBeenCalled();
    });
  });

  describe('addTask', () => {
    it('should add a new task and return it', async () => {
      
      const createdTask = { ...mockTestData, id: uuidv4(), createdAt: new Date(), createdBy: 'Admin' };

      (taskModel.create as jest.Mock).mockResolvedValue(createdTask);

      const result = await service.addTask(mockTestData);
      expect(result).toEqual(createdTask);
      expect(taskModel.create).toHaveBeenCalledWith(expect.objectContaining({
        ...mockTestData,
        id: expect.any(String),
        createdAt: expect.any(Date),
        createdBy: 'Admin',
      }));
    });

    it('should throw an error if create fails', async () => {
      const errorMessage = "Error creating task: Database Error";
      (taskModel.create as jest.Mock).mockRejectedValue(new Error(errorMessage));

      await expect(service.addTask(mockTestData)).rejects.toThrow(errorMessage);
    });
  });
});
