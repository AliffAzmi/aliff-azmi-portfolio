<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { id } from '$lib/stores';
	import Icon from '@iconify/svelte';
	import dayjs from 'dayjs';

	export let { slug } = $page.params;

	let article = {};
	let content = '';
	onMount(async () => {
		const response = await fetch(`/api/posts/${$id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const { story, full_content } = await response.json();
		article = story;
		content = full_content;
	});
</script>

<div class="max-w-8xl mx-auto">
	<div class="flex pt-8 pb-10">
		<a
			class="group flex font-semibold text-sm leading-6 text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white"
			href="/blog"
		>
			<Icon
				icon="eva:arrow-ios-back-outline"
				class="overflow-visible mr-3 text-slate-400 w-auto h-6 group-hover:text-slate-600 dark:group-hover:text-slate-300"
			/>
			Go back</a
		>
	</div>
</div>
{#if article.title && content}
	<article class="relative pt-10">
		<div>
			{#if article.image_feat_single}
				<input
					type="image"
					src={`${article.image_feat_single}=s500`}
					class="object-cover w-full h-80 rounded mb-8"
					alt="image featured"
				/>
			{/if}
		</div>
		<div class="text-sm leading-6">
			<dl>
				<dt class="sr-only">Date</dt>
				<dd class="absolute top-0 inset-x-0 text-slate-700 dark:text-slate-400">
					<time datetime={article.date_pubh}
						>{dayjs(article.date_pubh).format('dddd, MMMM DD, YYYY')}</time
					>
				</dd>
			</dl>
		</div>
		<h1
			class="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-200 md:text-3xl "
		>
			{article.title}
		</h1>
		<div class="mt-12 content">
			{@html content}
		</div>
		<div class="flex">
			<div class="lg:flex items-center ml-auto gap-2">
				{#each article.tags as tag}
					<span class="tag">{`#${tag}`}</span>
				{/each}
			</div>
		</div>
	</article>
{:else}
	Loading...
{/if}

<style global>
	.content a {
		@apply underline text-blue-500;
	}
	.content p {
		@apply mb-5;
	}
	.content hr {
		@apply mt-12 mb-12;
	}
	.content figure {
		@apply m-0;
	}
	.content ol {
		@apply list-decimal;
	}
	.content ul {
		@apply list-disc pl-10;
	}
	.content ul[data-indent='0'],
	ol[data-indent='0'] {
		@apply pl-10;
	}
	.content .medium-insert-images {
		@apply m-0 pl-0 pr-0;
	}
	.content .medium-insert-images figure figcaption {
		@apply mt-1 text-center text-xs leading-none font-medium opacity-70;
	}
	.tag {
		@apply text-xs font-bold leading-none lowercase;
	}
</style>
