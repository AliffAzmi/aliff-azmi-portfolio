<script>
  import { fly } from "svelte/transition";
  import { inview } from "svelte-inview";
  import Button from "./button.svelte";

  let isInView;
</script>

<section
  use:inview={{ unobserveOnEnter: true, rootMargin: "-5%" }}
  on:change={({ detail }) => {
    isInView = detail.inView;
  }}
>
  {#if isInView}
    <div
      transition:fly|local={{ y: 400 }}
      class="py-8 mx-auto max-w-screen-xl text-center"
    >
      <div class="flex items-center">
        <div class="flex-1">
          <h1 class=" text-4xl text-center font-semibold">Get In Touch</h1>
        </div>
      </div>
      <div class="py-10 flex-col flex gap-y-8">
        <p>
          I eager to learn and have fun while doing it. Whether you have a
          question or keen to work together, just inbox me.
        </p>
        <div class=" items-center">
          <Button
            link={"mailto:aliff.azmi98@gmail.com"}
            label={"Ping me 👋🏻"}
            target="_blank"
          />
        </div>
      </div>
    </div>
  {/if}
</section>
