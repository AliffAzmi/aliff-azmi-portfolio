<script>
  import { onMount } from "svelte";

  import Articles from "$lib/components/articles.svelte";
  import Contact from "$lib/components/contact.svelte";
  import Head from "$lib/components/head.svelte";
  import Welcome from "$lib/components/welcome.svelte";
  // import Projects from "$lib/components/projects.svelte";
  import V2Projects from "$lib/components/v2_projects.svelte";
  import Button from "$lib/components/button.svelte";
  import Loading from "$lib/components/loading.svelte";

  // let projects = $$props?.data?.body?.projects || [];
  let projects = [];
  let loading = true;
  let blogs = $$props?.data?.body?.blogs || [];

  const getProjects = async () => {
    const data = await fetch("/api/projects?limit=5");
    const result = await data.json();
    projects = result.projects.data || [];
    loading = false;
  };

  onMount(() => {
    getProjects();
  }, []);
</script>

<Head url="/" title="Home | Aliff Azmi" />
<Welcome />
<!-- <Projects {projects} /> -->
{#if projects}
  <h1 class=" text-xl md:text-4xl text-center font-semibold lg:text-left">Things I've Built</h1>
  {#if loading}
    <div class=" flex justify-center text-center mt-4">
      <Loading />
    </div>
  {:else}
    {#each projects as project (project.id)}
      <V2Projects {project} />
    {/each}
    <div class=" text-center">
      <Button link={"/projects"} label={"More projects"} />
    </div>
  {/if}
{/if}
<Articles {blogs} />
<Contact />
