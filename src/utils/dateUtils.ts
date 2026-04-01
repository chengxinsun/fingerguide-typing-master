export function getTodayString(): string {
  return new Date().toISOString().split('T')[0];
}

export function formatDateForChart(dateStr: string): string {
  const [_, month, day] = dateStr.split('-');
  return `${month}-${day}`;
}

export function getLastNDays(n: number): string[] {
  const days: string[] = [];
  for (let i = n - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    days.push(date.toISOString().split('T')[0]);
  }
  return days;
}
