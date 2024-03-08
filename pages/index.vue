<template>
  <div>
    <PreloaderTransition title="Home" />
    <section class="absolute -z-10 h-screen w-full bg-base-300 overflow-hidden py-[4em] md:p-0">
      <ul class="w-full h-full flex justify-around flex-wrap container mx-auto">
        <li><img src="/images/Arrow_Down0001.png" alt="" data-value="2" class="object w-48 sm:w-72 lg:w-80 xl:w-96 2xl:w-[100%]"></li>
        <li><img src="/images/Atom_Tetra_1_0000.png" alt="" data-value="3" class="object w-48 sm:w-72 lg:w-80 xl:w-96 2xl:w-[100%]"></li>
        <li><img src="/images/Arrow_Up0003.png" alt="" data-value="4" class="object w-48 sm:w-72 lg:w-80 xl:w-96 2xl:w-[100%]"></li>
        <li><img src="/images/Block_8x8x8_Rounded0001.png" alt="" data-value="5" class="object w-48 sm:w-72 lg:w-80 xl:w-96 2xl:w-[100%]"></li>
        <li><img src="/images/Block_Cage_2_0001.png" alt="" data-value="4" class="object w-48 sm:w-72 lg:w-80 xl:w-96 2xl:w-[100%]"></li>
      </ul>
    </section>
    <section class="wrapper z-10 backdrop-blur">
      <div class="px-[1em] overflow-y-auto min-h-full h-fit flex flex-col items-center justify-center text-center">
        <h1 v-if="appName" class="object" data-value="3">
          <span v-for="(char, i) in appName" :key="i" :class="[i % 2 ? 'hover:text-primary' : '', i % 3 ? 'hover:text-accent' : '', i % 1 ? 'hover:text-secondary' : '', 'transition-all text-5xl font-black md:text-7xl']">{{ char }}</span>
        </h1>
        <br>
        <p class=" text-lg font-light tracking-wide md:w-[50%] object" data-value="4">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa delectus illum inventore necessitatibus porro quaerat quia quidem quisquam sapiente ut.
        </p>
        <div class="p-4 flex gap-4 flex-wrap justify-center">
          <NuxtLink to="/aboutMe" class="btn btn-outline border-2 rounded-box px-7 object" data-value="3">Learn More</NuxtLink>
          <NuxtLink to="/contacts" class="btn btn-neutral border-2 rounded-box px-7 object" data-value="3">Contacts</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import {gsap} from "gsap";
import PreloaderTransition from "~/components/app/PreloaderTransition.vue";

const config = useRuntimeConfig()

const appName = ref("Revan Kurniawan")

onMounted(() => {
  document.addEventListener("mousemove", parallax);

  function parallax(e: any) {
    document.querySelectorAll(".object").forEach(function(move) {
      let movingValue = move.getAttribute('data-value') || 1;
      let x = (e.clientX * movingValue) / 250;
      let y = (e.clientY * movingValue) / 250;
      gsap.to(move, { x: x, y: y, duration: 0.3, ease: "power2.out" });
    });
  }
})

</script>

<style scoped>

</style>
