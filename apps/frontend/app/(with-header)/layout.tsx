import { ToastContainer } from 'react-toastify';

import type { PropsWithChildren } from 'react';

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
}
