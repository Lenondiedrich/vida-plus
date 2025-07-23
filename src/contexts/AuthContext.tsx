import React, { createContext, useState, useEffect } from 'react';
import type { User } from '@/types';
import { authenticateUser } from '@/data/mock';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar se há usuário salvo no localStorage
    const savedUser = localStorage.getItem('vida-plus-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simular delay de autenticação
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const authenticatedUser = authenticateUser(email, password);
      if (authenticatedUser) {
        setUser(authenticatedUser);
        localStorage.setItem('vida-plus-user', JSON.stringify(authenticatedUser));
        setIsLoading(false);
        return true;
      }
      setIsLoading(false);
      return false;
    } catch {
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('vida-plus-user');
  };

  const value = {
    user,
    login,
    logout,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

 