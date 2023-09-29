<script>
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	const drawerStore = getDrawerStore();
	import { composer } from '$lib/composables/flow';

	function openDrawer() {
		drawerStore.open({
			position: 'bottom',
			meta: composer
		});
	}
</script>

<div class="relative w-full h-screen grid place-items-center">
	<img class="absolute w-full h-full object-cover" src="/banner.png" alt="Slube" />
	<div class="absolute w-full h-full bg-black bg-opacity-50" />
	<div class="relative z-3 text-center text-white p-4 w-full sm:w-2/3 lg:w-1/2">
		<div>
			<span class="text-5xl font-light">The smallest hotel in</span>
			<span class="text-5xl font-semibold"> Germany</span>
			<span class="text-sky-500 text-7xl font-semibold">.</span>
		</div>
		<div class="flex items-center gap-6 justify-center mt-6">
			<div class="w-10 border border-white" />
			<div class="w-42 text-xl font-semibold leading-normal">From 59€ per night</div>
		</div>
		<div class="w-full mt-6 text-md flex items-center justify-center">
			<p class="m-0 p-0">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ut dapibus massa. Ut elit
				diam, vehicula et neque vel, iaculis tincidunt urna. Donec molestie sapien id sagittis
				posuere.
			</p>
		</div>
		<button class="btn variant-filled-primary btn-lg sm:btn-xl mt-6" on:click={openDrawer}>
			Book Now
		</button>
	</div>
</div>
