import { Controller, Get, Param } from '@nestjs/common';
import { ApiForbiddenResponse, ApiNotFoundResponse, ApiParam, ApiTags } from '@nestjs/swagger';

import { Authorized } from '../auth';
import { ErrorDto } from '../common/dto/error.dto';

import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiNotFoundResponse({ type: () => ErrorDto })
  @ApiForbiddenResponse({ type: () => ErrorDto })
  @ApiParam({ name: 'id', type: 'string' })
  @Authorized()
  @Get(':id')
  findOne(@Param() id: string) {
    return this.usersService.findOne(id);
  }
}
