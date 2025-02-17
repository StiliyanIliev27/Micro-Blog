<script setup>
import { ref } from 'vue'
import FileUploadButton from '../components/FileUploadButton.vue'

// Reactive variables for media previews
const postImage = ref(null)
const postVideo = ref(null)

function handleUpload(event) {
  const file = event.target.files[0]
  if (file.type === 'image/gif') {
    postImage.value = URL.createObjectURL(file)
  } else if(file.type === 'video') {
		postVideo.value = URL.createObjectURL(file)
	}
}
</script>

<template>
  <div class="max-w-3xl mx-auto p-5 bg-gray-800 text-gray-100 rounded-lg shadow-md">
    <!-- Post Input Section -->
    <section class="flex items-center space-x-4 mb-4">
      <img
        src="../assets/avatar.avif"
        alt="profile picture"
        class="w-12 h-12 rounded-full object-cover border border-white"
      />
      <input
        type="text"
        placeholder="What is happening?!"
        class="flex-grow p-4 text-lg bg-gray-700 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </section>

    <!-- File Upload Buttons Section -->
    <section class="flex items-center space-x-6 mb-4">
      <!-- Image Upload Button -->
      <FileUploadButton
        id="image-upload"
        accept="image/*"
        label="Image"
        @change="handleUpload"
      >
        <template #icon>
          <!-- Image icon (camera) -->
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-400 hover:text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7h4l2-3h6l2 3h4v13H3V7z" />
            <circle cx="12" cy="13" r="4" stroke="currentColor" stroke-width="2"/>
          </svg>
        </template>
      </FileUploadButton>

      <!-- Video Upload Button -->
      <FileUploadButton
        id="video-upload"
        accept="video/*"
        label="Video"
        @change="handleUpload"
      >
        <template #icon>
          <!-- Video icon (video camera) -->
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-400 hover:text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M4 6h8a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2z" />
          </svg>
        </template>
      </FileUploadButton>

      <!-- GIF Upload Button -->
      <FileUploadButton
        id="gif-upload"
        accept="image/gif"
        label="GIF"
        @change="handleUpload"
      >
        <template #icon>
          <!-- GIF icon (using a sparkles icon as a stand-in) -->
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-purple-400 hover:text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </template>
      </FileUploadButton>
    </section>

    <!-- Media Previews -->
    <section class="space-y-4">
      <!-- Image Preview -->
      <div v-if="postImage">
        <img :src="postImage" alt="Uploaded Image" class="w-full h-auto object-cover rounded-lg" />
      </div>
      <!-- Video Preview -->
      <div v-if="postVideo">
        <video controls :src="postVideo" class="w-full rounded-lg"></video>
      </div>
    </section>

    <!-- Post Button -->
    <section class="flex justify-end mt-4">
      <button class="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-full">
        Post
      </button>
    </section>
  </div>
</template>