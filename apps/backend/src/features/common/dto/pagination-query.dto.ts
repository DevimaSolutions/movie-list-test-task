import { ApiProperty } from '@nestjs/swagger';

export class PaginationQueryDto {
  @ApiProperty({
    required: false,
    minimum: 0,
    default: 8,
  })
  limit: number;

  @ApiProperty({
    required: false,
    minimum: 0,
    default: 0,
  })
  offset: number;
}
