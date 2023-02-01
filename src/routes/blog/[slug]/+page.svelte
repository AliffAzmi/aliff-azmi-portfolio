<script>
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  // import { id } from "$lib/stores";
  import Icon from "@iconify/svelte";
  import { scrollTop } from "svelte-scrolling";
  import dayjs from "dayjs";
  import customParseFormat from "dayjs/plugin/customParseFormat";

  import SkeletonPost from "$lib/components/skeletonPost.svelte";
  import Head from "$lib/components/head.svelte";
  dayjs.extend(customParseFormat);

  let hidden = true;
  let article = {};
  let content = "";
  let loading = true;
  let id = $page.url.hash.replaceAll("#", "");
  export let { slug } = $page.params;
  const scrollElement = () => {
    return document.documentElement || document.body;
  };
  const handleOnScroll = () => {
    if (scrollElement().scrollTop > 300) {
      hidden = false;
    } else {
      hidden = true;
    }
  };
  onMount(async () => {
    const response = await fetch(`/api/posts/${atob(id)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { story, full_content } = await response.json();
    article = story;
    content = full_content;
    loading = false;
  });
</script>

<Head url={`/blog/${slug}`} title={article.title || "Blog"} />

<svelte:window on:scroll={handleOnScroll} />
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

{#if loading}
  <SkeletonPost />
{:else if article.title && content}
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
          <time datetime={article.date_pub}
            >{dayjs.unix(article.date_pub).format("dddd, MMMM DD, YYYY")}</time
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
      <div class="lg:flex flex items-center ml-auto gap-4">
        {#each article.tags as tag}
          <span class="tag">{`#${tag}`}</span>
        {/each}
      </div>
    </div>
    <span on:click={() => scrollTop()} class:hidden class="back_to_top">
      <Icon
        icon="ci:circle-chevron-up"
        class={`fixed z-20 bottom-6 right-4 w-12 h-12 text-emerald-400 hover:text-emerald-600 cursor-pointer`}
      />
    </span>
  </article>
{:else}
  Article not found
{/if}

<style global>
  .back_to_top .hidden {
    opacity: 0;
    visibility: hidden;
  }
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
  .content ul[data-indent="0"],
  ol[data-indent="0"] {
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
