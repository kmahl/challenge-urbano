import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class ContentQuery {
  @ApiPropertyOptional({
    description: 'Filter by content name',
    example: 'Variables',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: 'Filter by content description',
    example: 'introduction',
  })
  @IsOptional()
  @IsString()
  description?: string;
}
