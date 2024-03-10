<template>
  <div id="wrapper-dashboard">
    <aside class="hidden fixed z-[999] lg:relative lg:block">
      <div id="wrapper-aside" class="p-[1em] relative h-full overflow-x-hidden">
        <section>
          <div class="px-2 py-4 flex items-center gap-2">
            <Icon class="inline-block" height="34" icon="arcticons:famistudio" width="34"/>
            <h1 class="montserrat font-black text-xl tracking-wide">R-STUDIO</h1>
          </div>
        </section>
        <hr class="border-base-content/40 my-3">
        <section>
          <nav class="p-2">
            <ul class="montserrat tracking-tight font-normal grid gap-2 lg:gap-4">
              <li>
                <NuxtLink active-class="active" class="btn shadow-none flex items-center justify-start gap-2 px-4 py-2 rounded-box" to="/admin">
                  <Icon class="inline-block" height="20" icon="ri:dashboard-horizontal-line" width="20"/>
                  <span class="text-base">Dashboard</span>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink active-class="active" class="btn shadow-none flex items-center justify-start gap-2 px-4 py-2 rounded-box" to="/admin/blog">
                  <Icon class="inline-block" height="20" icon="ri:blogger-line" width="20"/>
                  <span class="text-base">Blog</span>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink active-class="active" class="btn shadow-none flex items-center justify-start gap-2 px-4 py-2 rounded-box"
                          to="/admin/notifications">
                  <Icon class="inline-block" height="20" icon="ri:notification-2-line" width="20"/>
                  <span class="text-base">Notifications</span>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink active-class="active" class="btn shadow-none flex items-center justify-start gap-2 px-4 py-2 rounded-box"
                          to="/admin/setting">
                  <Icon class="inline-block" height="20" icon="ri:settings-line" width="20"/>
                  <span class="text-base">Setting</span>
                </NuxtLink>
              </li>
            </ul>
          </nav>
        </section>
        <section class="flex flex-col items-center">
          <div class="avatar">
            <div class="w-14 rounded-full">
              <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"  alt=""/>
            </div>
          </div>
          <h1>Revan Kurniawan</h1>
          <small>rvnkrwn@gmail.com</small>
          <button class="btn btn-outline btn-sm mt-4">Logout</button>
        </section>
      </div>
    </aside>
    <header>
      <div class="flex items-center gap-4 justify-between w-full">
        <div class="lg:hidden cursor-pointer" @click="openSidebar">
          <Icon v-if="isOpen" height="24" icon="line-md:menu-to-close-transition" width="24"/>
          <Icon v-else height="24" icon="line-md:close-to-menu-transition" width="24"/>
        </div>
        <form action="" class="hidden sm:block flex-1">
          <div class="bg-base-300 w-72 px-4 py-2 rounded-box flex items-center">
            <input type="search" name="search" id="search" placeholder="Search" class="w-full h-full bg-transparent outline-none montserrat text-sm placeholder:text-base-content/60">
            <Icon icon="ri:search-2-line" width="20" height="20" />
          </div>
        </form>
        <div class="text-sm text-base-content/60">
          <p>{{currentDate}}</p>
        </div>
      </div>
    </header>
    <main><slot /></main>
  </div>
</template>

<script lang="ts" setup>
import {Icon} from "@iconify/vue";
import {gsap} from "gsap"
const darkTheme = ref(false)

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const date = new Date();
const currentDate = `${days[date.getDay()]}, ${date.getDate()}th ${months[date.getMonth()]}`
const isOpen = ref(false)

const openSidebar = () => {
  const tl = gsap.timeline()
  if (isOpen.value === false) {
    tl.fromTo('aside', {
      translateX: '100%'
    }, {
      translateX: '0%',
      duration: .3,
      onStart: () => {
        document.querySelector('aside')?.classList.replace('hidden', 'block')
        isOpen.value = true
      }
    })
  } else {
    tl.fromTo('aside', {
      translateX: '0%'
    }, {
      translateX: '110%',
      duration: .3,
      onStart: () => {
        isOpen.value = false
      } ,
      onComplete: () => {
        const aside = document.querySelector('aside')
        aside?.classList.replace('block', 'hidden')
        if (aside) aside.style.transform = 'translateX(0)';
      }
    })
  }
}

useHead({
  htmlAttrs: {
    'data-theme': () => darkTheme.value ? 'dark' : 'light'
  },
  title: 'Dashboard - Admin | Revan Kurniawan'
})
</script>

<style scoped>
#wrapper-dashboard {
  display: grid;
  grid-template-columns: 20em auto;
  grid-template-rows: 5em
                      auto;
  grid-template-areas:
                "header header"
                "main main";
  height: 100vh;
  width: 100%;
  gap: 20px;
  @apply bg-base-300
}

aside {
  grid-area: sidebar;
  @apply bg-base-200 h-full w-full max-w-[18em] right-0 top-0 shadow-xl shadow-black overflow-y-auto
}

aside #wrapper-aside {
  display: grid;
  grid-template-rows: 3em 1em auto 10em;
  gap: 20px;
}

header {
  grid-area: header;
  @apply bg-base-200 h-full w-full flex items-center py-[1em] px-[1.5em]
}

main {
  grid-area: main;
}

a.active {
  @apply bg-base-content text-base-100;
}

@media (min-width: 1024px) {
  #wrapper-dashboard {
    display: grid;
    grid-template-columns: 18em auto;
    grid-template-rows: 6em
                      auto;
    grid-template-areas:
                "sidebar header"
                "sidebar main";
    height: 100vh;
    gap: 20px;
    padding: 20px;
  }

  aside {
    position: relative;
    grid-area: sidebar;
  }

  aside, header {
    @apply shadow-sm shadow-black/20 rounded
  }
}
</style>
