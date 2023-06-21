<template>
	<header class="bg-weather-primary shadow-lg sticky top-0 z-10">
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
					@click="modalActive = !modalActive"
				/>
				<FontAwesomeIcon
					icon="fa-location-dot"
					class="text-xl hover:text-weather-secondary cursor-pointer transition-all delay-100"
					@click="$router.push('/map')"
				/>
				<FontAwesomeIcon
					icon="fa-train-subway"
					class="text-xl hover:text-weather-secondary cursor-pointer transition-all delay-100"
					@click="$router.push('/subway')"
				/>
			</div>
			<!-- 模态框 -->
			<BaseModal :modal-active="modalActive" @toggle-modal="toggleModal">
				<div class="text-black">
					<h1 class="text-2xl mb-1">About:</h1>
					<p class="mb-4">
						The Local Weather allows you to track the current and
						future weather of cities of your choosing.
					</p>
					<h2 class="text-2xl">How it works:</h2>
					<ol class="list-decimal list-inside mb-4">
						<li>
							Search for your city by entering the name into the
							search bar.
						</li>
						<li>
							Select a city within the results, this will take you
							to the current weather for your selection.
						</li>
						<li>
							Track the city by clicking on the "+" icon in the
							top right. This will save the city to view at a
							later time on the home page.
						</li>
					</ol>

					<h2 class="text-2xl">Removing a city</h2>
					<p>
						If you no longer wish to track a city, simply select the
						city within the home page. At the bottom of the page,
						there will be am option to delete the city.
					</p>
				</div>
			</BaseModal>
		</nav>
	</header>
</template>

<script setup lang="ts">
import BaseModal from './BaseModal.vue'
import { ref } from 'vue'

const modalActive = ref(false)

const toggleModal = () => {
	modalActive.value = !modalActive.value
}
</script>
