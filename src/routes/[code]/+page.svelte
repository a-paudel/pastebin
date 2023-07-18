<script lang="ts">
  import { onMount } from "svelte";
  import type { PageData } from "./$types";
  import { page } from "$app/stores";

  export let data: PageData;
  onMount(() => {
    // @ts-ignore
    hljs.highlightAll();
  });
</script>

<svelte:head />

<pre><code class="select-all">{data.paste.content}</code></pre>
<div class="flex justify-center">
  <a href="/{$page.params.code}/raw" class="button border">View Raw</a>
</div>
