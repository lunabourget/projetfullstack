import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';

interface HalloweenContextType {
  isHalloweenMode: boolean;
  toggleHalloweenMode: () => void;
}

const HalloweenContext = createContext<HalloweenContextType | undefined>(undefined);

export const HalloweenProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isHalloweenMode, setIsHalloweenMode] = useState<boolean>(() => {
    // Récupérer la préférence depuis localStorage, par défaut true
    const saved = localStorage.getItem('halloweenMode');
    return saved === null ? true : JSON.parse(saved);
  });

  useEffect(() => {
    // Persister le mode Halloween dans localStorage
    localStorage.setItem('halloweenMode', JSON.stringify(isHalloweenMode));
  }, [isHalloweenMode]);

  const toggleHalloweenMode = () => {
    setIsHalloweenMode(prev => !prev);
  };

  const value = useMemo(() => ({ isHalloweenMode, toggleHalloweenMode }), [isHalloweenMode]);

  return (
    <HalloweenContext.Provider value={value}>
      {children}
    </HalloweenContext.Provider>
  );
};

export const useHalloween = (): HalloweenContextType => {
  const context = useContext(HalloweenContext);
  if (!context) {
    throw new Error('useHalloween must be used within a HalloweenProvider');
  }
  return context;
};
