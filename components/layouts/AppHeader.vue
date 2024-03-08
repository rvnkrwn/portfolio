<template>
  <div>
    <div id="highlight" class="hidden md:block fixed z-[99999] h-12 w-12 rounded-full border border-base-content" />
    <AppPreloading />
    <header class="fixed z-[9999] w-full h-fit px-[1em] py-[1em] overflow-hidden">
      <div class="container mx-auto relative p-[1em] backdrop-blur rounded-box flex justify-between items-center">
        <NuxtLink to="/">
          <div class="protest-guerrilla-regular font-semibold uppercase flex items-center gap-1">
            <h1>{{ appName?.split(' ')[0] }}</h1>
            <span>-</span>
            <div class="inner-headings h-[30px] overflow-hidden leading-[30px]">
            <span>
              JS Dev <br/>
              BE Dev <br/>
              FE Dev <br/>
              {{ appName?.split(' ')[1] }} <br/>
            </span>
            </div>
          </div>
        </NuxtLink>
        <div class="flex items-center gap-2">
          <div id="menu-toggle" class="cursor-pointer">
            <Icon v-if="isOpen" height="24" icon="line-md:menu-to-close-transition" width="24"/>
            <Icon v-else height="24" icon="line-md:close-to-menu-transition" width="24"/>
          </div>
          <div class="cursor-pointer" @click="darkTheme = !darkTheme">
            <Icon v-if="darkTheme" height="24" icon="line-md:moon-alt-to-sunny-outline-loop-transition" width="24"/>
            <Icon v-else height="24" icon="line-md:sunny-outline-to-moon-alt-loop-transition" width="24"/>
          </div>
        </div>
        <nav class="absolute top-14 items-center w-full min-h-[80vh] left-0 p-[1em] hidden">
          <ul class="text-5xl protest-guerrilla-regular tracking-wider font-extrabold md:text-7xl md:font-black">
            <li class="nav-item">
              <NuxtLink active-class="nav-link-active" class="nav-link opacity-70" to="/">Home
              </NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink active-class="nav-link-active" class="nav-link opacity-70" to="/aboutMe">About Me
              </NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink active-class="nav-link-active" class="nav-link opacity-70" to="/experiences">Experiences
              </NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink active-class="nav-link-active" class="nav-link opacity-70" to="/skills">Skills
              </NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink active-class="nav-link-active" class="nav-link opacity-70" to="/blogs">Blogs
              </NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink active-class="nav-link-active" class="nav-link opacity-70" to="/contacts">Contacts
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  </div>
</template>

<script lang="ts" setup>
import {gsap} from "gsap"
import {Icon} from "@iconify/vue";

// const config = useRuntimeConfig()
const darkTheme = ref(false)
const isOpen = ref(false)

const appName = computed(() => {
  return "Revan Kurniawan"
})

onMounted(() => {
  const menuToggle = document.getElementById('menu-toggle');
  menuToggle?.addEventListener('click', menuFunction)

  const navLinks = document.querySelectorAll('.nav-link')
  navLinks.forEach((navLink) => {
    navLink.addEventListener('mouseover', () => {
      let tlH = gsap.timeline()
      tlH.to(navLink, {
        translateX: 100
      })
    })
    navLink.addEventListener('click', menuFunction)
  })

  gsap.set('#highlight', {x: 4, color: "white", duration: 3});

  document.addEventListener("mousemove", (event) => {
    // Update the animation properties based on the mouse position
    gsap.to('#highlight', {
      duration: 2,
      x: event.clientX,
      y: event.clientY,
      ease: 'elastic'
    });
  });
})

const menuFunction = () => {
  let tl = gsap.timeline()
  const header = document.querySelector('header')
  const navItems = document.querySelectorAll('.nav-item')
  const navbar = document.querySelector('nav')
  if (navbar?.classList.contains('hidden')) {
    tl.to(header, {
      height: '100dvh',
      duration: 0.5,
      onStart: () => {
        navbar?.classList.replace('hidden', 'flex')
        header?.classList.add('h-screen')
        header?.classList.add('bg-base-300')
        isOpen.value = true
        navItems.forEach((navItem) => {
          tl.fromTo(navItem, {
            opacity: 0,
            translateY: 50
          }, {
            duration: 0.2,
            opacity: 1,
            translateY: 0
          })
        })
      }
    })
  } else {
    tl.to(header, {
      height: 'auto',
      duration: 0.5,
      delay: 0.2,
      onComplete: () => {
        header?.classList.remove('bg-base-300')
        navbar?.classList.replace('flex', 'hidden')
        isOpen.value = false
      }
    })
  }
}

useHead({
  htmlAttrs: {
    'data-theme': () => darkTheme.value ? 'dark' : 'light'
  }
})
</script>

<style scoped>
.inner-headings span {
  position: relative;
  animation: animation 10s ease infinite;
}


@keyframes animation {
  0%, 100% {
    top: 0;
  }
  20% {
    top: 0;
  }
  25% {
    top: -30px
  }
  45% {
    top: -30px
  }
  50% {
    top: -60px
  }
  70% {
    top: -60px
  }
  75% {
    top: -90px
  }
  95% {
    top: -90px
  }
}

.nav-item {
  @apply w-fit
}

.nav-link-active {
  @apply opacity-100 underline
}
</style>
