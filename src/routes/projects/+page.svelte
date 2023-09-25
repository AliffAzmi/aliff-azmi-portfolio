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

<h1 class="font-bold text-center text-5xl">Projects</h1>

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
