<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import { Button, ThemeToggler, Icon } from '@sveltestrap/sveltestrap';
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<script>
		if (localStorage.getItem('colorMode')) {
			document.documentElement.setAttribute('data-bs-theme', localStorage.getItem('colorMode'));
		} else {
			document.documentElement.setAttribute('data-bs-theme', 'dark');
		}
	</script>
</svelte:head>

{@render children?.()}

<ThemeToggler let:currentColorMode let:toggleColorMode>
	{#if currentColorMode === 'light'}
		<Button
			class="position-absolute right-0"
			style="right:20px;bottom:20px"
			color="dark"
			on:click={() => {
				toggleColorMode();
				localStorage.setItem('colorMode', currentColorMode);
			}}
		>
			<Icon name="moon" />
		</Button>
	{:else}
		<Button
			class="position-absolute right-0"
			style="right:20px;bottom:20px"
			color="light"
			outline
			on:click={() => {
				toggleColorMode();
				localStorage.setItem('colorMode', currentColorMode);
			}}
		>
			<Icon name="sun" />
		</Button>
	{/if}
</ThemeToggler>
