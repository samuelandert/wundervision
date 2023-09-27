<script lang="ts">
	let states = [
		{ name: 'guests', value: '', display: (value) => `${value} guests` },
		{ name: 'location', value: '', display: (value) => `in ${value}` },
		{ name: 'checkIn', value: '', display: (value) => `from ${value}` },
		{ name: 'checkOut', value: '', display: (value) => `till ${value}` }
	];
	let inputValue = '';
	let isBooking = false;
	let currentIndex = 0;

	function next() {
		if (currentIndex < states.length) {
			states[currentIndex].value = inputValue;
			currentIndex++;
			if (currentIndex === states.length) {
				isBooking = true;
			}
			inputValue = '';
		}
	}
</script>

<div
	class="w-full p-6 flex-col justify-center items-center gap-3 inline-flex bg-gray-400 bg-opacity-50 rounded-sm backdrop-blur-sm"
>
	<div class="w-full p-6 flex-col justify-center items-center gap-3 inline-flex">
		<div class="self-stretch justify-center items-center gap-2 inline-flex">
			<div class="grow shrink basis-0 h-7 justify-center items-center gap-2 flex flex-col">
				{#if states.every((state) => !state.value)}
					<button class="btn btn-base sm:btn-xl variant-filled-primary">Book Now</button>
				{/if}
				<div class="flex justify-center items-center gap-2">
					{#each states as state}
						{#if state.value}
							<p
								class=" text-gray-100 text-2xl font-semibold font-['Poppins'] leading-7 text-center"
							>
								{state.display(state.value)}
							</p>
						{/if}
					{/each}
				</div>
			</div>
		</div>
	</div>

	<div class="self-stretch justify-start items-end gap-2 inline-flex">
		{#if !isBooking}
			<div
				class="grow shrink basis-0 self-stretch flex-col justify-end items-start gap-2 inline-flex"
			>
				<div class="self-stretch justify-start items-end gap-2 inline-flex">
					<div
						class="grow shrink basis-0 h-14 px-4 py-2 bg-white rounded-lg border border-neutral-200 justify-between items-center flex"
					>
						<input
							id={states[currentIndex].name}
							bind:value={inputValue}
							class="text-secondary-500 w-full text-base font-normal font-['Poppins'] leading-snug"
							placeholder={states[currentIndex].name.charAt(0).toUpperCase() +
								states[currentIndex].name.slice(1)}
						/>
						<div class="w-3.5 h-3.5 relative" />
					</div>
				</div>
			</div>
		{/if}
		<div
			class={`px-9 py-4 bg-white rounded-2xl shadow ${
				isBooking ? 'justify-center' : 'justify-start'
			} items-center gap-2.5 flex`}
			on:click={next}
		>
			<div class="text-sky-500 text-base font-semibold font-['Poppins'] leading-snug">
				{isBooking ? 'Book now' : 'Next'}
			</div>
		</div>
	</div>
</div>
