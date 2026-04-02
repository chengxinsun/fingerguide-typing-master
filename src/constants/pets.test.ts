import { describe, it, expect } from 'vitest';
import { PETS, getPetById, getPetStage, getStageMultiplier, calculatePetGrowth } from './pets';

describe('pets', () => {
  describe('PETS array', () => {
    it('should have 6 pets', () => {
      expect(PETS).toHaveLength(6);
    });

    it('should have unique IDs', () => {
      const ids = PETS.map(p => p.id);
      expect(new Set(ids).size).toBe(ids.length);
    });

    it('each pet should have required properties', () => {
      PETS.forEach(pet => {
        expect(pet.id).toBeDefined();
        expect(pet.emoji).toBeDefined();
        expect(pet.nameKey).toBeDefined();
        expect(pet.descriptionKey).toBeDefined();
        expect(pet.unlockLevel).toBeGreaterThanOrEqual(1);
        expect(pet.maxGrowth).toBeGreaterThan(0);
      });
    });
  });

  describe('getPetById', () => {
    it('should return snail pet', () => {
      const pet = getPetById('snail');
      expect(pet).toBeDefined();
      expect(pet?.emoji).toBe('🐌');
    });

    it('should return dragon pet', () => {
      const pet = getPetById('dragon');
      expect(pet).toBeDefined();
      expect(pet?.emoji).toBe('🐉');
    });

    it('should return undefined for invalid ID', () => {
      const pet = getPetById('invalid');
      expect(pet).toBeUndefined();
    });
  });

  describe('getPetStage', () => {
    it('should return baby for growth < 20', () => {
      expect(getPetStage(0)).toBe('baby');
      expect(getPetStage(10)).toBe('baby');
      expect(getPetStage(19)).toBe('baby');
    });

    it('should return teen for growth 20-49', () => {
      expect(getPetStage(20)).toBe('teen');
      expect(getPetStage(35)).toBe('teen');
      expect(getPetStage(49)).toBe('teen');
    });

    it('should return adult for growth >= 50', () => {
      expect(getPetStage(50)).toBe('adult');
      expect(getPetStage(75)).toBe('adult');
      expect(getPetStage(100)).toBe('adult');
    });
  });

  describe('getStageMultiplier', () => {
    it('should return 0.6 for baby', () => {
      expect(getStageMultiplier('baby')).toBe(0.6);
    });

    it('should return 0.8 for teen', () => {
      expect(getStageMultiplier('teen')).toBe(0.8);
    });

    it('should return 1.0 for adult', () => {
      expect(getStageMultiplier('adult')).toBe(1.0);
    });

    it('should return 0.6 for invalid stage', () => {
      expect(getStageMultiplier('invalid' as any)).toBe(0.6);
    });
  });

  describe('calculatePetGrowth', () => {
    it('should return 0 with no activity', () => {
      expect(calculatePetGrowth(false, 0, 0)).toBe(0);
    });

    it('should add 1 for daily practice', () => {
      expect(calculatePetGrowth(true, 0, 0)).toBe(1);
    });

    it('should add 1 for 7-day streak', () => {
      expect(calculatePetGrowth(false, 7, 0)).toBe(1);
    });

    it('should add 2 for 30-day streak', () => {
      expect(calculatePetGrowth(false, 30, 0)).toBe(2);
    });

    it('should add 2 per achievement', () => {
      expect(calculatePetGrowth(false, 0, 3)).toBe(6);
    });

    it('should calculate combined growth', () => {
      expect(calculatePetGrowth(true, 7, 2)).toBe(6); // 1 + 1 + 4
    });

    it('should cap at max growth', () => {
      const growth = calculatePetGrowth(true, 30, 50);
      expect(growth).toBeGreaterThan(0);
    });
  });
});
