'use client';

import Link from 'next/link';

import { SignInForm } from '../SignInForm';

import { useSignIn } from './useSignIn';

export function SignIn() {
  const { onSubmit } = useSignIn();

  return (
    <>
      <h1 className="text-center text-secondary mb-8">Sign in</h1>
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
