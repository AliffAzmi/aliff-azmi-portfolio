<script>
  import { inview } from "svelte-inview";

  let isInView;
</script>

<div
  use:inview={{ unobserveOnEnter: true, rootMargin: "-5%" }}
  on:change={({ detail }) => {
    isInView = detail.inView;
  }}
  class="py-8"
>
  {#if isInView}
    <slot />
  {/if}
</div>
