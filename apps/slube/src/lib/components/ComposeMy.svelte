<script lang="ts">
	export let view: any;

	async function compose(element: HTMLElement) {
		const module = await import(`./Composer.svelte`);
		new module.default({ target: element, props: { composer: view } });
	}
</script>

<div use:compose />
