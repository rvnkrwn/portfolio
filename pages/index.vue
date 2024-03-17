<template>
  <div>
    <PreloaderTransition title="Home" />
    <AppWaterFluidEffect />
    <section class="wrapper">
      <div class="px-[1em] overflow-x-hidden flex items-center justify-center text-center min-h-screen">
        <div class="py-[5em] rounded">
          <h1 v-if="appName" class="object press-start-2p-regular" data-value="3">
            <span
              v-for="(char, i) in appName"
              :key="i"
              :class="[i % 2 ? 'hover:text-primary' : '', i % 3 ? 'hover:text-accent' : '', i % 1 ? 'hover:text-secondary' : '', 'transition-all text-3xl sm:text-4xl font-black md:text-5xl']"
            >{{
              char
            }}</span>
          </h1>
          <br>
          <p class="montserrat sm:text-lg tracking-wide w-full max-w-[40rem] mx-auto object md:text-xl" data-value="3">
            Unlocking the Digital World: Journey through my personal web portfolio and witness the art of coding unfold.
            From concept to execution, experience the power of programming as I craft innovative solutions and bring
            ideas to fruition.
          </p>
          <div class="p-4 flex gap-4 flex-wrap justify-center mt-8">
            <NuxtLink class="btn btn-outline border-2 rounded-box px-7 object" data-value="3" to="/aboutMe">
              Learn More
            </NuxtLink>
            <NuxtLink class="btn btn-neutral border-2 rounded-box px-7 object" data-value="3" to="/contacts">
              Contacts
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { gsap } from 'gsap'
import PreloaderTransition from '~/components/app/PreloaderTransition.vue'

const config = useRuntimeConfig()

const appName = computed(() => {
  return config.appName
})

onMounted(() => {
  document.addEventListener('mousemove', e => parallax(e))

  const parallax = (e: any) => {
    document.querySelectorAll('.object').forEach(function (move) {
      const movingValue = parseFloat(move.getAttribute('data-value') as any)
      const x = (e.clientX * movingValue) / 250
      const y = ((e.clientY * movingValue) / 250) + 6
      gsap.to(move, { x, y, duration: 1, ease: 'elastic' })
    })
  }
})

useHead({
  title: 'Home | Revan Kurniawan'
})
</script>

<style scoped>

</style>
