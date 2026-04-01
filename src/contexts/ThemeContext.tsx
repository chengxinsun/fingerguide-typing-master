import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback, useMemo } from 'react';
import { ThemeDefinition, THEMES, getThemeById, getThemeByLevel } from '../constants/themes';

interface ThemeContextType {
  theme: ThemeDefinition;
  setTheme: (themeId: string) => void;
  availableThemes: ThemeDefinition[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = 'typing_theme';

interface ThemeProviderProps {
  children: ReactNode;
  currentLevel: number;
}

export function ThemeProvider({ children, currentLevel }: ThemeProviderProps) {
  // Get available themes based on current level
  const availableThemes = useMemo(() => {
    return THEMES.filter((theme) => theme.unlockLevel <= currentLevel);
  }, [currentLevel]);

  // Get initial theme from localStorage or default to highest available
  const getInitialTheme = useCallback((): ThemeDefinition => {
    if (typeof window === 'undefined') {
      return getThemeByLevel(currentLevel);
    }

    const storedThemeId = localStorage.getItem(STORAGE_KEY);
    if (storedThemeId) {
      const storedTheme = getThemeById(storedThemeId);
      // Check if the stored theme is still available for the current level
      if (storedTheme && storedTheme.unlockLevel <= currentLevel) {
        return storedTheme;
      }
    }

    // Return the highest available theme for the current level
    return getThemeByLevel(currentLevel);
  }, [currentLevel]);

  const [theme, setThemeState] = useState<ThemeDefinition>(() => getInitialTheme());

  // Update theme when level changes (if current theme becomes locked)
  useEffect(() => {
    if (theme.unlockLevel > currentLevel) {
      // Current theme is now locked, switch to highest available
      const newTheme = getThemeByLevel(currentLevel);
      setThemeState(newTheme);
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, newTheme.id);
      }
    }
  }, [currentLevel, theme]);

  const setTheme = useCallback((themeId: string) => {
    const newTheme = getThemeById(themeId);
    if (newTheme && newTheme.unlockLevel <= currentLevel) {
      setThemeState(newTheme);
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, themeId);
      }
    }
  }, [currentLevel]);

  const value: ThemeContextType = {
    theme,
    setTheme,
    availableThemes,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
