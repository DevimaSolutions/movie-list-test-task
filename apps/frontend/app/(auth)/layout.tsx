import { ToastContainer } from 'react-toastify';

import type { PropsWithChildren } from 'react';

import 'react-toastify/dist/ReactToastify.css';

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <>
      <main className="flex flex-col justify-center min-h-[100vh] sm:mx-auto sm:w-full sm:max-w-[348px] px-6 py-12">
        {children}
      </main>
      <ToastContainer />
    </>
  );
}
