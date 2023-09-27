<script>
	export let me;
</script>

<div class="flex flex-col h-screen border-2 border-green-500">
	<section class="p-8 h-96">
		<p>My ID is: {$me.id}</p>

		My state is: {$me.state}
		Todo Query:<br />
		{#if $me.store.todos}
			{#each $me.store.todos as todo}
				<p>{todo.text}</p>
			{/each}
		{/if}
	</section>

	<section class="flex-grow p-8 overflow-y-auto">
		Messages Query:<br />
		{#if $me.store.messages}
			{#each $me.store.messages as message}
				<p>{message.text}</p>
			{/each}
		{/if}
	</section>
</div>
