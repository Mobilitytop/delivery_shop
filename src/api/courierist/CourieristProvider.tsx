import { createContext, useContext, useState, ReactNode } from 'react';
import { CourieristClient } from './CourieristClient';
import { LoginRequest } from './types';

// Интерфейс контекста
interface CourieristContextType {
  client: CourieristClient;
  login: (credentials: LoginRequest) => Promise<void>;
  isAuthenticated: boolean;
}

// Создание контекста
const CourieristContext = createContext<CourieristContextType | undefined>(
  undefined
);

// Провайдер контекста
export const CourieristProvider = ({ children }: { children: ReactNode }) => {
  const [client] = useState(() => new CourieristClient());
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (credentials: LoginRequest) => {
    await client.login(credentials); // Теперь login обновляет токен в клиенте
    setIsAuthenticated(true);
  };

  const value: CourieristContextType = {
    client,
    login,
    isAuthenticated,
  };

  return (
    <CourieristContext.Provider value={value}>
      {children}
    </CourieristContext.Provider>
  );
};

// Хук для использования контекста
export const useCourierist = () => {
  const context = useContext(CourieristContext);
  if (!context) {
    throw new Error('useCourierist must be used within a CourieristProvider');
  }
  return context;
};
