<template>
	<KeepAlive>
		<div id="container" class="w-full p0 m0 h-screen relative"></div>
	</KeepAlive>
	<div class="absolute top-[100px] left-[20px] w-[400px]">
		<input
			type="search"
			class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
			v-model="searchLocation"
			@input="searchPOI"
		/>
		<!-- list -->
		<div class="bg-white px-2 rounded-b-lg">
			<ul>
				<li class="flex justify-between first:mt-0 py-2 border-b last:border-none border-gray-200 hover:bg-gray-50 cursor-pointer" v-for="item in 4">
					<div>
						<h4>1. 广州北站</h4>
						<span class="text-sm text-gray-400 block mt-2">站前路1号</span>
					</div>
					<div class="w-[100px] h-[80px]">
						<img class="w-full h-full object-cover" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" alt="">
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref, shallowRef } from 'vue'
import { useThrottleFn } from '@vueuse/core'
import AMapLoader from '@amap/amap-jsapi-loader'

const map = shallowRef(null)
const searchLocation = ref('')

const searchPOI = useThrottleFn(() => {
	console.log(searchLocation.value)
}, 1000)

const initMap = () => {
	AMapLoader.load({
		key: import.meta.env.VITE_MAP_KEY, // 申请好的Web端开发者Key，首次调用 load 时必填
		version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
		plugins: [''], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
	})
		.then((AMap) => {
			map.value = new AMap.Map('container', {
				//设置地图容器id
				viewMode: '3D', //是否为3D地图模式
				zoom: 5, //初始化地图级别
				center: [105.602725, 37.076636], //初始化地图中心点位置
			})
		})
		.catch((e) => {
			console.log(e)
		})
}

onMounted(() => {
	initMap()
})
</script>
