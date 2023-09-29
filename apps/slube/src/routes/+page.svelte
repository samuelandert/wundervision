<script lang="ts">
	import Composer from '$lib/components/Composer.svelte';
	// import type { PageData } from './$types';
	export let data: PageData;
	import { composer } from '$lib/composables/flow';

	let Component;
	let componentName = 'Composer';

	onMount(async () => {
		const components = import.meta.glob('/src/lib/components/*.svelte');

		for (const path in components) {
			if (path.endsWith(`${componentName}.svelte`)) {
				Component = (await components[path]()).default;
				break;
			}
		}
	});
</script>

<Header />
<svelte:component this={Component} {composer} />
<SubHeader />

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
