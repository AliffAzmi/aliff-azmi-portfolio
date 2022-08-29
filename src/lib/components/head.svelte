<script>
	export let url;
	export let title;
</script>

<svelte:head>
	<link rel="canonical" href={url} />

	<!-- HTML Meta Tags -->
	<title>{title}</title>

	<!-- Google / Search Engine Tags -->
	<meta itemprop="name" content={title} />

	<!-- Facebook Meta Tags -->
	<meta property="og:url" content={url} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={title} />
</svelte:head>
