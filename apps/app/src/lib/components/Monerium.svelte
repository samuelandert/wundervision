<script lang="ts">
	import { MoneriumClient } from '@monerium/sdk';

	let authcontext;

	async function connectMonerium() {
		const client = new MoneriumClient('sandbox');

		await client.auth({
			client_id: import.meta.env.VITE_MONERIUM_CLIENT,
			client_secret: import.meta.env.VITE_MONERIUM_SECRET
		});

		authcontext = await client.getAuthContext();

		console.log('authcontext: ' + JSON.stringify(authcontext));
	}
</script>

<button class="btn variant-filled" on:click={() => connectMonerium()}> connectMonerium</button>
{JSON.stringify(authcontext)}
