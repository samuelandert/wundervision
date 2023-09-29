<script lang="ts">
	// import type { PageData } from './$types';
	export let data: PageData;
	import { composer } from '$lib/composables/flow';

	let componentName = 'Composer';

	async function loadComponent(element) {
		const module = await import(`../lib/components/${componentName}.svelte`);
		new module.default({ target: element, props: { composer } });
	}
</script>

<div use:loadComponent />

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
