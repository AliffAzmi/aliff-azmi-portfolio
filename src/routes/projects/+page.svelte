<script>
	import Head from '$lib/components/head.svelte';
	import Projects from '$lib/components/projects.svelte';

	let projects = $$props?.data?.body?.projects || [];
</script>

<Head url="/projects" title="Projects | Aliff Azmi" />

<h1 class="font-bold text-center text-5xl">Projects</h1>
<Projects isHome={false} limit={100} {projects} />
