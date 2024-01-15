import { ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { decode } from 'next-auth/jwt';

import envConfig from 'src/config/env.config';
import { User, UsersService } from 'src/features/users';

import { SignUpDto } from '../dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(envConfig.KEY)
    private config: ConfigType<typeof envConfig>,
    private usersService: UsersService,
  ) {}

  validateApiKey(apiKey: string) {
    return this.config.auth.apiKey === apiKey;
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    try {
      const user = await this.usersService.findByEmail(email);

      if (!user.password) {
        throw new ForbiddenException();
      }

      const doPasswordsMatch = await bcrypt.compare(password, user.password);
      if (doPasswordsMatch) {
        return user;
      }
      return null;
    } catch (e) {
      if (e instanceof NotFoundException) {
        // User was not found
        return null;
      }
      throw e;
    }
  }

  async validateUserPayload(token: string | undefined): Promise<User | null> {
    try {
      const payload = await decode({ token, secret: this.config.auth.jwtSecret });

      if (!payload?.sub) {
        return null;
      }

      const user = await this.usersService.findOne(payload.sub);
      return user;
    } catch (e) {
      // User was not found
      return null;
    }
  }

  async signUp({ email, password }: SignUpDto) {
    const user = await this.usersService.create({
      email,
      password,
    });

    return user;
  }
}
