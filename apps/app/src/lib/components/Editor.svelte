<script lang="ts">
	import { view as initialView } from '$lib/views/Todos';
	import { writable } from 'svelte/store';

	let selectedChildren = { ...initialView.children[0] }; // Create a new object
	let view = { ...initialView }; // Create a new object

	const components = writable([
		{ name: 'Todos', value: 'Todos' },
		{ name: 'Green', value: 'Green' }
	]);

	function updateChildren(component, slot) {
		view.children = [{ ...selectedChildren, component, slot }]; // Include queries when replacing the children array
	}
</script>

<div class="h-screen w-screen flex">
	<div class="w-1/3 h-full overflow-auto">
		<h2>Editor</h2>
		<label>
			Component:
			<select
				bind:value={selectedChildren.component}
				on:change={(e) => updateChildren(e.target.value, selectedChildren.slot)}
			>
				{#each $components as component}
					<option value={component.value}>{component.name}</option>
				{/each}
			</select>
		</label>
	</div>

	<div class="w-2/3 h-full overflow-auto">
		<ComposeView {view} />
	</div>
</div>
