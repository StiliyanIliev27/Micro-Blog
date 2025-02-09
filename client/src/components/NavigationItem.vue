<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  iconClass: String,
  text: String
});


</script>

<template>
  <div class="p-4 text-lg hover:bg-gray-100 cursor-pointer">
    <a class="flex gap-2 items-center w-full" href="#">
      <i :class="iconClass"></i>
      <p v-if="text">{{ text }}</p>
    </a>
  </div>
</template>
