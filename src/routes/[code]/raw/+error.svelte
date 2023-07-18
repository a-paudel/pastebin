<script lang="ts">
  import { page } from "$app/stores";
</script>

<h2>{$page.error?.message}</h2>
<a href="/" class="button">Create a link instead</a>
