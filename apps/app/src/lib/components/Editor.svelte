<script lang="ts">
	import { view as initialView } from '$lib/views/Todos';
	import { writable } from 'svelte/store';

	let selectedChildren = { ...initialView.children[0] }; // Create a new object
	let view = { ...initialView }; // Create a new object

	const components = writable([
		{ name: 'Todos', value: 'Todos' },
		{ name: 'Green', value: 'Green' }
	]);

	const codes = writable([
		{ name: 'Germany', value: 'DE' },
		{ name: 'Saudi Arabia', value: 'SA' },
		{ name: 'United States', value: 'US' },
		{ name: 'France', value: 'FR' },
		{ name: 'Australia', value: 'AU' },
		{ name: 'Canada', value: 'CA' }
	]);

	function updateChildren(component, slot) {
		view.children = [{ ...selectedChildren, component, slot }]; // Include queries when replacing the children array
	}

	function updateQueryCode(code) {
		selectedChildren.queries[0].input.filter.code.eq = code;
		view.children = [{ ...selectedChildren }];
	}
</script>

<div class="h-screen w-screen flex">
	<div class="w-1/3 h-full overflow-auto">
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
		<label>
			Query Code:
			<select
				bind:value={selectedChildren.queries[0].input.filter.code.eq}
				on:change={(e) => updateQueryCode(e.target.value)}
			>
				{#each $codes as code}
					<option value={code.value}>{code.name}</option>
				{/each}
			</select>
		</label>
	</div>

	<div class="w-2/3 h-full overflow-auto">
		<ComposeView {view} />
	</div>
</div>
