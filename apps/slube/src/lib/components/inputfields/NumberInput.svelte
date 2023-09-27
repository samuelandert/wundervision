<script lang="ts">
	import { onMount } from 'svelte';

	let inputElement;

	export let childInput;

	const { form, errors, field, constraints } = childInput;

	onMount(() => {
		inputElement.focus();
	});
	function increment(event) {
		event.preventDefault();
		form.update((values) => {
			values[field.name] = values[field.name] ? Number(values[field.name]) + 1 : 1;
			return values;
		});
	}

	function decrement(event) {
		event.preventDefault();
		form.update((values) => {
			values[field.name] = values[field.name] ? Number(values[field.name]) - 1 : 0;
			return values;
		});
	}
</script>

<div class="input-group input-group-divider grid grid-cols-[auto,1fr,auto]">
	<button type="button" class="variant-filled-secondary" on:click={decrement}>-</button>
	<input
		name={field.name}
		bind:this={inputElement}
		type="number"
		class="w-full h-48 px-3 py-2 bg-transparent border-gray-100 rounded-md text-9xl border-1 ring-0 ring-white focus:outline-none focus:ring-2 focus:ring-blue-500 {$errors[
			field.name
		]
			? 'input-warning'
			: ''}"
		bind:value={$form[field.name]}
		aria-invalid={$errors[field.name] ? 'true' : undefined}
		{...constraints[field.name]}
	/>
	<button type="button" class="variant-filled-secondary" on:click={increment}>+</button>
</div>

<style>
	/* Hide the default arrows */
	input[type='number']::-webkit-inner-spin-button,
	input[type='number']::-webkit-outer-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	/* Style the buttons */
	.variant-filled-secondary {
		background-color: #6b7280; /* Tailwind's coolGray-600 */
		color: white;
		border: none;
		padding: 40px;
		font-size: 20px;
		cursor: pointer;
	}
</style>
