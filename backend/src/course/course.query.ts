import { IsOptional, IsString } from 'class-validator';

export class CourseQuery {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
