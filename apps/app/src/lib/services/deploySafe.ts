import { SafeFactory, SafeAccountConfig } from '@safe-global/protocol-kit';
import { ethers } from 'ethers';

export async function deploySafe(
    safeFactory: SafeFactory,
    owner1Signer: ethers.Wallet,
) {
    console.log('deploying a safe initialized');

    const safeAccountConfig: SafeAccountConfig = {
        owners: [await owner1Signer.getAddress()],
        threshold: 1
    };
    const safeSdkOwner1 = await safeFactory.deploySafe({ safeAccountConfig });

    const safeAddress = await safeSdkOwner1.getAddress();

    console.log('Your Safe has been deployed:');
    console.log(`https://gnosis.blockscout.com/address/${safeAddress}`);
    console.log(`https://app.safe.global/gno:${safeAddress}`);
}