import { useInfiniteQuery } from '@tanstack/react-query';
import { moviesApi } from 'api-client';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import useScrollbar from 'src/hooks/useScrollbar';

import type { MovieListProps } from './types';

const moviesPerPage = 8;

export const useMovieList = (initialData: MovieListProps['initialData']) => {
  //shifted by the number of profiles already loaded
  const [offset, setOffset] = useState(initialData.data.length);

  const fetchMoreMovies = async () => {
    const { data } = await moviesApi.getMovies({ limit: moviesPerPage, offset }).throwOnError();
    setOffset((x) => x + moviesPerPage);

    return data;
  };

  const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['movies'],
    queryFn: fetchMoreMovies,
    staleTime: Infinity, //to prevent refetch initial data
    initialPageParam: 0,
    initialData: () => {
      return { pageParams: [null], pages: [initialData.data] };
    },
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === moviesPerPage ? allPages.length * moviesPerPage : undefined,
  });

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  });

  const { scrollPercentage } = useScrollbar();

  useEffect(() => {
    if (scrollPercentage >= 95 && hasNextPage) {
      void fetchNextPage();
    }
  }, [scrollPercentage, hasNextPage, fetchNextPage]);

  return { data, isFetchingNextPage };
};
