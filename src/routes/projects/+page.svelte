<script>
  import { onMount } from "svelte";
  import Head from "$lib/components/head.svelte";
  import V2Projects from "$lib/components/v2_projects.svelte";
  import Loading from "$lib/components/loading.svelte";
  //   import Projects from "$lib/components/projects.svelte";

  // let projects = $$props?.data?.body?.projects || [];
  let projects = [];
  let loading = true;

  const getProjects = async () => {
    const data = await fetch("/api/projects");
    const result = await data.json();
    projects = result.projects.data || [];
    loading = false;
  };

  onMount(() => {
    getProjects();
  }, []);
</script>

<Head url="/projects" title="Projects | Aliff Azmi" />

<section class="projects-page">
  <p class="eyebrow">Projects</p>
  <h1>Selected projects and experiments.</h1>
</section>

{#if loading}
  <div class=" flex justify-center text-center mt-4">
    <Loading />
  </div>
{:else}
  {#each projects as project (project.id)}
    <V2Projects {project} />
  {/each}
{/if}

<!-- <Projects isHome={false} limit={100} {projects} /> -->
<style>
  .projects-page {
    @apply mx-0 max-w-3xl py-20 sm:py-28;
  }
  .eyebrow {
    @apply mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-teal-600 dark:text-teal-400;
  }
  h1 {
    @apply max-w-2xl text-4xl leading-[1.05] sm:text-5xl;
  }
</style>
