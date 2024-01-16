import { Test, TestingModule } from '@nestjs/testing';

import { mockFactory } from 'test/mocks';

import { MoviesController } from './movies.controller';

describe('MoviesController', () => {
  let controller: MoviesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
    })
      .useMocker(mockFactory)
      .compile();

    controller = module.get<MoviesController>(MoviesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
