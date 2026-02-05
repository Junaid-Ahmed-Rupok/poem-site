import React, { createContext, useContext, useState, useCallback } from 'react';

interface Theme {
  mode: 'light' | 'dark';
  fontSize: 'small' | 'medium' | 'large' | 'extra-large';
  fontFamily: 'bengali' | 'serif' | 'sans';
}

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Partial<Theme>) => void;
  toggleTheme: () => void;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') {
      return { mode: 'light', fontSize: 'medium', fontFamily: 'bengali' };
    }
    const saved = localStorage.getItem('theme');
    return saved ? JSON.parse(saved) : { mode: 'light', fontSize: 'medium', fontFamily: 'bengali' };
  });

  const updateTheme = useCallback((newTheme: Partial<Theme>) => {
    setTheme((prev) => {
      const updated = { ...prev, ...newTheme };
      localStorage.setItem('theme', JSON.stringify(updated));
      document.documentElement.classList.toggle('dark', updated.mode === 'dark');
      return updated;
    });
  }, []);

  const toggleTheme = useCallback(() => {
    updateTheme({ mode: theme.mode === 'light' ? 'dark' : 'light' });
  }, [theme.mode, updateTheme]);

  const increaseFontSize = useCallback(() => {
    const sizes = ['small', 'medium', 'large', 'extra-large'] as const;
    const currentIndex = sizes.indexOf(theme.fontSize);
    if (currentIndex < sizes.length - 1) {
      updateTheme({ fontSize: sizes[currentIndex + 1] });
    }
  }, [theme.fontSize, updateTheme]);

  const decreaseFontSize = useCallback(() => {
    const sizes = ['small', 'medium', 'large', 'extra-large'] as const;
    const currentIndex = sizes.indexOf(theme.fontSize);
    if (currentIndex > 0) {
      updateTheme({ fontSize: sizes[currentIndex - 1] });
    }
  }, [theme.fontSize, updateTheme]);

  const contextValue: ThemeContextType = {
    theme,
    setTheme: updateTheme,
    toggleTheme,
    increaseFontSize,
    decreaseFontSize,
  };

  return React.createElement(
    ThemeContext.Provider,
    { value: contextValue },
    children
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
