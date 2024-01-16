import { moviesApi, type CreateMovieDto } from 'api-client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

import type { FormikHelpers } from 'formik';

export const useCreateMovieScreen = () => {
  const router = useRouter();
  const [isSubmitDisabled, setSubmitDisabled] = useState(false);

  const onCreateMovie = async (
    values: CreateMovieDto,
    { setErrors }: FormikHelpers<CreateMovieDto>,
  ) => {
    setSubmitDisabled(true);
    const res = await moviesApi.create(values);
    if (res.error) {
      setSubmitDisabled(false);
      if ('errors' in res.error) {
        setErrors(res.error.errors);
        return;
      }
      toast.error(res.error.message, { toastId: 'create-movie' });
      return;
    }
    router.push('/');
    router.refresh();
  };

  return { onCreateMovie, isSubmitDisabled };
};
