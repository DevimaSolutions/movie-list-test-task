import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

import { signUpErrorMessagesMap } from './constants';

import type { SignUpFormValues } from '../SignUpForm';
import type { FormikHelpers } from 'formik';

export const useSignUp = () => {
  const router = useRouter();

  const onSubmit = async (
    values: SignUpFormValues,
    { setErrors }: FormikHelpers<SignUpFormValues>,
  ) => {
    // Call NextAuth api route
    const response = await signIn('sign-up', {
      ...values,
      redirect: false,
    });
    if (!response?.ok) {
      const errorMessage =
        signUpErrorMessagesMap[String(response?.error)] ?? signUpErrorMessagesMap.default;
      setErrors({
        email: errorMessage,
        password: ' ',
      });
      return;
    }

    router.replace('/');
    router.refresh();
  };
  return { onSubmit };
};
