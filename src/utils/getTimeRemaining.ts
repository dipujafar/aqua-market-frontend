type TimeRemaining = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export function getTimeRemaining(dateStr: string, timeStr: string): TimeRemaining | null {
  if (!dateStr || !timeStr) return null;

  // Validate time string format (HH:mm)
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
  if (!timeRegex.test(timeStr)) {
    console.warn('Invalid time string:', timeStr);
    return null;
  }

  // Combine date and time
  const targetDate = new Date(`${dateStr}T${timeStr}:00`);
  if (isNaN(targetDate.getTime())) {
    console.warn('Invalid date:', dateStr, 'or time:', timeStr);
    return null;
  }

  // Current time
  const now = new Date();

  // Difference in milliseconds
  const diff = targetDate.getTime() - now.getTime();

  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds };
}
