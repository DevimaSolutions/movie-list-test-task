import type { CreateMovieDto, Movie, UpdateMovieDto } from 'api-client';
import type { FormikConfig } from 'formik';
import type { ZodType } from 'zod';

export type MovieFormProps<TValues extends CreateMovieDto | UpdateMovieDto> = {
  movie?: TValues extends UpdateMovieDto ? Movie : never;
  validationSchema?: ZodType;
} & Pick<FormikConfig<TValues>, 'onSubmit'>;
