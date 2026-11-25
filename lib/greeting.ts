export function greeting(name: string, hour: number): string {
  if (hour < 0 || hour > 23) {
    throw new RangeError("hour must be between 0 and 23");
  }
  const part =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  return `${part}, ${name}!`;
}
