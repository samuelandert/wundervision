<script lang="ts">
	import '../app.postcss';
	import { initializeStores, getDrawerStore } from '@skeletonlabs/skeleton';

	initializeStores();
	const drawerStore = getDrawerStore();
</script>

<SkeletonDrawer bgDrawer="bg-white" height="h-auto">
	<Composer composer={$drawerStore.meta} />
</SkeletonDrawer>

<SkeletonAppShell>
	<svelte:fragment slot="header">
		<SkeletonAppBar
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
		</SkeletonAppBar>
	</svelte:fragment>
	<slot />
</SkeletonAppShell>
