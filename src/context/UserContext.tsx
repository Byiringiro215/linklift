import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type UserRole = 'investor' | 'entrepreneur' | 'worker' | null;

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  verified: boolean;
  balance: number;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem('ll_user');
      return stored ? (JSON.parse(stored) as User) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('ll_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('ll_user');
      }
    } catch {
      // Ignore storage errors (private mode, etc.)
    }
  }, [user]);

  return (
    <UserContext.Provider value={{
      user,
      setUser,
      isAuthenticated: !!user
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};