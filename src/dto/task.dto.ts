import {
  IsInt,
  IsString,
  IsDate,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class Task {
  @IsInt()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsInt()
  @IsNotEmpty()
  status: number;

  @IsOptional()
  @IsDate()
  @IsNotEmpty()
  createdAt: Date;

  @IsOptional()
  @IsString()
  createdBy: string;

  @IsOptional()
  @IsDate()
  updatedAt: Date;
}
