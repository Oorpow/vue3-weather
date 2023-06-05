<script setup lang="ts">
import { ref } from 'vue'
import { useSearchStore } from '@/stores/search'
import { useCityStore } from '@/stores/city'

const searchStore = useSearchStore()
const cityStore = useCityStore()

const searchKeyword = ref('')
const searchCityOrState = () => {
	searchStore.getResBySearchKeywords(searchKeyword.value)
}
cityStore.getCityACodeList()
</script>

<template>
	<main class="container text-white">
		<div class="pt-4">
			<input
				v-model="searchKeyword"
				@change="searchCityOrState"
				type="text"
				placeholder="Search for a city or a state"
				class="w-full px-1 py-2 text-center bg-transparent border-b focus:outline-none focus:border-weather-secondary"
			/>
		</div>
	</main>
</template>
