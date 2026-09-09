<script>
  import { page } from "$app/stores";
  import routes from "$lib/NavRoutes";
  import SocialIcons from "./socialIcons.svelte";
</script>

<nav class="site-nav" aria-label="Primary navigation">
  <a class="brand-mark" href="/" aria-label="Aliff Azmi home">
    <img src="/logo/AA-logo.svg" alt="" width="34" height="34" />
  </a>
  <div class="nav-links">
    {#each routes as route}
      <a class:active={$page.url.pathname === route.href} class="nav-link" href={route.href}>{route.label}</a>
    {/each}
  </div>
  <div class="social-links"><SocialIcons /></div>
</nav>

<style>
  .site-nav { @apply mx-auto flex w-full max-w-5xl items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-800; }
  .brand-mark { @apply flex shrink-0 items-center; }
  .brand-mark img { @apply h-8 w-8 dark:invert; }
  .nav-links { @apply mx-4 flex items-center gap-4 sm:gap-6; }
  .nav-link { @apply border-b-2 border-transparent py-2 text-sm font-medium text-slate-600 transition hover:text-teal-600 dark:text-slate-300 dark:hover:text-teal-400; }
  .active { @apply border-teal-500 text-slate-900 dark:text-white; }
  .social-links { @apply hidden md:flex; }
</style>
