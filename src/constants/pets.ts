export type PetStage = 'baby' | 'teen' | 'adult';

export interface PetDefinition {
  id: string;
  emoji: string;
  nameKey: string;
  descriptionKey: string;
  unlockLevel: number;
  maxGrowth: number;
}

export const PETS: PetDefinition[] = [
  { id: 'snail', emoji: '🐌', nameKey: 'pet.snail.name', descriptionKey: 'pet.snail.description', unlockLevel: 1, maxGrowth: 100 },
  { id: 'rabbit', emoji: '🐰', nameKey: 'pet.rabbit.name', descriptionKey: 'pet.rabbit.description', unlockLevel: 6, maxGrowth: 100 },
  { id: 'fox', emoji: '🦊', nameKey: 'pet.fox.name', descriptionKey: 'pet.fox.description', unlockLevel: 11, maxGrowth: 100 },
  { id: 'cheetah', emoji: '🐆', nameKey: 'pet.cheetah.name', descriptionKey: 'pet.cheetah.description', unlockLevel: 16, maxGrowth: 100 },
  { id: 'eagle', emoji: '🦅', nameKey: 'pet.eagle.name', descriptionKey: 'pet.eagle.description', unlockLevel: 21, maxGrowth: 100 },
  { id: 'dragon', emoji: '🐉', nameKey: 'pet.dragon.name', descriptionKey: 'pet.dragon.description', unlockLevel: 26, maxGrowth: 100 },
];

export function getPetById(id: string): PetDefinition | undefined {
  return PETS.find((pet) => pet.id === id);
}

export function getPetStage(growth: number): PetStage {
  if (growth < 20) {
    return 'baby';
  } else if (growth < 50) {
    return 'teen';
  } else {
    return 'adult';
  }
}

export function getStageMultiplier(stage: PetStage): number {
  switch (stage) {
    case 'baby':
      return 0.6;
    case 'teen':
      return 0.8;
    case 'adult':
      return 1.0;
    default:
      return 0.6;
  }
}

export function calculatePetGrowth(
  dailyPractice: boolean,
  streak: number,
  achievementsUnlocked: number
): number {
  let growth = 0;

  // Daily practice bonus
  if (dailyPractice) {
    growth += 1;
  }

  // Streak bonuses
  if (streak >= 30) {
    growth += 2;
  } else if (streak >= 7) {
    growth += 1;
  }

  // Achievement bonus
  growth += achievementsUnlocked * 2;

  return growth;
}
