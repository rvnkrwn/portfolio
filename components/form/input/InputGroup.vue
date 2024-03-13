<template>
  <div>
    <div class="border-b border-base-content flex px-1 py-2 text-sm h-10 w-full">
      <input :type="props.type" :name="props.name" :id="props.id" @input="(e) => handleInput(e.target.value)" class="bg-transparent outline-none w-full h-full peer">
      <label :for="props.id" :class="['absolute transition-all text-base-content/70 peer-hover:-translate-y-full peer-hover:-translate-x-1 peer-focus:-translate-y-full peer-focus:-translate-x-1 peer-hover:text-xs peer-focus:text-xs', value ? 'text-xs -translate-x-1 -translate-y-full' : '']">{{props.label}}</label>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps(['type', 'name', 'id', 'label'])
const emit = defineEmits(['value'])

const value = ref()

const handleInput = (x: any) => {
  value.value = x
  emit('value', x)
}
</script>

<style scoped>

</style>
