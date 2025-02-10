<script setup>
import { defineProps, computed } from 'vue';

const { iconClass, text, disabled } = defineProps({
  iconClass: String,
  text: String, 
  disabled: Boolean
});

const containerClass = computed(() => {
  let baseClass = 'p-4 text-lg text-white transition ease-in-out cursor-pointer';
  if (!disabled) {
    baseClass += ' hover:bg-gray-600';
  }
  return baseClass;
});
</script>

<template>
  <div :class="containerClass">
    <a class="flex gap-2 items-center w-full" href="#">
      <i :class="iconClass"></i>
      <p v-if="text">{{ text }}</p>
    </a>
  </div>
</template>
