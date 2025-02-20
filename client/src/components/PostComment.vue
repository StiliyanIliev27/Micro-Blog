<script setup>
import { defineProps } from 'vue';

const iconStyle = 'fa-solid text-xl cursor-pointer hover:opacity-60';

const props = defineProps({
	comment: {
		username: String,
		userPicture: String,
		content: String
	}
});

</script>

<template>
	<div class="flex items-center p-2 justify-between bg-gray-600 rounded-lg mb-3">
		<div class="flex gap-3.5 items-center text-gray-100 p-1.5 rounded-lg">
			<img class="w-8 h-8 rounded-full object-cover border border-white" :src="comment.userPicture" alt="profilePic" />
			<strong class="username">{{ comment.username }}</strong>
			<p class="text-md">{{ comment.content }}</p>
		</div>
		<div class="flex gap-2 items-center p-1.5">
			<i 
			:class="iconStyle"
			class="fa-check text-green-500"></i>

			<i 
			:class="iconStyle"
			class="fa-xmark text-red-500"></i>
		</div>
	</div>
</template>

<style scoped>
.username::after {
  content: '|';
  position: relative;
  left: 7px;
}

/* Add spacing between comments */
.comment {
  margin-bottom: 15px;
}
</style>