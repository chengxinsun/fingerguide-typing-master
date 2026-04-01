export interface ThemeDefinition {
  id: string;
  nameKey: string;
  primary: string;
  secondary: string;
  background: string;
  accent: string;
  gradient: string;
  unlockLevel: number;
}

export const THEMES: ThemeDefinition[] = [
  {
    id: 'forest',
    nameKey: 'theme.forest',
    primary: '#22c55e',
    secondary: '#16a34a',
    background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
    accent: '#86efac',
    gradient: 'from-green-500 to-emerald-600',
    unlockLevel: 1,
  },
  {
    id: 'meadow',
    nameKey: 'theme.meadow',
    primary: '#f472b6',
    secondary: '#ec4899',
    background: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%)',
    accent: '#f9a8d4',
    gradient: 'from-pink-400 to-rose-500',
    unlockLevel: 6,
  },
  {
    id: 'desert',
    nameKey: 'theme.desert',
    primary: '#f97316',
    secondary: '#ea580c',
    background: 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)',
    accent: '#fdba74',
    gradient: 'from-orange-400 to-amber-500',
    unlockLevel: 11,
  },
  {
    id: 'savanna',
    nameKey: 'theme.savanna',
    primary: '#eab308',
    secondary: '#ca8a04',
    background: 'linear-gradient(135deg, #fefce8 0%, #fef9c3 100%)',
    accent: '#fde047',
    gradient: 'from-yellow-400 to-amber-500',
    unlockLevel: 16,
  },
  {
    id: 'sky',
    nameKey: 'theme.sky',
    primary: '#3b82f6',
    secondary: '#2563eb',
    background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
    accent: '#93c5fd',
    gradient: 'from-blue-400 to-indigo-500',
    unlockLevel: 21,
  },
  {
    id: 'volcano',
    nameKey: 'theme.volcano',
    primary: '#8b5cf6',
    secondary: '#7c3aed',
    background: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)',
    accent: '#c4b5fd',
    gradient: 'from-violet-500 to-purple-600',
    unlockLevel: 26,
  },
];

export function getThemeById(id: string): ThemeDefinition | undefined {
  return THEMES.find((theme) => theme.id === id);
}

export function getThemeByLevel(level: number): ThemeDefinition {
  // Find the highest theme that is unlocked by the given level
  const unlockedThemes = THEMES.filter((theme) => theme.unlockLevel <= level);
  if (unlockedThemes.length === 0) {
    return THEMES[0]; // Return forest theme as default
  }
  // Return the theme with the highest unlock level
  return unlockedThemes.reduce((highest, current) =>
    current.unlockLevel > highest.unlockLevel ? current : highest
  );
}
