<script lang="ts">
	import { remult } from 'remult';
	import '../app.css';

	let { data, children } = $props();

	$effect(() => {
		remult.user = data.user;
	});
</script>

<svelte:head>
	<title>Remult+Sveltekit Todo App</title>
</svelte:head>

{@render children?.()}
