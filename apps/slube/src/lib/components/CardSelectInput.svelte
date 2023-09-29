<script lang="ts">
	import { onMount } from 'svelte';
	import Card from './Card.svelte';

	let inputElement;

	export let childInput;

	const { form, errors, field, constraints } = childInput;

	let selectedOption = $form[field.name];

	function selectOption(option) {
		selectedOption = option;
		$form[field.name] = option;
	}

	onMount(() => {
		inputElement.focus();
	});
</script>

<div
	class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 overflow-y-auto max-h-96"
>
	{#each field.options as option (option.value)}
		<div
			class:selected={selectedOption === option.value}
			on:click={() => selectOption(option.value)}
		>
			<Card
				name={option.label}
				description={option.description}
				image={option.image}
				selected={selectedOption === option.value}
			/>
		</div>
	{/each}
</div>

<select
	name={field.name}
	bind:this={inputElement}
	class="text-3xl select"
	style="display: none;"
	bind:value={$form[field.name]}
	aria-invalid={$errors[field.name] ? 'true' : undefined}
	{...constraints[field.name]}
>
	{#each field.options as option (option.value)}
		<option value={option.value} />
	{/each}
</select>
