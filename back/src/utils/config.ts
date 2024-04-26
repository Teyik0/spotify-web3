import 'dotenv/config';
import { writeFileSync } from 'fs';
import {
  ENTRYPOINT_ADDRESS_V07,
  bundlerActions,
  createSmartAccountClient,
  getAccountNonce,
  getSenderAddress,
  getUserOperationHash,
  signUserOperationHashWithECDSA,
  waitForUserOperationReceipt,
} from 'permissionless';
import type {
  GetUserOperationReceiptReturnType,
  UserOperation,
} from 'permissionless';
import {
  privateKeyToSafeSmartAccount,
  privateKeyToSimpleSmartAccount,
  signerToSafeSmartAccount,
} from 'permissionless/accounts';
import {
  pimlicoBundlerActions,
  pimlicoPaymasterActions,
} from 'permissionless/actions/pimlico';
import {
  createPimlicoBundlerClient,
  createPimlicoPaymasterClient,
} from 'permissionless/clients/pimlico';
import {
  concat,
  createClient,
  createPublicClient,
  encodeFunctionData,
  http,
  parseAbiItem,
} from 'viem';
import type { Address, Hash, Hex } from 'viem';
import {
  generatePrivateKey,
  privateKeyToAccount,
  signMessage,
} from 'viem/accounts';
import { lineaTestnet, polygonMumbai, sepolia } from 'viem/chains';
import { erc721abi } from './erc721.abi';

const apiKey = '5fcf2f40-58ef-4529-9484-04209e44e95a';
const paymasterUrl = `https://api.pimlico.io/v2/sepolia/rpc?apikey=${apiKey}`;

const privateKey =
  (process.env.PRIVATE_KEY as Hex) ??
  (() => {
    const pk = generatePrivateKey();
    writeFileSync('.env', `PRIVATE_KEY=${pk}`);
    return pk;
  })();

export const publicClient = createPublicClient({
  transport: http('https://rpc.ankr.com/eth_sepolia'),
});

export const paymasterClient = createPimlicoPaymasterClient({
  transport: http(paymasterUrl),
  entryPoint: ENTRYPOINT_ADDRESS_V07,
});

console.log('private key: ', privateKey);
console.log('account: ', privateKeyToAccount(privateKey).address);

const account = await signerToSafeSmartAccount(publicClient, {
  signer: privateKeyToAccount(privateKey),
  entryPoint: ENTRYPOINT_ADDRESS_V07, // global entrypoint
  safeVersion: '1.4.1',
});

console.log('smart account: ', account.address);

console.log(
  `Smart account address: https://sepolia.etherscan.io/address/${account.address}`
);

const bundlerUrl = `https://api.pimlico.io/v2/sepolia/rpc?apikey=${apiKey}`;

const bundlerClient = createPimlicoBundlerClient({
  transport: http(bundlerUrl),
  entryPoint: ENTRYPOINT_ADDRESS_V07,
});

const smartAccountClient = createSmartAccountClient({
  account,
  entryPoint: ENTRYPOINT_ADDRESS_V07,
  chain: sepolia,
  bundlerTransport: http(bundlerUrl),
  middleware: {
    gasPrice: async () => {
      return (await bundlerClient.getUserOperationGasPrice()).fast;
    },
    sponsorUserOperation: paymasterClient.sponsorUserOperation,
  },
});

const erc721Contract = '0xb52cb4dA7FfEd09D279E3cae80151006Ab4Ba3fc';

const { request } = await publicClient.simulateContract({
  account,
  address: erc721Contract,
  abi: erc721abi,
  functionName: 'safeMint',
  args: [
    'test',
    'test',
    'bafybeiboat6lnoo34ypddjtbypa6btt5drqppnzf265whd6mvdt5io555m',
    2024n,
    '0x1A2cDc9Ea7dFc55aeaDb314bB8C3b09E938c989b',
  ],
});

// console.log('request', request);

const mintNFT = await smartAccountClient.writeContract(request);
console.log(
  `User operation included: https://sepolia.etherscan.io/tx/${mintNFT}`
);

const transaction = await publicClient.waitForTransactionReceipt({
  hash: mintNFT,
});

// console.log('transaction', transaction);
