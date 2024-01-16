'use client';

import { Formik, Form, Field } from 'formik';
import Link from 'next/link';
import { useMemo } from 'react';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import { DropzoneInput } from 'src/components/inputs/DropzoneInput';
import TextInput from 'src/components/inputs/TextInput';
import { fileConstants } from 'src/constants';

import type { MovieFormProps } from './types';
import type { CreateMovieDto, UpdateMovieDto } from 'api-client';

export function MovieForm<TValues extends CreateMovieDto | UpdateMovieDto>({
  movie,
  validationSchema,
  onSubmit,
}: MovieFormProps<TValues>) {
  const initialValues = useMemo<UpdateMovieDto>(
    () => ({
      title: movie?.title ?? '',
      publishingYear: movie?.publishingYear,
    }),
    [movie],
  );

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema ? toFormikValidationSchema(validationSchema) : undefined}
    >
      {({ isSubmitting }) => (
        <Form className="px-6 md:px-[120px] sm:grid sm:grid-cols-2 sm:grid-rows-auto sm:gap-x-[120px] sm:items-start sm:mx-auto md:max-w-[1440px]">
          <Field component={TextInput} name="title" placeholder="Title" rootClassName="m:max-h-0" />
          <Field
            component={TextInput}
            name="publishingYear"
            placeholder="Publishing year"
            rootClassName="sm:max-w-[216px]"
            type="number"
          />
          <Field
            accept={fileConstants.acceptImageMimeTypes}
            component={DropzoneInput}
            defaultPreview={movie?.imageUri}
            multiple={false}
            name="image"
            rootClassName="col-start-1 row-start-1 row-span-4"
          />
          <div className="flex gap-2 mt-2 sm:mt-16">
            <Link className="btn btn-outline grow" href="/">
              Cancel
            </Link>
            <button className="grow btn btn-primary" disabled={isSubmitting} type="submit">
              Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
