import { describe, it, expect } from 'vitest';
import { calculateXP, calculateSessionXP } from './xpCalculator';

describe('xpCalculator', () => {
  describe('calculateXP', () => {
    it('should calculate base XP from characters', () => {
      const result = calculateXP({ chars: 100, durationMinutes: 0, wpm: 0 });
      expect(result).toBe(100);
    });

    it('should add time bonus', () => {
      const result = calculateXP({ chars: 100, durationMinutes: 5, wpm: 0 });
      expect(result).toBe(150); // 100 + 50
    });

    it('should add WPM bonus for >30 WPM', () => {
      const result = calculateXP({ chars: 100, durationMinutes: 0, wpm: 40 });
      expect(result).toBe(150); // 100 + 50
    });

    it('should add higher WPM bonus for >60 WPM', () => {
      const result = calculateXP({ chars: 100, durationMinutes: 0, wpm: 70 });
      expect(result).toBe(200); // 100 + 100
    });

    it('should handle zero input', () => {
      const result = calculateXP({ chars: 0, durationMinutes: 0, wpm: 0 });
      expect(result).toBe(0);
    });

    it('should handle negative WPM gracefully', () => {
      const result = calculateXP({ chars: 100, durationMinutes: 0, wpm: -10 });
      expect(result).toBe(100); // No bonus for negative WPM
    });
  });

  describe('calculateSessionXP', () => {
    it('should calculate XP from session times', () => {
      const startTime = 0;
      const endTime = 60000; // 1 minute
      const result = calculateSessionXP(100, startTime, endTime, 0);
      expect(result).toBe(110); // 100 chars + 10 XP for 1 minute
    });

    it('should handle very short sessions', () => {
      const startTime = 0;
      const endTime = 1000; // 1 second
      const result = calculateSessionXP(10, startTime, endTime, 0);
      expect(result).toBe(10); // Only char XP, time rounds to 0
    });
  });
});
