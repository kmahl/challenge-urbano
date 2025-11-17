import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateContentDto {
  @ApiProperty({
    description: 'Content name',
    example: 'Chapter 1: Variables',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Content description',
    example: 'Introduction to variables in TypeScript',
  })
  @IsNotEmpty()
  @IsString()
  description: string;
}

export class UpdateContentDto extends PartialType(CreateContentDto) {
  @ApiProperty({
    description: 'Version number for optimistic locking',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  version?: number;
}
