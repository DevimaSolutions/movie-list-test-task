import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-[100vh] flex items-center justify-center flex-col gap-4">
      <h2>Not Found</h2>
      <p>Could not find requested page</p>
      <Link className="btn btn-primary" href="/">
        Return Home
      </Link>
    </main>
  );
}
