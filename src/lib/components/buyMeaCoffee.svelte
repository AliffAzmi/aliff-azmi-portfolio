<script>
  import Modal from "./modal.svelte";

  let showModal = false;
</script>

<div class="support-widget">
  <button
    class="support-button"
    type="button"
    aria-label="Belanja minum"
    on:click={() => (showModal = true)}
  >
    <span class="icon-wrap text-xl" aria-hidden="true">☕</span>
    <span class="support-label">Belanja minum</span>
  </button>
</div>
<Modal
  title={`Terima kasih 🥰`}
  open={showModal}
  on:close={() => (showModal = false)}
/>

<style>
  .support-widget {
    @apply fixed bottom-5 right-5 z-50;
  }
  .support-button {
    @apply flex items-center gap-2 rounded-full border border-teal-300/30 bg-slate-900/90 px-3 py-2.5 text-sm font-semibold text-white shadow-lg shadow-teal-900/20 backdrop-blur transition duration-200 hover:-translate-y-0.5 hover:border-teal-300/60 hover:bg-slate-900 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900;
  }
  .icon-wrap {
    @apply flex h-9 w-9 items-center justify-center text-xl text-teal-300;
  }
  .icon-wrap :global(svg) {
    @apply h-5 w-5;
  }
  .support-label {
    @apply whitespace-nowrap;
  }
  @media (max-width: 420px) {
    .support-label {
      @apply hidden;
    }
    .support-button {
      @apply p-2.5;
    }
  }
</style>
