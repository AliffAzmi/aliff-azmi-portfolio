<script>
  import Icon from "@iconify/svelte";
  import Modal from "./modal.svelte";

  let showModal = false;
</script>

<div class=" z-50 fixed bottom-5 left-5">
  <!-- svelte-ignore a11y-invalid-attribute -->
  <a href="#" on:click={() => (showModal = true)}>
    <div class=" rounded border">
      <div class="p-4 bg-gradient-to-r from-teal-800 to-teal-500 hover:text-black">
        <dib class="flex items-center gap-3 text-lg">
          <Icon icon="line-md:coffee-loop" class=" w-6 h-6" />
          <div class=" hidden md:block">Belanja minum</div>
        </dib>
      </div>
    </div>
  </a>
</div>

<Modal title={`Terima kasih 🥰`} open={showModal} on:close={() => (showModal = false)} />
