<script lang="ts">
	import Composer from '$lib/core/Composer.svelte';
	import { UserSchema } from '$lib/types/UserSchema';

	let composer = {
		id: 'FormContainer',
		layout: {
			rows: '1fr',
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
								name: 'name',
								type: 'text',
								title: 'What is your name?',
								description: 'Please enter your name'
							},
							{
								name: 'email',
								type: 'email',
								title: 'What is your email?',
								description: 'Please enter your email'
							},
							{
								name: 'about',
								type: 'textarea',
								title: 'Can you tell us about yourself?',
								description: 'Tell us about yourself'
							},
							{
								name: 'age',
								type: 'number',
								title: 'How old are you?',
								description: 'Please enter your age'
							},
							{
								name: 'favoriteFood',
								type: 'select',
								title: 'What is your favorite food?',
								description: 'Please select your favorite food',
								options: [
									{ value: 'apple', label: 'Apple' },
									{ value: 'banana', label: 'Banana' },
									{ value: 'peach', label: 'Peach' },
									{ value: 'coconut', label: 'Coconut' },
									{ value: 'mango', label: 'Mango' }
								]
							}
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
</script>

<Composer {composer} />
