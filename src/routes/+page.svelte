<script lang="ts">
  import { enhance } from "$app/forms";
</script>

<form method="post" use:enhance class="flex flex-col flex-1">
  <div class="field textarea label border flex-1">
    <label for="">Content</label>
    <!-- svelte-ignore a11y-autofocus -->
    <textarea name="content" autofocus />
  </div>
  <button class="responsive">Submit</button>
</form>
