<template>
  <div>
    <AppPreloading v-if="isLoadingNow" duration="1" />
    <DashboardHeader>
      <slot />
    </DashboardHeader>
  </div>
</template>

<script setup lang="ts">
import DashboardHeader from '~/components/layouts/DashboardHeader.vue'

const {isLoading} = useAuth()
const isLoadingNow = computed(() => {
  return isLoading().value
})

const { initAuth } = useAuth()
onBeforeMount(() => {
  initAuth()
})
</script>

<style scoped>

</style>
