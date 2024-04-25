'use client';

import { useWalletInfo } from '@web3modal/wagmi/react';

import { Button } from './ui/button';

const ButtonConnect = () => {
  const { walletInfo } = useWalletInfo();
  return (
    <div className='mt-auto flex flex-col gap-2'>
      <w3m-button size='sm' balance='hide' />
      {walletInfo && (
        <Button className='w-full' size='sm'>
          Upgrade Plan
        </Button>
      )}
    </div>
  );
};

export default ButtonConnect;
