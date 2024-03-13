<template>
  <div id="app-preloading" class="fixed h-screen select-none w-full top-0 left-0 z-[999999] bg-base-300 flex items-center justify-center">
    <h1 class="text-2xl montserrat md:text-3xl">{{hello}}</h1>
    <p v-if="props.text">{{props.text}}</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps(['duration', 'text'])
import {gsap} from "gsap"
const hello = ref('')
const hellos = [
  "Hello", // English
  "こんにちは", // Japanese
  "Guten Tag", // German
  "Hola", // Spanish
  "Bonjour", // French
  "Ciao", // Italian
  "Привет", // Russian
  "你好", // Chinese (Mandarin)
  "안녕하세요", // Korean
  "Olá" // Portuguese
];

onMounted(() => {
  let i = 0
  const intervalLoader = setInterval(() => {
    hello.value = hellos[i]
    if (i < hellos.length) {
      i+=1
    } else {
      i = 0
    }
  }, 200 * (i+1))

  const tl = gsap.timeline()

  tl.to('#app-preloading',{
    delay: 3,
    duration: Number(props.duration),
    translateY: '-130%',
    onComplete: () => {
      gsap.killTweensOf("#app-preloading")
      clearInterval(intervalLoader)
      const element = document.getElementById("app-preloading");
      if (element) {
        element.parentNode?.removeChild(element);
      }
    }
  })
})

</script>

<style scoped>

</style>
