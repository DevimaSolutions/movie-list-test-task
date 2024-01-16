import { CreateMovieScreen } from 'src/components/CreateMovieScreen';
import { requireAuthorizedUser } from 'src/utils/auth.util';

export default async function SignInPage() {
  await requireAuthorizedUser();

  return <CreateMovieScreen />;
}
