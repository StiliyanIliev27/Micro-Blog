<script setup>
import { computed, defineProps, ref, watch } from 'vue';
import PostButton from './PostButton.vue';
import PostComment from './PostComment.vue';

const COMMENTS = [
  {
    postId: 1,
    username: 'John Doe',
    userPicture: 'https://randomuser.me/api/portraits/men/1.jpg',
    content: 'Great post on the first topic!',
  },
  {
    postId: 1,
    username: 'Emily Smith',
    userPicture: 'https://randomuser.me/api/portraits/women/2.jpg',
    content: 'I found this really helpful, thanks!',
  },
  {
    postId: 2,
    username: 'Josh Wick',
    userPicture: 'https://randomuser.me/api/portraits/men/3.jpg',
    content: 'The second post is amazing!',
  },
  {
    postId: 2,
    username: 'Melanie John',
    userPicture: 'https://randomuser.me/api/portraits/women/4.jpg',
    content: 'Totally agree with this!',
  },
];

// Define props
const props = defineProps({
  post: {
    title: String,
    content: String,
    media: File,
    initialLikes: Number,
    initialComments: Number,
  },
});

// Reactive state
const isLiked = ref(false);
const likes = ref(props.initialLikes || 0); // Set likes from props or default to 0
const comments = ref(props.initialComments || 0);
const isCommentModalOpen = ref(false);
const selectedPostId = ref(1);
const newComment = ref('');
const commentError = ref('');

// Method to toggle the "like" state
const toggleLike = () => {
  if (isLiked.value) {
    likes.value--; // Decrease likes if already liked
  } else {
    likes.value++; // Increase likes if not liked
  }
  isLiked.value = !isLiked.value;
};

const toggleCommentModal = (postId) => {
  isCommentModalOpen.value = !isCommentModalOpen.value;
  selectedPostId.value = postId;
};

const togglePostComment = () => {
  if (newComment.value.trim() === '') {
    commentError.value = 'Comment cannot be empty!';
    return;
  }

  COMMENTS.push({
    postId: selectedPostId.value,
    userPicture: 'https://randomuser.me/api/portraits/men/5.jpg', // Example avatar
    username: 'NewUser',
    content: newComment.value,
  });

  newComment.value = '';
  commentError.value = ''; // Clear error after successful post
};

// Watch for changes to `newComment` and clear the error if user starts typing
watch(newComment, (newVal) => {
  if (newVal.trim() !== '') {
    commentError.value = ''; // Remove the error message
  }
});

// Optional: Computed property for derived data
const likesText = computed(() => `${likes.value} ${likes.value === 1 ? 'Like' : 'Likes'}`);
const commentsText = computed(() => `${comments.value} ${comments.value === 1 ? 'Comment' : 'Comments'}`);
const filteredComments = computed(() => COMMENTS.filter(comment => comment.postId === selectedPostId));
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
      <span>{{ likesText }}</span>

      <!-- Comment button -->
      <i class="fa-regular fa-comment cursor-pointer" @click="toggleCommentModal(post.id)"></i>
      <span>{{ commentsText }}</span>
    </div>
    <div v-if="isCommentModalOpen">
      <h2 class="mb-2">Comments</h2>
      <div v-for="(comment, index) in filteredComments" :key="index">
        <PostComment :comment="comment" />
      </div>
      <!-- Error Message -->
      <p v-if="commentError" class="text-red-500 text-sm mt-1 text-right font-bold">{{ commentError }}</p>
      <!-- Text Area with Dynamic Styling -->
      <textarea v-model="newComment"
        :class="[commentError ? 'border-2 border-red-500' : 'border border-gray-300 focus:border-blue-400']"
        class="w-full h-24 focus:outline-0 bg-gray-700 text-gray-100 p-2 rounded-lg"
        placeholder="Write a comment"></textarea>
      <PostButton @click="togglePostComment" specialClass="w-full" />
    </div>
  </div>
</template>
