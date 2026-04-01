import React, { createContext, useContext, useState, useCallback, useMemo, ReactNode } from 'react';
import { LevelDefinition, LEVELS, getLevelByXP, getXPProgress } from '../constants/levels';

export interface UserProgress {
  totalXP: number;
  currentLevel: number;
  unlockedPets: string[];
  activePet: string | null;
  currentStreak: number;
  longestStreak: number;
  lastPracticeDate: string | null;
  totalChars: number;
  totalPracticeTime: number; // in minutes
}

interface ProgressContextType {
  progress: UserProgress;
  currentLevel: LevelDefinition;
  xpProgress: { current: number; required: number; percentage: number };
  addXP: (amount: number) => void;
  addPracticeSession: (chars: number, durationMinutes: number) => void;
  updateStreak: () => void;
  unlockPet: (petId: string) => void;
  setActivePet: (petId: string | null) => void;
}

// Default progress for new users
const defaultProgress: UserProgress = {
  totalXP: 0,
  currentLevel: 1,
  unlockedPets: ['snail'],
  activePet: 'snail',
  currentStreak: 0,
  longestStreak: 0,
  lastPracticeDate: null,
  totalChars: 0,
  totalPracticeTime: 0,
};

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

function isConsecutiveDay(lastDate: string, currentDate: string): boolean {
  const last = new Date(lastDate);
  const current = new Date(currentDate);

  // Reset hours to compare dates only
  last.setHours(0, 0, 0, 0);
  current.setHours(0, 0, 0, 0);

  const diffTime = current.getTime() - last.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);

  return diffDays === 1;
}

function isSameDay(date1: string, date2: string): boolean {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  d1.setHours(0, 0, 0, 0);
  d2.setHours(0, 0, 0, 0);
  return d1.getTime() === d2.getTime();
}

interface ProgressProviderProps {
  children: ReactNode;
  initialProgress?: UserProgress;
  onProgressUpdate?: (progress: UserProgress) => void;
}

export function ProgressProvider({
  children,
  initialProgress,
  onProgressUpdate
}: ProgressProviderProps) {
  const [progress, setProgress] = useState<UserProgress>(() => {
    if (initialProgress) {
      return { ...defaultProgress, ...initialProgress };
    }
    return defaultProgress;
  });

  const currentLevel = useMemo(() => {
    return getLevelByXP(progress.totalXP);
  }, [progress.totalXP]);

  const xpProgress = useMemo(() => {
    return getXPProgress(progress.totalXP);
  }, [progress.totalXP]);

  const updateProgress = useCallback((newProgress: UserProgress) => {
    setProgress(newProgress);
    if (onProgressUpdate) {
      onProgressUpdate(newProgress);
    }
  }, [onProgressUpdate]);

  const addXP = useCallback((amount: number) => {
    setProgress(prev => {
      const newTotalXP = prev.totalXP + amount;
      const newLevel = getLevelByXP(newTotalXP);
      const levelChanged = newLevel.level !== prev.currentLevel;

      const newProgress: UserProgress = {
        ...prev,
        totalXP: newTotalXP,
        currentLevel: newLevel.level,
      };

      // Auto-unlock pets when level increases
      if (levelChanged && newLevel.unlockedPetIds.length > 0) {
        const newUnlockedPets = [...prev.unlockedPets];
        newLevel.unlockedPetIds.forEach(petId => {
          if (!newUnlockedPets.includes(petId)) {
            newUnlockedPets.push(petId);
          }
        });
        newProgress.unlockedPets = newUnlockedPets;
      }

      if (onProgressUpdate) {
        onProgressUpdate(newProgress);
      }
      return newProgress;
    });
  }, [onProgressUpdate]);

  const addPracticeSession = useCallback((chars: number, durationMinutes: number) => {
    setProgress(prev => {
      const newProgress: UserProgress = {
        ...prev,
        totalChars: prev.totalChars + chars,
        totalPracticeTime: prev.totalPracticeTime + durationMinutes,
      };

      if (onProgressUpdate) {
        onProgressUpdate(newProgress);
      }
      return newProgress;
    });
  }, [onProgressUpdate]);

  const updateStreak = useCallback(() => {
    const today = new Date().toISOString().split('T')[0];

    setProgress(prev => {
      // If already practiced today, don't update streak
      if (prev.lastPracticeDate && isSameDay(prev.lastPracticeDate, today)) {
        return prev;
      }

      let newStreak = 1;

      if (prev.lastPracticeDate && isConsecutiveDay(prev.lastPracticeDate, today)) {
        newStreak = prev.currentStreak + 1;
      }

      const newLongestStreak = Math.max(prev.longestStreak, newStreak);

      const newProgress: UserProgress = {
        ...prev,
        currentStreak: newStreak,
        longestStreak: newLongestStreak,
        lastPracticeDate: today,
      };

      if (onProgressUpdate) {
        onProgressUpdate(newProgress);
      }
      return newProgress;
    });
  }, [onProgressUpdate]);

  const unlockPet = useCallback((petId: string) => {
    setProgress(prev => {
      if (prev.unlockedPets.includes(petId)) {
        return prev;
      }

      const newProgress: UserProgress = {
        ...prev,
        unlockedPets: [...prev.unlockedPets, petId],
      };

      if (onProgressUpdate) {
        onProgressUpdate(newProgress);
      }
      return newProgress;
    });
  }, [onProgressUpdate]);

  const setActivePet = useCallback((petId: string | null) => {
    setProgress(prev => {
      // Only allow setting active pet if it's unlocked or null
      if (petId !== null && !prev.unlockedPets.includes(petId)) {
        return prev;
      }

      const newProgress: UserProgress = {
        ...prev,
        activePet: petId,
      };

      if (onProgressUpdate) {
        onProgressUpdate(newProgress);
      }
      return newProgress;
    });
  }, [onProgressUpdate]);

  const value: ProgressContextType = {
    progress,
    currentLevel,
    xpProgress,
    addXP,
    addPracticeSession,
    updateStreak,
    unlockPet,
    setActivePet,
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress(): ProgressContextType {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}
