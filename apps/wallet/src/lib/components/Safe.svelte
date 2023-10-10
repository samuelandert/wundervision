<script lang="ts">
	import { ethers } from 'ethers';
	import Safe, { EthersAdapter, SafeFactory } from '@safe-global/protocol-kit';
	import SafeApiKit from '@safe-global/api-kit';
	import { deploySafe } from '../services/deploySafe';
	import { SafeTransactionDataPartial } from '@safe-global/safe-core-sdk-types';

	const RPC_URL = 'https://rpc.ankr.com/gnosis';
	const provider = new ethers.providers.JsonRpcProvider(RPC_URL);

	const owner1Signer = new ethers.Wallet(import.meta.env.VITE_OWNER_1, provider);

	const ethAdapterOwner1 = new EthersAdapter({
		ethers,
		signerOrProvider: owner1Signer
	});

	const txServiceUrl = 'https://safe-transaction-gnosis-chain.safe.global/';
	const safeService = new SafeApiKit({ txServiceUrl, ethAdapter: ethAdapterOwner1 });

	const safeAddress = '0xe3017bE90f75F2C987Ddd0F906A526060e67bD38';

	let safeFactory: SafeFactory;
	let safe: Safe;
	let pendingTransactions;

	onMount(async () => {
		safeFactory = await SafeFactory.create({ ethAdapter: ethAdapterOwner1 });
		safe = await Safe.create({
			ethAdapter: ethAdapterOwner1,
			safeAddress
		});
		let address = await safe.getAddress();
		console.log('address: ' + address);
	});

	async function fundSafe() {
		console.log('safe:' + safeAddress);
		const safeAmount = ethers.utils.parseUnits('0.01', 'ether').toHexString();

		const transactionParameters = {
			to: safeAddress,
			value: safeAmount
		};

		const tx = await owner1Signer.sendTransaction(transactionParameters);

		console.log('Fundraising.');
		console.log(`Deposit Transaction: https://gnosis.blockscout.com/tx/${tx.hash}`);
	}

	async function sendFromSafe() {
		const destination = '0xE70780DBeE28E6bd0f0fC0B3cc935df4964cF033';
		const amount = ethers.utils.parseUnits('0.01', 'ether').toString();

		const safeTransactionData: SafeTransactionDataPartial = {
			to: destination,
			data: '0x',
			value: amount
		};
		const safeTransaction = await safe.createTransaction({ safeTransactionData });
		console.log('safe tx: ' + safeTransaction);

		// Deterministic hash based on transaction parameters
		const safeTxHash = await safe.getTransactionHash(safeTransaction);

		console.log('tx: hash ' + safeTxHash);

		// Sign transaction to verify that the transaction is coming from owner 1
		const senderSignature = await safe.signTransactionHash(safeTxHash);

		console.log('signed tx' + senderSignature);

		await safeService.proposeTransaction({
			safeAddress,
			safeTransactionData: safeTransaction.data,
			safeTxHash,
			senderAddress: await owner1Signer.getAddress(),
			senderSignature: senderSignature.data
		});

		pendingTransactions = await safeService.getPendingTransactions(safeAddress);

		const safeTX = await safeService.getTransaction(safeTxHash);

		const executeTxResponse = await safe.executeTransaction(safeTX);

		const receipt = await executeTxResponse.transactionResponse?.wait();

		console.log('Transaction executed:');
		console.log(`https://gnosis.blockscout.com/tx/${receipt.transactionHash}`);
	}
</script>

<button class="btn variant-filled" on:click={() => deploySafe(safeFactory, owner1Signer)}
	>DeploySafe</button
>

<button class="btn variant-filled" on:click={() => fundSafe()}> FundSafe with 0.01$</button>

<button class="btn variant-filled" on:click={() => sendFromSafe()}> Send from Safe 0.01$</button>

PENDING:
{#if pendingTransactions}
	{JSON.stringify(pendingTransactions)}
{/if}
