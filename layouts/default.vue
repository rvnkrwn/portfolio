<template>
  <div>
    <AppPreloading duration="1" />
    <AppHeader />
    <slot />
  </div>
</template>
<script setup lang="ts">
import AppHeader from '~/components/layouts/AppHeader.vue'
</script>
