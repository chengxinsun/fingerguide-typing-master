import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getTodayString, formatDateForChart, getLastNDays } from './dateUtils';

describe('dateUtils', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('getTodayString', () => {
    it('should return date in YYYY-MM-DD format', () => {
      const mockDate = new Date('2025-04-15T12:00:00.000Z');
      vi.setSystemTime(mockDate);

      const result = getTodayString();
      expect(result).toBe('2025-04-15');
    });

    it('should handle timezone correctly', () => {
      const mockDate = new Date('2025-04-15T23:59:59.000Z');
      vi.setSystemTime(mockDate);

      const result = getTodayString();
      // Note: This may vary based on local timezone
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
  });

  describe('formatDateForChart', () => {
    it('should format YYYY-MM-DD to MM-DD', () => {
      expect(formatDateForChart('2025-04-15')).toBe('04-15');
    });

    it('should handle single digit month and day', () => {
      expect(formatDateForChart('2025-01-05')).toBe('01-05');
    });

    it('should handle December 31', () => {
      expect(formatDateForChart('2025-12-31')).toBe('12-31');
    });
  });

  describe('getLastNDays', () => {
    it('should return last 7 days', () => {
      const mockDate = new Date('2025-04-15T12:00:00.000Z');
      vi.setSystemTime(mockDate);

      const result = getLastNDays(7);
      expect(result).toHaveLength(7);
      expect(result[6]).toBe('2025-04-15'); // Today
      expect(result[0]).toBe('2025-04-09'); // 6 days ago
    });

    it('should return last 30 days', () => {
      const mockDate = new Date('2025-04-15T12:00:00.000Z');
      vi.setSystemTime(mockDate);

      const result = getLastNDays(30);
      expect(result).toHaveLength(30);
    });

    it('should handle month boundary', () => {
      const mockDate = new Date('2025-04-02T12:00:00.000Z');
      vi.setSystemTime(mockDate);

      const result = getLastNDays(5);
      expect(result[0]).toBe('2025-03-29'); // March
      expect(result[4]).toBe('2025-04-02'); // April
    });

    it('should handle year boundary', () => {
      const mockDate = new Date('2025-01-02T12:00:00.000Z');
      vi.setSystemTime(mockDate);

      const result = getLastNDays(5);
      expect(result[0]).toBe('2024-12-29'); // Previous year
      expect(result[4]).toBe('2025-01-02'); // New year
    });

    it('should return empty array for n=0', () => {
      const result = getLastNDays(0);
      expect(result).toHaveLength(0);
    });

    it('should return single day for n=1', () => {
      const mockDate = new Date('2025-04-15T12:00:00.000Z');
      vi.setSystemTime(mockDate);

      const result = getLastNDays(1);
      expect(result).toHaveLength(1);
      expect(result[0]).toBe('2025-04-15');
    });
  });
});
