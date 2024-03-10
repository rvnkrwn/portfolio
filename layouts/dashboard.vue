<template>
  <div>
    <DashboardHeader >
      <slot />
    </DashboardHeader>
  </div>
</template>

<script setup lang="ts">

import DashboardHeader from "~/components/layouts/DashboardHeader.vue";
</script>

<style scoped>

</style>
