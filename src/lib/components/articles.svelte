<script>
  import { fly } from "svelte/transition";
  import { paramCase } from "change-case";
  import { id } from "$lib/stores";
  import { inview } from "svelte-inview";
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
      transition:fly|local={{ x: 400, duration: 2000 }}
      class="mx-auto max-w-screen-xl"
    >
      {#if isHome}
        <div class="flex items-center">
          <div class="flex-1">
            <h1
              class="text-xl md:text-4xl font-semibold text-center lg:text-left"
            >
              Latest Articles
            </h1>
          </div>
        </div>
      {/if}
      <div class="article-container">
        {#each blogs as article}
          <div class="articles-box">
            <div class="articles-header">
              <h2 class="articles-title">{article.title}</h2>
              <div class="articles-tag">
                {#each article.tags as tag}
                  <div class="text-sm text-teal-500 hover:text-teal-300">
                    {tag}
                  </div>
                {/each}
              </div>
            </div>
            <p class="articles-summary">{@html article.summary}</p>
            <!-- <Button link={`/blog/${paramCase(article.title)}`} label={'Read articles =>'} onclick={id} /> -->
            <button
              class="justify-center items-center border-2 border-black dark:border-white dark:hover:bg-teal-500 hover:bg-teal-500 hover:text-white hover:border-white p-[10px] md:max-w-[200px]"
            >
              <a
                href={`/blog/${paramCase(article.title)}`}
                on:click={(e) => id.set(article.id)}>Read articles =></a
              ></button
            >
          </div>
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
  .article-container {
    @apply grid grid-cols-1 py-10 gap-10;
  }
  .articles-box {
    @apply dark:bg-black/[0.1] dark:border-white border dark:shadow-md dark:hover:shadow-white hover:shadow-black border-black text-start box-border flex flex-col p-8 w-[100%] transition-transform rounded-3xl;
  }
  .articles-title {
    @apply flex m-0;
  }
  .articles-tag {
    @apply flex flex-wrap gap-2;
  }
  .articles-summary {
    @apply block font-thin text-gray-500 py-6;
  }
</style>
