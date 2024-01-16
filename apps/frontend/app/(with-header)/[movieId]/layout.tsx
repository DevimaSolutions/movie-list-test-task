import Header from 'src/components/headers/Header';
import { envUtil } from 'src/utils';

import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';

export const metadata: Metadata = {
  title: `Edit movie - ${envUtil.getEnv().appName}`,
};

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Header>Edit</Header>
      {children}
    </>
  );
}
