<script setup>
import NavigationItem from './NavigationItem.vue';

</script>

<template>
	<nav>
		<ul class="flex flex-col gap-5 p-5">
			<li>
				<NavigationItem iconClass="fa-brands fa-microblog" text="Micro-Blog" disabled="true"/>
			</li>
			<li>
				<NavigationItem iconClass="fa-solid fa-house" text="Home" />
			</li>
			<li>
				<NavigationItem iconClass="fa-solid fa-magnifying-glass" text="Explore" />
			</li>
			<li>
				<NavigationItem iconClass="fa-solid fa-user" text="Profile" />
			</li>
			<li>
				<button class="bg-neutral-50 text-md font-semibold px-10 py-3 w-full rounded-full hover:bg-neutral-200 cursor-pointer">Post</button>
			</li>
		</ul>
	</nav>
</template>