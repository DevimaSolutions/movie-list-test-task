import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { LoggerModule } from '../logger/logger.module';
import { UsersModule } from '../users/users.module';

import { AuthController } from './auth.controller';
import { AuthService } from './services';
import { ApiKeyStrategy, CookieStrategy, LocalStrategy } from './strategies';
import { SignUpStrategy } from './strategies/sign-up.strategy';

@Module({
  imports: [UsersModule, PassportModule, LoggerModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, SignUpStrategy, CookieStrategy, ApiKeyStrategy],
  exports: [AuthService],
})
export class AuthModule {}
