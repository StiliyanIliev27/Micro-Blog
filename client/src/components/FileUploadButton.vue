<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  accept: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: 'Upload'
  }
})

const emit = defineEmits(['change'])

function onChange(event) {
  emit('change', event)
}
</script>

<!-- FileUploadButton.vue -->
<template>
  <div class="flex flex-col items-center">
    <label :for="id" class="cursor-pointer flex flex-col items-center">
      <!-- Use a slot for the icon so that you can pass different icons -->
      <slot name="icon"></slot>
      <span class="text-xs mt-1">{{ label }}</span>
    </label>
    <input :id="id" type="file" :accept="accept" @change="onChange" class="hidden" />
  </div>
</template>