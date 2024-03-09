<template>
  <div>
    <div id="highlight" class="hidden md:block fixed z-[99999] h-12 w-12 rounded-full border border-base-content" />
    <AppPreloading />
    <header class="fixed z-[9999] w-full h-fit px-[1em] py-[1em] overflow-hidden hover:backdrop-blur">
      <div class="container mx-auto flex justify-between items-center">
        <NuxtLink to="/">
          <div class="protest-guerrilla-regular font-semibold text-xl uppercase flex items-center gap-1">
            <h1 class="hover:underline">{{ appName?.split(' ')[0] }}</h1>
            <span>-</span>
            <div class="inner-headings h-[30px] overflow-hidden leading-[30px]">
            <span>
              &copy; {{year}} <br/>
              BE Dev <br/>
              FE Dev <br/>
              {{ appName?.split(' ')[1] }} <br/>
            </span>
            </div>
          </div>
        </NuxtLink>
        <div class="flex items-center">
          <div id="menu-toggle" class="cursor-pointer toggle-hover">
            <Icon v-if="isOpen" height="24" icon="line-md:menu-to-close-transition" width="24"/>
            <Icon v-else height="24" icon="line-md:close-to-menu-transition" width="24"/>
          </div>
          <div class="cursor-pointer toggle-hover" @click="darkTheme = !darkTheme">
            <Icon v-if="darkTheme" height="24" icon="line-md:moon-alt-to-sunny-outline-loop-transition" width="24"/>
            <Icon v-else height="24" icon="line-md:sunny-outline-to-moon-alt-loop-transition" width="24"/>
          </div>
        </div>
      </div>
      <nav class="container mx-auto items-center h-full left-0 p-[1em] relative hidden overflow-hidden select-none">
          <div class="absolute right-16 top-20">
            <p class="press-start-2p-regular">{{time}}</p>
          </div>
          <ul class="text-5xl -mt-20 protest-guerrilla-regular tracking-wider font-extrabold md:text-7xl md:font-black">
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
          <ul class="absolute bottom-28 grid grid-cols-5 gap-2 border-b-2 border-base-content/70 p-1 md:border-b-0 md:border-r-2 md:grid-cols-1 md:right-0">
            <li class="nav-item"><NuxtLink to="https://instagram.com/rvnkrwn" class="nav-link opacity-70"><Icon icon="mdi:instagram" width="36" height="36" /></NuxtLink></li>
            <li class="nav-item"><NuxtLink to="https://github.com/rvnkrwn" class="nav-link opacity-70"><Icon icon="mdi:github" width="36" height="36" /></NuxtLink></li>
            <li class="nav-item"><NuxtLink to="https://www.linkedin.com/in/rvnkrwn/" class="nav-link opacity-70"><Icon icon="mdi:linkedin" width="36" height="36" /></NuxtLink></li>
            <li class="nav-item"><NuxtLink to="https://codepen.io/rvnkrwn" class="nav-link opacity-70"><Icon icon="mdi:codepen" width="36" height="36" /></NuxtLink></li>
            <li class="nav-item"><NuxtLink to="mailto:rvnkrwn@gmail.com" class="nav-link opacity-70"><Icon icon="mdi:email" width="36" height="36" /></NuxtLink></li>
          </ul>
          <div class="absolute bottom-14 montserrat font-semibold text-sm opacity-70 ">
            <p class="press-start-2p-regular">{{appName}}</p>
            <p>Copyright &copy; {{year}}</p>
          </div>
        </nav>
    </header>
  </div>
</template>

<script lang="ts" setup>
import {gsap} from "gsap"
import {Icon} from "@iconify/vue";

// const config = useRuntimeConfig()
const darkTheme = ref(false)
const isOpen = ref(false)
const year = new Date().getFullYear()
const time = ref('')

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

  setInterval(updateTime, 1000);

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

const updateTime = () => {
  const currentTime = new Date();
  const hours = currentTime.getHours();
  let minutes: any = currentTime.getMinutes();
  let seconds: any = currentTime.getSeconds();

  minutes = String((minutes < 10 ? "0" : "") + minutes);
  seconds = String((seconds < 10 ? "0" : "") + seconds);

  time.value =  hours + ":" + minutes + ":" + seconds; // Adicionei isso para retornar a hora atual
}

const menuFunction = () => {
  let tl = gsap.timeline()
  const header = document.querySelector('header')
  const navItems = document.querySelectorAll('.nav-item')
  const navbar = document.querySelector('nav')
  const navAbsoluteContent = navbar?.querySelectorAll('.absolute')
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
            duration: 0.1,
            opacity: 1,
            translateY: 0
          })
        })
      }
    })
    navAbsoluteContent?.forEach((nac) => {
      tl.fromTo(nac, {
        opacity: 0
      },{
        duration: 0.1,
        delay: 0.2,
        opacity: 1
      })
    })
  } else {
    navAbsoluteContent?.forEach((nac) => {
      tl.to(nac, 0.1,{
        opacity: 0
      })
    })
    tl.to(header, {
      height: 'auto',
      duration: 0.2,
      delay: 0,
      onStart: () => {
        navbar?.classList.replace('flex', 'hidden')
      },
      onComplete: () => {
        header?.classList.remove('bg-base-300')
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

.toggle-hover {
  @apply p-2 rounded-full hover:bg-base-content hover:text-base-300
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

.nav-link:hover {
  @apply opacity-100
}

.nav-link-active {
  @apply opacity-100 underline
}
</style>
