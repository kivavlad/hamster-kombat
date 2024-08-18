export const formatProfitPerHour = (profit: number) => {
  if (profit >= 1000000000) return `+${(profit / 1000000000).toFixed(2)}B`;
  if (profit >= 1000000) return `+${(profit / 1000000).toFixed(2)}M`;
  if (profit >= 1000) return `+${(profit / 1000).toFixed(2)}K`;
  return `+${profit}`;
}

export const calculateTime = (targetHour: number) => {
  const now = new Date();
  const target = new Date(now);
  target.setUTCHours(targetHour, 0, 0, 0);

  if (now.getUTCHours() >= targetHour) {
    target.setUTCDate(target.getUTCDate() + 1);
  }

  const diff = target.getTime() - now.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  const paddedHours = hours.toString().padStart(2, '0');
  const paddedMinutes = minutes.toString().padStart(2, '0');

  return `${paddedHours}:${paddedMinutes}`;
}