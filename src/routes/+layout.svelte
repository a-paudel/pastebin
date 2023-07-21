<script lang="ts">
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
  import "uno.css";
  onMount(async () => {
    // get from css preferes-color-scheme
    let dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    // @ts-ignore
    await window.ui("mode", dark ? "dark" : "light");
  });
</script>

<main class="responsive flex flex-col justify-center h-screen gap4">
  <h1 class="center-align">PasteBin</h1>
  <slot><!-- optional fallback --></slot>
</main>
{#if $page.url.pathname === "/"}
  <!--  -->
{:else}
  <a
    href="/"
    class="icon button extra extend circle !hover:w-30 fixed bottom-0 right-0 m-5"
    in:fly={{ x: 100 }}
  >
    <i>add</i>
    <span class="whitespace-nowrap"> New Paste </span>
  </a>
{/if}
