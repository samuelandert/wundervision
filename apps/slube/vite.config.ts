import { purgeCss } from 'vite-plugin-tailwind-purgecss';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import autoImport from 'sveltekit-autoimport';

export default defineConfig({
	plugins: [
		autoImport({
			include: ['**/*.(svelte)'],
			components: [
				'./src/lib/components',
			],
			mapping: {
				testMe: `import testMe from '$lib/composables/testMe.ts'`,
				UserSchema: `import { UserSchema } from '$lib/composables/UserSchema'`,
				// TestComposerForm: `import ComposerForm from '$lib/components/ComposerForm.svelte'`
			},
			module: {
				svelte: ['onMount']
			},
		}),
		sveltekit(),
		purgeCss(),
	],

	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});


