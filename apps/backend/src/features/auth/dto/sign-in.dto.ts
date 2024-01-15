import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({ example: 'dmytro@devima.solutions' })
  email: string;
  @ApiProperty({ example: 'Test1234' })
  password: string;
}
