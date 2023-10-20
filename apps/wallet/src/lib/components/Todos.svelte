<script lang="ts">
	import { createQuery } from '../../lib/wundergraph';

	const todosQuery = createQuery({
		operationName: 'Todos'
	});
</script>

<main class="p-6">
	<h1 class="text-4xl font-bold mb-4">Todos</h1>

	<ul class="space-y-4">
		{#if $todosQuery.isLoading}
			<p class="text-lg text-gray-500">Loading...</p>
		{:else if $todosQuery.error}
			<pre class="text-red-500">Error: {JSON.stringify($todosQuery.error, null, 2)}</pre>
		{:else}
			{#each $todosQuery.data as todo (todo.id)}
				<li class="p-4 border rounded shadow">
					<h2 class="text-2xl font-semibold">{todo.title}</h2>
					<p class="text-lg text-gray-500">{todo.completed ? 'Completed' : 'Not Completed'}</p>
				</li>
			{/each}
		{/if}
	</ul>
</main>
