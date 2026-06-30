export function formatFollowers(count: number): string {
  if (count >= 1000000) {
    return (count / 1000000).toFixed(1) + "M";
  }
  if (count >= 1000) {
    return (count / 1000).toFixed(1) + "K";
  }
  return count.toString();
}

export function formatEngagementRate(rate: number | undefined | null): string {
  if (rate == null || Number.isNaN(Number(rate))) return "N/A";
  return (Number(rate) * 100).toFixed(2) + "%";
}
