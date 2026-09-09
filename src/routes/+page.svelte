<script>
  import { onMount } from "svelte";
  import Articles from "$lib/components/articles.svelte";
  import Contact from "$lib/components/contact.svelte";
  import Head from "$lib/components/head.svelte";
  import V2Projects from "$lib/components/v2_projects.svelte";
  import Loading from "$lib/components/loading.svelte";

  let projects = [];
  let loading = true;
  let blogs = $$props?.data?.body?.blogs || [];

  onMount(async () => {
    const response = await fetch("/api/projects?limit=5");
    const result = await response.json();
    projects = result.projects.data || [];
    loading = false;
  });
</script>

<Head url="/" title="Home | Aliff Azmi" />

<section class="hero">
  <p class="eyebrow">Full-stack developer · Malaysia</p>
  <h1>Building useful, thoughtful web experiences.</h1>
  <p class="hero-copy">I’m Aliff Azmi, a full-stack developer who enjoys turning practical ideas into dependable products.</p>
  <div class="hero-actions">
    <a class="primary-action" href="/projects">View selected work</a>
    <a class="secondary-action" href="mailto:aliff.azmi98@gmail.com">Get in touch</a>
  </div>
</section>

<section class="projects-section">
  <div class="section-heading">
    <div><p class="eyebrow">Selected work</p><h2>Things I’ve built</h2></div>
    <a href="/projects">All projects <span aria-hidden="true">→</span></a>
  </div>
  {#if loading}
    <div class="flex justify-center py-12 text-center"><Loading /></div>
  {:else}
    <div class="project-list">
      {#each projects.slice(0, 5) as project (project.id)}
        <V2Projects {project} />
      {/each}
    </div>
  {/if}
</section>

{#if blogs.length}<Articles {blogs} />{/if}
<Contact />

<style>
  .hero { @apply py-20 sm:py-28; }
  .eyebrow { @apply mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-teal-600 dark:text-teal-400; }
  .hero h1 { @apply max-w-3xl text-4xl font-semibold leading-[1.05] sm:text-6xl; }
  .hero-copy { @apply mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300; }
  .hero-actions { @apply mt-9 flex flex-wrap gap-3; }
  .primary-action { @apply rounded-md bg-teal-600 px-5 py-3 text-sm font-semibold text-white hover:bg-teal-700; }
  .secondary-action { @apply rounded-md border border-slate-300 px-5 py-3 text-sm font-semibold hover:border-slate-900 dark:border-slate-700 dark:hover:border-white; }
  .projects-section { @apply border-t border-slate-200 py-16 dark:border-slate-800; }
  .section-heading { @apply mb-7 flex items-end justify-between gap-6; }
  .section-heading h2 { @apply text-3xl; }
  .section-heading > a { @apply mb-1 shrink-0 text-sm font-semibold text-teal-700 hover:text-teal-900 dark:text-teal-400 dark:hover:text-teal-300; }
  .project-list { @apply divide-y divide-slate-200 border-y border-slate-200 dark:divide-slate-800 dark:border-slate-800; }
</style>
