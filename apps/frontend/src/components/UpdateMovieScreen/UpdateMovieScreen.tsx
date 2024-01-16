'use client';

import { MovieForm } from '../forms/MovieForm';

import { useUpdateMovieScreen } from './useUpdateMovieScreen';
import { updateMovieSchema } from './validations';

import type { UpdateMovieScreenProps } from './types';

export function UpdateMovieScreen({ movie }: UpdateMovieScreenProps) {
  const { onUpdateMovie } = useUpdateMovieScreen(movie);

  return <MovieForm movie={movie} onSubmit={onUpdateMovie} validationSchema={updateMovieSchema} />;
}
