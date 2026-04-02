import { describe, it, expect, vi } from 'vitest';
import { checkAchievements, calculateAchievementXP } from './achievementChecker';
import { ACHIEVEMENTS } from '../constants/achievements';

describe('achievementChecker', () => {
  const baseStats = {
    totalSessions: 0,
    totalChars: 0,
    totalPracticeTime: 0,
    currentStreak: 0,
    bestWpm: 0,
    lastSessionAccuracy: 0,
    recentAccuracies: [],
  };

  describe('checkAchievements', () => {
    it('should return empty newlyUnlocked for new user', () => {
      const result = checkAchievements(baseStats, []);
      expect(result.newlyUnlocked).toHaveLength(0);
    });

    it('should unlock first_try achievement', () => {
      const stats = { ...baseStats, totalSessions: 1 };
      const result = checkAchievements(stats, []);
      expect(result.newlyUnlocked).toContainEqual(
        expect.objectContaining({ id: 'first_try' })
      );
    });

    it('should unlock centurion achievement at 100 chars', () => {
      const stats = { ...baseStats, totalChars: 100 };
      const result = checkAchievements(stats, []);
      expect(result.newlyUnlocked).toContainEqual(
        expect.objectContaining({ id: 'centurion' })
      );
    });

    it('should not unlock already unlocked achievements', () => {
      const stats = { ...baseStats, totalSessions: 1 };
      const result = checkAchievements(stats, ['first_try']);
      expect(result.newlyUnlocked).toHaveLength(0);
    });

    it('should track progress for centurion achievement', () => {
      const stats = { ...baseStats, totalChars: 50 };
      const result = checkAchievements(stats, []);
      const centurion = result.allAchievements.find(a => a.id === 'centurion');
      expect(centurion?.progress).toBe(50);
      expect(centurion?.unlockedAt).toBe(0);
    });

    it('should unlock speed_star at 50 WPM', () => {
      const stats = { ...baseStats, bestWpm: 50 };
      const result = checkAchievements(stats, []);
      expect(result.newlyUnlocked).toContainEqual(
        expect.objectContaining({ id: 'speed_star' })
      );
    });

    it('should unlock speed_master at 80 WPM', () => {
      const stats = { ...baseStats, bestWpm: 80 };
      const result = checkAchievements(stats, []);
      expect(result.newlyUnlocked).toContainEqual(
        expect.objectContaining({ id: 'speed_master' })
      );
    });

    it('should unlock perfect_accuracy at 100%', () => {
      const stats = { ...baseStats, lastSessionAccuracy: 100 };
      const result = checkAchievements(stats, []);
      expect(result.newlyUnlocked).toContainEqual(
        expect.objectContaining({ id: 'perfect_accuracy' })
      );
    });

    it('should not unlock perfect_accuracy below 100%', () => {
      const stats = { ...baseStats, lastSessionAccuracy: 99 };
      const result = checkAchievements(stats, []);
      expect(result.newlyUnlocked).not.toContainEqual(
        expect.objectContaining({ id: 'perfect_accuracy' })
      );
    });

    it('should unlock streak_3 at 3 day streak', () => {
      const stats = { ...baseStats, currentStreak: 3 };
      const result = checkAchievements(stats, []);
      expect(result.newlyUnlocked).toContainEqual(
        expect.objectContaining({ id: 'streak_3' })
      );
    });

    it('should unlock accuracy_streak_5 with 5 sessions >95%', () => {
      const stats = { ...baseStats, recentAccuracies: [96, 97, 98, 99, 100] };
      const result = checkAchievements(stats, []);
      expect(result.newlyUnlocked).toContainEqual(
        expect.objectContaining({ id: 'accuracy_streak_5' })
      );
    });

    it('should not unlock accuracy_streak_5 with only 4 good sessions', () => {
      const stats = { ...baseStats, recentAccuracies: [96, 97, 98, 99] };
      const result = checkAchievements(stats, []);
      expect(result.newlyUnlocked).not.toContainEqual(
        expect.objectContaining({ id: 'accuracy_streak_5' })
      );
    });

    it('should return all achievements in allAchievements', () => {
      const result = checkAchievements(baseStats, []);
      expect(result.allAchievements).toHaveLength(ACHIEVEMENTS.length);
    });
  });

  describe('calculateAchievementXP', () => {
    it('should calculate total XP from achievements', () => {
      const achievements = [
        { id: 'first_try', xpReward: 50 },
        { id: 'centurion', xpReward: 200 },
      ];
      const total = calculateAchievementXP(achievements);
      expect(total).toBe(250);
    });

    it('should return 0 for empty array', () => {
      const total = calculateAchievementXP([]);
      expect(total).toBe(0);
    });
  });
});
