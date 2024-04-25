'use client';

import { Button } from './ui/button';
import { ChangeEvent, useState } from 'react';
import { upload } from '@/lib/upload.action';
import ReactAudioPlayer from 'react-audio-player';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from 'sonner';

const Upload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState<string | null>(null);
  const [ipfsHash, setIpfsHash] = useState<string | null>(null);
  const handleUpload = async () => {
    if (!file) return;
    if (!title) return;
    try {
      toast.loading('Uploading...');
      const formData = new FormData();
      formData.append('music', file);
      formData.append('title', title);
      const data = await upload(formData);
      console.log(data);
      setIpfsHash(data.ipfsHash);
      toast.success('Successfully uploaded music');
      toast.dismiss();
    } catch (error) {
      toast.error('Failed to upload music');
      toast.dismiss();
      console.error(error);
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    setFile(event.target.files[0]);
  };

  return (
    <div className='text-white'>
      <form
        action={handleUpload}
        encType='multipart/form-data'
        className='space-y-4'
      >
        <div className='grid w-full max-w-sm items-center gap-2'>
          <Label htmlFor='picture'>Music</Label>
          <Input
            id='picture'
            type='file'
            accept='.mp3, .flac'
            className='text-black font-semibold max-w-sm'
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              handleFileChange(event)
            }
          />
        </div>
        <Input
          id='picture'
          type='text'
          className='text-black font-semibold max-w-sm'
          onChange={(event) => setTitle(event.target.value)}
        />
        <Button type='submit' variant='secondary'>
          Upload
        </Button>
      </form>
      <div className='mt-4'>
        {ipfsHash && title && (
          <ReactAudioPlayer
            src={`https://${ipfsHash}.ipfs.w3s.link/${title}`}
            autoPlay
            controls
          />
        )}
      </div>
    </div>
  );
};

export default Upload;
