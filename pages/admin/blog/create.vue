<template>
  <div class="h-full">
    <section class="my-container h-full w-full">
      <form class="h-full w-full flex flex-col" @submit.prevent="submit">
        <h1 class="title py-6">
          Create a New Blog
        </h1>
        <div class="bg-base-100 px-4 py-6">
          <div class="flex justify-start items-center gap-6">
            <div class="w-full border-b border-base-content relative">
              <input
                id="title"
                v-model="title"
                class="outline-none bg-transparent w-full peer text-lg font-semibold"
                name="title"
                type="text"
                required
              >
              <label
                :class="['absolute left-0 text-sm transition my-peer', title.length > 0 ? '-translate-y-[80%]' : '']"
                for="title"
              >Title</label>
            </div>
            <div class="">
              <button :class="['btn btn-sm btn-neutral', title.length > 0 && content.length > 20 ? '' : 'btn-disabled']" type="submit">
                <Icon height="24" icon="ri:send-plane-2-line" width="24" />
              </button>
            </div>
          </div>
          <div class="h-fit w-full flex overflow-x-auto pt-2 items-center">
            <button class="flex items-center justify-center" type="button" @click="execCmd('undo')">
              <Icon height="24" icon="ic:baseline-undo" width="24" />
            </button>
            <button class="flex items-center justify-center" type="button" @click="execCmd('redo')">
              <Icon height="24" icon="ic:baseline-redo" width="24" />
            </button>
            <span>|</span>
            <button class="flex items-center justify-center" type="button">
              <Icon height="24" icon="ic:baseline-font-download" width="24" />
            </button>
            <button class="flex items-center justify-center" type="button">
              <Icon height="24" icon="ic:baseline-format-size" width="24" />
            </button>
            <button class="flex items-center justify-center" type="button" @click="execCmd('justifyCenter')">
              <Icon height="24" icon="ic:baseline-format-align-center" width="24" />
            </button>
            <button class="flex items-center justify-center" type="button" @click="execCmd('justifyFull')">
              <Icon height="24" icon="ic:baseline-format-align-justify" width="24" />
            </button>
            <button class="flex items-center justify-center" type="button" @click="execCmd('justifyLeft')">
              <Icon height="24" icon="ic:baseline-format-align-left" width="24" />
            </button>
            <button class="flex items-center justify-center" type="button" @click="execCmd('justifyRight')">
              <Icon height="24" icon="ic:baseline-format-align-right" width="24" />
            </button>
            <span>|</span>
            <button class="flex items-center justify-center" type="button" @click="execCmd('bold')">
              <Icon height="24" icon="ic:baseline-format-bold" width="24" />
            </button>
            <button class="flex items-center justify-center" type="button" @click="execCmd('italic')">
              <Icon height="24" icon="ic:baseline-format-italic" width="24" />
            </button>
            <button class="flex items-center justify-center" type="button" @click="execCmd('underline')">
              <Icon height="24" icon="ic:baseline-format-underlined" width="24" />
            </button>
            <button class="flex items-center justify-center" type="button" @click="execCmd('strikeThrough')">
              <Icon height="24" icon="ic:baseline-format-strikethrough" width="24" />
            </button>
            <button class="flex items-center justify-center" type="button">
              <!-- @click="execCmd('strikeThrough') -->
              <Icon height="24" icon="ic:baseline-format-color-text" width="24" />
            </button>
            <button class="flex items-center justify-center" type="button">
              <!-- @click="execCmd('strikeThrough') -->
              <Icon height="24" icon="ic:round-border-color" width="24" />
            </button>
            <span>|</span>
            <button class="flex items-center justify-center" type="button">
              <!-- @click="execCmd('strikeThrough') -->
              <Icon height="24" icon="ic:baseline-insert-link" width="24" />
            </button>
            <button class="flex items-center justify-center" type="button">
              <!-- @click="execCmd('strikeThrough') -->
              <Icon height="24" icon="ic:baseline-insert-photo" width="24" />
            </button>
          </div>
        </div>
        <div class="h-full overflow-y-auto">
          <div class="h-fit">
            <div id="editor" contenteditable="true" @input="getValue">
              <p><br></p>
            </div>
          </div>
        </div>
      </form>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import Swal from 'sweetalert2'

const title = ref('')
const content = ref('')

const execCmd = (commandName: string, value: any = null) => {
  switch (commandName) {
    case 'undo':
      document.execCommand('undo', false)
      break
    case 'redo':
      document.execCommand('redo', false)
      break
    case 'fontName':
      document.execCommand('fontName', false, value)
      break
    case 'fontSize':
      document.execCommand('fontSize', false, value)
      break
    case 'justifyCenter':
      document.execCommand('justifyCenter', false)
      break
    case 'justifyFull':
      document.execCommand('justifyFull', false)
      break
    case 'justifyLeft':
      document.execCommand('justifyLeft', false)
      break
    case 'justifyRight':
      document.execCommand('justifyRight', false)
      break
    case 'bold':
      document.execCommand('bold', false)
      break
    case 'italic':
      document.execCommand('italic', false)
      break
    case 'underline':
      document.execCommand('underline', false)
      break
    case 'strikeThrough':
      document.execCommand('strikeThrough', false)
      break
    case 'foreColor':
      document.execCommand('foreColor', false, value)
      break
    case 'backColor':
      document.execCommand('backColor', false, value)
      break
    case 'createLink':
      document.execCommand('createLink', false, value)
      break
    case 'insertImage':
      document.execCommand('insertImage', false, value)
      break
  }
}
const getValue = () => {
  const editor = document.querySelector('#editor')
  content.value = editor?.innerHTML as string
}

const submit = async () => {
  try {
    const data = {
      title: title.value,
      content: content.value
    }
    const response = await useFetchApi('/api/blog', {
      body: data,
      method: 'POST',
      credentials: 'include'
    })
    await Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: response?.message,
      showConfirmButton: false,
      timer: 1500
    })
    console.log(response)
  } catch (error) {
    await Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: error?.statusMessage,
      showConfirmButton: false,
      timer: 1500
    })
  }
}

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

.my-peer {
  @apply peer-hover:-translate-y-[80%] peer-focus:-translate-y-[80%]
}

#editor {
  width: 21cm; /* Width of A4 paper */
  max-width: 100%;
  min-height: 12cm;
  margin: 10px auto;
  padding: 1cm;
  @apply bg-base-100 outline-none shadow
}

button {
  @apply btn btn-outline !w-12 p-0 scale-75 border-none
}
</style>
