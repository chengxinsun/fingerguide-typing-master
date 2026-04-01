import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  ReactNode,
} from 'react';
import {
  AchievementRecord,
  AchievementCheckResult,
  checkAchievements,
  calculateAchievementXP,
} from '../utils/achievementChecker';
import { UserStats, getAchievementById } from '../constants/achievements';

interface AchievementContextType {
  achievements: AchievementRecord[];
  newlyUnlocked: AchievementRecord[];
  checkAndUnlock: (stats: UserStats) => number; // returns XP gained
  clearNewlyUnlocked: () => void;
  isUnlocked: (id: string) => boolean;
  getProgress: (id: string) => number;
}

const AchievementContext = createContext<AchievementContextType | undefined>(undefined);

interface AchievementProviderProps {
  children: ReactNode;
  initialAchievements?: AchievementRecord[];
  onAchievementsUpdate?: (achievements: AchievementRecord[]) => void;
  onXPGained?: (amount: number) => void;
}

export function AchievementProvider({
  children,
  initialAchievements = [],
  onAchievementsUpdate,
  onXPGained,
}: AchievementProviderProps) {
  const [achievements, setAchievements] = useState<AchievementRecord[]>(initialAchievements);
  const [newlyUnlocked, setNewlyUnlocked] = useState<AchievementRecord[]>([]);

  const updateAchievements = useCallback(
    (newAchievements: AchievementRecord[]) => {
      setAchievements(newAchievements);
      if (onAchievementsUpdate) {
        onAchievementsUpdate(newAchievements);
      }
    },
    [onAchievementsUpdate]
  );

  const checkAndUnlock = useCallback(
    (stats: UserStats): number => {
      const alreadyUnlockedIds = achievements
        .filter((a) => a.unlockedAt > 0)
        .map((a) => a.id);

      const result: AchievementCheckResult = checkAchievements(stats, alreadyUnlockedIds);

      // Calculate XP from newly unlocked achievements
      const xpGained = result.newlyUnlocked.reduce(
        (total, achievement) => total + achievement.xpReward,
        0
      );

      // Update achievements state
      updateAchievements(result.allAchievements);

      // Set newly unlocked for notifications
      if (result.newlyUnlocked.length > 0) {
        const newRecords = result.allAchievements.filter((a) =>
          result.newlyUnlocked.some((n) => n.id === a.id)
        );
        setNewlyUnlocked((prev) => [...prev, ...newRecords]);

        // Notify XP gained
        if (onXPGained && xpGained > 0) {
          onXPGained(xpGained);
        }
      }

      return xpGained;
    },
    [achievements, updateAchievements, onXPGained]
  );

  const clearNewlyUnlocked = useCallback(() => {
    setNewlyUnlocked([]);
  }, []);

  const isUnlocked = useCallback(
    (id: string): boolean => {
      const achievement = achievements.find((a) => a.id === id);
      return achievement ? achievement.unlockedAt > 0 : false;
    },
    [achievements]
  );

  const getProgress = useCallback(
    (id: string): number => {
      const achievement = achievements.find((a) => a.id === id);
      if (achievement) {
        return achievement.progress;
      }

      // If not in state yet, return 0
      return 0;
    },
    [achievements]
  );

  const value: AchievementContextType = useMemo(
    () => ({
      achievements,
      newlyUnlocked,
      checkAndUnlock,
      clearNewlyUnlocked,
      isUnlocked,
      getProgress,
    }),
    [achievements, newlyUnlocked, checkAndUnlock, clearNewlyUnlocked, isUnlocked, getProgress]
  );

  return (
    <AchievementContext.Provider value={value}>
      {children}
    </AchievementContext.Provider>
  );
}

export function useAchievements(): AchievementContextType {
  const context = useContext(AchievementContext);
  if (context === undefined) {
    throw new Error('useAchievements must be used within an AchievementProvider');
  }
  return context;
}
