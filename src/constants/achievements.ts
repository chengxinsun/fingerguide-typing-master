export type AchievementType = 'milestone' | 'streak' | 'accuracy';

export interface UserStats {
  totalSessions: number;
  totalChars: number;
  totalPracticeTime: number; // minutes
  currentStreak: number;
  bestWpm: number;
  lastSessionAccuracy: number;
  recentAccuracies: number[]; // last N sessions
}

export interface AchievementDefinition {
  id: string;
  type: AchievementType;
  xpReward: number;
  checkCondition: (stats: UserStats) => boolean;
  getProgress?: (stats: UserStats) => number; // 0-100
}

// 12 achievements total
export const ACHIEVEMENTS: AchievementDefinition[] = [
  // Milestone achievements
  {
    id: 'first_try',
    type: 'milestone',
    xpReward: 50,
    checkCondition: (s) => s.totalSessions >= 1,
  },
  {
    id: 'centurion',
    type: 'milestone',
    xpReward: 200,
    checkCondition: (s) => s.totalChars >= 100,
    getProgress: (s) => Math.min(100, (s.totalChars / 100) * 100),
  },
  {
    id: 'thousand_master',
    type: 'milestone',
    xpReward: 300,
    checkCondition: (s) => s.totalChars >= 1000,
    getProgress: (s) => Math.min(100, (s.totalChars / 1000) * 100),
  },
  {
    id: 'ten_king',
    type: 'milestone',
    xpReward: 1000,
    checkCondition: (s) => s.totalChars >= 10000,
    getProgress: (s) => Math.min(100, (s.totalChars / 10000) * 100),
  },
  {
    id: 'speed_star',
    type: 'milestone',
    xpReward: 200,
    checkCondition: (s) => s.bestWpm >= 50,
  },
  {
    id: 'speed_master',
    type: 'milestone',
    xpReward: 500,
    checkCondition: (s) => s.bestWpm >= 80,
  },
  {
    id: 'perfect_accuracy',
    type: 'milestone',
    xpReward: 300,
    checkCondition: (s) => s.lastSessionAccuracy === 100,
  },
  {
    id: 'persistent',
    type: 'milestone',
    xpReward: 200,
    checkCondition: (s) => s.totalPracticeTime >= 30,
    getProgress: (s) => Math.min(100, (s.totalPracticeTime / 30) * 100),
  },
  // Streak achievements
  {
    id: 'streak_3',
    type: 'streak',
    xpReward: 200,
    checkCondition: (s) => s.currentStreak >= 3,
    getProgress: (s) => Math.min(100, (s.currentStreak / 3) * 100),
  },
  {
    id: 'streak_7',
    type: 'streak',
    xpReward: 500,
    checkCondition: (s) => s.currentStreak >= 7,
    getProgress: (s) => Math.min(100, (s.currentStreak / 7) * 100),
  },
  {
    id: 'streak_30',
    type: 'streak',
    xpReward: 2000,
    checkCondition: (s) => s.currentStreak >= 30,
    getProgress: (s) => Math.min(100, (s.currentStreak / 30) * 100),
  },
  // Accuracy achievements
  {
    id: 'accuracy_streak_5',
    type: 'accuracy',
    xpReward: 300,
    checkCondition: (s) =>
      s.recentAccuracies.slice(-5).length >= 5 &&
      s.recentAccuracies.slice(-5).every((a) => a > 95),
    getProgress: (s) =>
      Math.min(100, (s.recentAccuracies.filter((a) => a > 95).length / 5) * 100),
  },
];

export function getAchievementById(id: string): AchievementDefinition | undefined {
  return ACHIEVEMENTS.find((a) => a.id === id);
}
