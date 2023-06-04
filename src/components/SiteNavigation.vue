<template>
	<header class="bg-weather-primary shadow-lg sticky top-0">
		<nav
			class="container flex flex-col sm:flex-row items-center py-6 gap-4 text-white"
		>
			<div class="flex flex-1 items-center gap-3">
				<FontAwesomeIcon icon="fa-solid fa-sun" class="text-xl" />
				<p class="text-xl">The Local Weather</p>
			</div>
			<div class="flex gap-3">
				<FontAwesomeIcon
					icon="fa-solid fa-circle-info"
					class="text-xl hover:text-weather-secondary cursor-pointer transition-all delay-100"
				/>
				<FontAwesomeIcon
					icon="fa-solid fa-plus"
					class="text-xl hover:text-weather-secondary cursor-pointer transition-all delay-100"
				/>
			</div>
		</nav>
	</header>
</template>

<script setup lang="ts"></script>
