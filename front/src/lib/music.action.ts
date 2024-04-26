'use server';

import { revalidatePath } from 'next/cache';
import { MusicData } from './utils';

export const createMusic = async ({
  title,
  year,
  ipfsHash,
  artist,
}: MusicData) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_ENDPOINT}/api/music/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, year, ipfsHash, artist }),
      }
    );
    if (!response.ok) {
      throw new Error('Failed to create music !');
    }
    const data = await response.json();
    console.log('Music created', data);
    revalidatePath('/');
    return data;
  } catch (error: any) {
    console.error(error.message);
    throw new Error(error.message);
  }
};

export const getAllMusic = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_ENDPOINT}/api/music/`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch music !');
    }
    const data = await response.json();
    revalidatePath('/');
    return data;
  } catch (error: any) {
    console.error(error.message);
    throw new Error(error.message);
  }
};
