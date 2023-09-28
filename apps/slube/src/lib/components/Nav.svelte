<script>
	let navItems = [
		{ title: 'Home', active: true },
		{ title: 'Concept', active: false },
		{ title: 'Locations', active: false },
		{ title: 'Become a partner', active: false },
		{ title: 'Coupon', active: false }
	];

	let hoveredItem = null;
	let showMobileMenu = false;

	const handleClick = (clickedItem) => {
		navItems = navItems.map((item) => ({
			...item,
			active: item.title === clickedItem.title
		}));
		showMobileMenu = false;
	};
</script>

<div class="lg:hidden flex justify-between items-center">
	{#each navItems as item (item.title)}
		{#if item.active}
			<div
				class="cursor-pointer flex flex-col items-center"
				on:click={() => handleClick(item)}
				on:mouseenter={() => (hoveredItem = item)}
				on:mouseleave={() => (hoveredItem = null)}
			>
				<span
					class={`text-center text-md font-['Poppins'] leading-normal w-full whitespace-nowrap ${
						item.active || item === hoveredItem ? 'text-secondary-500' : 'text-gray-400'
					}`}
				>
					{item.title}
				</span>
			</div>
		{/if}
	{/each}
	<button on:click={() => (showMobileMenu = !showMobileMenu)} class="px-4">
		<span class="block w-5 h-0.5 bg-secondary-500 mb-1" />
		<span class="block w-5 h-0.5 bg-secondary-500 mb-1" />
		<span class="block w-5 h-0.5 bg-secondary-500" />
	</button>

	{#if showMobileMenu}
		<div
			class="absolute top-0 left-0 w-full h-screen z-10 flex flex-col items-center pt-10 bg-surface-800"
		>
			{#each navItems as item (item.title)}
				{#if !item.active}
					<div
						class="mb-4 cursor-pointer flex flex-col items-center"
						on:click={() => handleClick(item)}
						on:mouseenter={() => (hoveredItem = item)}
						on:mouseleave={() => (hoveredItem = null)}
					>
						<span
							class={`text-center text-2xl font-['Poppins'] leading-normal w-full whitespace-nowrap ${
								item.active || item === hoveredItem ? 'text-white-500' : 'text-gray-400'
							}`}
						>
							{item.title}
						</span>
						{#if item.active || item === hoveredItem}
							<div class="w-2 h-2 bg-primary-500 rounded-full opacity-100 mt-1" />
						{/if}
					</div>
				{/if}
			{/each}
		</div>
	{/if}
</div>

<div class="w-96 h-9 justify-center items-start inline-flex hidden lg:flex">
	{#each navItems as item (item.title)}
		<div
			class="cursor-pointer justify-end items-start flex w-full"
			on:click={() => handleClick(item)}
			on:mouseenter={() => (hoveredItem = item)}
			on:mouseleave={() => (hoveredItem = null)}
		>
			<div class="px-6 flex-col justify-start items-center gap-1 inline-flex w-full">
				<div
					class={`text-center text-md font-['Poppins'] leading-normal w-full whitespace-nowrap ${
						item.active || item === hoveredItem ? 'text-secondary-500' : 'text-gray-400'
					}`}
				>
					{item.title}
				</div>
				{#if item.active || item === hoveredItem}
					<div class="w-2 h-2 bg-sky-500 rounded-full opacity-100" />
				{/if}
			</div>
		</div>
	{/each}
</div>
