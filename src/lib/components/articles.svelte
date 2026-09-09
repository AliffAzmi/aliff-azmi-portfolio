<script>
  import { cubicOut } from "svelte/easing";
  import { fly } from "svelte/transition";
  import { inview } from "svelte-inview";
  import { slugify } from "$lib/utils";
  import Button from "./button.svelte";

  export let blogs = [];
  export let isHome = true;
  let isInView;
  // let articles = [];
  // onMount(async () => {
  // 	const response = await fetch('/api/posts', {
  // 		method: 'GET',
  // 		headers: {
  // 			'Content-Type': 'application/json'
  // 		}
  // 	});
  // 	const { data } = await response.json();
  // 	articles = data?.stories;
  // });
</script>

<section
  class=" py-14"
  use:inview={{ unobserveOnEnter: true, rootMargin: "-5%" }}
  on:change={({ detail }) => {
    isInView = detail.inView;
  }}
>
  {#if isInView}
    <div
      transition:fly|local={{
        y: 18,
        duration: 500,
        opacity: 0,
        easing: cubicOut,
      }}
      class="mx-auto max-w-screen-xl"
    >
      {#if isHome}
        <h2 class="eyebrow">Latest Articles</h2>
      {/if}
      <div class="article-container">
        {#each blogs as article}
          <article class="articles-box">
            <div class="articles-header">
              <svelte:element
                this={isHome ? "h3" : "h2"}
                class="articles-title"
              >
                {article.title}
              </svelte:element>
              <div class="articles-tag">
                {#each article.tags as tag}
                  <span>
                    {tag}
                  </span>
                {/each}
              </div>
            </div>
            <div class="articles-summary">{@html article.summary}</div>
            <!-- <Button link={`/blog/${paramCase(article.title)}`} label={'Read articles =>'} onclick={id} /> -->
            <a
              class="cta-primary"
              href={`/blog/${slugify(article.title, article.id)}`}
              >Read article <span aria-hidden="true">→</span></a
            >
          </article>
        {/each}
        {#if blogs.length && isHome}
          <div class=" flex flex-col items-center">
            <Button link={"/blog"} label={"More articles"} />
          </div>
        {/if}
      </div>
    </div>
  {/if}
</section>

<style>
  .eyebrow {
    @apply mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-teal-600 dark:text-teal-400;
  }
  .article-container {
    @apply grid grid-cols-1 gap-6 py-7;
  }
  .articles-box {
    @apply flex min-w-0 flex-col items-start rounded-lg border border-slate-200 bg-white p-6 text-left sm:p-8 dark:border-slate-800 dark:bg-slate-900/30;
    overflow-wrap: anywhere;
  }
  .articles-title {
    @apply m-0 text-xl leading-snug;
  }
  .articles-tag {
    @apply mt-4 flex flex-wrap gap-2;
  }
  .articles-tag span {
    @apply rounded-full bg-teal-50 px-3 py-1 text-xs font-medium text-teal-800 dark:bg-teal-900 dark:text-teal-300;
  }
  .articles-summary {
    @apply max-w-2xl py-6 text-sm leading-6 text-slate-600 dark:text-slate-300;
  }
</style>
