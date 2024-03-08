<template>
  <div>
    <PreloaderTransition title="Home" />
    <section class="wrapper">
      <div class="px-[1em] overflow-y-auto min-h-full h-fit flex flex-col items-center justify-center text-center">
        <h1 v-if="appName">
          <span v-for="(char, i) in appName" :key="i" :class="[i % 2 ? 'hover:text-primary' : '', i % 3 ? 'hover:text-accent' : '', i % 1 ? 'hover:text-secondary' : '', 'transition-all text-5xl font-black md:text-7xl']">{{ char }}</span>
        </h1>
        <br>
        <p class="w-4/5 text-lg font-light tracking-wide">
          I am a computer science student at Telkom University Purwokerto, specializing in web development with a keen interest in both frontend and backend technologies....
        </p>
        <div class="p-4 flex gap-4">
          <NuxtLink to="/aboutMe" class="btn btn-outline border-2 rounded-box px-7">Learn More</NuxtLink>
          <NuxtLink to="/contacts" class="btn btn-neutral border-2 rounded-box px-7">Contacts</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import PreloaderTransition from "~/components/app/PreloaderTransition.vue";

const config = useRuntimeConfig()

const appName = ref("Revan Kurniawan")

</script>

<style scoped>

</style>
