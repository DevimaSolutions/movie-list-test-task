import { ApiProperty } from '@nestjs/swagger';

export class CreateMovieDto {
  title: string;

  publishingYear: number;

  @ApiProperty({ type: 'string', format: 'binary', description: 'Image file to upload' })
  image: Express.Multer.File;
}
