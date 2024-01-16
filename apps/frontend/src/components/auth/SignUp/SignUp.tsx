'use client';

import Link from 'next/link';

import { SignUpForm } from '../SignUpForm';

import { useSignUp } from './useSignUp';

export function SignUp() {
  const { onSubmit } = useSignUp();
  return (
    <>
      <h2 className="text-center mb-8">Sign up</h2>
      <SignUpForm onSubmit={onSubmit} />
      <p className="flex w-full justify-center gap-2">
        Already have an account?
        <Link className="link-primary" href="/sign-in">
          Sign in
        </Link>
      </p>
    </>
  );
}
