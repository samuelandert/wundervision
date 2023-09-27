<script>
	export let me;

	const handleButton = () => {
		if ($me.do.state) {
			$me.do.state.send('TOGGLE');
		}
	};
</script>

<div class="p-8 border-2 border-yellow-500">
	<p>My ID is: {$me.id}</p>

	My state is: {$me.state}
	<button
		class="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
		on:click={handleButton}>Switch</button
	>
</div>
