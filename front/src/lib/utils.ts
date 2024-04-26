import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createSlug(str: string) {
  // Remove special characters and replace spaces with hyphens
  const cleanedStr = str.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '-');
  const slug = cleanedStr.toLowerCase();
  return slug;
}

export interface MusicData {
  title: string;
  year: number;
  ipfsHash: string;
  artist: string;
  slug: string;
}
