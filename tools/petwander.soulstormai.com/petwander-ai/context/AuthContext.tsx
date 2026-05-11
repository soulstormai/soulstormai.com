import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string) => Promise<void>;
  signup: (email: string, name: string) => Promise<void>;
  logout: () => void;
  updatePremiumStatus: (isPremium: boolean, subscriptionId?: string) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check local storage for persisted session
    const storedUser = localStorage.getItem('petwander_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    // Check if we have a stored name for this email (simulated DB), otherwise default
    const storedName = localStorage.getItem(`user_name_${email}`) || email.split('@')[0];
    const newUser = { email, name: storedName };
    setUser(newUser);
    localStorage.setItem('petwander_user', JSON.stringify(newUser));
  };

  const signup = async (email: string, name: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    const newUser = { email, name };
    setUser(newUser);
    // Persist mock user data
    localStorage.setItem('petwander_user', JSON.stringify(newUser));
    localStorage.setItem(`user_name_${email}`, name);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('petwander_user');
  };

  const updatePremiumStatus = (isPremium: boolean, subscriptionId?: string) => {
    if (user) {
      const updatedUser = { ...user, isPremium, subscriptionId };
      setUser(updatedUser);
      localStorage.setItem('petwander_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updatePremiumStatus, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};