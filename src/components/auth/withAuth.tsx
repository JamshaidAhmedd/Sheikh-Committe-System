'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Skeleton } from '@/components/ui/skeleton';

const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const AuthComponent = (props: P) => {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
      // We need to check this on the client side after the initial render.
      const authStatus = localStorage.getItem('isAuthenticated');
      if (authStatus !== 'true') {
        router.replace('/login');
      }
    }, [router]);

    if (!isAuthenticated) {
      // Show a loading state or skeleton UI while checking auth
      return (
        <div className="p-8">
            <Skeleton className="h-16 w-1/2 mb-4" />
            <Skeleton className="h-64 w-full" />
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };
  AuthComponent.displayName = `WithAuth(${getDisplayName(WrappedComponent)})`;
  return AuthComponent;
};

function getDisplayName<P>(WrappedComponent: React.ComponentType<P>) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}


export default withAuth;
