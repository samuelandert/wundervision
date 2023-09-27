<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import Header from '$lib/components/Header.svelte';

	import type { PageData } from './$types';

	export let data: PageData;
</script>

<Header />

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-6 text-center flex flex-col items-center">
		<Card />
		{#each data.countries_countries ?? [] as country}
			<p>
				Wundergraph Query:
				{country.name}
			</p>
		{/each}
	</div>
</div>
