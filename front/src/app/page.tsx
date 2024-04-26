import { getAllMusic } from '@/lib/music.action';
import MusicCard from '@/components/MusicCard';

export default async function Home() {
  const musics = await getAllMusic();
  return (
    <main className='flex-1 bg-gray-900 px-8 py-4'>
      <h1 className='text-white text-4xl mb-4 font-bold '>All musics</h1>
      <div className='flex flex-col gap-4'>
        {musics.musics.map((music: any) => (
          <MusicCard
            artist={
              music.artist.username
                ? music.artist.username
                : music.artist.walletAddress
            }
            slug={music.slug}
            title={music.title}
            ipfsHash={music.ipfsHash}
            key={music.ipfsHash}
          />
        ))}
      </div>
    </main>
  );
}
