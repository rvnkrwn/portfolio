<template>
  <div>
    <PreloaderTransition title="About Me" />
    <section>
      <div class="wrapper my-padding">
        <h1>About Me</h1>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import PreloaderTransition from '~/components/app/PreloaderTransition.vue'

useHead({
  title: 'About Me | Revan Kurniawan'
})
</script>
