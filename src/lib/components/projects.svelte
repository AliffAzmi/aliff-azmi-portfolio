<script>
  import { fly } from "svelte/transition";
  import { paramCase } from "change-case";
  import { pid } from "$lib/stores";
  import { inview } from "svelte-inview";
  import Button from "./button.svelte";

  export let isHome = true;
  export let projects = [];
  let isInView;
  // export let limit = 4;
  // let projects = [];
  // onMount(async () => {
  // 	const response = await fetch(`/api/posts?limit=${limit}`, {
  // 		method: 'GET',
  // 		headers: {
  // 			'Content-Type': 'application/json'
  // 		}
  // 	});
  // 	const { data } = await response.json();
  // 	projects = data?.stories;
  // });
</script>

<section
  class=" py-14"
  use:inview={{ unobserveOnEnter: true, rootMargin: "-5%" }}
  on:change={({ detail }) => {
    isInView = detail.inView;
  }}
>
  {#if isInView}
    <div
      transition:fly|local={{ y: 400, duration: 2000 }}
      class="mx-auto max-w-screen-xl text-center"
    >
      {#if isHome}
        <div class="flex items-center">
          <div class="flex-1">
            <h1
              class=" text-xl md:text-4xl text-center font-semibold lg:text-left"
            >
              Things I've Built
            </h1>
          </div>
        </div>
      {/if}
      <div class="py-10 flex-col flex gap-y-8">
        <div
          class={`rounded-lg overflow-hidden shadow divide-y divide-black sm:divide-y-0 sm:grid ${
            isHome ? "sm:grid-cols-2" : "sm:grid-cols-3"
          } sm:gap-px`}
        >
          {#each projects as project}
            <div
              class=" p-6 relative group bg-slate-500/20 dark:bg-slate-800 dark:bg-slate-800/25 hover:shadow-2xl dark:shadow-2xl hover:shadow-black cursor-pointer"
            >
              <div class="mt-8">
                <h3 class=" text-lg font-medium">
                  <a
                    class="focus:outline-none"
                    href={`${
                      project.redirect
                        ? `${project.redirect}`
                        : `/projects/${paramCase(project.title)}`
                    }`}
                    target={`${project.redirect ? "_blank" : "_self"}`}
                    on:click={pid.set(project.id)}
                  >
                    <span class="absolute inset-0" aria-hidden="true" />
                    {project.title}
                  </a>
                </h3>
                <p class="mt-2 text-sm ">
                  {@html project.summary}
                </p>
              </div>
              <span
                class="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-teal-400"
                aria-hidden="true"
              >
                <svg
                  class="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z"
                  />
                </svg>
              </span>
              <div class="relative rounded-xl overflow-auto">
                <div class="overflow-x-scroll flex justify-center py-2 gap-2">
                  {#each project.tags as tag}
                    <div
                      class="first:pl-0 text-sm text-teal-500 hover:text-teal-300"
                    >
                      {tag}
                    </div>
                  {/each}
                </div>
              </div>
            </div>
          {/each}
        </div>
        {#if projects.length && isHome}
          <div>
            <Button link={"/projects"} label={"More projects"} />
          </div>
        {/if}
      </div>
    </div>
  {/if}
</section>
