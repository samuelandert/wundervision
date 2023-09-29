<script lang="ts">
	// import type { PageData } from './$types';
	export let data: PageData;

	// let Component;
	// let componentName = 'Header';

	// onMount(async () => {
	// 	const comp = await import(`../lib/components/${componentName}.svelte`);
	// 	Component = comp.default;
	// });
	let componentName = 'Header';

	async function loadComponent(element) {
		const module = await import(`../lib/components/${componentName}.svelte`);
		new module.default({ target: element });
	}
</script>

<div use:loadComponent />

<!-- <Header /> -->
<!-- <svelte:component this={Component} /> -->

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
