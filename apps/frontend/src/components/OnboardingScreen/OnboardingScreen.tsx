import Link from 'next/link';

export function OnboardingScreen() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[100vh] px-6">
      <h2 className="text-4xl sm:text-5xl">Your movie list is empty</h2>
      <Link className="btn btn-primary mt-10 px-7 w-full sm:w-fit" href="/add">
        Add a new movie
      </Link>
    </main>
  );
}
