<script lang="ts">
	let cards = [
		{
			icon: 'streamline:interface-layout-border-center-border-cell-format-formatting-horizontal-vertical',
			title: 'Middle of Downtown',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc luctus lectus a porttitor interdum.'
		},
		{
			icon: 'streamline:travel-wafinder-sink-wash-clean-toilet-bathroom-water',
			title: 'Clean Accommodation',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc luctus lectus a porttitor interdum.'
		},
		{
			icon: 'streamline:travel-airport-baggage-check-baggage-travel-adventure-luggage-bag-checked',
			title: 'Airport Transfer',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc luctus lectus a porttitor interdum.'
		}
	];
</script>

<!-- Mobile view -->
<div class="w-full flex flex-col md:hidden justify-center items-center gap-14 py-8">
	<div class="text-center text-secondary-700 text-5xl font-semibold font-['Poppins'] leading-10">
		Why Choose Us?
	</div>
	<div class="w-16 h-px border-2 border-primary-500" />
	<div
		class="w-96 text-center text-secondary-700 text-base font-normal font-['Poppins'] leading-snug"
	>
		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ut dapibus massa. Ut elit diam,
		vehicula et neque vel, iaculis tincidunt urna.
	</div>
	<div class="mx-4 gap-4 grid">
		{#each cards as { icon, title, description }}
			<div
				class="w-full flex bg-gray-100 text-secondary-500 rounded-2xl transition-colors duration-200"
			>
				<div class="w-24 flex justify-center items-center p-4">
					<Icon {icon} class="text-primary-500 w-16 h-16" />
				</div>
				<div class="flex-grow pl-4 p-2">
					<div class="text-md font-semibold leading-normal text-left">
						{title}
					</div>
					<div
						class="text-xs font-normal leading-tight text-left overflow-hidden"
						style="display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical;"
					>
						{description}
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>

<!-- Desktop view -->
<div class="w-full hidden md:flex justify-center items-center gap-14">
	<div
		class="w-full lg:w-modal-wide py-28 rounded-3xl flex-col justify-center items-center gap-14 inline-flex"
	>
		<div class="flex-col justify-start items-center gap-6 flex">
			<div
				class="w-full text-center text-secondary-700 text-5xl font-semibold font-['Poppins'] leading-10"
			>
				Why Choose Us?
			</div>
			<div class="w-16 h-px border-2 border-primary-500" />
			<div
				class="w-96 text-center text-secondary-700 text-base font-normal font-['Poppins'] leading-snug"
			>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ut dapibus massa. Ut elit
				diam, vehicula et neque vel, iaculis tincidunt urna.
			</div>
		</div>

		<div class="self-stretch px-6 justify-start items-start gap-7 inline-flex">
			{#each cards as { icon, title, description }}
				<div class="grow shrink basis-0 flex-col justify-start items-center gap-4 inline-flex">
					<div class="w-24 h-24 relative">
						<Icon {icon} class="text-primary-500 w-24 h-24" />
					</div>
					<div
						class="self-stretch text-center text-secondary-900 text-xl font-semibold font-['Poppins'] leading-normal"
					>
						{title}
					</div>
					<div
						class="self-stretch text-center text-secondary-700 text-base font-normal font-['Poppins'] leading-snug"
					>
						{description}
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
