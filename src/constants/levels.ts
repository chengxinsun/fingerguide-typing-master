export interface LevelDefinition {
  level: number;
  minXP: number;
  maxXP: number;
  titleKey: string;
  emoji: string;
  themeId: string;
  unlockedPetIds: string[];
}

// XP formula: Level 1=0, Level 2=100, Level 3=250, Level 4=450...
// Each level requires 50 more XP than previous
// Level 2: 100, Level 3: 150 (total 250), Level 4: 200 (total 450)...
function calculateXPForLevel(level: number): number {
  if (level <= 1) return 0;
  let total = 0;
  for (let i = 2; i <= level; i++) {
    total += 100 + (i - 2) * 50;
  }
  return total;
}

export const LEVELS: LevelDefinition[] = [
  // Level 1-5: Snail (forest theme)
  { level: 1, minXP: calculateXPForLevel(1), maxXP: calculateXPForLevel(2), titleKey: 'level.level_1', emoji: '🐌', themeId: 'forest', unlockedPetIds: ['snail'] },
  { level: 2, minXP: calculateXPForLevel(2), maxXP: calculateXPForLevel(3), titleKey: 'level.level_1', emoji: '🐌', themeId: 'forest', unlockedPetIds: [] },
  { level: 3, minXP: calculateXPForLevel(3), maxXP: calculateXPForLevel(4), titleKey: 'level.level_1', emoji: '🐌', themeId: 'forest', unlockedPetIds: [] },
  { level: 4, minXP: calculateXPForLevel(4), maxXP: calculateXPForLevel(5), titleKey: 'level.level_1', emoji: '🐌', themeId: 'forest', unlockedPetIds: [] },
  { level: 5, minXP: calculateXPForLevel(5), maxXP: calculateXPForLevel(6), titleKey: 'level.level_1', emoji: '🐌', themeId: 'forest', unlockedPetIds: [] },
  // Level 6-10: Rabbit (meadow theme)
  { level: 6, minXP: calculateXPForLevel(6), maxXP: calculateXPForLevel(7), titleKey: 'level.level_6', emoji: '🐰', themeId: 'meadow', unlockedPetIds: ['rabbit'] },
  { level: 7, minXP: calculateXPForLevel(7), maxXP: calculateXPForLevel(8), titleKey: 'level.level_6', emoji: '🐰', themeId: 'meadow', unlockedPetIds: [] },
  { level: 8, minXP: calculateXPForLevel(8), maxXP: calculateXPForLevel(9), titleKey: 'level.level_6', emoji: '🐰', themeId: 'meadow', unlockedPetIds: [] },
  { level: 9, minXP: calculateXPForLevel(9), maxXP: calculateXPForLevel(10), titleKey: 'level.level_6', emoji: '🐰', themeId: 'meadow', unlockedPetIds: [] },
  { level: 10, minXP: calculateXPForLevel(10), maxXP: calculateXPForLevel(11), titleKey: 'level.level_6', emoji: '🐰', themeId: 'meadow', unlockedPetIds: [] },
  // Level 11-15: Fox (desert theme)
  { level: 11, minXP: calculateXPForLevel(11), maxXP: calculateXPForLevel(12), titleKey: 'level.level_11', emoji: '🦊', themeId: 'desert', unlockedPetIds: ['fox'] },
  { level: 12, minXP: calculateXPForLevel(12), maxXP: calculateXPForLevel(13), titleKey: 'level.level_11', emoji: '🦊', themeId: 'desert', unlockedPetIds: [] },
  { level: 13, minXP: calculateXPForLevel(13), maxXP: calculateXPForLevel(14), titleKey: 'level.level_11', emoji: '🦊', themeId: 'desert', unlockedPetIds: [] },
  { level: 14, minXP: calculateXPForLevel(14), maxXP: calculateXPForLevel(15), titleKey: 'level.level_11', emoji: '🦊', themeId: 'desert', unlockedPetIds: [] },
  { level: 15, minXP: calculateXPForLevel(15), maxXP: calculateXPForLevel(16), titleKey: 'level.level_11', emoji: '🦊', themeId: 'desert', unlockedPetIds: [] },
  // Level 16-20: Cheetah (savanna theme)
  { level: 16, minXP: calculateXPForLevel(16), maxXP: calculateXPForLevel(17), titleKey: 'level.level_16', emoji: '🐆', themeId: 'savanna', unlockedPetIds: ['cheetah'] },
  { level: 17, minXP: calculateXPForLevel(17), maxXP: calculateXPForLevel(18), titleKey: 'level.level_16', emoji: '🐆', themeId: 'savanna', unlockedPetIds: [] },
  { level: 18, minXP: calculateXPForLevel(18), maxXP: calculateXPForLevel(19), titleKey: 'level.level_16', emoji: '🐆', themeId: 'savanna', unlockedPetIds: [] },
  { level: 19, minXP: calculateXPForLevel(19), maxXP: calculateXPForLevel(20), titleKey: 'level.level_16', emoji: '🐆', themeId: 'savanna', unlockedPetIds: [] },
  { level: 20, minXP: calculateXPForLevel(20), maxXP: calculateXPForLevel(21), titleKey: 'level.level_16', emoji: '🐆', themeId: 'savanna', unlockedPetIds: [] },
  // Level 21-25: Eagle (sky theme)
  { level: 21, minXP: calculateXPForLevel(21), maxXP: calculateXPForLevel(22), titleKey: 'level.level_21', emoji: '🦅', themeId: 'sky', unlockedPetIds: ['eagle'] },
  { level: 22, minXP: calculateXPForLevel(22), maxXP: calculateXPForLevel(23), titleKey: 'level.level_21', emoji: '🦅', themeId: 'sky', unlockedPetIds: [] },
  { level: 23, minXP: calculateXPForLevel(23), maxXP: calculateXPForLevel(24), titleKey: 'level.level_21', emoji: '🦅', themeId: 'sky', unlockedPetIds: [] },
  { level: 24, minXP: calculateXPForLevel(24), maxXP: calculateXPForLevel(25), titleKey: 'level.level_21', emoji: '🦅', themeId: 'sky', unlockedPetIds: [] },
  { level: 25, minXP: calculateXPForLevel(25), maxXP: calculateXPForLevel(26), titleKey: 'level.level_21', emoji: '🦅', themeId: 'sky', unlockedPetIds: [] },
  // Level 26+: Dragon (volcano theme)
  { level: 26, minXP: calculateXPForLevel(26), maxXP: Infinity, titleKey: 'level.level_26', emoji: '🐉', themeId: 'volcano', unlockedPetIds: ['dragon'] },
];

export function getLevelByXP(xp: number): LevelDefinition {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].minXP) {
      return LEVELS[i];
    }
  }
  return LEVELS[0];
}

export function getNextLevelXP(currentXP: number): number {
  const currentLevel = getLevelByXP(currentXP);
  return currentLevel.maxXP;
}

export function getXPProgress(currentXP: number): { current: number; required: number; percentage: number } {
  const currentLevel = getLevelByXP(currentXP);
  const current = currentXP - currentLevel.minXP;
  const required = currentLevel.maxXP === Infinity ? current : currentLevel.maxXP - currentLevel.minXP;
  const percentage = currentLevel.maxXP === Infinity ? 100 : Math.min(100, Math.round((current / required) * 100));
  return { current, required, percentage };
}
