import { PlusCircleIcon } from '@heroicons/react/24/solid';
import { moviesApi } from 'api-client';
import Link from 'next/link';

import Header from 'src/components/headers/Header';
import { MovieList } from 'src/components/MovieList';
import { OnboardingScreen } from 'src/components/OnboardingScreen';
import { requireAuthorizedUser } from 'src/utils/auth.util';

export default async function HomePage() {
  await requireAuthorizedUser();
  const moviesDataPage = await moviesApi.getMovies().throwOnError();

  if (moviesDataPage.total === 0) {
    return <OnboardingScreen />;
  }

  return (
    <main className="pb-[111px] min-h-[100vh]">
      <Header showLogoutButton>
        My Movies{' '}
        <Link href="/add">
          <PlusCircleIcon className="w-4 h-4" />
        </Link>
      </Header>
      <MovieList initialData={moviesDataPage} />
    </main>
  );
}
