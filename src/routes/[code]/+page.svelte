<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { db, type Paste } from "../../db/database";
  import { error } from "@sveltejs/kit";
  import { slide } from "svelte/transition";

  let paste: Paste | undefined = undefined;

  async function getPaste() {
    let res = await db.query<[Paste[]]>(
      "select * from paste where code = ($code)",
      { code: $page.params.code }
    );
    let pastes = res[0].result;
    if (!pastes || pastes.length === 0) {
      throw error(404, { message: "Paste not found" });
    }
    paste = pastes[0];
  }

  onMount(async () => {
    await getPaste();
    // @ts-ignore
    hljs.highlightAll();
  });
</script>

<svelte:head />

{#if paste}
  <pre in:slide><code class="select-all">{paste?.content}</code></pre>
{:else}
  <div class="flex items-center justify-center">
    <div class="loader" />
  </div>
{/if}
