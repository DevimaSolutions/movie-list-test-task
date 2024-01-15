import { Controller, Post, UseGuards, Req, Body, Get, Param } from '@nestjs/common';
import { ApiNotFoundResponse, ApiTags } from '@nestjs/swagger';

import { ErrorDto } from '../common/dto/error.dto';
import { UsersService } from '../users';

import { Authorized } from './decorators';
import { RequireApiKey } from './decorators/require-api-key.decorator';
import { SignInDto, SignUpDto } from './dto';
import { LocalAuthGuard } from './guards';
import { SignUpGuard } from './guards/sign-up.guard';
import { RequestWithUser } from './interfaces';
import { AuthService } from './services';

// Authorization is handled by NextAuth package in a frontend application
// This controller is used only as a proxy to access database securely
@ApiTags('Auth')
@Controller('authorization')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @RequireApiKey()
  @Post('sign-in')
  // _signInDto parameter is declared here to allow Swagger plugin
  // parse endpoint body signature
  signIn(@Req() req: RequestWithUser, @Body() _signInDto: SignInDto) {
    return req.user;
  }

  @UseGuards(SignUpGuard)
  @RequireApiKey()
  @Post('sign-up')
  // _signUpDto parameter is declared here to allow Swagger plugin
  // parse endpoint body signature
  signUp(@Req() req: RequestWithUser, @Body() _signUpDto: SignUpDto) {
    return req.user;
  }

  @Authorized()
  @Get('profile')
  getProfile(@Req() req: RequestWithUser) {
    return req.user;
  }

  @RequireApiKey()
  @ApiNotFoundResponse({ type: () => ErrorDto })
  @Get('session/:id')
  getSessionByUserId(@Param('id') id: string) {
    return this.userService.findOne(id);
  }
}
