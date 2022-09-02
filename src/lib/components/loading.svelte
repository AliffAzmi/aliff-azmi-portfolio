<script>
  import { loading } from "$lib/loading";
  import { Circle2 } from "svelte-loading-spinners";
</script>

{#if loading}
  <Circle2 size="80" color="#14b8a6" ballTopLeft unit="px" duration="2s" />
{/if}
