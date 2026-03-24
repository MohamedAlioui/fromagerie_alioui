import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface ThemeContextType {
  theme: 'day' | 'night';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({ theme: 'day', toggleTheme: () => {} });

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<'day' | 'night'>(() => {
    return (localStorage.getItem('fromagerie-theme') as 'day' | 'night') || 'day';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('fromagerie-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'day' ? 'night' : 'day');

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
