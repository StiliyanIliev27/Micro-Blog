<script setup>
import { computed, defineProps, ref } from 'vue';
import PostButton from './PostButton.vue';

// Define props
const props = defineProps({
	post: {
		title: String,
		content: String,
		media: File,
		initialLikes: Number,
		initialComments: Number
	},
});

// Reactive state
const isLiked = ref(false);
const likes = ref(props.initialLikes || 0); // Set likes from props or default to 0
const comments = ref(props.initialComments || 0);
const isCommentModalOpen = ref(false);

// Method to toggle the "like" state
const toggleLike = () => {
	if (isLiked.value) {
		// Decrease likes if already liked
		likes.value--;
	} else {
		// Increase likes if not liked
		likes.value++;
	}
	isLiked.value = !isLiked.value;
};

const toggleCommentModal = () => {
	isCommentModalOpen.value = !isCommentModalOpen.value;
}

// Optional: Computed property if you want derived data for display
const likesText = computed(() => `${likes.value} ${likes.value === 1 ? 'Like' : 'Likes'}`);
const commentsText = computed(() => `${comments.value} ${comments.value === 1 ? 'Comment' : 'Comments'}`);

</script>

<template>
	<div class="flex flex-col gap-5 bg-gray-800 text-gray-100 mb-5 rounded-lg p-5">
		<h1 class="text-lg">{{ post.title }}</h1>
		<p class="text-md">{{ post.content }}</p>
		<img class="object-cover w-full h-64 rounded-sm" :src="post.media">
		<div class="emoji-container flex gap-3 items-center">
			<!-- Like button -->
			<i class="fa-regular fa-heart cursor-pointer" :class="{ active: isLiked, 'text-blue-600': isLiked }"
				@click="toggleLike"></i>
			<!-- Show likes count -->
			<span>{{ likesText }}</span>

			<!-- Comment button (optional) -->
			<i class="fa-regular fa-comment cursor-pointer" @click="toggleCommentModal"></i>

			<span>{{ commentsText }}</span>
		</div>
		<div v-if="isCommentModalOpen">
			<textarea class="w-full h-24 bg-gray-700 text-gray-100 p-2 rounded-lg" placeholder="Write a comment"></textarea>
			<PostButton specialClass="w-full"/>
		</div>
	</div>
</template>
