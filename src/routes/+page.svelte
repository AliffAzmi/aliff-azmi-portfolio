<script>
  import Articles from "$lib/components/articles.svelte";
  import Contact from "$lib/components/contact.svelte";
  import Head from "$lib/components/head.svelte";
  import Welcome from "$lib/components/welcome.svelte";
  import Projects from "$lib/components/projects.svelte";
  // import { onMount } from "svelte";

  let projects = $$props?.data?.body?.projects || [];
  let blogs = $$props?.data?.body?.blogs || [];

  // onMount(() => {
  //   const { hash } = document.location;
  //   const scrollTo = document.getElementById(hash.slice(1));
  //   if (scrollTo) scrollTo.scrollIntoView({ behavior: "smooth" });
  // }, []);
</script>

<Head url="/" title="Home | Aliff Azmi" />
<Welcome />
<Projects {projects} />
<Articles {blogs} />
<Contact />
