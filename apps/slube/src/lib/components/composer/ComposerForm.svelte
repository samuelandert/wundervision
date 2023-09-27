<script lang="ts">
	import { createMachine, assign } from 'xstate';
	import { useMachine } from '@xstate/svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import TextInput from '../inputfields/TextInput.svelte';
	import ToggleInput from '../inputfields/ToggleInput.svelte';
	import SliderInput from '../inputfields/SliderInput.svelte';
	import SelectInput from '../inputfields/SelectInput.svelte';
	import TextAreaInput from '../inputfields/TextAreaInput.svelte';
	import NumberInput from '../inputfields/NumberInput.svelte';
	import CardSelectInput from '../inputfields/CardSelectInput.svelte';
	import { derived, writable } from 'svelte/store';
	import Stepper from './Stepper.svelte';

	export let me;

	const { fields, validators } = $me.context;

	let stepperState = writable({ current: 0, total: fields.length });

	$: stepperState.update((state) => ({ ...state, current: $state.context.currentField }));

	let initialFormData = fields.reduce((acc, field) => {
		acc[field.name] = field.placeholder;
		return acc;
	}, {});

	let { form, errors, validate, constraints } = superForm(initialFormData, {
		validators: validators,
		warnings: {
			noValidationAndConstraints: false
		},
		validationMethod: 'oninput',
		clearOnSubmit: 'errors-and-message'
	});

	const formMachine = createMachine({
		id: 'form',
		initial: 'input',
		context: {
			currentField: 0,
			formData: initialFormData
		},
		states: {
			input: {
				on: {
					NEXT: [
						{
							target: 'summary',
							actions: assign({
								formData: (context, event) => ({
									...context.formData,
									[fields[context.currentField].name]: event.fieldValue
								})
							}),
							cond: (context) => context.currentField === fields.length - 1
						},
						{
							target: 'input',
							actions: [
								assign({
									currentField: (context) => context.currentField + 1,
									formData: (context, event) => ({
										...context.formData,
										[fields[context.currentField].name]: event.fieldValue
									})
								})
							]
						}
					],
					PREV: {
						target: 'input',
						actions: assign({
							currentField: (context) => context.currentField - 1
						}),
						cond: (context) => context.currentField > 0
					}
				}
			},
			summary: {
				on: {
					SUBMIT: 'submitted',
					PREV: {
						target: 'input',
						actions: assign({
							currentField: (context) => context.currentField - 1
						})
					}
				}
			},
			submitted: {
				on: {
					RESTART: {
						target: 'input',
						actions: assign({
							currentField: 0,
							formData: () => ({ ...initialFormData })
						})
					}
				}
			}
		}
	});

	const { state, send } = useMachine(formMachine);

	$: if ($state.matches('submitted')) {
		({ form, errors, validate, constraints } = superForm(initialFormData, {
			validators: validators,
			warnings: {
				noValidationAndConstraints: false
			},
			validationMethod: 'oninput',
			clearOnSubmit: 'errors-and-message'
		}));
	}

	async function handleNext() {
		const currentFieldName = fields[$state.context.currentField].name;
		const validationResult = await validate(currentFieldName);

		if (validationResult && !validationResult.valid) {
			return;
		}

		const fieldValue = $form[currentFieldName];
		if ($state.matches('summary')) {
			send('SUBMIT');
		} else {
			send('NEXT', { fieldValue });
		}
	}

	function handleKeyDown(event) {
		if (event.key === 'Enter') {
			event.preventDefault();
			handleNext();
		}
	}

	let childInput;
	$: {
		childInput = {
			form,
			errors,
			validate,
			field: fields[$state.context.currentField],
			constraints
		};
	}

	const possibleActions = derived(state, ($state) =>
		Object.keys(formMachine.states[$state.value]?.on || {})
	);
</script>

<div class="p-12">
	<form on:submit|preventDefault={handleNext} on:keydown={handleKeyDown} class="w-full">
		{#if $state.matches('input')}
			<div class="mb-4">
				<div class="mb-6">
					<h2 class="mb-2 text-5xl font-semibold text-center text-primary-500">
						{fields[$state.context.currentField].title}
					</h2>
					{#if $errors[fields[$state.context.currentField].name]}
						<p class="text-2xl text-center text-warning-500">
							{$errors[fields[$state.context.currentField].name]}
						</p>
					{:else}
						<p class="text-2xl text-center text-secondary-500">
							{fields[$state.context.currentField].description}
						</p>
					{/if}
				</div>
				<div class="py-4">
					<Stepper {stepperState} stepStateName={fields[$state.context.currentField].name} />
				</div>

				{#if fields[$state.context.currentField].type === 'text'}
					<TextInput {childInput} />
				{:else if fields[$state.context.currentField].type === 'email'}
					<TextInput {childInput} />
				{:else if fields[$state.context.currentField].type === 'textarea'}
					<TextAreaInput {childInput} />
				{:else if fields[$state.context.currentField].type === 'select'}
					<SelectInput {childInput} />
				{:else if fields[$state.context.currentField].type === 'slider'}
					<SliderInput {childInput} />
				{:else if fields[$state.context.currentField].type === 'toggle'}
					<ToggleInput {childInput} />
				{:else if fields[$state.context.currentField].type === 'number'}
					<NumberInput {childInput} />
				{:else if fields[$state.context.currentField].type === 'cardSelect'}
					<CardSelectInput {childInput} />
				{/if}
			</div>
		{/if}
		{#if $state.matches('summary')}
			<div class="mb-4">
				<h2 class="mb-2 text-5xl font-semibold text-center text-primary-500">Summary</h2>
				<p class="text-2xl text-center text-secondary-500">Please verify your summary</p>
				<dl class="list-dl">
					{#each Object.entries($state.context.formData) as [key, value]}
						<div>
							<span class="flex-auto">
								<dt class="text-sm text-secondary-300">{key}</dt>
								<dd class="text-2xl text-secondary-500 font-semibold">{value}</dd>
							</span>
						</div>
					{/each}
				</dl>
			</div>
		{/if}
		{#if $state.matches('submitted')}
			submitted
		{/if}
		<div class="flex justify-between mt-4">
			<div>
				{#each $possibleActions as action (action)}
					{#if action === 'PREV'}
						<button
							type="button"
							on:click={() => send(action)}
							class="btn btn-base variant-filled-secondary"
							disabled={$state.context.currentField === 0}
						>
							{action}
						</button>
					{/if}
				{/each}
			</div>
			<div>
				{#each $possibleActions as action (action)}
					{#if action !== 'NEXT' && action !== 'PREV' && action !== 'SUBMIT'}
						<button type="button" on:click={() => send(action)} class="btn btn-base variant-filled">
							{action}
						</button>
					{/if}
				{/each}
			</div>
			<div>
				{#each $possibleActions as action (action)}
					{#if action === 'NEXT' || action === 'SUBMIT'}
						<button
							type="button"
							on:click={() => handleNext()}
							class="btn variant-filled-primary btn-sm sm:btn-base"
							disabled={$errors[fields[$state.context.currentField].name]}
						>
							{action}
						</button>
					{/if}
				{/each}
			</div>
		</div>
	</form>
</div>
