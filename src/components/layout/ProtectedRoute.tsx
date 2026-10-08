import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireOnboarding?: boolean;
}

export default function ProtectedRoute({ children, requireOnboarding = false }: ProtectedRouteProps) {
  const { user, onboarded, loading } = useAuth();

  if (loading) return null;

  if (!user) return <Navigate to="/login" replace />;

  if (requireOnboarding && !onboarded) return <Navigate to="/onboarding" replace />;

  return <>{children}</>;
}
