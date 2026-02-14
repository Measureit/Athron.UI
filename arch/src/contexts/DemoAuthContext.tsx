import React, { createContext, useContext, useState } from 'react';

interface DemoUser {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string;
}

interface DemoAuthContextType {
  user: DemoUser | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithFacebook: () => Promise<void>;
  logout: () => Promise<void>;
}

const DemoAuthContext = createContext<DemoAuthContextType | undefined>(undefined);

export const useDemoAuth = () => {
  const context = useContext(DemoAuthContext);
  if (context === undefined) {
    throw new Error('useDemoAuth must be used within a DemoAuthProvider');
  }
  return context;
};

interface DemoAuthProviderProps {
  children: React.ReactNode;
}

export const DemoAuthProvider: React.FC<DemoAuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<DemoUser | null>(null);
  const [loading, setLoading] = useState(false);

  const signInWithGoogle = async () => {
    setLoading(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setUser({
      uid: 'demo-google-user',
      displayName: 'John Demo (Google)',
      email: 'john.demo@gmail.com',
      photoURL: 'https://via.placeholder.com/32/4285f4/white?text=G'
    });
    setLoading(false);
  };

  const signInWithFacebook = async () => {
    setLoading(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setUser({
      uid: 'demo-facebook-user',
      displayName: 'Jane Demo (Facebook)',
      email: 'jane.demo@facebook.com',
      photoURL: 'https://via.placeholder.com/32/1877f2/white?text=F'
    });
    setLoading(false);
  };

  const logout = async () => {
    setLoading(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    setUser(null);
    setLoading(false);
  };

  const value: DemoAuthContextType = {
    user,
    loading,
    signInWithGoogle,
    signInWithFacebook,
    logout,
  };

  return (
    <DemoAuthContext.Provider value={value}>
      {children}
    </DemoAuthContext.Provider>
  );
};
