import { describe, it, expect } from 'vitest';
import { LEVELS, getLevelByXP, getNextLevelXP, getXPProgress } from './levels';

describe('levels', () => {
  describe('LEVELS array', () => {
    it('should have 26 levels', () => {
      expect(LEVELS).toHaveLength(26);
    });

    it('should start at level 1', () => {
      expect(LEVELS[0].level).toBe(1);
    });

    it('should end at level 26', () => {
      expect(LEVELS[25].level).toBe(26);
    });

    it('level 1 should start with 0 XP', () => {
      expect(LEVELS[0].minXP).toBe(0);
    });

    it('level 26 should have Infinity as maxXP', () => {
      expect(LEVELS[25].maxXP).toBe(Infinity);
    });

    it('should unlock snail at level 1', () => {
      expect(LEVELS[0].unlockedPetIds).toContain('snail');
    });

    it('should unlock rabbit at level 6', () => {
      expect(LEVELS[5].unlockedPetIds).toContain('rabbit');
    });

    it('should unlock fox at level 11', () => {
      expect(LEVELS[10].unlockedPetIds).toContain('fox');
    });

    it('should unlock cheetah at level 16', () => {
      expect(LEVELS[15].unlockedPetIds).toContain('cheetah');
    });

    it('should unlock eagle at level 21', () => {
      expect(LEVELS[20].unlockedPetIds).toContain('eagle');
    });

    it('should unlock dragon at level 26', () => {
      expect(LEVELS[25].unlockedPetIds).toContain('dragon');
    });
  });

  describe('getLevelByXP', () => {
    it('should return level 1 for 0 XP', () => {
      expect(getLevelByXP(0).level).toBe(1);
    });

    it('should return level 1 for 50 XP', () => {
      expect(getLevelByXP(50).level).toBe(1);
    });

    it('should return level 2 at exactly 100 XP', () => {
      expect(getLevelByXP(100).level).toBe(2);
    });

    it('should return level 4 at 500 XP', () => {
      expect(getLevelByXP(500).level).toBe(4);
    });

    it('should return level 26 for very high XP', () => {
      expect(getLevelByXP(100000).level).toBe(26);
    });

    it('should handle negative XP gracefully', () => {
      expect(getLevelByXP(-100).level).toBe(1);
    });
  });

  describe('getNextLevelXP', () => {
    it('should return XP needed for level 2', () => {
      expect(getNextLevelXP(0)).toBe(100);
    });

    it('should return XP needed for level 3 at level 2', () => {
      expect(getNextLevelXP(100)).toBe(250);
    });

    it('should return Infinity for max level', () => {
      expect(getNextLevelXP(37500)).toBe(Infinity);
    });
  });

  describe('getXPProgress', () => {
    it('should return 0% progress at start of level', () => {
      const progress = getXPProgress(0);
      expect(progress.current).toBe(0);
      expect(progress.percentage).toBe(0);
    });

    it('should return 50% progress halfway through level 1', () => {
      const progress = getXPProgress(50);
      expect(progress.percentage).toBe(50);
    });

    it('should return 100% progress at level boundary minus 1', () => {
      const progress = getXPProgress(99);
      expect(progress.percentage).toBe(99);
    });

    it('should return 100% for max level', () => {
      const progress = getXPProgress(50000);
      expect(progress.percentage).toBe(100);
    });

    it('should calculate correct required XP', () => {
      const progress = getXPProgress(50);
      expect(progress.required).toBe(100);
    });
  });
});
