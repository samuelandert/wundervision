<script>
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	import { UserSchema } from '$lib/types/UserSchema';
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
				component: 'ComposerForm',
				slot: 'main',
				machine: {
					id: 'validation',
					initial: 'notValidated',
					context: {
						fields: [
							{
								name: 'location',
								type: 'cardSelect',
								title: 'Which place do you want to visit?',
								description: 'Please choose your location',
								options: [
									{
										name: 'Neustrelitz',
										description:
											'In Neustrelitz übernachtest Du in unseren slubes direkt am Stadthafen, zwischen Bootsstegen und typisch historischen Backsteinspeichern. Perfekt um morgens in den Zierker See zu springen'
									},
									{
										name: 'Krakow am See',
										description:
											'Übernachten an einem der schönsten Seen in Mecklenburg-Vorpommern. Direk am Krakower See gelegen, kannst du den Sonnenverlauf von der Dachterasse Deines slubes aus genießen. Ein idealer Ort zum Radfahren, Wandern und Wassersport'
									},
									{
										name: 'Rostock',
										description:
											'Raus aus der Stadt, rein in die Natur. Unsere slubes in Rostock bieten einen idealen Rückzugsort für alle Ruhesuchenden. Sie stehen mitten im Brandenburger Wald auf der Forellenfarm 25 Teiche'
									},
									{
										name: 'Greifswald',
										description:
											'Küstenfeeling trifft coole Studentenstadt: Unsere slubes stehen mitten im Herzen von Greifswald am Yachtahfen mit Blick auf den Ryck. Direkt zwischen Rügen und Usedom is es nicht weit zum Osteestrand und großartigen Segelstandorten'
									}
								]
							},
							{
								name: 'name',
								type: 'text',
								title: 'What is your name?',
								description: 'Please enter your name'
							}
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
							// 	name: 'age',
							// 	type: 'number',
							// 	title: 'How old are you?',
							// 	description: 'Please enter your age'
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

<div class="relative w-full h-3/4">
	<img class="w-full h-full object-cover" src="banner.png" alt="Slube" />
	<div class="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50" />
	<div
		class="absolute top-0 left-1/2 max-w-screen-md pt-24 flex flex-col justify-center items-center gap-10 p-4 text-center transform -translate-x-1/2"
	>
		<div class="text-center text-white">
			<span class="text-5xl font-light">The smallest hotel in</span>
			<span class="text-5xl font-semibold"> Germany</span>
			<span class="text-sky-500 text-7xl font-semibold">.</span>
		</div>
		<div class="justify-start items-center gap-6 inline-flex">
			<div class="w-16 h-px border-2 border-white" />
			<div class="w-72 text-white text-xl font-semibold font-['Poppins'] leading-normal">
				From 59€ per night
			</div>
		</div>
		<div
			class="self-stretch text-center text-white text-md font-semibold font-['Poppins'] leading-normal"
		>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ut dapibus massa. Ut elit
			diam, vehicula et neque vel, iaculis tincidunt urna. Donec molestie sapien id sagittis
			posuere.
		</div>
		<button class="btn variant-filled-primary btn-lg sm:btn-xl" on:click={openDrawer}
			>Book Now</button
		>
	</div>
</div>
