import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ILike } from 'typeorm';

import { CreateCourseDto, UpdateCourseDto } from './course.dto';
import { Course } from './course.entity';
import { CourseQuery } from './course.query';
import { escapeLikePattern } from '../utils/sql.util';
import { validateOptimisticLock } from '../utils/optimistic-locking.util';

@Injectable()
export class CourseService {
  async save(createCourseDto: CreateCourseDto): Promise<Course> {
    return await Course.create({
      ...createCourseDto,
      dateCreated: new Date(),
    }).save();
  }

  async findAll(courseQuery: CourseQuery): Promise<Course[]> {
    Object.keys(courseQuery).forEach((key) => {
      const sanitized = escapeLikePattern(String(courseQuery[key]));
      courseQuery[key] = ILike(`%${sanitized}%`);
    });
    return (await Course.find({
      where: courseQuery,
      order: {
        name: 'ASC',
        description: 'ASC',
      },
    })) as Course[];
  }

  async findById(id: string): Promise<Course> {
    const course = await Course.findOne(id);
    if (!course) {
      throw new HttpException(
        `Could not find course with matching id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }
    return course;
  }

  async update(id: string, updateCourseDto: UpdateCourseDto): Promise<Course> {
    const course = await this.findById(id);

    // Optimistic locking: Check version if provided
    validateOptimisticLock(course.version, updateCourseDto.version);

    // Remove version from DTO to let TypeORM auto-increment it
    const { version, ...dataToUpdate } = updateCourseDto;

    return await Course.create({ id: course.id, ...dataToUpdate }).save();
  }

  async delete(id: string): Promise<string> {
    const course = await this.findById(id);
    await Course.delete(course);
    return id;
  }

  async count(): Promise<number> {
    return await Course.count();
  }
}
