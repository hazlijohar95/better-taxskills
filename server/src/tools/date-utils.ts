const MS_PER_DAY = 86_400_000;

export function today(): string {
  return new Date().toISOString().split("T")[0];
}

export function daysUntil(dateStr: string): number {
  return Math.ceil((new Date(dateStr).getTime() - Date.now()) / MS_PER_DAY);
}
