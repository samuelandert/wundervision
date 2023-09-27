<script>
	export let me;

	let composerBob;

	$: {
		if ($me.do.core) {
			composerBob = $me.do.core.subscribeData('ComposerBob');
		}
	}

	$: {
		if ($composerBob.state) {
			$me.do.state.send($composerBob.state);
		}
	}
	// Call testAlert
</script>

<div class="p-8 border-2 border-blue-500">
	<p>My ID is: {$me.id}</p>

	My state is: {$me.state}
	<div
		class="p-2 border-2"
		style="background-color: {$me.state}; border-radius: 50%; width: 50px; height: 50px;"
	/>
</div>
