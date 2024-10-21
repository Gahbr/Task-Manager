import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { TaskStatus } from './TaskStatus';

@Table({
  tableName: 'tasks',
  timestamps: true,
})
export class TaskModel extends Model<TaskModel> {
  @Column({
    type: DataType.STRING,
    primaryKey: true,
    allowNull: false,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    validate: {
      isIn: [
        [TaskStatus.PENDENTE, TaskStatus.EM_PROGRESSO, TaskStatus.CONCLUIDA],
      ],
    },
  })
  status: TaskStatus;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  createdBy: string;
}
