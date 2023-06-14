<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useCityStore } from '@/stores/city'

const router = useRouter()
const cityStore = useCityStore()
const { relatedLocations } = storeToRefs(cityStore)

const searchKeyword = ref('')
/** 根据用户输入的关键字查找对应的地区 */
const searchCityOrState = () => {
	searchKeyword.value.trim() === ''
		? cityStore.clearRelatedLocations()
		: cityStore.pickAdcodeFromAdcodeList(searchKeyword.value)
}

/**
 * 根据acode获取某个地点的天气
 * @param acode
 */
const getWeatherByLocationAcode = (acode: string) => {
	router.push({
		name: 'weather',
		params: {
			city: acode,
		},
	})
}
</script>

<template>
	<main class="container text-white">
		<div class="pt-4 relative">
			<input
				v-model="searchKeyword"
				@change="searchCityOrState"
				type="search"
				placeholder="Search for a city or a state"
				class="text-black mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
			/>
			<!-- 搜索结果 -->
			<ul
				class="w-full absolute bg-weather-secondary text-white mt-[10px] px-2"
			>
				<li
					class="py-2 cursor-pointer"
					v-for="(location, i) in relatedLocations"
					:key="i"
					@click="getWeatherByLocationAcode(location.adcode)"
				>
					{{ location.name }}
				</li>
			</ul>
		</div>
	</main>
</template>
