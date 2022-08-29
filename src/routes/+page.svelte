<script>
  import Articles from "$lib/components/articles.svelte";
  import Contact from "$lib/components/contact.svelte";
  import Head from "$lib/components/head.svelte";
  import Welcome from "$lib/components/welcome.svelte";
  import Projects from "$lib/components/projects.svelte";
  import PageTransition from "$lib/components/pageTransition.svelte";

  let projects = $$props?.data?.body?.projects || [];
  let blogs = $$props?.data?.body?.blogs || [];
</script>

<Head url="/" title="Home | Aliff Azmi" />
<Welcome />
<PageTransition>
  <Projects {projects} />
</PageTransition>
<PageTransition>
  <Articles {blogs} />
</PageTransition>
<PageTransition>
  <Contact />
</PageTransition>
