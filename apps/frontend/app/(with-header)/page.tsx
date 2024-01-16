import { SignOutButton } from 'src/components/auth/SignOutButton';
import { requireAuthorizedUser } from 'src/utils/auth.util';

export default async function HomePage() {
  const user = await requireAuthorizedUser();

  return (
    <main className="flex flex-col items-center justify-center min-h-[100vh]">
      <h1 className="text-center mt-10">
        Boilerplate - Home page
        <br />
        <SignOutButton />
        {`Welcome ${user.email}!`}
      </h1>
    </main>
  );
}
