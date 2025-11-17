import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    description: 'User first name',
    example: 'John',
  })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Doe',
  })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({
    description: 'Unique username (alphanumeric only)',
    example: 'johndoe',
  })
  @IsNotEmpty()
  @IsAlphanumeric()
  username: string;

  @ApiProperty({
    description:
      'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character (@$!%*?&#.-_)',
    example: 'Password123!',
    minLength: 8,
  })
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

  @ApiProperty({
    description: 'User role',
    enum: Role,
    example: Role.User,
  })
  @IsEnum(Role)
  role: Role;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    description: 'User active status',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({
    description: 'Version number for optimistic locking',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  version?: number;
}
