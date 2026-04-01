export interface XPCalculationInput {
  chars: number;
  durationMinutes: number;
  wpm: number;
}

export function calculateXP(input: XPCalculationInput): number {
  let xp = 0;
  // Base: 1 XP per character
  xp += input.chars * 1;
  // Time bonus: 10 XP per minute
  xp += Math.floor(input.durationMinutes * 10);
  // WPM bonus
  if (input.wpm > 60) xp += 100;
  else if (input.wpm > 30) xp += 50;
  return Math.round(xp);
}

export function calculateSessionXP(chars: number, startTime: number, endTime: number, wpm: number): number {
  const durationMinutes = (endTime - startTime) / 1000 / 60;
  return calculateXP({ chars, durationMinutes, wpm });
}
