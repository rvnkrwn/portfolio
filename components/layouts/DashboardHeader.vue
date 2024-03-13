<template>
  <div id="wrapper-dashboard">
    <aside class="hidden fixed z-[999] lg:relative lg:block">
      <div id="wrapper-aside" class="p-[1em] relative h-full overflow-x-hidden">
        <section>
          <div class="px-2 py-2 lg:py-4 flex items-center gap-2">
            <Icon class="inline-block" height="34" icon="arcticons:famistudio" width="34" />
            <h1 class="montserrat font-black text-xl tracking-wide">
              R-STUDIO
            </h1>
          </div>
        </section>
        <hr class="border-base-content/40 my-3">
        <section>
          <nav class="p-2">
            <ul class="montserrat tracking-tight font-normal grid gap-2 lg:gap-4">
              <li>
                <NuxtLink active-class="active" class="btn shadow-none flex items-center justify-start gap-2 px-4 py-2 rounded-box" to="/admin">
                  <Icon class="inline-block" height="20" icon="ri:dashboard-horizontal-line" width="20" />
                  <span class="text-sm md:text-base">Dashboard</span>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink active-class="active" class="btn shadow-none flex items-center justify-start gap-2 px-4 py-2 rounded-box" to="/admin/blog">
                  <Icon class="inline-block" height="20" icon="ri:blogger-line" width="20" />
                  <span class="text-sm md:text-base">Blog</span>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  active-class="active"
                  class="btn shadow-none flex items-center justify-start gap-2 px-4 py-2 rounded-box"
                  to="/admin/notifications"
                >
                  <Icon class="inline-block" height="20" icon="ri:notification-2-line" width="20" />
                  <span class="text-sm md:text-base">Notifications</span>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  active-class="active"
                  class="btn shadow-none flex items-center justify-start gap-2 px-4 py-2 rounded-box"
                  to="/admin/setting"
                >
                  <Icon class="inline-block" height="20" icon="ri:settings-line" width="20" />
                  <span class="text-sm lg:text-base">Setting</span>
                </NuxtLink>
              </li>
            </ul>
          </nav>
        </section>
        <section class="flex flex-col items-center montserrat">
          <div v-if="user" class="w-full bottom-4 absolute p-[1em]">
            <div class="p-2 flex flex-col justify-center items-center gap-4">
              <div class="avatar">
                <div class="w-14 rounded-full">
                  <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="">
                </div>
              </div>
              <div class="">
                <h1 class="font-semibold text-sm">
                  {{ user['name'] }}
                </h1>
                <small class="text-xs text-base-content/60">{{ user['email'] }}</small>
              </div>
              <button class="btn shadow-none btn-outline w-full flex items-center justify-center gap-2 px-4 py-2 rounded-box" @click="handleLogout">
                <Icon icon="ri:logout-box-line" width="20" height="20" />
                <span class="text-sm lg:text-base">Sign Out</span>
              </button>
            </div>
          </div>
          <div v-else class="w-full bottom-4 absolute p-[1em]">
            <div class="p-2">
              <NuxtLink
                active-class="active"
                class="btn shadow-none btn-outline flex items-center justify-center gap-2 px-4 py-2 rounded-box"
                to="/admin/login"
              >
                <Icon icon="ri:login-box-line" width="20" height="20" />
                <span class="text-sm lg:text-base">Sign In</span>
              </NuxtLink>
            </div>
          </div>
        </section>
      </div>
    </aside>
    <header class="p-2 w-full">
      <div class="flex items-center gap-4 justify-between w-full">
        <div class="lg:hidden cursor-pointer" @click="openSidebar">
          <Icon v-if="isOpen" height="24" icon="line-md:menu-to-close-transition" width="24" />
          <Icon v-else height="24" icon="line-md:close-to-menu-transition" width="24" />
        </div>
        <form action="" class="hidden sm:block flex-1">
          <div class="bg-base-300 w-72 px-4 py-2 rounded-box flex items-center">
            <input id="search" type="search" name="search" placeholder="Search" class="w-full h-full bg-transparent outline-none montserrat text-sm placeholder:text-base-content/60">
            <Icon icon="ri:search-2-line" width="20" height="20" />
          </div>
        </form>
        <div class="text-sm text-base-content/60">
          <p>{{ currentDate }}</p>
        </div>
      </div>
    </header>
    <main class="h-full w-full overflow-hidden">
      <slot />
    </main>
  </div>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { gsap } from 'gsap'
import Swal from 'sweetalert2'
const darkTheme = ref(false)

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const date = new Date()
const currentDate = `${days[date.getDay()]}, ${date.getDate()}th ${months[date.getMonth()]}`
const isOpen = ref(false)

const { useAuthUser } = useAuth()
const user = computed(() => {
  return useAuthUser().value
})

const handleLogout = () => {
  Swal.fire({
    title: 'Are you sure?',
    text: 'You want to get out of here',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, Sign Out!'
  }).then((result) => {
    if (result.isConfirmed) {
      const { useAuthUser, useAuthToken, isLoggedIn } = useAuth()
      useAuthUser().value = null
      useAuthToken().value = null
      isLoggedIn().value = String(false)
      useCookie('refresh_token').value = null
      Swal.fire({
        title: 'Signed Out!',
        text: 'You have successfully signed out.',
        icon: 'success'
      })
      navigateTo('/admin/login')
    }
  })
}

const openSidebar = () => {
  const tl = gsap.timeline()
  if (isOpen.value === false) {
    tl.fromTo('aside', {
      translateX: '100%'
    }, {
      translateX: '0%',
      duration: 0.3,
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
      duration: 0.3,
      onStart: () => {
        isOpen.value = false
      },
      onComplete: () => {
        const aside = document.querySelector('aside')
        aside?.classList.replace('block', 'hidden')
        if (aside) { aside.style.transform = 'translateX(0)' }
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
  grid-template-columns: auto auto;
  grid-template-rows: 4.5em
                      auto;
  grid-template-areas:
                "header header"
                "main main";
  height: 100dvh;
  width: 100dvw;
  gap: 10px;
  @apply bg-base-300 overflow-hidden
}

aside {
  grid-area: sidebar;
  @apply bg-base-200 h-full w-full max-w-[16em] sm:max-w-[18em] right-0 top-0 shadow-xl shadow-black overflow-y-auto
}

aside #wrapper-aside {
  display: grid;
  grid-template-rows: 2em 1em auto 10em;
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

  aside #wrapper-aside {
    display: grid;
    grid-template-rows: 3em 1em auto 10em;
    gap: 20px;
  }

  aside, header {
    @apply shadow-sm shadow-black/20 rounded
  }
}
</style>
