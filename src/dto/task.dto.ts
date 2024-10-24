import { ApiHideProperty, ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsString,
  IsDate,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { TaskStatus } from 'src/task/TaskStatus';

export class Task {
  @ApiHideProperty()
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({example:"Task title"})
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({example:"Task description"})
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({ enum: TaskStatus })
  @IsInt()
  @IsNotEmpty()
  status: TaskStatus;

  @ApiHideProperty()
  @IsOptional()
  @IsDate()
  @IsNotEmpty()
  createdAt: Date;

  @ApiProperty()
  @ApiPropertyOptional()
  @ApiProperty({example:"Admin"})
  @IsOptional()
  @IsString()
  createdBy: string;

  @ApiHideProperty()
  @IsOptional()
  @IsDate()
  updatedAt: Date;
}
