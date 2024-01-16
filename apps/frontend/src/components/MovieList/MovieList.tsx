import type { MovieListProps } from './types';

export function MovieList({ initialData }: MovieListProps) {
  console.log({ initialData });
  return (
    <>
      <h3>Movie list</h3>
      <code>{JSON.stringify(initialData)}</code>
    </>
  );
}
