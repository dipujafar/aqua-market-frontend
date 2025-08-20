// types.ts
export type TimeRemaining = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalHours: number;
} | null;

// utils/time.ts
// import { TimeRemaining } from "./types";

/**
 * Calculate remaining time for an auction.
 * @param date - ISO string of the date, e.g., "2025-08-27T00:00:00.000Z"
 * @param time - Time string, e.g., "16:00"
 * @returns TimeRemaining object or null if auction ended
 */
export function getTimeRemaining(date: string, time: string): TimeRemaining {
  // Combine date and time into a full Date
  const target = new Date(`${date?.split("T")[0]}T${time}:00Z`);
  const now = new Date();

  const diff = target.getTime() - now.getTime();

  if (diff <= 0) return null; // auction ended

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  const totalHours = Math.floor(diff / (1000 * 60 * 60));

  return { days, hours, minutes, seconds, totalHours };
}
