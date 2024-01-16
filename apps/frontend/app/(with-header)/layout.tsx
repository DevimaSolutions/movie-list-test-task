import { ToastContainer } from 'react-toastify';

import type { PropsWithChildren } from 'react';

import 'react-toastify/dist/ReactToastify.css';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <main className="pb-[111px] min-h-[100vh]">{children}</main>
      <ToastContainer />
    </>
  );
}
