<template>
  <div>
    <div id="preloader" class="fixed z-[9999] bg-base-300 h-screen w-full top-0 left-0 flex items-center justify-center hidden">
      <h1 id="preloader-inner" class="text-3xl capitalize montserrat font-bold text-base-content/80 md:text-5xl">{{props.title}}</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import {gsap} from "gsap"
const props = defineProps(['title']);

onMounted(() => {
  const tl = gsap.timeline()

  tl.from('#preloader', {
    translateX: '-100%',
    duration: .2,
    onStart: () => {
      document.querySelector('#preloader')?.classList.remove('hidden')
    }
  }).to('#preloader', {
    translateX: '100%',
    duration: .2,
    delay: 1,
  }).to('#preloader-inner', {
    translateY: -200,
    opacity: 0,
    duration: 0.5,
    onComplete: () => {
      const element = document.getElementById("preloader");
      if (element) {
        element.parentNode?.removeChild(element);
      }
    }
  }, '-=0.6');
})

</script>

<style scoped>

</style>
