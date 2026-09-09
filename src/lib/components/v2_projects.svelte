<script>
  import { slugify } from "$lib/utils";

  export let project = {};
  $: ({ title, cover, summary, time_completion, tags = [], redirect, id } = project);
  $: destination = redirect || `/projects/${slugify(title || "project", id)}`;
</script>

<article class="project-card">
  <a class="project-main" href={destination} target={redirect ? "_blank" : "_self"} rel={redirect ? "noreferrer" : undefined}>
    <div class="project-copy">
      <div class="project-title-row"><h3>{title}</h3><span aria-hidden="true">↗</span></div>
      <div class="summary">{@html summary}</div>
      {#if tags.length}
        <ul class="tags">{#each tags as tag (tag.id)}<li>{tag.name}</li>{/each}</ul>
      {/if}
    </div>
    {#if cover}
      <img src={`https://cms.aliffazmi.com${cover.url}`} alt={`Preview of ${title}`} />
    {/if}
  </a>
</article>

<style>
  .project-card { @apply py-7; }
  .project-main { @apply grid gap-6 md:grid-cols-[1fr_13rem] md:items-center; }
  .project-title-row { @apply flex items-start justify-between gap-4; }
  h3 { @apply text-xl; }
  .project-title-row span { @apply text-xl text-teal-600 transition-transform; }
  .summary { @apply mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300; }
  .tags { @apply mt-5 flex flex-wrap gap-2; }
  .tags li { @apply rounded-full bg-teal-50 px-3 py-1 text-xs font-medium text-teal-800 dark:bg-teal-900 dark:text-teal-300; }
  img { @apply h-32 w-full rounded-md border border-slate-200 object-cover dark:border-slate-800; }
  .project-main:hover h3 { @apply text-teal-700 dark:text-teal-400; }
  .project-main:hover .project-title-row span { @apply translate-x-1 -translate-y-1; }
</style>
