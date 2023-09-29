<script>
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	const drawerStore = getDrawerStore();

	let composer = {
		id: 'FormContainer',
		layout: {
			rows: '1fr auto',
			areas: `
				"main "
			`
		},
		children: [
			{
				id: 'ComposerForm',
				component: 'Header',
				slot: 'main',
				machine: {
					id: 'validation',
					initial: 'notValidated',
					context: {
						fields: [
							{
								name: 'staytime',
								type: 'dateRange',
								title: 'When do you want to visit?',
								description: 'Please choose your date range'
							},
							{
								name: 'location',
								type: 'cardSelect',
								title: 'Which place do you want to visit?',
								description: 'Please choose your location',
								options: [
									{
										value: 'Neustrelitz',
										label: 'Neustrelitz',
										image: 'neustrelitz.png',
										description:
											'In Neustrelitz übernachtest Du in unseren slubes direkt am Stadthafen, zwischen Bootsstegen und typisch historischen Backsteinspeichern. Perfekt um morgens in den Zierker See zu springen'
									},
									{
										value: 'Krakow am See',
										label: 'Krakow am See',
										image: 'krakow.png',
										description:
											'Übernachten an einem der schönsten Seen in Mecklenburg-Vorpommern. Direk am Krakower See gelegen, kannst du den Sonnenverlauf von der Dachterasse Deines slubes aus genießen. Ein idealer Ort zum Radfahren, Wandern und Wassersport'
									},
									{
										value: 'Rostock',
										label: 'Rostock',
										image: 'rostock.png',
										description:
											'Raus aus der Stadt, rein in die Natur. Unsere slubes in Rostock bieten einen idealen Rückzugsort für alle Ruhesuchenden. Sie stehen mitten im Brandenburger Wald auf der Forellenfarm 25 Teiche'
									},
									{
										value: 'Greifswald',
										label: 'Greifswald',
										image: 'greifswald.png',
										description:
											'Küstenfeeling trifft coole Studentenstadt: Unsere slubes stehen mitten im Herzen von Greifswald am Yachtahfen mit Blick auf den Ryck. Direkt zwischen Rügen und Usedom is es nicht weit zum Osteestrand und großartigen Segelstandorten'
									}
								]
							},
							{
								name: 'guests',
								type: 'number',
								title: 'How many guests?',
								description: 'Please tell us how many guests are arriving'
							}
							// {
							// 	name: 'name',
							// 	type: 'text',
							// 	title: 'What is your name?',
							// 	description: 'Please enter your name'
							// }
							// {
							// 	name: 'email',
							// 	type: 'email',
							// 	title: 'What is your email?',
							// 	description: 'Please enter your email'
							// },
							// {
							// 	name: 'about',
							// 	type: 'textarea',
							// 	title: 'Can you tell us about yourself?',
							// 	description: 'Tell us about yourself'
							// },

							// {
							// 	name: 'favoriteFood',
							// 	type: 'select',
							// 	title: 'What is your favorite food?',
							// 	description: 'Please select your favorite food',
							// 	options: [
							// 		{ value: 'apple', label: 'Apple' },
							// 		{ value: 'banana', label: 'Banana' },
							// 		{ value: 'peach', label: 'Peach' },
							// 		{ value: 'coconut', label: 'Coconut' },
							// 		{ value: 'mango', label: 'Mango' }
							// 	]
							// }
						],
						validators: UserSchema
					},
					states: {
						notValidated: {
							on: {
								VALIDATE: {
									target: 'isValidated',
									actions: 'setValidated'
								}
							}
						},
						isValidated: {
							on: {
								INVALIDATE: {
									target: 'notValidated',
									actions: 'setNotValidated'
								}
							}
						}
					}
				}
			}
		]
	};

	function openDrawer() {
		drawerStore.open({
			position: 'bottom',
			meta: composer
		});
	}
</script>

<div class="relative w-full h-screen grid place-items-center">
	<img class="absolute w-full h-full object-cover" src="banner.png" alt="Slube" />
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
