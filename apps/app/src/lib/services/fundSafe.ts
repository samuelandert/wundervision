import { ethers } from 'ethers';

export async function fundSafe(safeSdk: any, owner1Signer: ethers.Wallet) {


    const safeAddress = await safeSdk.getAddress();
    console.log(safeAddress)
    // const safeAmount = ethers.utils.parseUnits('0.01', 'ether').toHexString();

    // const transactionParameters = {
    //     to: safeAddress,
    //     value: safeAmount,
    //     gasLimit: ethers.utils.hexlify(21000)
    // };

    // const tx = await owner1Signer.sendTransaction(transactionParameters);

    // console.log('Fundraising.');
    // console.log(`Deposit Transaction: https://gnosis.blockscout.com/tx/${tx.hash}`);
}