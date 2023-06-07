<template>
	<div class="flex flex-1 flex-col mt-10 pb-2">
		<!-- 实况天气 -->
		<div class="flex flex-col text-white text-center">
			<div>
				<h2 class="text-3xl">{{ weatherInfoLives.city }}</h2>
			</div>
			<div class="mt-2">
				<h1 class="text-6xl">{{ weatherInfoLives.temperature }}&deg</h1>
				<div class="my-3">
					<p class="text-xl font-bold">{{ weatherInfoLives.weather }}</p>
				</div>
			</div>
			<!-- 天气对应的icon -->
			<div>
				<FontAwesomeIcon
					icon="fa-solid fa-cloud"
					class="text-white text-7xl"
				/>
			</div>
		</div>
		<hr class="border-white border-opacity-10 border w-full my-[20px]" />
		<!-- 预报天气 -->
		<div class="container flex flex-col text-white">
			<h1 class="my-2">4日天气预报</h1>
			<div
				class="flex items-center justify-between mt-4"
				v-for="(cast, i) in weatherInfoCasts"
				:key="i"
			>
				<div class="flex font-bold">
					<span class="block w-[60px]">{{ computeDay(Number(cast.week)) }}</span>
					<span>{{ cast.daytemp }}&deg</span>
				</div>
				<FontAwesomeIcon icon="fa-solid fa-cloud" class="text-lg" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useWeatherStore } from '@/stores/weather'

const route = useRoute()
const weatherStore = useWeatherStore()
const { weatherInfoLives, weatherInfoCasts } = storeToRefs(weatherStore)
const { city } = route.params

const weekDays = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']

// 获取实况和预报天气
const getWeather = async () => {
	await weatherStore.getWeatherLivesOfCity(city as string)
	await weatherStore.getWeatherCastsOfCity(city as string)
}
getWeather()

// 日期计算
const computeDay = (weekday: number) => {
    const day = new Date().getDay()
    return weekday === day ? '今日' : weekDays[weekday - 1]
}
</script>
