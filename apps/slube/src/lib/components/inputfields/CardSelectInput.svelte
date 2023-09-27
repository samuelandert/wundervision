<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import { operationMetadata } from 'generated-wundergraph';

	export let childInput;

	const { form, errors, field, constraints } = childInput;

	let selectedCard = null;
	let cardElements = [];
	let inputElement;

	function selectCard(card, index) {
		selectedCard = card;
		form.update((values) => ({ ...values, [field.name]: card }));
		inputElement = cardElements[index];
	}
</script>

<div
	class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 overflow-y-auto max-h-96"
>
	{#each field.options as option, index (index)}
		<div on:click={() => selectCard(option.name, index)}>
			<Card
				name={option.name}
				description={option.description}
				selected={selectedCard === option.name}
				bind:this={cardElements[index]}
			/>
		</div>
	{/each}
</div>
