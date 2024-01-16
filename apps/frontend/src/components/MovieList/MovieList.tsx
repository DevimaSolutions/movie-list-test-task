'use client';
import { MovieCard } from '../cards/MovieCard';

import { useMovieList } from './useMovieList';

import type { MovieListProps } from './types';

export function MovieList({ initialData }: MovieListProps) {
  const { data, isFetchingNextPage } = useMovieList(initialData);
  return (
    <div className="px-6 md:px-[120px] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-rows-auto gap-x-5 gap-y-10 sm:gap-x-6 sm:gap-y-6 sm:mx-auto md:max-w-[1440px]">
      {data.pages.map((page) => page.map((movie) => <MovieCard key={movie.id} {...movie} />))}
      {isFetchingNextPage ? (
        <div className="w-full flex justify-center col-span-2 md:col-span-3 lg:col-span-4">
          <span className="loading loading-spinner loading-lg" />
        </div>
      ) : null}
    </div>
  );
}
