import { ExecutionContext } from '@nestjs/common';

import { UserGuard } from './user.guard';

describe('UserGuard', () => {
  let guard: UserGuard;

  beforeEach(() => {
    guard = new UserGuard();
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('should return true when user is admin', async () => {
    const mockRequest = {
      user: {
        role: 'admin',
      },
      params: {},
    };

    const context = {
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: jest.fn().mockReturnValue(mockRequest),
      }),
    } as unknown as ExecutionContext;

    const result = await guard.canActivate(context);
    expect(result).toBe(true);
  });

  it('should return true when user is equals to param id', async () => {
    const mockRequest = {
      params: {
        id: 'testid',
      },
      user: {
        userId: 'testid',
      },
    };

    const context = {
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: jest.fn().mockReturnValue(mockRequest),
      }),
    } as unknown as ExecutionContext;

    const result = await guard.canActivate(context);
    expect(result).toBe(true);
  });

  it('should return false when user is not admin and userId does not match', async () => {
    const mockRequest = {
      params: {
        id: 'otherid',
      },
      user: {
        userId: 'testid',
        role: 'user',
      },
    };

    const context = {
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: jest.fn().mockReturnValue(mockRequest),
      }),
    } as unknown as ExecutionContext;

    const result = await guard.canActivate(context);
    expect(result).toBe(false);
  });
});
