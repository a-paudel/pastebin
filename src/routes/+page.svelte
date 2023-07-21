<script lang="ts">
  import { goto } from "$app/navigation";
  import { fade, scale, slide } from "svelte/transition";
  import { db, type Paste, type PasteCreate } from "../db/database";

  async function createEntry(data: PasteCreate) {
    let res = await db.create<Paste, PasteCreate>("paste", data);
    if (res.length === 0) {
      return createEntry(data);
    }
    let paste = res[0];
    return paste.code;
  }

  let content = "";
  async function submitHandler() {
    let code = await createEntry({ content });
    goto(`/${code}`);
  }
</script>

<form
  on:submit|preventDefault={submitHandler}
  class="flex flex-col flex-1"
  in:scale={{ delay: 50 }}
>
  <div class="field textarea label border flex-1">
    <label for="">Content</label>
    <!-- svelte-ignore a11y-autofocus -->
    <textarea name="content" autofocus bind:value={content} />
  </div>
  <button class="responsive">Submit</button>
</form>
