import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsString,
  IsDate,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

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

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  status: number;

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
