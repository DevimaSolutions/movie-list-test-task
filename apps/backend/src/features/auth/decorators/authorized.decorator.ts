import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiCookieAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';

import { ErrorDto } from 'src/features/common/dto/error.dto';

import { CookieAuthGuard } from '../guards';

/**
 * Protect endpoint using bearer JWT auth.
 */
export const Authorized = () => {
  const decorators = [
    UseGuards(CookieAuthGuard),
    ApiCookieAuth(),
    ApiUnauthorizedResponse({ type: () => ErrorDto }),
  ];

  return applyDecorators(...decorators);
};
