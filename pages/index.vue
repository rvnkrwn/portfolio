<template>
  <div>
    <PreloaderTransition title="Home"/>
    <section class="fixed grayscale opacity-40 -z-10 h-fit w-full bg-base-300 py-[4em] md:p-0 md:opacity-80">
      <div class="h-screen container mx-auto flex flex-wrap justify-between items-center relative">
        <img :class="['object absolute top-[0%] -left-[10%] w-[12rem] h-[12rem] sm:w-[14rem] sm:h-[14rem] md:w-[16rem] md:h-[16rem] lg:w-[18rem] lg:h-[18rem] xl:w-[22rem] xl:h-[22rem]']"
             alt=""
             data-value="1"
             src="/images/Atom_Icosa_2_0003.png">
        <img :class="['object absolute top-[5%] right-[5%] w-[12rem] h-[12rem] sm:w-[14rem] sm:h-[14rem] md:w-[16rem] md:h-[16rem] lg:w-[18rem] lg:h-[18rem] xl:w-[22rem] xl:h-[22rem]']"
             alt=""
             data-value="-2"
             src="/images/Atom_Sphere_2_0001.png">
        <img :class="['object absolute top-[10%] left-[20%] w-[12rem] h-[12rem] sm:w-[14rem] sm:h-[14rem] md:w-[16rem] md:h-[16rem] lg:w-[18rem] lg:h-[18rem] xl:w-[22rem] xl:h-[22rem]']"
             alt=""
             data-value="-1"
             src="/images/Atom_Tetra_1_0000.png">
        <img :class="['object absolute top-[45%] -left-[2%] w-[12rem] h-[12rem] sm:w-[14rem] sm:h-[14rem] md:w-[16rem] md:h-[16rem] lg:w-[18rem] lg:h-[18rem] xl:w-[22rem] xl:h-[22rem]']"
             alt=""
             data-value="-5"
             src="/images/Block_Matrix_x2_0000.png">
        <img :class="['object absolute top-[35%] -right-[10%] w-[12rem] h-[12rem] sm:w-[14rem] sm:h-[14rem] md:w-[16rem] md:h-[16rem] lg:w-[18rem] lg:h-[18rem] xl:w-[22rem] xl:h-[22rem]']"
             alt=""
             data-value="-6"
             src="/images/Block_Slab_Stack_x3_0001.png">
        <img :class="['object absolute top-[60%] right-[20%] w-[12rem] h-[12rem] sm:w-[14rem] sm:h-[14rem] md:w-[16rem] md:h-[16rem] lg:w-[18rem] lg:h-[18rem] xl:w-[22rem] xl:h-[22rem]']"
             alt=""
             data-value="7"
             src="/images/Block_Cage_2_0001.png">
      </div>
    </section>
    <section class="wrapper">
      <div class="px-[1em] overflow-x-hidden flex items-center justify-center text-center min-h-screen">
        <div class="py-[5em] rounded">
          <h1 v-if="appName" class="object press-start-2p-regular" data-value="3">
            <span v-for="(char, i) in appName" :key="i"
                  :class="[i % 2 ? 'hover:text-primary' : '', i % 3 ? 'hover:text-accent' : '', i % 1 ? 'hover:text-secondary' : '', 'transition-all text-3xl sm:text-4xl font-black md:text-5xl']">{{
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
      let y = ((e.clientY * movingValue) / 250) + 6;
      gsap.to(move, {x: x, y: y, duration: 1, ease: "elastic"});
    });
  }
})

</script>

<style scoped>

</style>
