<script>
  import Icon from "@iconify/svelte";
  import SocialIcons from "./socialIcons.svelte";
</script>

<footer class="p-10 grid gap-y-10 gap-x-4">
  <SocialIcons />
  <div class="m-auto text-center">
    <p>
      Copyright © {`${new Date().getFullYear()}`} - All right reserved by Aliff Azmi
    </p>
  </div>
</footer>
