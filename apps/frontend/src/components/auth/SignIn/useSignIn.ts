import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';

import { signInErrorMessagesMap } from './constants';

import type { SignInFormValues } from '../SignInForm';
import type { FormikHelpers } from 'formik';

export const useSignIn = () => {
  const searchParams = useSearchParams();
  const redirectUri = searchParams.get('redirectUri');
  const router = useRouter();

  const onSubmit = async (
    values: SignInFormValues,
    { setErrors }: FormikHelpers<SignInFormValues>,
  ) => {
    // Call NextAuth api route
    const response = await signIn('credentials', {
      ...values,
      redirect: false,
    });
    if (!response?.ok) {
      const errorMessage =
        signInErrorMessagesMap[String(response?.error)] ?? signInErrorMessagesMap.default;
      setErrors({
        email: ' ',
        password: errorMessage,
      });
      return;
    }
    router.replace(redirectUri ?? '/');
    router.refresh();
  };

  const onGoogleSignIn = async () => {
    await signIn('google');
  };

  const onOutlookSignIn = async () => {
    await signIn('azure-ad', undefined, { prompt: 'login' });
  };

  return { onSubmit, onGoogleSignIn, onOutlookSignIn };
};
