<script>
	import { loading } from '$lib/loading';
	import { Plane } from 'svelte-loading-spinners';
</script>

{#if loading}
	<Plane size="60" color="#14b8a6" unit="px" duration="2s" />
{/if}
