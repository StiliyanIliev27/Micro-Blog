<script setup>
import NavigationBar from './NavigationBar.vue';
import UploadPost from './UploadPost.vue';
import Post from './Post.vue';

const POSTS = [
  {
    id: 1,
    title: "Post 1",
    content: "This is the first post",
    media: 'https://images.unsplash.com/photo-1739369122285-8560a5eb18fd?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    initialLikes: 1,
  },
  {
    id: 2,
    title: "Post 2",
    content: "This is the second post",
    media: 'https://images.unsplash.com/photo-1739305235159-308ddffb4129?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    initialLikes: 2
  }
]

</script>

<template>
  <div id="container" class="flex mx-auto h-full bg-black">
    <div id="navigation" class="flex justify-center basis-1/3 grow p-5">
      <NavigationBar class="fixed"/>
    </div>
    <main class="basis-2/3 grow-0 border-gray-300 border-r-1 border-l-1 p-5">
      <UploadPost class="mb-5" />
      <div class="flex flex-col flex-wrap lg:p-4" v-for="post in POSTS" :key="post.id">
        <Post :post="post" />
      </div>
    </main>
    <aside class="basis-1/3 grow bg-blue-200 p-5">
      <p class="text-xl">This is the sidebar</p>
    </aside>
  </div>
</template>