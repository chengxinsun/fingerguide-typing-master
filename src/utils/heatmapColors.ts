export function getHeatmapColor(count: number, maxCount: number): string {
  if (maxCount === 0) return 'hsl(0, 0%, 95%)';

  const intensity = count / maxCount;
  // White -> Yellow -> Orange -> Red
  const hue = 60 - (intensity * 60); // 60 (yellow) to 0 (red)
  const saturation = intensity * 100;
  const lightness = 95 - (intensity * 45); // 95% to 50%

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

export function getMaxMistakeCount(keyMistakes: Record<string, number>): number {
  const values = Object.values(keyMistakes);
  return values.length > 0 ? Math.max(...values) : 0;
}
