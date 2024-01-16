import Image from 'next/image';
import Link from 'next/link';

import type { Movie } from 'api-client';

export function MovieCard({ id, title, publishingYear, imageUri }: Movie) {
  return (
    <Link
      className="card bg-stale-900 text-secondary no-underline shadow-xl max-w-full sm:p-2"
      href={`/${id}`}
    >
      <figure className="m-0 sm:rounded-xl aspect-[11/15]">
        <Image alt={title} className="object-cover" height={400} src={imageUri} width={266} />
      </figure>
      <div className="card-body p-3 sm:p-0 sm:mt-4 overflow-hidden">
        <h3 className="card-title text-3xl font-normal truncate block">{title}</h3>
        <p className="font-light text-md my-2">{publishingYear}</p>
      </div>
    </Link>
  );
}
