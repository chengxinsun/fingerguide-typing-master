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
    primary: '#065f46', // Deep Forest Green
    secondary: '#064e3b', // Deep Moss
    background: 'linear-gradient(160deg, #f0fdf4 0%, #dcfce7 30%, #bbf7d0 60%, #86efac 100%)', // Morning Mist through leaves
    accent: '#84cc16', // Lively Sprout (Lime)
    gradient: 'from-emerald-700 via-green-600 to-teal-700',
    unlockLevel: 1,
  },
  {
    id: 'meadow',
    nameKey: 'theme.meadow',
    primary: '#be185d', // Deep Pink
    secondary: '#9d174d', // Dark Magenta
    background: 'linear-gradient(160deg, #fff1f2 0%, #ffe4e6 40%, #fbcfe8 100%)', // Soft morning pink
    accent: '#fb7185', // Rose
    gradient: 'from-rose-500 via-pink-500 to-fuchsia-600',
    unlockLevel: 6,
  },
  {
    id: 'desert',
    nameKey: 'theme.desert',
    primary: '#c2410c', // Burnt Orange
    secondary: '#9a3412', // Rust Red
    background: 'linear-gradient(160deg, #fff7ed 0%, #ffedd5 30%, #fed7aa 70%, #fdba74 100%)', // Sand dune gradient
    accent: '#fb923c', // Sunset Orange
    gradient: 'from-orange-600 via-amber-600 to-red-600',
    unlockLevel: 11,
  },
  {
    id: 'savanna',
    nameKey: 'theme.savanna',
    primary: '#b45309', // Amber Brown
    secondary: '#92400e', // Dark Earth
    background: 'linear-gradient(160deg, #fefce8 0%, #fef08a 40%, #fde047 80%, #facc15 100%)', // Golden grass
    accent: '#eab308', // Sunflower Yellow
    gradient: 'from-yellow-500 via-amber-500 to-orange-500',
    unlockLevel: 16,
  },
  {
    id: 'sky',
    nameKey: 'theme.sky',
    primary: '#1d4ed8', // Deep Blue
    secondary: '#1e3a8a', // Night Blue
    background: 'linear-gradient(160deg, #eff6ff 0%, #bfdbfe 30%, #93c5fd 60%, #60a5fa 100%)', // Clear midday sky
    accent: '#38bdf8', // Bright Sky Blue
    gradient: 'from-blue-600 via-sky-500 to-indigo-600',
    unlockLevel: 21,
  },
  {
    id: 'volcano',
    nameKey: 'theme.volcano',
    primary: '#6d28d9', // Deep Violet
    secondary: '#5b21b6', // Dark Purple Obsidian
    background: 'linear-gradient(160deg, #faf5ff 0%, #e9d5ff 40%, #c084fc 80%, #a855f7 100%)', // Magical volcanic glow
    accent: '#d946ef', // Fuchsia Flame
    gradient: 'from-purple-700 via-violet-600 to-fuchsia-600',
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
