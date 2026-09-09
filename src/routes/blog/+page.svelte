<script>
  import Head from "$lib/components/head.svelte";
  import Articles from "$lib/components/articles.svelte";

  let blogs = $$props?.data?.body?.blogs || [];
</script>

<Head url="/blog" title="Blog | Aliff Azmi" />

<section class="writing-page">
  <p class="eyebrow">Writing</p>
  <h1>Notes from building and learning.</h1>
</section>
<Articles isHome={false} {blogs} />

<style>
  .writing-page {
    @apply mx-0 max-w-3xl py-20 sm:py-28;
  }
  .eyebrow {
    @apply mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-teal-600 dark:text-teal-400;
  }
  h1 {
    @apply max-w-2xl text-4xl leading-[1.05] sm:text-5xl;
  }
</style>
