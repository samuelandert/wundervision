<script lang="ts">
	import '../app.postcss';
	import {
		Drawer,
		AppBar,
		AppShell,
		initializeStores,
		getDrawerStore
	} from '@skeletonlabs/skeleton';

	initializeStores();
	const drawerStore = getDrawerStore();
</script>

<Drawer bgDrawer="bg-white" height="h-auto">
	<Composer composer={$drawerStore.meta} />
</Drawer>

<AppShell>
	<svelte:fragment slot="header">
		<AppBar
			gridColumns="grid-cols-3"
			background="bg-white"
			slotDefault="place-self-center"
			slotTrail="place-content-end"
		>
			<svelte:fragment slot="lead">
				<img src="slube.png" class="h-6 sm:h-10" alt="Slube logo" />
			</svelte:fragment>
			<Nav />
			<svelte:fragment slot="trail">
				<button class="btn btn-sm sm:btn-base variant-filled-primary">Book Now</button>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<slot />
</AppShell>
