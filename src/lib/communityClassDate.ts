/** Compute the next 1st Saturday of the month (today counts if it's the 1st Sat) */
export function getNextFirstSaturday(): Date {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  const first = new Date(year, month, 1);
  const dayOfWeek = first.getDay();
  const firstSat = new Date(year, month, 1 + ((6 - dayOfWeek + 7) % 7));

  if (firstSat >= new Date(year, month, now.getDate())) {
    return firstSat;
  }
  const nextMonth = new Date(year, month + 1, 1);
  const nextDow = nextMonth.getDay();
  return new Date(year, month + 1, 1 + ((6 - nextDow + 7) % 7));
}

export function formatCommunityClassDate(d: Date): string {
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}
