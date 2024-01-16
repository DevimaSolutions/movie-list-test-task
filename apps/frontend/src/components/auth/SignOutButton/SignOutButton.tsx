'use client';

import { ArrowUpTrayIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { signOut } from 'next-auth/react';

import type { ButtonHTMLAttributes } from 'react';

export function SignOutButton({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  const onSignOut = async () => {
    await signOut();
  };

  return (
    <button
      className={clsx('max-h-10 btn btn-ghost', className)}
      onClick={onSignOut}
      type="button"
      {...props}
    >
      Logout
      <ArrowUpTrayIcon className="w-6 h-6 sm:w-8 sm:h-8 rotate-90" />
    </button>
  );
}
