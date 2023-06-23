<script setup lang="ts">
import BaseMap from '@/components/BaseMap.vue'
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useWeatherStore, useCityStore, useSearchStore } from '@/stores'

const weatherStore = useWeatherStore()
const cityStore = useCityStore()
const searchStore = useSearchStore()

const { weatherInfoLives, weatherInfoCasts } = storeToRefs(weatherStore)
const { relatedLocations } = storeToRefs(cityStore)
const { currentAdcode } = storeToRefs(searchStore)

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
const getWeatherByLocationAcode = async (acode: string) => {
	await weatherStore.getWeatherLivesOfCity(acode)
	await weatherStore.getWeatherCastsOfCity(acode)
}

const currentGeo = ref({
	longitude: 0,
	latitude: 0,
})
/**
 * 用户授权是否允许获取当前所在位置
 */
const getUserCurrentLocation = () => {
	navigator.geolocation.getCurrentPosition(
		handleSuccessGetUserLocation,
		(err: GeolocationPositionError) => {
			if (err.message === 'User denied Geolocation') {
				console.warn(err.message)
			}
		},
		{ enableHighAccuracy: true }
	)
}

/** 成功获取用户位置信息的回调，并根据经纬度制作静态地图 */
const handleSuccessGetUserLocation = (pos: GeolocationPosition) => {
	const crd = pos.coords
	// 经度,纬度
	currentGeo.value.longitude = Number(crd.longitude.toFixed(6))
	currentGeo.value.latitude = Number(crd.latitude.toFixed(6))
	const combineStr = crd.longitude.toFixed(6) + ',' + crd.latitude.toFixed(6)
	// 将经纬度转化为当前位置所处城市的acode
	searchStore.reverseGeoLocation(combineStr).then(() => {
		// 根据adcode获取当前城市的天气
		getWeatherByLocationAcode(currentAdcode.value)
	})
}

// 获取用户当前位置
onMounted(() => {
	getUserCurrentLocation()
})

const weekDays = [
	'星期一',
	'星期二',
	'星期三',
	'星期四',
	'星期五',
	'星期六',
	'星期日',
]
/** 日期计算 */
const computeDay = (weekday: number) => {
	const day = new Date().getDay()
	return weekday === day ? '今日' : weekDays[weekday - 1]
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
		<div class="flex flex-1 flex-col mt-10 pb-2">
			<!-- 实况天气 -->
			<div class="flex flex-col text-white text-center">
				<div>
					<h2 class="text-3xl">{{ weatherInfoLives.city }}</h2>
				</div>
				<div class="mt-2">
					<h1 class="text-6xl">
						{{ weatherInfoLives.temperature }}&deg
					</h1>
					<div class="my-3">
						<p class="text-xl font-bold">
							{{ weatherInfoLives.weather }}
						</p>
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
			<hr
				class="border-white border-opacity-10 border w-full my-[20px]"
			/>
			<!-- AMap地图 -->
			<!-- <BaseMap
				:longitude="currentGeo.longitude"
				:latitude="currentGeo.latitude"
			/> -->

			<hr
				class="border-white border-opacity-10 border w-full my-[20px]"
			/>
			<!-- 预报天气 -->
			<div class="container flex flex-col text-white">
				<h1 class="my-2">近4日天气预报</h1>
				<div
					class="flex items-center justify-between mt-4"
					v-for="(cast, i) in weatherInfoCasts"
					:key="i"
				>
					<div class="flex font-bold">
						<span class="block w-[60px]">{{
							computeDay(Number(cast.week))
						}}</span>
						<span>{{ cast.daytemp }}&deg</span>
					</div>
					<FontAwesomeIcon icon="fa-solid fa-cloud" class="text-lg" />
				</div>
			</div>
		</div>
	</main>
</template>
