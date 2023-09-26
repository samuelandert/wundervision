<script lang="ts">
  let count = 0;

  function handleClick() {
    count += 1;
  }
</script>

<button on:click={handleClick} class="btn variant-filled"> Click Me</button>
<h1>{count}</h1>
