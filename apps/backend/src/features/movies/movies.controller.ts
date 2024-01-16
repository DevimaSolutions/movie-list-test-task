import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Authorized } from '../auth';
import { RequestWithUser } from '../auth/interfaces';
import { ApiOkResponsePaginated } from '../common/decorators/api-ok-response-paginated.decorator';
import { IncludeFileUpload } from '../common/decorators/include-file-upload.decorator';
import { ErrorDto } from '../common/dto/error.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { ValidationErrorDto } from '../common/dto/validation-error.dto';
import { ZodValidationPipe } from '../common/pipes';
import { paginationQuerySchema } from '../common/validations';

import { CreateMovieDto, UpdateMovieDto } from './dto';
import { Movie } from './entities';
import { MoviesService } from './movies.service';
import { createMovieSchema } from './validations/create-movie.schema';
import { updateMovieSchema } from './validations/update-movie.schema';

@ApiTags('Movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @ApiForbiddenResponse({ type: () => ErrorDto })
  @ApiOkResponsePaginated(Movie)
  @Authorized()
  @Get()
  getMovies(
    @Req() req: RequestWithUser,
    @Query(new ZodValidationPipe(paginationQuerySchema)) query: PaginationQueryDto,
  ) {
    return this.moviesService.paginateByUserId(req.user.id, query);
  }

  @ApiBadRequestResponse({ type: () => ValidationErrorDto })
  @IncludeFileUpload(CreateMovieDto)
  @Authorized()
  @Post()
  create(
    @Req() req: RequestWithUser,
    @Body(new ZodValidationPipe(createMovieSchema)) createMovieDto: CreateMovieDto,
  ) {
    return this.moviesService.create(req.user.id, createMovieDto);
  }

  @ApiBadRequestResponse({ type: () => ValidationErrorDto })
  @ApiNotFoundResponse({ type: () => ErrorDto })
  @IncludeFileUpload(UpdateMovieDto)
  @Authorized()
  @Patch(':id')
  update(
    @Req() req: RequestWithUser,
    @Param('id', new ParseUUIDPipe()) movieId: string,
    @Body(new ZodValidationPipe(updateMovieSchema)) updateMovieDto: UpdateMovieDto,
  ) {
    return this.moviesService.update(movieId, req.user.id, updateMovieDto);
  }
}
