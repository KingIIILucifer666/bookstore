import React, { useState, useContext, ReactNode, useEffect } from 'react';
import { AuthContextType, User } from '../utils/types';

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authUser, setAuthUser] = useState<User | undefined>(undefined);
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('authUser');
    if (storedUser) {
      setAuthUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
    setAuthLoading(false);
  }, []);

  const value = {
    authUser,
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn,
    authLoading,
  };
  return (
    <AuthContext.Provider value={value}> {children} </AuthContext.Provider>
  );
};
