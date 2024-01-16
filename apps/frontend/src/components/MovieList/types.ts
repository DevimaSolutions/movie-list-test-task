import type { Movie, PaginationResponseDto } from 'api-client';

export interface MovieListProps {
  initialData: Omit<PaginationResponseDto, 'data'> & {
    data: Movie[];
  };
}
