import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback, useMemo } from 'react';
import { ThemeDefinition, THEMES, getThemeById, getThemeByLevel } from '../constants/themes';
import { useProgress } from './ProgressContext';

interface ThemeContextType {
  theme: ThemeDefinition;
  setTheme: (themeId: string) => void;
  availableThemes: ThemeDefinition[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = 'typing_theme';

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { progress, currentLevel } = useProgress();

  // Get available themes based on current level
  const availableThemes = useMemo(() => {
    return THEMES.filter((theme) => theme.unlockLevel <= currentLevel.level);
  }, [currentLevel]);

  // Get initial theme from localStorage or default to highest available
  const getInitialTheme = useCallback((): ThemeDefinition => {
    const themeByLevel = getThemeByLevel(currentLevel.level);

    if (typeof window === 'undefined') {
      return themeByLevel;
    }

    const storedThemeId = localStorage.getItem(STORAGE_KEY);
    if (storedThemeId) {
      const storedTheme = getThemeById(storedThemeId);
      // Check if the stored theme is still available for the current level
      if (storedTheme && storedTheme.unlockLevel <= currentLevel.level) {
        return storedTheme;
      }
    }

    // Return the highest available theme for the current level
    return themeByLevel;
  }, [currentLevel]);

  const [theme, setThemeState] = useState<ThemeDefinition>(() => getInitialTheme());

  // Update theme when level changes (if current theme becomes locked)
  useEffect(() => {
    if (theme.unlockLevel > currentLevel.level) {
      // Current theme is now locked, switch to highest available
      const newTheme = getThemeByLevel(currentLevel.level);
      setThemeState(newTheme);
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, newTheme.id);
      }
    }
  }, [currentLevel, theme]);

  const setTheme = useCallback((themeId: string) => {
    const newTheme = getThemeById(themeId);
    if (newTheme && newTheme.unlockLevel <= currentLevel.level) {
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
