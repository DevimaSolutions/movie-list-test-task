'use client';
import { MovieForm } from '../forms/MovieForm';

import { useCreateMovieScreen } from './useCreateMovieScreen';
import { createMovieSchema } from './validations';

export function CreateMovieScreen() {
  const { onCreateMovie, isSubmitDisabled } = useCreateMovieScreen();
  return (
    <MovieForm
      isSubmitDisabled={isSubmitDisabled}
      onSubmit={onCreateMovie}
      validationSchema={createMovieSchema}
    />
  );
}
