import { moviesApi, type CreateMovieDto } from 'api-client';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import type { FormikHelpers } from 'formik';

export const useCreateMovieScreen = () => {
  const router = useRouter();
  const onCreateMovie = async (
    values: CreateMovieDto,
    { setErrors }: FormikHelpers<CreateMovieDto>,
  ) => {
    const res = await moviesApi.create(values);
    if (res.error) {
      if ('errors' in res.error) {
        setErrors(res.error.errors);
        return;
      }
      toast.error(res.error.message, { toastId: 'create-movie' });
      return;
    }
    router.push('/');
  };

  return { onCreateMovie };
};
