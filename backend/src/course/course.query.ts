import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CourseQuery {
  @ApiPropertyOptional({
    description: 'Filter by course name',
    example: 'TypeScript',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: 'Filter by course description',
    example: 'programming',
  })
  @IsOptional()
  @IsString()
  description?: string;
}
