'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminRoute({ children }: { children: React.ReactNode }) {
  const { user, loading, isAdmin } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      router.push('/auth/login');
    }
  }, [user, loading, isAdmin, router]);
  
  if (loading) {
    return <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
      <p className="text-white">Cargando...</p>
    </div>;
  }
  
  if (!user || !isAdmin) {
    return null;
  }
  
  return <>{children}</>;
} 