import { moviesApi } from 'api-client';
import { notFound } from 'next/navigation';

import { UpdateMovieScreen } from 'src/components/UpdateMovieScreen';
import { requireAuthorizedUser } from 'src/utils/auth.util';

import type { PageProps } from 'src/types/page';

export default async function SignInPage({ params }: PageProps<never, { movieId: string }>) {
  await requireAuthorizedUser();
  const res = await moviesApi.getMovieById(params.movieId);
  if (res.error) {
    notFound();
  }

  return <UpdateMovieScreen movie={res.data} />;
}
