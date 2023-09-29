<script lang="ts">
	// import type { PageData } from './$types';
	export let data: PageData;

	onMount(() => {
		console.log('hello: ' + testMe.message);
	});
</script>

<Header />
<!-- <svelte:component this={testDefinition.component} /> -->
<!-- <SubHeader /> -->

<div class="container p-12 mx-auto flex justify-center items-center">
	<div class="space-y-6 text-center flex flex-col items-center">
		{#each data.countries_countries ?? [] as country}
			<p>
				Wundergraph Query:<br />
				{country.name}
			</p>
		{/each}
	</div>
</div>
