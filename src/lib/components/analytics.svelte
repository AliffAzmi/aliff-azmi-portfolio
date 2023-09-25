<script>
  import { page } from "$app/stores";

  let path = $page.url.pathname;

  $: {
    if (typeof gtag !== "undefined") {
      gtag("config", "G-S8MMY9QM9C", {
        page_title: document.title,
        page_path: $page.url.pathname,
      });

      path = path.replaceAll("/", "").toUpperCase();
    }
  }
</script>

<svelte:head>
  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-S8MMY9QM9C"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag("js", new Date());
    gtag("config", "G-S8MMY9QM9C");
  </script>
</svelte:head>
