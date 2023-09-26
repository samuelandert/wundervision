<script lang="ts">
	import { ButtonCounter } from '../../../../packages/design-system';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-6 text-center flex flex-col items-center">
		<h2 class="h2">Welcome to Earth</h2>

		{#each data.countries_countries ?? [] as country}
			<p>
				Wundergraph Query:
				{country.name}
			</p>
		{/each}

		<ButtonCounter />
	</div>
</div>
