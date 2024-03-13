<template>
  <div class="h-full">
    <div class="p-3 text-xs sm:text-sm breadcrumbs">
      <ul>
        <li>
          <NuxtLink to="/admin">
            Dashboard
          </NuxtLink>
        </li>
        <li>Blog</li>
      </ul>
    </div>
    <section class="my-container">
      <div class="flex justify-between items-end">
        <div class="">
          <h1 class="title">
            Latest Blogs
          </h1>
          <p class="mt-2">
            <strong>117 total</strong> <span class="text-xs">blogs uploaded</span>
          </p>
        </div>
        <div class="">
          <NuxtLink class="btn btn-sm btn-outline md:btn-md" to="/admin/blog/create">
            Create Blog
          </NuxtLink>
        </div>
      </div>
      <br>
      <div class="h-72 w-full overflow-auto">
        <table class="w-full h-fit">
          <tbody class="border-t border-b border-base-content/50 opacity-80">
            <tr class="list-blog p-2">
              <td><input id="" class="checkbox checkbox-xs rounded" name="" type="checkbox"></td>
              <td>Title</td>
              <td>Author</td>
              <td>Date</td>
              <td class="text-end">
                Action
              </td>
            </tr>
          </tbody>
          <tbody v-if="latest.length > 0">
            <tr v-for="(data,i) in latest" :key="i" class="list-blog p-2 md:py-4 border-b border-base-content/30">
              <td><input id="" class="checkbox checkbox-xs rounded" name="" type="checkbox"></td>
              <td>{{ data['title'] }}</td>
              <td>{{ data['author'] }}</td>
              <td>{{ data['date'] }}</td>
              <td class="text-end flex flex-wrap gap-2 justify-end">
                <div class="tooltip" data-tip="Delete">
                  <button class="p-2 border rounded w-full h-full border-base-content">
                    <Icon height="14" icon="ri:delete-bin-7-line" width="14" />
                  </button>
                </div>
                <div class="tooltip" data-tip="Disable">
                  <button class="p-2 border rounded w-full h-full border-base-content">
                    <Icon height="14" icon="ri:forbid-line" width="14" />
                  </button>
                </div>
                <div class="tooltip" data-tip="Enable">
                  <button class="p-2 border rounded w-full h-full border-base-content">
                    <Icon height="14" icon="ri:checkbox-circle-line" width="14" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td class="text-center p-8 font-semibold opacity-70">
                Not Found
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue'

const latest = [
  {
    title: 'Cara Efektif Meningkatkan Konsentrasi',
    author: 'Anonim',
    date: '2024-03-10',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  },
  {
    title: 'Manfaat Olahraga Rutin bagi Kesehatan',
    author: 'John Smith',
    date: '2024-03-09',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  },
  {
    title: 'Manfaat Olahraga Rutin bagi Kesehatan',
    author: 'John Smith',
    date: '2024-03-09',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  },
  {
    title: 'Manfaat Olahraga Rutin bagi Kesehatan',
    author: 'John Smith',
    date: '2024-03-09',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  },
  {
    title: 'Manfaat Olahraga Rutin bagi Kesehatan',
    author: 'John Smith',
    date: '2024-03-09',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  },
  {
    title: 'Pentingnya Waktu Istirahat di Tempat Kerja',
    author: 'Jane Doe',
    date: '2024-03-08',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  },
  {
    title: 'Teknik Mengelola Stres dalam Kehidupan Sehari-hari',
    author: 'Alice Johnson',
    date: '2024-03-07',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  },
  {
    title: 'Mengapa Hobi adalah Penting dalam Keseimbangan Hidup',
    author: 'Alex Martin',
    date: '2024-03-06',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  }
]

// const latest = []

definePageMeta({
  layout: 'dashboard'
})
</script>

<style scoped>

.my-container {
  @apply shadow-sm shadow-black/20 rounded bg-base-200 p-[1em]
}

.title {
  @apply text-2xl font-semibold md:text-2xl;
}

.list-blog {
  min-width: 500px;
  width: 100%;
  display: grid;
  grid-template-columns: auto 1fr minmax(4rem, 0.2fr) minmax(4rem, 0.2fr) minmax(auto, 0.2fr);
  gap: 10px;
  @apply text-sm
}
</style>
