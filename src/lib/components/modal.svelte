<script>
  import { createEventDispatcher } from "svelte";
  import { fade, fly } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import Donate from "./donate.svelte";

  export let open = false;
  export let title = "";
  const dispatch = createEventDispatcher();
</script>

{#if open}
  <div class="modal z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center p-8 lg:p-0">
    <div class="modal-overlay fixed w-full h-full bg-gray-900 opacity-50" />
    <div
      class=" bg-slate-500 w-full lg:h-max lg:w-1/2  mx-auto rounded-lg shadow-xl z-50 overflow-y-auto"
      in:fly={{ y: -50, duration: 300 }}
      out:fly={{ y: -50, duration: 300, easing: quintOut }}
    >
      <div class="flex justify-between items-center head  bg-slate-500 py-5 px-8 text-2xl font-extrabold">
        {title}
        <button class="p-2 bg-gray-200 hover:bg-gray-300 rounded-full ml-4" on:click={() => dispatch("close")}>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"
            ><path d="M0 0h24v24H0V0z" fill="none" /><path
              d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
            /></svg
          >
        </button>
      </div>
      <div class="content p-8">
        <!-- <slot name="body" /> -->
        <Donate />
      </div>
    </div>
  </div>
{/if}
