<script lang="ts">
	import '../app.postcss';
	import {
		AppShell,
		AppBar,
		Drawer,
		initializeStores,
		getDrawerStore
	} from '@skeletonlabs/skeleton';
	import Nav from '$lib/components/Nav.svelte';
	import Composer from '$lib/core/Composer.svelte';

	initializeStores();
	const drawerStore = getDrawerStore();
</script>

<Drawer bgDrawer="bg-white" height="h-auto">
	<Composer composer={$drawerStore.meta} />
</Drawer>

<AppShell background="bg-white">
	<svelte:fragment slot="header">
		<AppBar
			background="bg-white"
			gridColumns="grid-cols-3"
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
