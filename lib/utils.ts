import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateCardId(): string {
  const prefix = ["FC", "CC", "TP", "NL"].at(Math.floor(Math.random() * 4)) ?? "FC";
  const num = Math.floor(1000 + Math.random() * 9000);
  const suffix = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${num}-${suffix}`;
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const [year, month, day] = dateStr.split("-");
  if (!year || !month || !day) return dateStr;
  return `${year}.${month}.${day}`;
}
