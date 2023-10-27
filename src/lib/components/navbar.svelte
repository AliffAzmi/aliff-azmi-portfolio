<script>
  import { page, navigating } from "$app/stores";
  import routes from "$lib/NavRoutes";
  import SocialIcons from "./socialIcons.svelte";

  let showChild = false;
</script>

<nav class="navbar mb-2 flex lg:flex-row flex-col items-center max-w-[900px] m-0">
  <div class="flex px-2 mx-2">
    <a class="text-lg font-bold" href="/">
      <svg
        version="1.0"
        xmlns="http://www.w3.org/2000/svg"
        width="50.000000pt"
        height="50.000000pt"
        viewBox="0 0 50.000000 50.000000"
        preserveAspectRatio="xMidYMid meet"
        class="dark:fill-white fill-black hover:fill-teal-500"
      >
        <g transform="translate(0.000000,50.000000) scale(0.100000,-0.100000)" stroke="none">
          <path
            d="M40 357 c0 -50 33 -132 65 -164 35 -35 70 -42 106 -22 16 8 25 7 40
-7 25 -22 38 -10 15 15 -13 14 -14 24 -7 44 11 29 4 65 -18 91 -25 30 -112 66
-158 66 -38 0 -43 -3 -43 -23z m130 -19 c57 -30 83 -66 74 -102 l-7 -28 -48
48 c-27 26 -52 45 -56 41 -4 -4 13 -27 36 -51 46 -47 47 -66 2 -66 -44 0 -91
63 -105 143 -7 37 -7 37 26 37 19 0 54 -10 78 -22z"
          />
          <path
            d="M415 270 c-76 -17 -118 -61 -101 -106 4 -9 2 -22 -4 -29 -7 -9 2 -11
40 -9 27 1 54 5 61 9 15 10 49 85 49 112 0 28 -8 31 -45 23z m25 -31 c0 -37
-31 -89 -57 -95 -36 -9 -40 3 -10 34 40 41 33 52 -8 12 l-35 -34 0 25 c0 30
26 57 66 69 42 12 44 12 44 -11z"
          />
        </g>
      </svg>
    </a>
  </div>

  <!-- <section class="flex p-5 lg:hidden">
    <div class="space-y-2" on:click={() => (navOpen = !navOpen)}>
      <span class="block h-0.5 w-8 animate-pulse bg-gray-600" />
      <span class="block h-0.5 w-8 animate-pulse bg-gray-600" />
      <span class="block h-0.5 w-8 animate-pulse bg-gray-600" />
    </div>

    <div class={navOpen ? "navOpen" : "menuNavClose"}>
      <div
        class="absolute top-0 right-0 px-8 py-8"
        on:click={() => (navOpen = !navOpen)}
      >
        <svg
          class="h-8 w-8 text-gray-600"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </div>
      <ul class="flex flex-col items-center justify-between min-h-[250px]">
        {#each routes as route}
          <li
            class:active={$page.url.pathname.includes(route.href)}
            class="my-8 uppercase"
          >
            <a href={route.href}>{route.label}</a>
          </li>
        {/each}
      </ul>
    </div>
  </section> -->

  <div class="flex-1 px-2 mx-2 lg:flex">
    <div class="flex items-stretch">
      {#each routes as route}
        <!-- svelte-ignore a11y-mouse-events-have-key-events -->
        <a
          class:active={$page.url.pathname.includes(route.href)}
          class="btn btn-ghost btn-sm rounded-btn p-0 m-3 hover:text-teal-500"
          href={route.href}
          on:mouseover={() => (route.label === "Tools" ? (showChild = true) : "")}
          on:mouseout={() => (showChild = false)}
        >
          {route.label}

          {#if route.children}
            <ul class={`mt-0 absolute p-2 bg-black ${showChild ? "block" : "hidden"}`}>
              {#each route.children as child (child.href)}
                <li class=" hover:text-white">
                  <a href={child.href} target={child.target}>{child.label}</a>
                </li>
              {/each}
            </ul>
          {/if}
        </a>
      {/each}
    </div>
  </div>

  <div class="px-2 mx-2 hidden lg:flex">
    <SocialIcons />
  </div>
</nav>

<style>
  /* .menuNavClose {
    display: none;
  }
  .navOpen {
    @apply dark:bg-black bg-white;
    display: block;
    position: absolute;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 10;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
  } */
  .active {
    @apply border-b-4 border-emerald-500;
  }
  .showChild {
    @apply block;
  }
</style>
