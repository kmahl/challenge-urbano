import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ILike } from 'typeorm';

import { CreateUserDto, UpdateUserDto } from './user.dto';
import { User } from './user.entity';
import { UserQuery } from './user.query';
import { escapeLikePattern } from '../utils/sql.util';
import { BCRYPT_ROUNDS } from '../constants/security.constants';
import { validateOptimisticLock } from '../utils/optimistic-locking.util';

@Injectable()
export class UserService {
  private async validateUniqueUsername(
    username: string,
    excludeId?: string,
  ): Promise<void> {
    const existingUser = await this.findByUsername(username);

    if (existingUser && existingUser.id !== excludeId) {
      throw new HttpException(
        `User with username ${username} already exists`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async save(createUserDto: CreateUserDto): Promise<User> {
    await this.validateUniqueUsername(createUserDto.username);

    const { password } = createUserDto;
    createUserDto.password = await bcrypt.hash(password, BCRYPT_ROUNDS);
    return User.create(createUserDto).save();
  }

  async findAll(userQuery: UserQuery): Promise<User[]> {
    Object.keys(userQuery).forEach((key) => {
      if (key !== 'role') {
        const sanitized = escapeLikePattern(String(userQuery[key]));
        userQuery[key] = ILike(`%${sanitized}%`);
      }
    });

    return User.find({
      where: userQuery,
      order: {
        firstName: 'ASC',
        lastName: 'ASC',
      },
    }) as Promise<User[]>;
  }

  async findById(id: string): Promise<User> {
    const user = await User.findOne(id);

    if (!user) {
      throw new HttpException(
        `Could not find user with matching id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }

    return user;
  }

  async findByUsername(username: string): Promise<User> {
    return User.findOne({ where: { username } });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const currentUser = await this.findById(id);

    // Optimistic locking: Check version if provided
    validateOptimisticLock(currentUser.version, updateUserDto.version);

    if (updateUserDto.username && updateUserDto.username !== currentUser.username) {
      await this.validateUniqueUsername(updateUserDto.username, id);
    }

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, BCRYPT_ROUNDS);
    }

    // Remove version from DTO to let TypeORM auto-increment it
    const { version, ...dataToUpdate } = updateUserDto;

    return User.create({ id, ...dataToUpdate }).save();
  }

  async delete(id: string): Promise<string> {
    await User.delete(await this.findById(id));
    return id;
  }

  async count(): Promise<number> {
    return await User.count();
  }

  /* Hash the refresh token and save it to the database */
  async setRefreshToken(id: string, refreshToken: string): Promise<void> {
    const user = await this.findById(id);
    await User.update(user, {
      refreshToken: refreshToken ? await bcrypt.hash(refreshToken, BCRYPT_ROUNDS) : null,
    });
  }
}
