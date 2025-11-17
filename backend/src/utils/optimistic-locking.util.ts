import { HttpException, HttpStatus } from '@nestjs/common';
export function validateOptimisticLock(
  entityVersion: number,
  dtoVersion?: number,
): void {
  if (dtoVersion !== undefined && entityVersion !== dtoVersion) {
    throw new HttpException(
      'This record has been modified by another user. Please refresh and try again.',
      HttpStatus.CONFLICT,
    );
  }
}
