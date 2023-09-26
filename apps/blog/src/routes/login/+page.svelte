<script>
	import { onMount } from 'svelte'

	let connectionStatus = 'Connecting...'

	onMount(() => {
		// Listen for the "lit-ready" event
		document.addEventListener(
			'lit-ready',
			() => {
				connectionStatus = 'Connected'
			},
			false
		)

		// Check if litNodeClient is connected
		if (window.litNodeClient) {
			// The client exists, but it might not be connected yet
			connectionStatus = 'Client exists, waiting for connection...'
		} else {
			connectionStatus = 'Client not initialized'
		}
	})
</script>

<div class="container mx-auto px-4">
	<h1 class="text-4xl font-bold mb-4">Lit Network Status</h1>
	<p class="mt-4">{connectionStatus}</p>
</div>
