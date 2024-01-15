'use client';

import Link from 'next/link';

import { SignInForm } from '../SignInForm';

import { useSignIn } from './useSignIn';

export function SignIn() {
  const { onSubmit } = useSignIn();

  return (
    <>
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Sign in to your account
      </h2>
      <SignInForm onSubmit={onSubmit} />
      <p className="flex w-full justify-center gap-2">
        Don&apos;t have an account?{' '}
        <Link className="link-primary" href="/sign-up">
          Sign up
        </Link>
      </p>
    </>
  );
}
