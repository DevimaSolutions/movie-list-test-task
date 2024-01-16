import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FileUploadModule } from '../file-upload/file-upload.module';

import { Movie } from './entities';
import { MoviesController } from './movies.controller';
import { MoviesRepository } from './movies.repository';
import { MoviesService } from './movies.service';

@Module({
  imports: [TypeOrmModule.forFeature([Movie]), FileUploadModule.forFeature()],
  controllers: [MoviesController],
  providers: [MoviesService, MoviesRepository],
  exports: [MoviesService, MoviesRepository],
})
export class MoviesModule {}
