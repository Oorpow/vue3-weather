<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useSearchStore } from '@/stores/search'
import { useWeatherStore } from '@/stores/weather'

const router = useRouter()
const searchStore = useSearchStore()
const weatherStore = useWeatherStore()
const { relatedLocations } = storeToRefs(searchStore)

const searchKeyword = ref('')
/** 根据用户输入的关键字查找对应的地区 */
const searchCityOrState = () => {
	searchKeyword.value === ''
		? searchStore.clearRelatedLocations()
		: searchStore.getResBySearchKeywords(searchKeyword.value)
}

/**
 * 根据acode获取某个地点的天气
 * @param acode 
 */
const getWeatherByLocationAcode = (acode: string) => {
	router.push({
		name: 'weather',
		params: {
			city: acode
		}
	})
}
</script>

<template>
	<main class="container text-white">
		<div class="pt-4 relative">
			<input
				v-model="searchKeyword"
				@change="searchCityOrState"
				type="text"
				placeholder="Search for a city or a state"
				class="w-full px-1 py-2 text-center bg-transparent border-b focus:outline-none focus:border-weather-secondary"
			/>
			<!-- 搜索结果 -->
			<ul
				class="w-full absolute bg-weather-secondary text-white mt-[10px] px-2"
			>
				<li
					class="py-2 cursor-pointer"
					v-for="location in relatedLocations"
					:key="location.id"
					@click="getWeatherByLocationAcode(location.adcode)"
				>
					{{ location.name }}
				</li>
			</ul>
		</div>
	</main>
</template>
