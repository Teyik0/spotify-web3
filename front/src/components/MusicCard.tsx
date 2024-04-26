'use client';

import {
  Music,
  PauseIcon,
  PlayIcon,
  RepeatIcon,
  VolumeIcon,
} from 'lucide-react';
import { Button } from './ui/button';
import { useRef, useState } from 'react';

interface MusicCardProps {
  title: string;
  artist: string;
  ipfsHash: string;
  slug: string;
}

const MusicCard = ({ title, artist, ipfsHash, slug }: MusicCardProps) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLoop, setIsLoop] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const musicRef = useRef<HTMLAudioElement>(null);

  const toggleAudio = (): void => {
    if (isPlaying) {
      musicRef.current?.pause();
      setIsPlaying(false);
    } else {
      musicRef.current?.play();
      setIsPlaying(true);
    }
  };

  const infiniteLoop = (): void => {
    if (isLoop) {
      musicRef.current?.removeEventListener('ended', infiniteLoop);
      setIsLoop(false);
    } else {
      musicRef.current?.addEventListener('ended', infiniteLoop);
      setIsLoop(true);
    }
  };

  const toggleMuteAudio = (): void => {
    if (isMuted) {
      setIsMuted(false);
      musicRef.current?.setAttribute('muted', 'false');
    } else {
      setIsMuted(true);
      musicRef.current?.setAttribute('muted', 'true');
    }
  };

  return (
    <div className='flex items-center justify-between bg-gray-800 px-8 py-4 rounded-md'>
      <audio
        ref={musicRef}
        src={`https://${ipfsHash}.ipfs.w3s.link/${slug}`}
        loop={isLoop}
        muted={false}
      />
      <div className='flex items-center gap-4'>
        <Music className='h-6 w-6 text-gray-50' />
        <div>
          <div className='text-lg font-semibold text-gray-50'>{title}</div>
          <div className='text-sm text-gray-400'>{artist}</div>
          <div className='text-sm text-gray-400'>{slug}</div>
          <div className='text-sm text-gray-400'>{ipfsHash}</div>
        </div>
      </div>
      <div className='flex items-center gap-4'>
        {/* <Button size='icon' variant='ghost' className='hover:bg-transparent'>
          <ShuffleIcon className='h-6 w-6 text-gray-400' />
        </Button> */}
        <Button size='icon' variant='ghost' className='hover:bg-transparent'>
          {isPlaying ? (
            <PlayIcon
              className='h-6 w-6 text-gray-50'
              onClick={() => toggleAudio()}
            />
          ) : (
            <PauseIcon
              className='h-6 w-6 text-gray-400'
              onClick={() => toggleAudio()}
            />
          )}
        </Button>
        <Button
          size='icon'
          onClick={() => infiniteLoop()}
          variant='ghost'
          className='hover:bg-transparent'
        >
          <RepeatIcon
            className={`h-6 w-6  ${isLoop ? 'text-gray-50' : 'text-gray-400'}`}
          />
        </Button>
      </div>
      <div className='flex items-center gap-2'>
        <Button
          size='icon'
          onClick={() => toggleMuteAudio()}
          variant='ghost'
          className='hover:bg-transparent'
        >
          <VolumeIcon className='h-6 w-6 text-gray-400' />
        </Button>
      </div>
    </div>
  );
};

export default MusicCard;
