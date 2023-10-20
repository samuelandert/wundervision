<script lang="ts">
	// import { QueryClient } from '@tanstack/svelte-query';
	// export let queryClient: QueryClient;
	export let view: any;

	async function compose(element: HTMLElement) {
		const module = await import(`./Composer.svelte`);
		new module.default({ target: element, props: { composer: view } });
	}
</script>

<div use:compose class="grid h-full w-full" />
