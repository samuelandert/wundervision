<script lang="ts">
	const now = new Date();
	let days = Array.from({ length: 180 }, (_, i) => {
		const day = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i);
		const isBooked = Math.random() < 0.5;
		return {
			date: day.getDate(),
			day: isBooked ? 'booked' : day.toLocaleString('default', { weekday: 'short' }),
			month: day.toLocaleString('default', { month: 'short' }),
			fullDate: day,
			isBooked
		};
	});

	let selectedDays = [];
	let selectedDateRange = [];
	let hoveredDay = null;

	export let childInput;
	const { form, errors, field, constraints } = childInput;

	function isDayUnavailable(day) {
		if (selectedDays.length === 1) {
			const previousBookedDay = [...days]
				.reverse()
				.find((d) => d.isBooked && d.fullDate.getTime() < selectedDays[0].fullDate.getTime());
			const nextBookedDay = days.find(
				(d) => d.isBooked && d.fullDate.getTime() > selectedDays[0].fullDate.getTime()
			);
			return (
				(previousBookedDay && day.fullDate.getTime() < previousBookedDay.fullDate.getTime()) ||
				(nextBookedDay && day.fullDate.getTime() > nextBookedDay.fullDate.getTime())
			);
		}
		return false;
	}

	function updateSelectedDateRange() {
		if (selectedDays.length === 2) {
			const startDate = Math.min(
				selectedDays[0].fullDate.getTime(),
				selectedDays[1].fullDate.getTime()
			);
			const endDate = Math.max(
				selectedDays[0].fullDate.getTime(),
				selectedDays[1].fullDate.getTime()
			);
			selectedDateRange = days.filter(
				(day) => day.fullDate.getTime() >= startDate && day.fullDate.getTime() <= endDate
			);
		} else {
			selectedDateRange = [];
		}
	}

	function updateHoveredDateRange() {
		if (selectedDays.length === 1 && hoveredDay) {
			const startDate = Math.min(selectedDays[0].fullDate.getTime(), hoveredDay.fullDate.getTime());
			const endDate = Math.max(selectedDays[0].fullDate.getTime(), hoveredDay.fullDate.getTime());
			selectedDateRange = days.filter(
				(day) => day.fullDate.getTime() >= startDate && day.fullDate.getTime() <= endDate
			);
		} else if (selectedDays.length === 2 && hoveredDay) {
			selectedDateRange = days.filter((day) => selectedDateRange.includes(day));
		} else {
			selectedDateRange = [];
		}
	}
</script>

<div class="flex flex-wrap max-h-96 overflow-y-auto">
	{#if selectedDays.length > 0}
		<div class="w-full text-center">
			Selected days: {selectedDays.map((day) => day.fullDate.toLocaleDateString()).join(', ')}
		</div>
	{/if}
	{#each days as day, index (day.fullDate)}
		{#if index === 0 || days[index - 1].month !== day.month}
			<div class="p-4 rounded-none bg-secondary-200 w-20 h-20 flex items-center justify-center">
				{day.month}
			</div>
		{/if}
		<div
			class={`w-20 h-20 flex flex-col items-center justify-center rounded-none ${
				day.isBooked ? 'bg-warning-200' : ''
			} ${selectedDays.includes(day) ? 'bg-primary-500' : ''} ${
				selectedDays.length === 1 && isDayUnavailable(day)
					? 'bg-warning-200'
					: selectedDays.length === 2 &&
					  hoveredDay &&
					  selectedDateRange.includes(day) &&
					  day === hoveredDay
					? 'bg-error-300'
					: selectedDays.length === 2 && !selectedDateRange.includes(day)
					? 'bg-gray-200'
					: selectedDays.length === 2 && selectedDateRange.includes(day)
					? 'bg-primary-400'
					: selectedDays.length === 1 && selectedDateRange.includes(day)
					? 'bg-primary-300'
					: 'hover:bg-primary-500 cursor-pointer'
			}`}
			on:click={() => {
				if (!day.isBooked && !isDayUnavailable(day)) {
					const index = selectedDays.indexOf(day);
					if (index !== -1 || (selectedDays.length === 2 && selectedDateRange.includes(day))) {
						selectedDays = [];
						selectedDateRange = [];
					} else if (selectedDays.length < 2) {
						selectedDays = [...selectedDays, day];
					}
					updateSelectedDateRange();
				}
			}}
			on:mouseover={() => {
				if (
					(selectedDays.length === 1 && !day.isBooked && !isDayUnavailable(day)) ||
					selectedDays.length === 2
				) {
					hoveredDay = day;
					updateHoveredDateRange();
				}
			}}
			on:mouseout={() => {
				if (selectedDays.length === 1) {
					hoveredDay = null;
					selectedDateRange = [];
				}
			}}
		>
			<div>{day.date}</div>
			<div class="text-xs">{day.day}</div>
		</div>
	{/each}
</div>
