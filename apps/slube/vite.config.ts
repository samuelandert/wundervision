import { purgeCss } from 'vite-plugin-tailwind-purgecss';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import * as fs from 'fs';
import { resolve } from 'path';

// Utility function to get all .svelte or .ts files from a directory recursively
function getRecursiveFiles(dir, extension) {
	const dirents = fs.readdirSync(dir, { withFileTypes: true });
	const files = Array.from(dirents).flatMap((dirent) => {
		const res = resolve(dir, dirent.name);
		if (dirent.isDirectory()) {
			return getRecursiveFiles(res, extension);
		} else if (res.endsWith(extension)) {
			return [res];
		} else {
			return [];
		}
	});
	return files;
}

export default defineConfig({
	plugins: [
		sveltekit(),
		purgeCss(),
		{
			name: 'components-resolver',
			resolveId(source) {
				if (source === 'virtual:components-list') return source;
				return null;
			},
			load(id) {
				if (id === 'virtual:components-list') {
					const componentsDir = resolve(__dirname, 'src/lib/components');
					const componentsFiles = getRecursiveFiles(componentsDir, '.svelte');

					const components = componentsFiles.map(file =>
						file
							.replace(componentsDir, '')
							.replace(/\.svelte$/, '')
							.replace(/\\/g, '/') // Fix Windows path separators
							.slice(1) // Remove leading "/"
					);

					return `export default ${JSON.stringify(components)};`;
				}
				return null;
			},
			handleHotUpdate({ file, server }) { // Add handleHotUpdate to watch for file changes
				if (file.startsWith(resolve(__dirname, 'src/lib/components'))) {
					server.ws.send({
						type: 'full-reload',
						path: '*',
					});
				}
			},
		},
		{
			name: 'services-resolver',
			resolveId(source) {
				if (source === 'virtual:services-list') return source;
				return null;
			},
			load(id) {
				if (id === 'virtual:services-list') {
					const servicesDir = resolve(__dirname, 'src/lib/services');
					const serviceFiles = getRecursiveFiles(servicesDir, '.ts');

					const services = serviceFiles.map(file =>
						file
							.replace(servicesDir, '')
							.replace(/\.ts$/, '')
							.replace(/\\/g, '/') // Fix Windows path separators
							.slice(1) // Remove leading "/"
					);

					return `export default ${JSON.stringify(services)};`;
				}
				return null;
			},
			handleHotUpdate({ file, server }) { // Add handleHotUpdate to watch for file changes
				if (file.startsWith(resolve(__dirname, 'src/lib/services'))) {
					server.ws.send({
						type: 'full-reload',
						path: '*',
					});
				}
			},
		},
		{
			name: 'data-sources-resolver',
			resolveId(source) {
				if (source === 'virtual:data-sources-list') return source;
				return null;
			},
			load(id) {
				if (id === 'virtual:data-sources-list') {
					const dataDir = resolve(__dirname, 'src/lib/data');
					const dataFiles = getRecursiveFiles(dataDir, '.ts');  // Use the same function as before

					const dataSources = dataFiles.map(file =>
						file
							.replace(dataDir, '')
							.replace(/\.ts$/, '')
							.replace(/\\/g, '/') // Fix Windows path separators
							.slice(1) // Remove leading "/"
					);

					return `export default ${JSON.stringify(dataSources)};`;
				}
				return null;
			}
		}
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});


