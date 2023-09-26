<script lang="ts">
	import { ButtonCounter } from 'ui';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

{#each data.countries_countries ?? [] as country}
	<div>{country.name}</div>
{/each}

<ButtonCounter />
