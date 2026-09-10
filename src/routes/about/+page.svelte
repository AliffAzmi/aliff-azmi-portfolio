<script>
  import Head from "$lib/components/head.svelte";
</script>

<Head url="/about" title="About | Aliff Azmi" />

<section class="about-page">
  <p class="eyebrow">About</p>
  <h1>A full-stack developer focused on useful work.</h1>

  <div class="intro">
    <p>I’m Aliff Azmi, a full-stack developer based in Malaysia.</p>
    <p>I enjoy building practical web products—from the first rough idea through to a polished, reliable experience. I care about clear interfaces, maintainable code, and solving real problems without unnecessary complexity.</p>
    <p>Outside of client and product work, this site is where I share projects, experiments, and notes from what I’m learning.</p>
  </div>

  <div class="currently">
    <p class="eyebrow">Currently</p>
    <ul>
      <li>Building and improving web products</li>
      <li>Exploring new developer tools and workflows</li>
      <li>Sharing selected projects and writing</li>
    </ul>
  </div>

  <div class="actions">
    <a class="cta-primary" href="/projects">View projects</a>
    <a class="cta-secondary" href="mailto:aliff.azmi98@gmail.com">Get in touch</a>
  </div>
</section>

<style>
  .about-page { @apply mx-0 max-w-3xl py-20 sm:py-28; }
  .eyebrow { @apply mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-teal-600 dark:text-teal-400; }
  h1 { @apply max-w-2xl text-4xl leading-[1.05] sm:text-5xl; }
  .intro { @apply mt-10 space-y-5 text-lg leading-8 text-slate-600 dark:text-slate-300; }
  .intro p:first-child { @apply font-medium text-slate-900 dark:text-slate-100; }
  .currently { @apply mt-14 border-t border-slate-200 pt-10 dark:border-slate-800; }
  ul { @apply space-y-3 text-base text-slate-600 dark:text-slate-300; }
  li { @apply flex gap-3; }
  li::before { content: "—"; @apply text-teal-600 dark:text-teal-400; }
  .actions { @apply mt-12 flex flex-wrap gap-3; }
</style>
