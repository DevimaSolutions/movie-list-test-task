import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { FindOneOptions } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { errorMessages } from 'src/constants';

import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { PaginationResponseDto } from '../common/dto/pagination-response.dto';
import { FileUploadService } from '../file-upload';

import { CreateMovieDto, UpdateMovieDto } from './dto';
import { Movie } from './entities';
import { MoviesRepository } from './movies.repository';

@Injectable()
export class MoviesService {
  constructor(
    private moviesRepository: MoviesRepository,
    private fileUploadService: FileUploadService,
  ) {}

  async create(userId: string, { image, ...createMovieDto }: CreateMovieDto) {
    const movieId = uuid();

    let imageUri;
    try {
      imageUri = await this.fileUploadService.uploadFile(image, `/movie/${movieId}`);
    } catch (e) {
      // handle exception in the condition below
    }
    if (!imageUri) {
      throw new BadRequestException(errorMessages.failedToUploadFile);
    }

    const entity = this.moviesRepository.create({ ...createMovieDto, imageUri, userId });
    await this.moviesRepository.save(entity);
    return entity;
  }

  async update(movieId: string, userId: string, { image, ...updateMovieDto }: UpdateMovieDto) {
    const entity = await this.findOne(movieId, { where: { userId } });

    let imageUri;
    if (image) {
      imageUri = await this.fileUploadService.uploadFile(image, `/movie/${movieId}`);
      if (!imageUri) {
        throw new BadRequestException(errorMessages.failedToUploadFile);
      }
    }

    await this.moviesRepository.update(entity.id, { imageUri, ...updateMovieDto });

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
