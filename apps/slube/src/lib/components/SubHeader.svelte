<script lang="ts">
	import { Splide, SplideSlide } from '@splidejs/svelte-splide';
	import '@splidejs/svelte-splide/css';
	let options = {
		type: 'loop',
		perPage: 3,
		gap: '1rem', // Add gap between slides
		breakpoints: {
			640: {
				// For mobile
				perPage: 1
			},
			1024: {
				// For tablet
				perPage: 2
			}
		}
	};
	let cards = [
		{
			title: 'Neustrelitz',
			description: 'Entire apartment, 2 Bedrooms, 2 Large King Bed, 4 Guests',
			location: 'Am Stadthafen 4, 17235 Neustrelitz',
			price: '59€',
			image: '/neustrelitz.png'
		},
		{
			title: 'Rostock',
			description: 'Entire apartment, 2 Bedrooms, 2 Large King Bed, 4 Guests',
			location: 'Dorfstraße 26 A, 14793 Gräben',
			price: '59€',
			image: '/rostock.png'
		},
		{
			title: 'Greifswald',
			description: 'Entire apartment, 2 Bedrooms, 2 Large King Bed, 4 Guests',
			location: 'Salinenstraße 22 17489',
			price: '59€',
			image: '/greifswald.png'
		},
		{
			title: 'Krakow',
			description: 'Entire apartment, 2 Bedrooms, 2 Large King Bed, 4 Guests',
			location: 'Windfang 1 18292 Krakow am See',
			price: '59€',
			image: '/krakow.png'
		}
	];
</script>

<div class="w-full bg-gray-100 p-4 lg:p-12 flex-col justify-start items-center gap-6 inline-flex">
	<div class="flex-col justify-start items-center gap-1 flex">
		<div class="w-96 justify-center items-center gap-2 inline-flex">
			<div
				class="w-96 text-center text-secondary-600 text-base font-normal font-['Poppins'] uppercase tracking-widest"
			>
				The finest Hotel at the best price
			</div>
		</div>
		<div class=" flex-col justify-start items-center gap-2 flex">
			<div
				class="w-96 text-center text-secondary-600 text-5xl font-semibold font-['Poppins'] leading-12"
			>
				The best people to take care of
			</div>
		</div>
	</div>
	<div class="w-16 h-px border-2 border-primary-500" />
	<div
		class="w-96 text-center text-secondary-600 text-base font-normal font-['Poppins'] leading-snug"
	>
		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ut dapibus massa. Ut elit diam,
		vehicula et neque vel, iaculis tincidunt urna. Donec molestie sapien id sagittis posuere.
	</div>

	<Splide {options} aria-label="Iten Slider" class="px-20 lg:px-20 py-10 w-full xl:w-modal-wide">
		{#each cards as card}
			<SplideSlide>
				<CardBookMe {card} />
			</SplideSlide>
		{/each}
	</Splide>
</div>
