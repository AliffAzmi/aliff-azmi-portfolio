<script>
	import Head from '$lib/components/head.svelte';
	import Articles from '$lib/components/articles.svelte';

	let blogs = $$props?.data?.body?.blogs || [];
</script>

<Head url="/blog" title="Blog | Aliff Azmi" />

<h1 class="font-bold text-center text-5xl">Blog</h1>

<Articles isHome={false} {blogs} />
