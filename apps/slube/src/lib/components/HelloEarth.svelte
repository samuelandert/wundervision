<script>
	import { onMount } from 'svelte';
	let image;

	onMount(() => {
		image = document.querySelector('.bg-image');
		image.style.backgroundImage = 'url(/banner.png)';
	});
</script>

<div class="bg-image flex items-center justify-center h-screen text-center">
	<div class="text-white text-4xl">
		<h1>Hello Earth</h1>
		<p class="text-2xl mt-4">This is a nice description of our beautiful planet.</p>
	</div>
</div>

<style>
	.bg-image {
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
	}
</style>
