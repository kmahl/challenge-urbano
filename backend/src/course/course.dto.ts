import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCourseDto {
  @ApiProperty({
    description: 'Course name',
    example: 'Introduction to TypeScript',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Course description',
    example: 'Learn the basics of TypeScript programming',
  })
  @IsNotEmpty()
  @IsString()
  description: string;
}

export class UpdateCourseDto extends PartialType(CreateCourseDto) {
  @ApiProperty({
    description: 'Version number for optimistic locking',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  version?: number;
}
