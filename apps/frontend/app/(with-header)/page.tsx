import { getServerUser } from 'src/utils/auth/get-server-user';

export default async function HomePage() {
  const user = await getServerUser();

  return (
    <main className="flex flex-col items-center">
      <h1 className="text-center mt-10">
        Boilerplate - Home page
        <br />
        {user ? `Welcome ${user.email}!` : 'Please sign in'}
      </h1>
    </main>
  );
}