<script>
	export let me;
</script>

<div class="flex flex-col w-full h-full border-2 border-green-500">
	<section class="p-8 h-96">
		<p>My ID is: {$me.id}</p>

		GraphQL Query:
		{#if $me.store}
			<dl class="list-dl">
				{#each $me.store.data.projects as project}
					<div class="flex items-start py-2">
						<span class="flex-auto">
							<dt class="font-bold">{project.text}</dt>
							<dd>{project.id}</dd>
						</span>
					</div>
				{/each}
			</dl>
		{/if}
	</section>
</div>
