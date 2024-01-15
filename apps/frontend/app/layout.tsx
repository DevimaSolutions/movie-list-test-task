import './globals.css';
import { Montserrat } from 'next/font/google';

import { envUtil } from 'src/utils';

import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';

import 'react-toastify/dist/ReactToastify.css';

const montserrat = Montserrat({ subsets: ['latin'] });

const env = envUtil.getEnv();

export const metadata: Metadata = {
  title: env.appName,
  description: 'Movie list test task',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={montserrat.className}>{children}</body>
    </html>
  );
}
