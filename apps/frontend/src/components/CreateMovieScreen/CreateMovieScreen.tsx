'use client';
import { MovieForm } from '../forms/MovieForm';

import { useCreateMovieScreen } from './useCreateMovieScreen';
import { createMovieSchema } from './validations';

export function CreateMovieScreen() {
  const { onCreateMovie } = useCreateMovieScreen();
  return <MovieForm onSubmit={onCreateMovie} validationSchema={createMovieSchema} />;
}
