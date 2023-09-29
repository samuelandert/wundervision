import { purgeCss } from 'vite-plugin-tailwind-purgecss';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import Components from 'unplugin-svelte-components/vite'

export default defineConfig({
	plugins: [
		Components({
			dts: true,
			dirs: ['src/lib/components/'],
			external: [
				{
					from: '@skeletonlabs/skeleton',
					names: ['AppShell as SkeletonAppShell', 'AppBar as SkeletonAppBar', 'Drawer as SkeletonDrawer'],
					defaultImport: true,

				},
			],
		}),
		sveltekit(),
		purgeCss(),
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});


