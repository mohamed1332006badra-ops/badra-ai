import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, Workspace } from '@/types';
import { getUser, getWorkspace, logout as authLogout, isOnboarded } from '@/lib/auth';

interface AuthContextType {
  user: User | null;
  workspace: Workspace | null;
  onboarded: boolean;
  loading: boolean;
  setUser: (user: User | null) => void;
  setWorkspace: (ws: Workspace | null) => void;
  setOnboarded: (v: boolean) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [onboarded, setOnboarded] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUser(getUser());
    setWorkspace(getWorkspace());
    setOnboarded(isOnboarded());
    setLoading(false);
  }, []);

  const logout = () => {
    authLogout();
    setUser(null);
    setWorkspace(null);
    setOnboarded(false);
  };

  return (
    <AuthContext.Provider value={{ user, workspace, onboarded, loading, setUser, setWorkspace, setOnboarded, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
