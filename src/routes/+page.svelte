<script>
  import Articles from "$lib/components/articles.svelte";
  import Contact from "$lib/components/contact.svelte";
  import Head from "$lib/components/head.svelte";
  import Welcome from "$lib/components/welcome.svelte";
  import Projects from "$lib/components/projects.svelte";

  let projects = $$props?.data?.body?.projects || [];
  let blogs = $$props?.data?.body?.blogs || [];
</script>

<Head url="/" title="Home | Aliff Azmi" />
<Welcome />
<Projects {projects} />
<Articles {blogs} />
<Contact />
