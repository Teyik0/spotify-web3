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

const account = await signerToSafeSmartAccount(publicClient, {
  signer: privateKeyToAccount(privateKey),
  entryPoint: ENTRYPOINT_ADDRESS_V07, // global entrypoint
  safeVersion: '1.4.1',
});

console.log(
  `Smart account address: https://sepolia.etherscan.io/address/${account.address}`
);
