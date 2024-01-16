import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { moviesApi } from 'api-client';
import Link from 'next/link';

import Header from 'src/components/headers/Header';
import { MovieList } from 'src/components/MovieList';
import { OnboardingScreen } from 'src/components/OnboardingScreen';
import ReactQueryProvider from 'src/components/QueryProvider';
import { requireAuthorizedUser } from 'src/utils/auth.util';

export const dynamic = 'force-dynamic';

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
        <div className="tooltip" data-tip="Create a new movie">
          <Link className="btn btn-ghost p-0 max-h-10" href="/add">
            <PlusCircleIcon className="w-6 h-6 sm:w-8 sm:h-8" />
          </Link>
        </div>
      </Header>
      <ReactQueryProvider>
        <MovieList initialData={moviesDataPage} />
      </ReactQueryProvider>
    </main>
  );
}
