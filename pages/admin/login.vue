<template>
  <div class="h-full my-container flex items-center justify-center">
    <div class="w-full h-fit">
      <div class="flex flex-col items-center justify-center gap-2 mb-10">
        <Icon icon="ri:user-4-line" width="40" height="40" />
        <h1 class="text-2xl montserrat font-semibold">
          Form Login
        </h1>
      </div>
      <FormLogin />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import FormLogin from '~/components/form/FormLogin.vue'

definePageMeta({
  layout: 'dashboard'
})
</script>

<style scoped>
.my-container {
  @apply shadow-sm shadow-black/20 rounded bg-base-200 p-[1em]
}
</style>
