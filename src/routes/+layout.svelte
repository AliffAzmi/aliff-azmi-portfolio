<script>
  import NProgress from "nprogress";
  import { navigating } from "$app/stores";
  import { theme } from "$lib/stores";
  import { loading } from "$lib/loading";

  import "../app.postcss";
  import "nprogress/nprogress.css";
  import Footer from "$lib/components/footer.svelte";
  import Navbar from "$lib/components/navbar.svelte";
  import Loading from "$lib/components/loading.svelte";
  import Analytics from "$lib/components/analytics.svelte";
  import HeadDivider from "$lib/components/headDivider.svelte";
  import BuyMeaCoffee from "../lib/components/buyMeaCoffee.svelte";

  NProgress.configure({
    template: '<div class="bar" style="background: #2dd4bf !important;" role="bar"></div>',
    minimum: 0.2,
    showSpinner: false,
  });

  $: {
    if ($navigating) {
      NProgress.start();
    }
    if (!$navigating) {
      NProgress.done();
    }
  }
  $: $loading = $navigating ? true : false;
</script>

<svelte:head>
  <meta name="color-scheme" content={$theme === "system" ? "light dark" : $theme} />
  <link rel="stylesheet" href={`/${$theme}.css`} />
</svelte:head>

<!-- <HeadDivider /> -->
<div class="site-shell">
  <Navbar />
  <Analytics />
  <BuyMeaCoffee />
  <main class="site-main">
    {#if $loading}
      <div class="loader-wrapper">
        <Loading />
      </div>
    {:else}
      <slot />
    {/if}
  </main>
  <Footer />
</div>

<style>
  .site-shell { @apply mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-between; }
  .site-main { @apply mx-auto w-full max-w-5xl px-5 sm:px-8; }
  .loader-wrapper {
    @apply fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-100 flex flex-col items-center justify-center;
  }
</style>
