import { Injectable, NotFoundException } from '@nestjs/common';
import { FindOneOptions } from 'typeorm';

import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { PaginationResponseDto } from '../common/dto/pagination-response.dto';

import { CreateMovieDto, UpdateMovieDto } from './dto';
import { Movie } from './entities';
import { MoviesRepository } from './movies.repository';

@Injectable()
export class MoviesService {
  constructor(private moviesRepository: MoviesRepository) {}

  async create(userId: string, createMovieDto: CreateMovieDto) {
    const entity = this.moviesRepository.create({ ...createMovieDto, userId });
    await this.moviesRepository.save(entity);
    return entity;
  }

  async update(movieId: string, userId: string, updateMovieDto: UpdateMovieDto) {
    const entity = await this.findOne(movieId, { where: { userId } });

    await this.moviesRepository.update(entity.id, updateMovieDto);

    return this.findOne(movieId);
  }

  getCountByUserId(userId: string) {
    return this.moviesRepository.countBy({ userId });
  }

  async paginateByUserId(
    userId: string,
    params: PaginationQueryDto,
  ): Promise<PaginationResponseDto<Movie>> {
    const total = await this.getCountByUserId(userId);

    const data = await this.moviesRepository.find({
      where: { userId },
      skip: params.offset,
      take: params.limit,
    });
    return {
      data,
      limit: params.limit,
      offset: params.offset,
      total,
    };
  }

  async findOne(id: string, options?: FindOneOptions<Movie>) {
    const entity = await this.moviesRepository.findOne({
      ...options,
      where: { id, ...options?.where },
    });

    if (!entity) {
      throw new NotFoundException();
    }

    return entity;
  }
}
