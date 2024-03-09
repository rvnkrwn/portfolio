<template>
  <div>
    <PreloaderTransition title="Home"/>
    <section class="fixed -z-10 h-screen w-full bg-base-300 py-[4em] md:p-0 select-none">
      <ul class="w-full h-full flex justify-around flex-wrap container mx-auto">
        <li><img alt="" class="object -mt-10 w-60 hidden sm:block sm:w-72 lg:w-80 xl:w-96 2xl:w-[80%]" data-value="-8"
                 src="/images/Arrow_Down0001.png"></li>
        <li><img alt="" class="object mt-10 w-52 sm:w-72 lg:w-80 xl:w-96 2xl:w-[90%]" data-value="6"
                 src="/images/Atom_Tetra_1_0000.png"></li>
        <li><img alt="" class="object mt-0 w-44 sm:w-72 lg:w-80 xl:w-60 2xl:w-[85%]" data-value="-9"
                 src="/images/Arrow_Up0003.png"></li>
        <li><img alt="" class="object hidden sm:block -mt-8 w-64 sm:w-72 lg:w-80 xl:w-80 2xl:w-[80%]" data-value="7"
                 src="/images/Block_8x8x8_Rounded0001.png"></li>
        <li><img alt="" class="object mt-2 w-52 sm:w-72 lg:w-80 xl:w-96 2xl:w-[90%]" data-value="-10"
                 src="/images/Block_Cage_2_0001.png"></li>
      </ul>
    </section>
    <section class="wrapper">
      <div class="px-[1em] overflow-x-hidden flex items-center justify-center text-center min-h-screen">
        <div class="py-[5em] rounded">
          <h1 v-if="appName" class="object press-start-2p-regular" data-value="3">
            <span v-for="(char, i) in appName" :key="i"
                  :class="[i % 2 ? 'hover:text-primary' : '', i % 3 ? 'hover:text-accent' : '', i % 1 ? 'hover:text-secondary' : '', 'transition-all text-3xl sm:text-5xl font-black md:text-7xl']">{{
                char
              }}</span>
          </h1>
          <br>
          <p class="montserrat text-lg tracking-wide md:w-[50%] mx-auto object" data-value="4">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa delectus illum inventore necessitatibus
            porro quaerat quia quidem quisquam sapiente ut.
          </p>
          <div class="p-4 flex gap-4 flex-wrap justify-center">
            <NuxtLink class="btn btn-outline border-2 rounded-box px-7 object" data-value="3" to="/aboutMe">Learn More
            </NuxtLink>
            <NuxtLink class="btn btn-neutral border-2 rounded-box px-7 object" data-value="3" to="/contacts">Contacts
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import {gsap} from "gsap";
import PreloaderTransition from "~/components/app/PreloaderTransition.vue";

const config = useRuntimeConfig()

const appName = ref("Revan Kurniawan")

onMounted(() => {
  document.addEventListener("mousemove", parallax);

  function parallax(e: any) {
    document.querySelectorAll(".object").forEach(function (move) {
      let movingValue = parseFloat(move.getAttribute('data-value') as any);
      let x = (e.clientX * movingValue) / 250;
      let y = ((e.clientY * movingValue) / 250)+6;
      gsap.to(move, {x: x, y: y, duration: 1, ease: "elastic"});
    });
  }
})

</script>

<style scoped>

</style>
