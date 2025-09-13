'use client';

import { usePathname } from 'next/navigation';
import { AppLayout } from './app-layout';

const GUEST_PATHS = ['/login', '/guest'];

export function AppContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isGuestView = GUEST_PATHS.includes(pathname);

  if (isGuestView) {
    return <>{children}</>;
  }

  return <AppLayout>{children}</AppLayout>;
}
