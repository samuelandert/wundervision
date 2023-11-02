<script lang="ts">
	export let me;
	const todosQuery = $me.queries.Countries;
</script>

<main class="p-6">
	<h1 class="text-4xl font-bold mb-4">Todos</h1>

	<ul class="space-y-4">
		{#if $todosQuery.isLoading}
			<p class="text-lg text-gray-500">Loading...</p>
		{:else if $todosQuery.error}
			<pre class="text-red-500">Error: {JSON.stringify($todosQuery.error, null, 2)}</pre>
		{:else}
			{JSON.stringify($todosQuery.data)}
		{/if}
	</ul>
</main>
