<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  specialClass: String
});

</script>

<template>
  <section class="flex justify-end mt-4">
    <button 
      :class="[specialClass, 'bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-full']">
      Post
    </button>
  </section>
</template>