<template>
  <div>
    <AppHeader />
      <slot />
  </div>
</template>
<script setup lang="ts">
import AppHeader from "~/components/layouts/AppHeader.vue";
</script>
