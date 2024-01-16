import clsx from 'clsx';
import { Montserrat } from 'next/font/google';

import { envUtil } from 'src/utils';

import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';

import './globals.css';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
});

const env = envUtil.getEnv();

export const metadata: Metadata = {
  title: env.appName,
  description: 'My Movies list',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={clsx(montserrat.variable, 'font-sans')}>{children}</body>
    </html>
  );
}
