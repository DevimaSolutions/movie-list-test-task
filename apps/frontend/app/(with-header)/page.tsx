import { requireAuthorizedUser } from 'src/utils/auth.util';

export default async function HomePage() {
  const user = await requireAuthorizedUser();

  return (
    <main className="flex flex-col items-center">
      <h1 className="text-center mt-10">
        Boilerplate - Home page
        <br />
        {`Welcome ${user.email}!`}
      </h1>
    </main>
  );
}
