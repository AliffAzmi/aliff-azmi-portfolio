<script>
  import Icon from "@iconify/svelte";

  export let project = {};
  let { title, cover, summary, time_completion, tags, redirect } = project;
</script>

<div class=" flex flex-col py-10">
  <div class=" flex justify-between items-center">
    <div class=" font-bold text-lg">{title}</div>
    {#if redirect}
      <div><a href={redirect} target="_blank"><Icon icon="octicon:logo-github-16" /></a></div>
    {/if}
  </div>
  <div class="flex flex-col  gap-2">
    <img
      src={cover ? `https://cms.aliffazmi.com${cover.url}` : ""}
      alt="project showcase"
      class=" object-cover aspect-auto h-48 w-full"
    />
    <div>{summary}</div>
  </div>
  <div class="py-2 flex flex-col gap-4">
    <div><p class=" font-normal text-sm">Time Completion: {time_completion || ""}</p></div>
    <div>
      <p class=" font-normal text-sm">
        Technologies:
        {#if tags}
          {#each tags as tag (tag.id)}
            <span class="first:pl-0 text-sm text-teal-500 hover:text-teal-300">
              {tag.name}
            </span>
          {/each}
        {/if}
      </p>
    </div>
  </div>
</div>
