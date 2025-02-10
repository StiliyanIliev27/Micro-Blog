<script setup>
import NavigationBar from './NavigationBar.vue';
import Post from './Post.vue';
</script>

<template>
    <div id="container" class="flex mx-auto h-screen bg-black">
        <div id="navigation" class="flex sticky top-0 justify-center basis-1/3 grow p-5">
            <NavigationBar />
        </div>
        <main class="basis-2/3 grow-0 border-gray-300 border-r-1 border-l-1 p-5">
            <Post />
        </main>
        <aside class="basis-1/3 grow bg-blue-200 p-5">
            <p class="text-xl">This is the sidebar</p>
        </aside>
    </div>
</template>