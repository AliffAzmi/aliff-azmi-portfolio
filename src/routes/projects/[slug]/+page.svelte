<script>
	import { page } from '$app/stores';
	// import { pid } from '$lib/stores';
	import { onMount } from 'svelte';
	export let { slug } = $page.params;

	let article = {};
	let pid = $page.url.hash.replaceAll('#', '')
	
	onMount(async () => {
		const response = await fetch(`/api/posts/${atob(pid)}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const { story } = await response.json();
		article = story;
	});
</script>

<div>
	<h1>{article.title}</h1>
</div>
