<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import SubHeader from '$lib/components/SubHeader.svelte';

	import type { PageData } from './$types';

	export let data: PageData;
</script>

<Header />
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
