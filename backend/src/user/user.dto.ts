import { PartialType } from '@nestjs/mapped-types';
import {
  IsAlphanumeric,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

import { Role } from '../enums/role.enum';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsAlphanumeric()
  username: string;

  @IsNotEmpty()
  @MinLength(8)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#.\-_])/,
    {
      message:
        'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character (@$!%*?&#.-_)',
    },
  )
  password: string;

  @IsEnum(Role)
  role: Role;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsNumber()
  version?: number;
}
