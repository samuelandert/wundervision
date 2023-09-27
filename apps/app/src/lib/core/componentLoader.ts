import componentNames from 'virtual:components-list';

const components = {};

componentNames.forEach(path => {
    const name = path.split('/').pop();  // Extract just the file name from the path
    components[name] = () => import( /* @vite-ignore */ `/src/lib/components/${path}.svelte`);
});

export default components;