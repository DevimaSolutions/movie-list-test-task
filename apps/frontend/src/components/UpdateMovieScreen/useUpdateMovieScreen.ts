import { moviesApi, type Movie, type UpdateMovieDto } from 'api-client';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import type { FormikHelpers } from 'formik';

export const useUpdateMovieScreen = (movie: Movie) => {
  const router = useRouter();
  const onUpdateMovie = async (
    values: UpdateMovieDto,
    { setErrors }: FormikHelpers<UpdateMovieDto>,
  ) => {
    const res = await moviesApi.update(movie.id, values);
    if (res.error) {
      if ('errors' in res.error) {
        setErrors(res.error.errors);
        return;
      }
      toast.error(res.error.message, { toastId: 'update-movie' });
      return;
    }
    router.push('/');
  };

  return { onUpdateMovie };
};
