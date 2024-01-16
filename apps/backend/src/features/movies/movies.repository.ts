import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { BaseRepository } from '../common/repository';

import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesRepository extends BaseRepository<Movie> {
  constructor(
    @InjectDataSource()
    protected dataSource: DataSource,
  ) {
    super(Movie, dataSource);
  }
}
