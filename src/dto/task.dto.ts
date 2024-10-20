import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsString,
  IsDate,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { TaskStatus } from 'src/task/TaskStatus';

export class Task {
  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  id: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({ enum: TaskStatus })
  @IsInt()
  @IsNotEmpty()
  status: TaskStatus;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  @IsNotEmpty()
  createdAt: Date;

  @ApiProperty()
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  createdBy: string;

  @ApiProperty()
  @ApiPropertyOptional()
  @IsOptional()
  @IsDate()
  updatedAt: Date;
}
