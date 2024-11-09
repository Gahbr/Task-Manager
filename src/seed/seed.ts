import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { TaskModel } from 'src/task/TaskModel';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class SeederService {
  constructor(private sequelize: Sequelize) {}

  async seed() {
    await this.sequelize.sync({ force: true });
    
    await TaskModel.bulkCreate([
      {
        id: uuidv4(),
        title: 'First Task',
        description: 'This is the first task.',
        status: 1, // PENDENTE
        createdBy: 'Admin',
      },
      {
        id: uuidv4(),
        title: 'Second Task',
        description: 'This is the second task.',
        status: 2, // EM_PROGRESSO
        createdBy: 'Admin',
      },
      {
        id: uuidv4(),
        title: 'Third Task',
        description: 'This is the Third task.',
        status: 2, // EM_PROGRESSO
        createdBy: 'Admin',
      },
      {
        id: uuidv4(),
        title: 'Fourth Task',
        description: 'This is the Fourth task.',
        status: 1, // PENDENTE
        createdBy: 'Admin',
      },
      {
        id: uuidv4(),
        title: 'Fifth Task',
        description: 'This is the Fifth task.',
        status: 1, // PENDENTE
        createdBy: 'Admin',
      },
    ]);
    console.log('Database seeded!');
  }
}
