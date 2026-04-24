import React, { createContext, useContext, useEffect, useState } from 'react';
import { api } from './api';

export interface User {
  id: string;
  username: string;
  role: 'user' | 'admin';
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (username: string) => Promise<void>;
  register: (username: string, role?: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if logged in already (session persists)
    api.getMe()
      .then(data => setUser(data.user))
      .catch(() => setUser(null)) // Expected if not logged in
      .finally(() => setLoading(false));
  }, []);

  const login = async (username: string) => {
    const data = await api.login(username);
    setUser(data.user);
  };

  const register = async (username: string, role?: string) => {
    const data = await api.register(username, role);
    setUser(data.user);
  };

  const logout = async () => {
    await api.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
