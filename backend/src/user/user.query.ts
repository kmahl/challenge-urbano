import { IsEnum, IsOptional, IsString } from 'class-validator';

import { Role } from '../enums/role.enum';

export class UserQuery {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsEnum(Role)
  role?: string;
}
