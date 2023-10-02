<script lang="ts">
	export let name = '';
	export let description = '';
	export let image = '';
	export let selected = false;
	export let squareImage = false;
</script>

<div
	class={`w-full grid grid-rows-card bg-gray-100 p-4 text-secondary-500 rounded-2xl transition-colors duration-200 ${
		selected ? 'bg-primary-500 text-white' : 'hover:bg-primary-500 hover:text-white'
	}`}
>
	<div class="row-start-1 row-end-2 relative">
		<div style="padding-bottom: {squareImage ? '100%' : '50%'};" />
		<img
			class="absolute top-0 left-0 w-full h-full rounded-2xl object-cover"
			src={image}
			alt={name}
		/>
	</div>
	<div class="pt-2 row-start-2 row-end-3 text-xl font-semibold leading-normal text-left">
		{name}
	</div>
	<div
		class="row-start-3 row-end-4 text-sm font-normal leading-tight text-left overflow-hidden"
		style="display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical;"
	>
		{description}
	</div>
	<div class="text-primary-500 uppercase">---more---</div>
</div>

<style>
	.grid-rows-card {
		grid-template-rows: auto 1fr auto;
	}
</style>
