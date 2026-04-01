import {
  AchievementDefinition,
  UserStats,
  ACHIEVEMENTS,
} from '../constants/achievements';

export interface AchievementRecord {
  id: string;
  unlockedAt: number;
  progress: number;
}

export interface AchievementCheckResult {
  newlyUnlocked: AchievementDefinition[];
  allAchievements: AchievementRecord[];
}

export function checkAchievements(
  userStats: UserStats,
  alreadyUnlocked: string[]
): AchievementCheckResult {
  const newlyUnlocked: AchievementDefinition[] = [];
  const allAchievements: AchievementRecord[] = [];

  for (const achievement of ACHIEVEMENTS) {
    const isAlreadyUnlocked = alreadyUnlocked.includes(achievement.id);

    // Calculate progress for all achievements
    let progress = 0;
    if (achievement.getProgress) {
      progress = achievement.getProgress(userStats);
    } else if (achievement.checkCondition(userStats)) {
      progress = 100;
    }

    // Check if newly unlocked
    if (!isAlreadyUnlocked && achievement.checkCondition(userStats)) {
      newlyUnlocked.push(achievement);
      allAchievements.push({
        id: achievement.id,
        unlockedAt: Date.now(),
        progress: 100,
      });
    } else if (isAlreadyUnlocked) {
      // Already unlocked, keep the record
      allAchievements.push({
        id: achievement.id,
        unlockedAt: Date.now(), // In real app, this would be preserved from storage
        progress: 100,
      });
    } else {
      // Not unlocked yet, track progress
      allAchievements.push({
        id: achievement.id,
        unlockedAt: 0,
        progress,
      });
    }
  }

  return { newlyUnlocked, allAchievements };
}

export function calculateAchievementXP(achievements: AchievementDefinition[]): number {
  return achievements.reduce((total, achievement) => total + achievement.xpReward, 0);
}
