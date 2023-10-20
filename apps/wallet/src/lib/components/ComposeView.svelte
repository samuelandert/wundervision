<script lang="ts">
	import { QueryClient } from '@tanstack/svelte-query';
	import { onDestroy } from 'svelte';
	export let queryClient: QueryClient;
	export let view: any;

	let composerInstance;

	async function compose(element: HTMLElement, view: any) {
		if (composerInstance) {
			composerInstance.$destroy();
		}
		const module = await import(`./Composer.svelte`);
		composerInstance = new module.default({
			target: element,
			props: { composer: view, queryClient }
		});
	}

	function composeAction(element: HTMLElement, view: any) {
		compose(element, view);
		return {
			update(view: any) {
				compose(element, view);
			}
		};
	}

	onDestroy(() => {
		if (composerInstance) {
			composerInstance.$destroy();
		}
	});
</script>

<div use:composeAction={view} class="grid h-full w-full" />
