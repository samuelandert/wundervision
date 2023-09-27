<script lang="ts">
	import { onDestroy } from 'svelte';
	import Composer from './Composer.svelte';
	import components from './componentLoader';
	import { createComposerStore, getComposerStore } from './composerStores';
	import { coreServices } from './coreServices';
	import { Machine, interpret } from 'xstate';
	import { subscribeAndMapQueries } from './queryLoader';

	interface IComposerLayout {
		areas: string;
		columns?: string;
		rows?: string;
		gap?: string;
		style?: string;
	}

	interface IComposer {
		id: string;
		layout?: IComposerLayout;
		component?: string;
		slot?: string;
		children?: IComposer[];
		data?: Record<string, any>;
		machine?: any;
	}

	export let composer: IComposer;

	let layoutStyle = '';
	let unsubscribers = [];

	$: {
		layoutStyle = computeLayoutStyle(composer?.layout);

		loadComponentAndInitializeState(composer);

		if (composer?.children) {
			composer.children.forEach((child) => {
				loadComponentAndInitializeState(child);
			});
		}

		initializeAndStartMachine(composer);

		if (composer?.children) {
			composer.children.forEach((child) => {
				initializeAndStartMachine(child);
			});
		}
	}

	async function loadComponentAndInitializeState(component: IComposer) {
		if (!component) return;

		if (component.id) {
			component.store = createComposerStore(component.id, component.store || {});
			if (component.data?.map) {
				subscribeAndMapQueries(component.id, component.data.map);
			}
			if (component.data?.gql) {
				getComposerStore(component.id).update((storeValue) => {
					return {
						...storeValue,
						store: {
							...storeValue.store,
							...component.data.gql
						}
					};
				});
			}
		}
		getComposerStore(component.id).update((storeValue) => ({
			...storeValue,
			id: component.id,
			do: {
				core: coreServices,
				state: component.machineService || null
			},
			data: component.data || {},
			context: component.machine?.context || {} // Add context here
		}));

		if (component.children) {
			component.children.forEach(loadComponentAndInitializeState);
		}
		const componentName = component.component || 'FallBack';
		return await getComponent(componentName);
	}

	function initializeAndStartMachine(composer: IComposer) {
		if (composer?.machine) {
			const machine = Machine(
				{
					...composer.machine,
					id: composer.id
				},
				{
					services: composer.machine.services
				},
				{
					actions: composer.machine.actions
				}
			);
			const machineService = interpret(machine).onTransition((state) => {
				getComposerStore(composer.id).update((storeValue) => ({
					...storeValue,
					state: state.value,
					context: state.context
				}));
			});
			machineService.start();
			composer.machineService = machineService;
		}
	}

	function computeLayoutStyle(layout?: IComposerLayout): string {
		if (!layout) return '';
		return `
            grid-template-areas: ${layout.areas};
            ${layout.gap ? `gap: ${layout.gap};` : ''}
            ${layout.columns ? `grid-template-columns: ${layout.columns};` : ''}
            ${layout.rows ? `grid-template-rows: ${layout.rows};` : ''}
        `;
	}

	onDestroy(() => {
		unsubscribers.forEach((unsub) => unsub());
	});

	async function getComponent(componentName: string) {
		if (components[componentName]) {
			const module = await components[componentName]();
			return module.default;
		}
	}
</script>

<div
	class={`grid w-full h-full overflow-hidden ${composer?.layout?.style || ''}`}
	style={layoutStyle}
>
	{#await loadComponentAndInitializeState(composer) then Component}
		<svelte:component this={Component} id={composer.id} me={getComposerStore(composer.id)} />
	{/await}
	{#if composer?.children}
		{#each composer.children as child (child.id)}
			<div
				class="grid w-full h-full overflow-hidden ${composer?.layout?.style || ''}"
				style={`grid-area: ${child.slot}`}
			>
				{#await loadComponentAndInitializeState(child) then ChildComponent}
					<svelte:component this={ChildComponent} id={child.id} me={getComposerStore(child.id)} />
					{#if child.children && child.children.length}
						<Composer composer={child} />
					{/if}
				{/await}
			</div>
		{/each}
	{/if}
</div>
