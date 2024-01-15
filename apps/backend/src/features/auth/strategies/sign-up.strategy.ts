import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy as PassportLocalStrategy } from 'passport-local';

import { UsersService } from 'src/features/users';
import { User } from 'src/features/users/entities/user.entity';

// This strategy is responsible for logging in user with email and password
@Injectable()
export class SignUpStrategy extends PassportStrategy(PassportLocalStrategy, 'sign-up') {
  constructor(private usersService: UsersService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<User> {
    const user = await this.usersService.create({ email, password });
    return user;
  }
}
