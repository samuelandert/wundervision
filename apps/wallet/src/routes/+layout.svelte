<script lang="ts">
	import '../app.postcss';
	import { Drawer, AppShell, initializeStores, getDrawerStore } from '@skeletonlabs/skeleton';

	initializeStores();
	const drawerStore = getDrawerStore();
</script>

<Drawer bgDrawer="bg-white" height="h-auto">
	<ComposeMy view={$drawerStore.meta} />
</Drawer>

<AppShell>
	<slot />
</AppShell>
