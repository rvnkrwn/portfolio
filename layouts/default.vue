<template>
  <div>
    <AppHeader />
      <slot />
    <AppFooter />
  </div>
</template>
<script setup lang="ts">
import AppHeader from "~/components/layouts/AppHeader.vue";
import AppFooter from "~/components/layouts/AppFooter.vue";
</script>
