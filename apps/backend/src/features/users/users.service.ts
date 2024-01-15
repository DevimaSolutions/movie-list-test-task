import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { FindOneOptions } from 'typeorm';

import { errorMessages } from 'src/constants';

import { CreateUserDto } from './dto';
import { User } from './entities';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  private hashPass = async (password: string) => bcrypt.hash(password, await bcrypt.genSalt());

  async create({ password, ...createUserDto }: CreateUserDto) {
    const userExists = await this.doesUserExist(createUserDto.email);

    if (userExists) {
      throw new BadRequestException(errorMessages.emailAlreadyTaken);
    }

    const hashedPass = password ? await this.hashPass(password) : undefined;
    const entity = this.usersRepository.create({
      ...createUserDto,
      password: hashedPass,
    });

    await this.usersRepository.save(entity);
    return entity;
  }

  findAll() {
    return this.usersRepository.find();
  }

  async findOne(id: string, options?: FindOneOptions<User>) {
    const entity = await this.usersRepository.findOne({
      ...options,
      where: { id, ...options?.where },
    });

    if (!entity) {
      throw new NotFoundException();
    }

    return entity;
  }

  async findByEmail(email: string) {
    const entity = await this.usersRepository.findOne({ where: { email } });

    if (!entity) {
      throw new NotFoundException();
    }

    return entity;
  }

  findUsersCount() {
    return this.usersRepository.count();
  }

  async doesUserExist(email: string) {
    const entity = await this.usersRepository.exist({ where: { email } });

    return entity;
  }
}
