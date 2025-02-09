<script setup>
import NavigationBar from './NavigationBar.vue';
</script>

<template>
    <div id="container" class="flex mx-auto h-screen">
        <div id="navigation" class="flex justify-end basis-1/3 grow bg-red-200">
            <NavigationBar />
        </div>
        <main class="basis-2/3 grow-0 bg-green-200">
            <p class="text-xl">Click on the links above to navigate to different pages</p>
        </main>
        <aside class="basis-1/3 grow bg-blue-200">
            <p class="text-xl">This is the sidebar</p>
        </aside>
    </div>
</template>