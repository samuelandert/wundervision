<script lang="ts">
	import '../app.postcss';
	import { Drawer, AppShell, initializeStores, getDrawerStore } from '@skeletonlabs/skeleton';
	import { view } from '$lib/views/Form';

	import { QueryClientProvider } from '@tanstack/svelte-query';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	initializeStores();
	const drawerStore = getDrawerStore();

	function openDrawer() {
		drawerStore.open({
			position: 'bottom',
			meta: view
		});
	}
</script>

<QueryClientProvider client={data.queryClient}>
	<Drawer bgDrawer="bg-white" height="h-auto">
		<ComposeMy view={$drawerStore.meta} />
	</Drawer>

	<AppShell>
		<slot />
	</AppShell>
</QueryClientProvider>
