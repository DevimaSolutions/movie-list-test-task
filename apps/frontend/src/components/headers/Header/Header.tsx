import { SignOutButton } from '../../auth/SignOutButton';

import type { HeaderProps } from './types';

export default function Header({ showLogoutButton, children }: HeaderProps) {
  return (
    <header className="w-full px-6 py-[80px] md:max-w-[1440px] md:p-[120px] md:mx-auto flex items-center justify-between">
      <h2 className="text-4xl sm:text-5xl">{children}</h2>
      {showLogoutButton ? <SignOutButton /> : null}
    </header>
  );
}
